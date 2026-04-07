![License](https://img.shields.io/github/license/Hecher619/saudi-ctc-ai-terminal?color=gold)
![Version](https://img.shields.io/badge/version-1.1.0-blue)
![Deployment](https://img.shields.io/badge/deployment-Netlify-00C7B7)
![Environment](https://img.shields.io/badge/environment-Termux%20Linux-orange)

# 🇸🇦 Saudi CTC AI Specialist Terminal (V1.1.0)

### 🚀 Overview
An immersive, production-ready AI gateway engineered for the Saudi telecommunications regulatory landscape. This terminal leverages the Gemini-1.5-Flash model to provide high-fidelity "specialist" responses aligned with CITC/CST frameworks.

### 🛠️ Technical Architecture (The "Senior" Stack)
* **Environment:** Developed 100% within a mobile-only environment using **Termux** on Android to demonstrate extreme portability and resource-efficient DevOps.
* **Backend:** Node.js Serverless functions deployed via **Netlify**, isolating business logic from the client.
* **Security:** Implemented **Zero-Trust** secret management. API keys are handled via server-side environment variables.
* **Observability:** Built a custom CLI diagnostic suite (`debug.js`) for real-time API health monitoring and payload validation.
### 🗺️ System Data Flow (The "Edge" Pipeline)

```mermaid
graph TD
    A[User Terminal] -->|Secure Request| B(Netlify Edge Function)
    B -->|Sanitization & Trace ID| C(Persona Engine)
    C -->|Authorized Payload| D[Gemini 1.5 Flash API]
    D -->|AI Inference| C
    C -->|Metadata Injection| B
    B -->|Response + Latency Log| A
    B -.->|Async
 Logging| E[(Audit Database Schema)]


🛡️ Core Features
​Custom Persona Engine: Injects deep regulatory context into every inference call.
​Defensive Programming: Handles 503/429 spikes gracefully with structured error packets.
​Immersive UX: A "Cyber-Terminal" interface designed with Tailwind CSS.
