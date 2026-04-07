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
### 💎 System Architecture (The "Edge" Performance)

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Interface** | Termux / Bash | Mobile-First DevOps Environment |
| **Logic Gate** | Netlify Edge (Deno) | Serverless Inference & Security |
| **AI Engine** | Gemini 1.5 Flash | Regulatory Logic & Persona Engine |
| **Security** | Zero-Trust / ENV | API Key Protection & Sanitization |
| **Monitoring** | CLI Diagnostics | Real-time Latency & Trace Tracking |

---

### 🛡️ Core Features
* **Custom Persona Engine:** Injects deep regulatory context into every inference call, specifically tuned for CITC/CST frameworks.
* **Defensive Programming:** Implemented circuit breakers and AbortControllers to handle API spikes and prevent serverless timeouts.
* **Immersive UX:** A "Cyber-Terminal" interface designed for engineers, featuring an authorized entry gate and low-latency feedback.

### 📖 Execution & Diagnostics
To verify the secure uplink to the Netlify production environment:
```bash
node debug.js



🛡️ Core Features
​Custom Persona Engine: Injects deep regulatory context into every inference call.
​Defensive Programming: Handles 503/429 spikes gracefully with structured error packets.
​Immersive UX: A "Cyber-Terminal" interface designed with Tailwind CSS.
