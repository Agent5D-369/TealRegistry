"use client";

import Link from "next/link";
import { useState } from "react";
import { ShieldCheck, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const [mode, setMode] = useState<"magic" | "password" | "register">("magic");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const { signIn } = await import("next-auth/react");
      await signIn("nodemailer", { email, redirect: false });
      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Try again or use password login.");
    }
  }

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const { signIn } = await import("next-auth/react");
      const result = await signIn("credentials", {
        email,
        password,
        action: mode === "register" ? "register" : "login",
        redirect: false,
      });
      if (result?.error) {
        setStatus("error");
        setErrorMsg(
          result.error === "email_exists"
            ? "An account with that email already exists. Log in instead."
            : "Invalid email or password."
        );
      } else {
        window.location.href = "/dashboard/candidate";
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <ShieldCheck size={28} strokeWidth={1.5} />
          <span>Teal Registry</span>
        </div>

        {status === "sent" ? (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <CheckCircle2 size={48} style={{ color: "var(--teal)", margin: "0 auto 1rem", display: "block" }} />
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.5rem", marginBottom: "0.75rem" }}>
              Check your inbox
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.65, maxWidth: "none" }}>
              We sent a sign-in link to <strong>{email}</strong>.
            </p>
            <button
              onClick={() => setStatus("idle")}
              style={{ color: "var(--teal)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", marginTop: "1rem" }}
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            <h1 className="auth-title">Portal access</h1>
            <p className="auth-subtitle">
              For applicants, credential holders, assessors, and registry administrators.
            </p>

            <div className="auth-tabs">
              <button
                className={`auth-tab${mode === "magic" ? " active" : ""}`}
                onClick={() => { setMode("magic"); setStatus("idle"); setErrorMsg(""); }}
                type="button"
              >
                <Mail size={15} />
                Magic link
              </button>
              <button
                className={`auth-tab${mode === "password" ? " active" : ""}`}
                onClick={() => { setMode("password"); setStatus("idle"); setErrorMsg(""); }}
                type="button"
              >
                <Lock size={15} />
                Password
              </button>
              <button
                className={`auth-tab${mode === "register" ? " active" : ""}`}
                onClick={() => { setMode("register"); setStatus("idle"); setErrorMsg(""); }}
                type="button"
              >
                Create account
              </button>
            </div>

            {errorMsg && (
              <div className="notice notice-warning" style={{ marginBottom: "1.25rem" }}>
                {errorMsg}
              </div>
            )}

            {mode === "magic" && (
              <form onSubmit={handleMagicLink} className="auth-form">
                <div className="form-group">
                  <label htmlFor="email-magic">Email address</label>
                  <input
                    id="email-magic"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending…" : "Send sign-in link"}
                  <Mail size={16} />
                </button>
                <p className="auth-hint">
                  We&apos;ll email you a secure, one-time link. No password needed.
                </p>
              </form>
            )}

            {(mode === "password" || mode === "register") && (
              <form onSubmit={handlePassword} className="auth-form">
                <div className="form-group">
                  <label htmlFor="email-pw">Email address</label>
                  <input
                    id="email-pw"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    {mode === "register" ? "Create a password" : "Password"}
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      id="password"
                      type={showPass ? "text" : "password"}
                      required
                      minLength={8}
                      autoComplete={mode === "register" ? "new-password" : "current-password"}
                      placeholder={mode === "register" ? "Minimum 8 characters" : "Your password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ paddingRight: "2.5rem" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      style={{
                        position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)",
                        background: "none", border: "none", cursor: "pointer", color: "var(--muted)", padding: 0,
                      }}
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                  disabled={status === "loading"}
                >
                  {status === "loading"
                    ? mode === "register" ? "Creating account…" : "Signing in…"
                    : mode === "register" ? "Create account" : "Sign in"}
                  <ArrowRight size={16} />
                </button>
                {mode === "password" && (
                  <p className="auth-hint">
                    No password?{" "}
                    <button
                      type="button"
                      onClick={() => { setMode("magic"); setErrorMsg(""); }}
                      style={{ color: "var(--teal)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                    >
                      Use magic link instead
                    </button>
                  </p>
                )}
              </form>
            )}
          </>
        )}

        <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "1.5rem 0" }} />

        <div>
          <p style={{ fontSize: "0.8125rem", color: "var(--muted)", marginBottom: "0.75rem", maxWidth: "none" }}>
            Which portal are you looking for?
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            {[
              { label: "Apply for certification", dest: "/apply" },
              { label: "Manage my credential or badge", dest: "/dashboard/candidate" },
              { label: "Assessor workspace", dest: "/dashboard/assessor" },
              { label: "Organization manager", dest: "/dashboard/organization" },
              { label: "Admin & certification operations", dest: "/admin" },
            ].map(({ label, dest }) => (
              <Link key={dest} href={dest} style={{ fontSize: "0.875rem", color: "var(--teal)", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <ArrowRight size={13} />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Public trust note */}
      <p style={{ textAlign: "center", color: "var(--muted)", fontSize: "0.8125rem", marginTop: "1.5rem", maxWidth: "none" }}>
        By continuing, you agree to the{" "}
        <Link href="/terms" style={{ color: "var(--teal)" }}>Terms</Link>
        {" "}and{" "}
        <Link href="/privacy" style={{ color: "var(--teal)" }}>Privacy Policy</Link>.
        Portal access is role-gated.
      </p>
    </div>
  );
}
