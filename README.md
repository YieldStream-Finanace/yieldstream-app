# YieldStream Client Application & dApp Monorepo

> Production Web Application and TypeScript client infrastructure for the YieldStream protocol on Stellar Soroban.

[![Live Application](https://img.shields.io/badge/Live_dApp-Vercel-000000.svg?style=for-the-badge&logo=vercel)](https://yieldstream-app.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black.svg?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Stellar Soroban](https://img.shields.io/badge/Stellar-Soroban-purple.svg?style=for-the-badge&logo=stellar)](https://stellar.org/soroban)
[![Freighter](https://img.shields.io/badge/Wallet-Freighter-7C3AED.svg?style=for-the-badge)](https://www.freighter.app/)

---

## 🌐 Live Application & Contract Information

* **Live Production Web dApp**: [https://yieldstream-app.vercel.app](https://yieldstream-app.vercel.app)
* **Smart Contracts Repository**: [YieldStream-Finanace/yieldstream-contract](https://github.com/YieldStream-Finanace/yieldstream-contract)
* **Stellar Testnet Contract ID**: `CAF5HM647JPZQK6MOVIV2BX5DO4HSAXZEAIRO3OKFDVJUVENMYFDE7VW`

---

## 📌 Architecture Overview

`yieldstream-app` is built as a scalable Turborepo monorepo containing the end-user Web Application and client-side integration bindings. It enables non-custodial continuous payment streaming over Soroban with real-time interest accrued from underlying liquidity vaults.

```text
yieldstream-app/
├── apps/
│   └── web/                   # Next.js 14 App Router Front-End
│       ├── app/
│       │   ├── page.tsx       # Protocol Landing Page & Core Value Prop
│       │   ├── create/        # Stream Provisioning & Contract Invocation
│       │   ├── dashboard/     # Real-Time Balance Ticker & Yield Monitor
│       │   └── layout.tsx     # Global Providers, Navigation & Theme Layout
│       ├── lib/
│       │   ├── wallet.ts      # Freighter API Integration Utilities
│       │   └── vault-client/  # Soroban Auto-generated TypeScript Bindings
│       ├── postcss.config.js  # PostCSS Pipeline Config
│       ├── tailwind.config.js # Tailwind Design System System Configuration
│       └── tsconfig.json      # Modern ES2020/Next.js Compiler Configuration
└── packages/                  # Shared Workspace Utilities & Configs
```
## 🚀 Key Features & Interface Modules
Protocol Landing Page (/):

Comprehensive overview of protocol mechanics, active testnet contract addresses, and entry points into the streaming interface.

Stream Provisioning (/create):

Parameter Specification: Input recipient address (G...), deposit token amounts (XLM/USDC), and exact block-timestamp stream durations.

Real-time Flow Estimation: Automatically calculates per-second vesting rates before transaction submission.

Soroban Execution: Constructs and signs Soroban invocation transactions natively using the Freighter wallet extension.

Real-Time Yield Dashboard (/dashboard):

Live Balance Ticker: Microsecond-accurate client-side balance ticker reflecting unlocked tokens and continuous interest generation.

Vault Metrics: Complete visibility over Total Value Streamed (TVS), total yield accrued, and claimable stream balances.

Stream Controls: Execution prompts for claiming unlocked tokens or initiating stream cancellations.

🛠️ Tech Stack & Dependencies
Framework: Next.js 14 (App Router using Server & Client Components)

Language & Compiler: TypeScript 5.0+ (ES2020 target, bundler module resolution)

Styling & UI: Tailwind CSS, PostCSS, Autoprefixer

Blockchain Interoperability:

@stellar/stellar-sdk — Soroban RPC communication, XDR encoding/decoding, and transaction envelope building.

@stellar/freighter-api — In-browser non-custodial key management and transaction signing.

Hosting & Pipeline: Vercel CI/CD Production Environment

## ⚙️ Environment Configuration
To run the application locally or connect to custom RPC nodes, create a .env.local file inside apps/web:

#### Code snippet
##### Stellar Soroban RPC Network Settings
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_STELLAR_RPC_URL=[https://soroban-testnet.stellar.org](https://soroban-testnet.stellar.org)

##### Deployed YieldStream Soroban Vault Contract Address
NEXT_PUBLIC_CONTRACT_ID=CAF5HM647JPZQK6MOVIV2BX5DO4HSAXZEAIRO3OKFDVJUVENMYFDE7VW
💻 Local Setup & Development
1. Install Workspace Dependencies
Run from the root of the repository:

Bash
npm install
2. Launch Local Development Server
Start the Next.js development server:

Bash
cd apps/web
npm run dev
Navigate to http://localhost:3000 in your browser. Ensure the Freighter Wallet Browser Extension is installed and set to Test Network.

3. Production Build & Validation
To run TypeScript validation and execute a local static production build:

Bash
cd apps/web
npm run build
📄 License
Distributed under the MIT License. See LICENSE for full terms.