# Lending Platform - Commission Quote Simulator

An internal application to capture financial variables, coordinate handshakes safely via API-key headers with a vendor contract, and account for systematic latency or drops.

## 🚀 Getting Started

### 1. Backend API Execution
```bash
cd Backend
npm install
npm run test    # Executes unit test suite verifying computation logic
npm start       # Fires up local server instance at http://localhost:5001
```

### 2. Frontend Launch
```bash
cd Frontend
npm install
npm run dev     # Spawns UI interface portal locally
```

## 🧠 AI Tools Transparency Declaration
* **Boilerplate Construction:** Utilised prompt engineering models to layout configuration maps for the Express middleware router stack and core Jest configuration scripts.
* **Refinement Strategy:** Instructed AI to generate mock dataset boundary variants to systematically map mathematical boundaries for edge-case unit assertions.

## 🛠️ Deliberate Engineering Decisions & Trade-offs
* **Isolated Core Domain Logic:** Extracted formulas into a distinct stateless `quoteEngine` module. This ensures that when the live-coding challenge scales or transitions to active live endpoints, changing dependencies requires minimal architectural adjustment.
* **User-Experience Resiliency Strategy:** Implemented visual retry states and warning callouts if transient errors manifest from the random simulated provider downtime.





commission-quote-app/
├── backend/
│   ├── src/
│   │   ├── middleware/auth.js      # API Key enforcement
│   │   ├── services/quoteEngine.js # Business logic for simulation
│   │   └── server.js               # Port listener
│   ├── tests/
│   │   └── quote.test.js           # Core backend logic tests
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
└── README.md                       # Critical for evaluation criteria
