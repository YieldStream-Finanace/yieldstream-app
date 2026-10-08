import { Buffer } from "buffer";
import { Address } from "@stellar/stellar-sdk";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from "@stellar/stellar-sdk/contract";
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Timepoint,
  Duration,
} from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";

if (typeof window !== "undefined") {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}




export const ContractError = {
  1: {message:"AlreadyInitialized"},
  2: {message:"NotInitialized"},
  3: {message:"InvalidTimeRange"},
  4: {message:"ZeroAmount"},
  5: {message:"StreamNotFound"},
  6: {message:"StreamAlreadyExists"},
  7: {message:"Unauthorized"},
  8: {message:"NothingToClaim"}
}

export type DataKey = {tag: "Admin", values: void} | {tag: "Asset", values: void} | {tag: "Stream", values: readonly [string]} | {tag: "TotalAllocated", values: void};


export interface StreamState {
  claimed_amount: i128;
  rate_per_second: i128;
  recipient: string;
  start_time: u64;
  stop_time: u64;
}

export interface Client {
  /**
   * Construct and simulate a withdraw transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  withdraw: ({recipient}: {recipient: string}, options?: MethodOptions) => Promise<AssembledTransaction<Result<i128>>>

  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  initialize: ({admin, asset}: {admin: string, asset: string}, options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a cancel_stream transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  cancel_stream: ({sender, recipient}: {sender: string, recipient: string}, options?: MethodOptions) => Promise<AssembledTransaction<Result<i128>>>

  /**
   * Construct and simulate a create_stream transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_stream: ({sender, recipient, amount, start_time, stop_time}: {sender: string, recipient: string, amount: i128, start_time: u64, stop_time: u64}, options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a get_claimable transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_claimable: ({recipient}: {recipient: string}, options?: MethodOptions) => Promise<AssembledTransaction<i128>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAAAAAAAAAAAId2l0aGRyYXcAAAABAAAAAAAAAAlyZWNpcGllbnQAAAAAAAATAAAAAQAAA+kAAAALAAAH0AAAAA1Db250cmFjdEVycm9yAAAA",
        "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAgAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAVhc3NldAAAAAAAABMAAAABAAAD6QAAA+0AAAAAAAAH0AAAAA1Db250cmFjdEVycm9yAAAA",
        "AAAAAAAAAAAAAAANY2FuY2VsX3N0cmVhbQAAAAAAAAIAAAAAAAAABnNlbmRlcgAAAAAAEwAAAAAAAAAJcmVjaXBpZW50AAAAAAAAEwAAAAEAAAPpAAAACwAAB9AAAAANQ29udHJhY3RFcnJvcgAAAA==",
        "AAAAAAAAAAAAAAANY3JlYXRlX3N0cmVhbQAAAAAAAAUAAAAAAAAABnNlbmRlcgAAAAAAEwAAAAAAAAAJcmVjaXBpZW50AAAAAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAAAAAApzdGFydF90aW1lAAAAAAAGAAAAAAAAAAlzdG9wX3RpbWUAAAAAAAAGAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAANQ29udHJhY3RFcnJvcgAAAA==",
        "AAAAAAAAAAAAAAANZ2V0X2NsYWltYWJsZQAAAAAAAAEAAAAAAAAACXJlY2lwaWVudAAAAAAAABMAAAABAAAACw==",
        "AAAABAAAAAAAAAAAAAAADUNvbnRyYWN0RXJyb3IAAAAAAAAIAAAAAAAAABJBbHJlYWR5SW5pdGlhbGl6ZWQAAAAAAAEAAAAAAAAADk5vdEluaXRpYWxpemVkAAAAAAACAAAAAAAAABBJbnZhbGlkVGltZVJhbmdlAAAAAwAAAAAAAAAKWmVyb0Ftb3VudAAAAAAABAAAAAAAAAAOU3RyZWFtTm90Rm91bmQAAAAAAAUAAAAAAAAAE1N0cmVhbUFscmVhZHlFeGlzdHMAAAAABgAAAAAAAAAMVW5hdXRob3JpemVkAAAABwAAAAAAAAAOTm90aGluZ1RvQ2xhaW0AAAAAAAg=",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABAAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAAFQXNzZXQAAAAAAAABAAAAAAAAAAZTdHJlYW0AAAAAAAEAAAATAAAAAAAAAAAAAAAOVG90YWxBbGxvY2F0ZWQAAA==",
        "AAAAAQAAAAAAAAAAAAAAC1N0cmVhbVN0YXRlAAAAAAUAAAAAAAAADmNsYWltZWRfYW1vdW50AAAAAAALAAAAAAAAAA9yYXRlX3Blcl9zZWNvbmQAAAAACwAAAAAAAAAJcmVjaXBpZW50AAAAAAAAEwAAAAAAAAAKc3RhcnRfdGltZQAAAAAABgAAAAAAAAAJc3RvcF90aW1lAAAAAAAABg==" ]),
      options
    )
  }
  public readonly fromJSON = {
    withdraw: this.txFromJSON<Result<i128>>,
        initialize: this.txFromJSON<Result<void>>,
        cancel_stream: this.txFromJSON<Result<i128>>,
        create_stream: this.txFromJSON<Result<void>>,
        get_claimable: this.txFromJSON<i128>
  }
}