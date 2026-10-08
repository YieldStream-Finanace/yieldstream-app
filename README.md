markdown
# YieldStream Client Application & dApp Monorepo

> Next.js 14 web dApp and client libraries for interacting with the YieldStream protocol on Stellar Soroban.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Freighter](https://img.shields.io/badge/Wallet-Freighter-purple.svg)](https://www.freighter.app/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## Overview

The `yieldstream-app` repository is a Turborepo monorepo housing the end-user Web Application and client-side integration packages. It provides intuitive dashboards for managing real-time streams, monitoring yield earnings, and invoking Soroban transactions via Freighter wallet signatures.

yieldstream-app/
├── apps/
│   └── web/                # Next.js 14 App Router Front-End
│       ├── app/
│       │   ├── page.tsx        # Protocol Landing Page
│       │   ├── create/      # Stream Creation Form & Wallet Flow
│       │   └── dashboard/   # Live Stream Tracker & Yield Monitor
│       └── lib/
│           └── vault-client # Auto-generated Soroban TypeScript SDK
└── packages/               # Shared Utilities & Configurations


---

## Tech Stack & Dependencies

* **Framework**: Next.js 14 (App Router, Server & Client Components)
* **Language**: TypeScript 5.0+ (Configured with `bundler` module resolution for modern SDK support)
* **Styling**: Tailwind CSS
* **Blockchain Interoperability**:
  * `@stellar/stellar-sdk` (Contract calls, transaction builders, XDR parsing)
  * `@stellar/freighter-api` (In-browser non-custodial wallet signatures)

---

## Key Features & User Interface

1. **Stream Provisioning (`/create`)**:
   * Input recipient address (`G...`), deposit amount, and stream duration.
   * Auto-calculates stream rates (XLM/sec or USDC/sec).
   * Direct transaction execution using Freighter wallet signatures.

2. **Real-Time Yield Dashboard (`/dashboard`)**:
   * Live streaming ticker updating balances second-by-second.
   * Total Value Streamed (TVS) metrics and yield accrued statistics.
   * Historical stream event tracking.

---

## Environment Configuration

Create a `.env.local` file inside `apps/web`:

```env
# Stellar Network Settings
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_STELLAR_RPC_URL=[https://soroban-testnet.stellar.org](https://soroban-testnet.stellar.org)

# YieldStream Soroban Vault Contract Address
NEXT_PUBLIC_CONTRACT_ID=CAF5HM647JPZQK6MOVIV2BX5DO4HSAXZEAIRO3OKFDVJUVENMYFDE7VW
Getting Started
1. Install Dependencies
From the repository root:

Bash
npm install
2. Run Local Development Server
Bash
npm run dev
Open http://localhost:3000 with your browser.

3. Build for Production
To perform a complete type check and compile static/dynamic routes:

Bash
cd apps/web
npm run build