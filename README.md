# Veklom Sovereign AI Hub & Lockerphycer

Veklom Sovereign AI Hub and Lockerphycer Security Domain — rewritten as a high-performance React application. Governs AI capability, secret and authority keys, isolated execution cells, and industry-specific compliance workflows.

Canonical architectural source: `00_VEKLOM_BIBLE.md`.

## Core Features & Architecture

- **Lockerphycer Security Domain**:
  - Authority Key lifecycle management with deterministic epoch rotation and Ed25519/ECDSA signatures.
  - Zero-Key-Exposure BYOK Vault with AES-256-GCM cipher encryption at rest.
  - Governed Execution Cells: 17-phase FSM lifecycle with Firecracker MicroVM & OS-enforced isolation, hash-chained receipt tracking, and Gnomledger PGL evidence notarization.
  - Real-time threat detection feed for prompt injections, model extraction, and data leaks.

- **Governed Plan Compiler (GPC)**:
  - Natural-language intent compiler converting prompts into governed 5-step pipelines.
  - Automated risk identification and mitigation mapping.
  - Policy requirement attachment (SOC2, HIPAA, EU GDPR, EU AI Act).
  - Deterministic cost breakdown funded via workspace Operating Reserve.

- **LockerSphere Verticals**:
  - **Hospital**: HIPAA, HITECH, HL7/FHIR, real-time PHI safe harbor redaction, 7-year audit retention.
  - **Bank**: PCI-DSS v4.0, SOX Section 404, AML-KYC, SWIFT message security.
  - **Insurance**: Solvency II, IFRS-17, EU AI Act High-Risk, claims fraud scoring.
  - **Content Creator**: DMCA Safe Harbor, deepfake artifact classifier, COPPA, EU DSA.
  - **General Enterprise**: SOC 2 Type II, ISO/IEC 27001:2022, zero-config prompt safety.
  - Interactive simulator with live prompt scrubber and compliance audit digest generation.

- **Workspace Control Plane & Pipelines**:
  - Model Catalog with zero-exposure BYOK providers (OpenAI, Anthropic, Gemini, Mistral, Private vLLM).
  - Tool Hub & Capability Marketplace.
  - 7-Stage Railway-style deployment pipeline with live streaming execution logs.

- **Quantum Context Terminal**:
  - Direct operator CLI emulator (`help`, `status`, `health`, `keys list`, `keys rotate`, `gpc compile`, `cell exec`, `vault list`, `settle`).

- **Operating Reserve & x402 Settlement**:
  - Workspace reserve balance, deposit modal, and SIWE ERC-6492 smart contract treasury verification.

- **120-Agent Autonomous Workforce**:
  - Specialized agents across Security, Operations, Governance, Infrastructure, and Intelligence domains.

## Development & Runtime

- **Runtime**: Node.js 22, React 19, TypeScript, Vite, Tailwind CSS v4.
- **Port**: 3000 (`0.0.0.0:3000`).
- **Dev**: `npm run dev`
- **Build**: `npm run build`
