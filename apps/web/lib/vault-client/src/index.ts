import {
  AssembledTransaction,
  Result,
  Spec as ContractSpec,
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
} from "@stellar/stellar-sdk/contract";

import { Contract } from "@stellar/stellar-sdk";

export type Timepoint = u64 | bigint | number;
export type Duration = u64 | bigint | number;

export { Contract };
export * from "@stellar/stellar-sdk";