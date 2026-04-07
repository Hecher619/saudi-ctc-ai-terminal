# CTC AI Terminal: System Architecture

### 🏗️ Technical Stack
* **Runtime:** Node.js 18.x (Serverless)
* **Inference:** Gemini 1.5 Flash-Lite (Optimized for <500ms latency)
* **Security:** Environment-level AES-256 secret masking.
* **Data:** PostgreSQL-ready schema for safety auditing.

### 🚀 Scalability
The system uses an event-driven, stateless architecture. By decoupling the frontend from the serverless backend, we ensure 100% horizontal scalability without manual server management.

