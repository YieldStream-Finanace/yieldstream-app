import { Contract, rpc, scValToNative, Address } from "@stellar/stellar-sdk";
import { StreamState, YieldStreamConfig } from "./types";

export class YieldStreamClient {
  private server: rpc.Server;
  private contract: Contract;

  constructor(config: YieldStreamConfig) {
    this.server = new rpc.Server(config.rpcUrl);
    this.contract = new Contract(config.vaultContractId);
  }

  async getClaimable(recipientAddress: string): Promise<bigint> {
    const tx = this.contract.call("get_claimable", new Address(recipientAddress).toScVal());
    const response = await this.server.simulateTransaction(tx);
    
    if (rpc.Api.isSimulationSuccess(response) && response.result) {
      return BigInt(scValToNative(response.result.retval));
    }
    return 0n;
  }
}