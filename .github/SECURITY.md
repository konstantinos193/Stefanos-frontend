# Security Policy

## Supported Versions

We take security seriously. The following versions of the Stefanos Frontend are currently supported with security updates:

| Version | Supported |
|---|---|
| 1.x (latest) | ✅ Yes |
| < 1.0 | ❌ No |

If you are running an unsupported version, please upgrade. We cannot protect you from the past.

## Reporting a Vulnerability

**Do NOT open a public GitHub issue for security vulnerabilities.** Seriously. Please do not.

Instead, report vulnerabilities privately via email:

📧 **security@smholdings.gr**

### What to Include

- **Description** of the vulnerability
- **Steps to reproduce** (the more detail, the faster we can fix it)
- **Impact assessment** — what could an attacker do with this?
- **Affected components** — which parts of the application are vulnerable?
- **Suggested fix** (optional, but appreciated — we are not too proud to accept help)

### What to Expect

| Timeline | Action |
|---|---|
| **24 hours** | We acknowledge receipt of your report |
| **72 hours** | We provide an initial assessment and severity rating |
| **7 days** | We aim to have a fix in progress for critical issues |
| **30 days** | We aim to have a fix released for non-critical issues |

We will keep you informed throughout the process. If we go quiet, poke us. We probably got distracted by a CSS bug.

## Disclosure Policy

- We follow **coordinated disclosure**. We will work with you to understand and fix the issue before any public disclosure.
- We will credit you in the release notes (unless you prefer to remain anonymous).
- We will not take legal action against researchers who follow this policy in good faith.

## Security Best Practices (For Contributors)

If you are contributing to this project, please keep these in mind:

- **Never commit secrets.** No API keys, tokens, passwords, or connection strings in the codebase. Use environment variables. Always.
- **Validate all input.** On the client. On the server. Trust nothing.
- **Keep dependencies updated.** Run `yarn audit` regularly. Outdated packages are a vulnerability waiting to happen.
- **Use HTTPS everywhere.** No exceptions. It is 2025.
- **Sanitize user-generated content.** XSS is not a relic of the past — it is alive and well and waiting in your `dangerouslySetInnerHTML`.
- **Review authentication flows carefully.** Token handling, session management, and password storage are not places to cut corners.

## Scope

This security policy covers:

- The Stefanos Frontend application (`Stefanos-frontend`)
- Associated configuration files and build scripts
- Client-side authentication and payment flows

This policy does **not** cover:

- Third-party services (Stripe, Leaflet tile providers, etc.)
- The backend API (see the [backend security policy](../stefanos-backend/.github/SECURITY.md))
- Infrastructure and hosting (Render, DNS, etc.)

## Recognition

We appreciate security researchers who help keep this project and its users safe. Responsible disclosure will be acknowledged in our release notes and, if applicable, in a dedicated security advisory.

---

Thank you for helping us keep Stefanos secure. The internet has enough vulnerabilities already.
