# Secure SDLC / DevSecOps Pipeline Demo (Simplified)

A small demonstration project showing how automated security checks can be
embedded directly into a CI/CD pipeline, so vulnerabilities are caught
during development instead of after deployment.

## The idea in one sentence

Instead of checking security once at the end of a project, this pipeline
checks it automatically at every push - "shifting security left" in the SDLC.

## Pipeline stages (one job, run in order)

| Step | SDLC Stage | What it does |
|---|---|---|
| Checkout code | Code | Pulls the latest code into the pipeline |
| Install dependencies | Build | Installs npm packages |
| Run tests | Test | Runs a basic smoke test |
| Gitleaks | Security Gate 1 | Scans for hardcoded secrets/API keys |
| Semgrep | Security Gate 2 | Scans source code for dangerous patterns (SAST) |
| npm audit | Security Gate 3 | Scans dependencies for known CVEs (SCA) |

If any security gate fails, the pipeline fails - the build is blocked.

## The 3 vulnerabilities (intentional, for demo purposes)

1. **Hardcoded secret** (`API_KEY` in `index.js`) → caught by Gitleaks + Semgrep
2. **`eval()` on user input** in the `/calc` endpoint → code injection risk → caught by Semgrep
3. **Outdated `lodash` (4.17.15)** in `package.json` → known CVE → caught by `npm audit`

Each is fixed in `index.fixed.js` / `package.fixed.json`, giving a clear
before (pipeline fails) / after (pipeline passes) demo.

## How to demo it

1. Push this repo to GitHub (default branch: `main`).
2. Open the **Actions** tab - the pipeline runs automatically.
3. With `index.js` / `package.json` (vulnerable versions) in place, the
   pipeline **fails** at the Gitleaks, Semgrep, or npm audit step.
4. Replace `app/index.js` → `app/index.fixed.js` content, and
   `app/package.json` → `app/package.fixed.json` content, commit, push.
5. Pipeline **passes** - all 3 security gates green.

## Local testing (optional)

```bash
cd app
npm install
npm test
npm audit
pip install semgrep
semgrep --config=p/security-audit .
```
