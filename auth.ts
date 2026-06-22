/**
 * NextAuth v5 (beta) configuration
 * Providers: Email (magic link) + Credentials (password)
 * Adapter: @auth/prisma-adapter — writes sessions/accounts to Railway PostgreSQL
 *
 * Required env vars:
 *   AUTH_SECRET                — random 32+ char secret (openssl rand -base64 32)
 *   AUTH_URL                   — canonical base URL (e.g. https://tealregistry.com)
 *   EMAIL_SERVER_HOST          — SMTP host
 *   EMAIL_SERVER_PORT          — SMTP port (e.g. 587)
 *   EMAIL_SERVER_USER          — SMTP username
 *   EMAIL_SERVER_PASSWORD      — SMTP password
 *   EMAIL_FROM                 — From address (e.g. "Teal Registry <noreply@tealregistry.com>")
 *   DATABASE_URL               — PostgreSQL connection string from Railway
 */

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/nodemailer";
import { getPrisma, hasDatabaseUrl } from "@/lib/prisma";
import type { UserRole } from "@prisma/client";

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

async function hashPassword(password: string): Promise<string> {
  const bcrypt = await import("bcryptjs");
  return bcrypt.hash(password, 12);
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const bcrypt = await import("bcryptjs");
  return bcrypt.compare(password, hash);
}

// -----------------------------------------------------------------------------
// Auth config
// -----------------------------------------------------------------------------

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Only attach Prisma adapter when a DB is available
  adapter: hasDatabaseUrl() ? PrismaAdapter(getPrisma()) : undefined,

  session: {
    strategy: hasDatabaseUrl() ? "database" : "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/login",
    verifyRequest: "/login?check-email=1",
    error: "/login?error=1",
  },

  providers: [
    // ── Magic link (email) ──────────────────────────────────────────────────
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT ?? 587),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM ?? "Teal Registry <noreply@tealregistry.com>",
    }),

    // ── Password credentials ────────────────────────────────────────────────
    CredentialsProvider({
      name: "Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        action: { label: "Action", type: "text" }, // "login" | "register"
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = String(credentials.email).toLowerCase().trim();
        const password = String(credentials.password);

        if (!hasDatabaseUrl()) {
          // Dev fallback: accept any credentials when no DB is set up
          return { id: "dev-user", email, name: "Dev User", role: "ADMIN" };
        }

        const prisma = getPrisma();

        // Register flow
        if (credentials.action === "register") {
          const existing = await prisma.user.findUnique({ where: { email } });
          if (existing) throw new Error("email_exists");

          const hash = await hashPassword(password);
          const user = await prisma.user.create({
            data: { email, passwordHash: hash, role: "PUBLIC" },
          });
          return { id: user.id, email: user.email, name: user.name, role: user.role };
        }

        // Login flow
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash) throw new Error("invalid_credentials");

        const valid = await verifyPassword(password, user.passwordHash);
        if (!valid) throw new Error("invalid_credentials");

        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],

  callbacks: {
    // Attach role to JWT/session
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: UserRole }).role ?? "PUBLIC";
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token, user }) {
      if (session.user) {
        // JWT strategy
        if (token?.role) {
          (session.user as { role?: string }).role = token.role as string;
          (session.user as { id?: string }).id = token.id as string;
        }
        // Database strategy
        if (user) {
          (session.user as { role?: string }).role = (user as { role?: string }).role ?? "PUBLIC";
          (session.user as { id?: string }).id = user.id;
        }
      }
      return session;
    },
  },

  events: {
    async createUser({ user }) {
      // Auto-upgrade role if admin email
      if (!hasDatabaseUrl()) return;
      const adminEmails = (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim());
      if (user.email && adminEmails.includes(user.email)) {
        const prisma = getPrisma();
        await prisma.user.update({
          where: { id: user.id! },
          data: { role: "ADMIN" },
        });
      }
    },
  },
});
