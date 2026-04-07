# Security Policy

## Supported Versions
Only the latest production deployment at `citc-ai.netlify.app` is supported for security updates.

## Reporting a Vulnerability
At CTC AI, security is a core pillar. If you discover a vulnerability (e.g., Prompt Injection, API Egress, or Token Leakage), please do not open a public issue.

### Disclosure Protocol
1. Email: [Your Email]
2. Response Time: 24-48 Hours for initial triage.
3. Bug Bounty: Recognition in the repository's 'Wall of Fame.'

## Hardening Standards
* **Environment Isolation:** Keys are never stored in-repo.
* **Sanitization:** All LLM inputs are regex-scrubbed for HTML/Script injection.
* **Traceability:** Every request is tagged with a unique UUID for forensic auditing.

