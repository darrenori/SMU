# Security policy

IKEBOT is deliberately designed as a zero-permission, local-first Chrome extension. The published prototype makes no network requests and includes no credentials, telemetry or remote code.

## Reporting a concern

Do not open a public issue containing client information, credentials or an exploitable proof of concept. Contact the repository owner privately with:

- the affected version and browser;
- a concise description of the issue;
- reliable reproduction steps;
- the likely impact; and
- any suggested mitigation.

## Supported version

Security fixes are applied to the latest version on the default branch. Historical hackathon code is not maintained separately.

## Security boundaries

Local browser storage is convenient, not a substitute for a law firm's document-management system. Anyone with access to the same unlocked browser profile may be able to inspect locally saved matter labels and conversation history. Do not enter secrets or information that is unnecessary for the workflow.
