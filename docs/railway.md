# Railway Readiness

## Provided Targets

- Project ID: `8c21fadf-ef58-4d3a-9df6-1f6f6d3911ef`
- Environment ID: `6aa94083-f4b7-4571-a453-55cb3ebb0546`
- Service ID candidate: `dd397fe2-6040-415d-b153-8f49362006b0`
- Dashboard URL: `https://railway.com/project/8c21fadf-ef58-4d3a-9df6-1f6f6d3911ef/settings?environmentId=6aa94083-f4b7-4571-a453-55cb3ebb0546`

## Local Tooling Check

- Railway CLI: installed, `railway 4.59.0`
- Railway account: authenticated as `rick@amora.cr`
- Workspace visible: `My Projects`

## Current Blocker

Project-scoped calls currently fail with:

```text
Unauthorized. Please run `railway login` again.
```

The same authorization failure appears through both Railway CLI and Railway MCP for the provided project/environment/service IDs.

Rechecked on 2026-05-28:

- `railway whoami --json` succeeds for `rick@amora.cr`.
- Project-scoped service calls against project `8c21fadf-ef58-4d3a-9df6-1f6f6d3911ef` and environment `6aa94083-f4b7-4571-a453-55cb3ebb0546` still return `Unauthorized. Please run railway login again.`
- The app now has a Prisma-backed registry data layer with static fallback, so it is ready to use Railway Postgres once access and `DATABASE_URL` are available.

## Next Railway Steps

1. Refresh Railway login for the account that owns or has access to the project.
2. Re-check service config for service `dd397fe2-6040-415d-b153-8f49362006b0`.
3. Confirm whether the GitHub repo is attached to that service.
4. Add or confirm production environment variables.
5. Deploy the scaffolded app and verify build/runtime logs.

## Deployment Notes

Keep Railway project/environment/service IDs explicit when running commands. Avoid relying on local Railway link state until the project has been verified.
