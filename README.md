# YieldStream Finance ⚡🌊

[![Stellar Network](https://img.shields.io/badge/Stellar-Testnet-blue.svg)](https://stellar.org)
[![Soroban Smart Contracts](https://img.shields.io/badge/Soroban-Rust-orange.svg)](https://soroban.stellar.org)
[![Next.js App Router](https://img.shields.io/badge/Next.js-14%2F15-black.svg)](https://nextjs.org)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-PostgreSQL-green.svg)](https://orm.drizzle.team)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**YieldStream Finance** is an institutional-grade, real-time token streaming and continuous payment protocol built natively on the **Stellar Network** using **Soroban smart contracts**. 

Rather than relying on legacy lump-sum transfers or manual monthly payouts, YieldStream enables continuous, second-by-second micro-settlement. Capital unlocks linearly per ledger tick, allowing contributors, grantees, and service providers to stream payroll, token vesting schedules, or recurring subscriptions continuously—with zero intermediary risk.

---

## 🎯 What YieldStream Finance Solves

Traditional web3 organizations and traditional enterprises face significant friction in payment distribution:
- **Capital Inefficiency:** Bulk upfront monthly payments lock liquidity and expose organizations to counterparty default.
- **Vesting Complexity:** Custom vesting contracts often require manual claim triggers, creating heavy gas overhead and friction.
- **Lack of Transparency:** Off-chain payroll solutions lack verifiable proof of real-time solvency and continuous delivery.

**YieldStream's Solution:**
1. **Continuous Linear Unlocking:** Once a stream is deployed on-chain, tokens unlock continuously per ledger block. Beneficiaries can withdraw accrued capital at any time.
2. **Non-Custodial & Trustless:** Funds reside inside the Soroban `yieldstream_vault` smart contract and can only be claimed by the designated recipient address.
3. **Instant Proof of Settlement:** Every stream creation, deposit, and withdrawal generates a verifiable Stellar transaction hash backed by backend PostgreSQL indexing.

---

## 🛠️ Complete Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Smart Contracts** | **Rust / Soroban SDK** | WASM-compiled smart contracts executing on Stellar Testnet |
| **Frontend UI** | **Next.js (App Router), Tailwind CSS** | Institutional dark-mode dashboard with real-time feedback |
| **Blockchain SDK** | **`@stellar/stellar-sdk` (v13+)** | Transaction building, `Address` resolution, and `nativeToScVal` serialization |
| **Wallet Layer** | **`@stellar/freighter-api`** | Browser extension integration for SIWS authentication and cryptographic transaction signing |
| **Backend API** | **Next.js Serverless API Routes** | REST endpoints for SIWS verification and database indexing |
| **Database & ORM** | **PostgreSQL & Drizzle ORM** | Type-safe persistence layer using `postgres-js` |
| **Desktop Wrapper** | **Tauri (`versify-desktop`)** | Cross-platform native desktop runtime |

---

## 🏗️ Architecture & System Data Flow

YieldStream connects browser wallet authorization, Soroban RPC execution, and backend database indexing into a unified 4-stage pipeline:

### 1. Wallet Auth & Session (SIWS)
* Users connect via Freighter. The backend (`apps/web/app/api/auth/route.ts`) verifies the wallet public key and upserts the user into `usersTable` using Drizzle ORM.

### 2. Client-Side Simulation & Footprint Calculation
* Before broadcasting a stream transaction, `apps/web/lib/soroban.ts` constructs the `Contract.call` operation.
* The payload is sent to `server.simulateTransaction()` to compute ledger footprints, authorization entries, and exact storage fees.

### 3. Type-Safe `ScVal` Serialization
* `CreateStreamModal.tsx` utilizes `nativeToScVal(BigInt(amount), { type: 'i128' })` and `new Address(recipient).toScVal()` to ensure 100% type-safe 128-bit integer parameter passing into the Rust contract.

### 4. On-Chain Settlement & Off-Chain Indexing
* Freighter signs the assembled XDR. Upon successful broadcast to the Soroban RPC, the contract locks funds, and the transaction hash (`txHash`) is indexed in PostgreSQL for immediate dashboard availability.

---

## 📜 Smart Contract Specification

The core logic is implemented in Rust using the Soroban SDK.

- **Network:** Stellar Testnet (`https://soroban-testnet.stellar.org`)
- **Contract ID:** `CCN6PF4BQ2OVMUWOXZ5GXVJETVWQGZCMA7LEO6YHT7JYG5S4S76TN5CM`

### Primary Contract Interfaces

```rust
// Initialize a new continuous stream
pub fn create_stream(
    env: Env, 
    recipient: Address, 
    amount: i128
) -> u64;

// Beneficiary withdraws currently unlocked tokens
pub fn withdraw(
    env: Env, 
    stream_id: u64
);

// Read current stream state & unvested balance
pub fn get_stream(
    env: Env, 
    stream_id: u64
) -> StreamState;

yieldstream-app/
├── apps/
│   ├── web/                          # Main Web Application & API
│   │   ├── app/
│   │   │   ├── api/auth/route.ts     # SIWS authentication endpoint
│   │   │   ├── layout.tsx            # Global layout & toast providers
│   │   │   └── page.tsx              # Institutional streaming dashboard
│   │   ├── components/
│   │   │   └── CreateStreamModal.tsx # Stream creation modal with scval encoding
│   │   └── lib/
│   │       └── soroban.ts            # Build, simulate, sign, & broadcast RPC pipeline
│   └── desktop/                      # Tauri desktop app wrapper (versify-desktop)
├── db/                               # PostgreSQL Database Configuration
│   ├── index.ts                      # Drizzle ORM client initialization
│   └── schema.ts                     # Database schema definitions
├── contracts/                        # Rust Soroban workspace (yieldstream_vault)
└── package.json                      # Workspaces configuration