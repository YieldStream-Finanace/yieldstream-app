export interface StreamState {
  recipient: string;
  ratePerSecond: bigint;
  startTime: bigint;
  stopTime: bigint;
  claimedAmount: bigint;
}

export interface YieldStreamConfig {
  rpcUrl: string;
  networkPassphrase: string;
  vaultContractId: string;
}