import { 
  rpc, 
  xdr, 
  TransactionBuilder, 
  Networks,
  Contract // <-- Import Contract directly from package root
} from '@stellar/stellar-sdk';
import { getAddress, signTransaction } from '@stellar/freighter-api';

const SOROBAN_RPC_URL = 'https://soroban-testnet.stellar.org';
const CONTRACT_ID = 'CCN6PF4BQ2OVMUWOXZ5GXVJETVWQGZCMA7LEO6YHT7JYG5S4S76TN5CM';
const server = new rpc.Server(SOROBAN_RPC_URL);

/**
 * Build, simulate, sign via Freighter, and broadcast a Soroban contract invocation
 */
export async function invokeSorobanContract(
  methodName: string, 
  args: xdr.ScVal[]
): Promise<string> {
  try {
    // 1. Get the connected public key from Freighter
    const addressResp = await getAddress();
    const publicKey = typeof addressResp === 'string' ? addressResp : addressResp?.address;

    if (!publicKey) {
      throw new Error('Freighter wallet not connected or unlocked.');
    }

    // 2. Load account details from Soroban Testnet RPC
    const account = await server.getAccount(publicKey);

    // 3. Define the contract call operation using Contract class
    const contract = new Contract(CONTRACT_ID);
    const operation = contract.call(methodName, ...args);

    // 4. Build the base transaction
    const tx = new TransactionBuilder(account, {
      fee: '100000', // Standard testnet fee
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(operation)
      .setTimeout(30)
      .build();

    console.log(`Simulating transaction for contract ${CONTRACT_ID} [Method: ${methodName}]...`);

    // 5. Simulate transaction to calculate resource footprint and fees
    const simulation = await server.simulateTransaction(tx);

    if ('error' in simulation && simulation.error) {
      throw new Error(`Soroban simulation failed: ${simulation.error}`);
    }

    // 6. Assemble the transaction with simulation results
    const assembledTx = rpc.assembleTransaction(tx, simulation).build();

    console.log('Requesting signature from Freighter wallet...');

    // 7. Request signature from the user's Freighter extension
    const txXdr = assembledTx.toXDR();
    const signResult = await signTransaction(txXdr, {
      networkPassphrase: Networks.TESTNET,
      address: publicKey,
    });

    if ('error' in signResult && signResult.error) {
      throw new Error(`Signing rejected or failed: ${signResult.error}`);
    }

    const signedTxXdr = signResult.signedTxXdr;

    console.log('Broadcasting signed transaction to Soroban Testnet RPC...');

    // 8. Submit the signed transaction to the network
    const sendResult = await server.sendTransaction(
      TransactionBuilder.fromXDR(signedTxXdr, Networks.TESTNET)
    );

    if (sendResult.status === 'ERROR') {
      throw new Error(`Transaction broadcast failed: ${JSON.stringify(sendResult.errorResult)}`);
    }

    console.log(`Transaction successful! Hash: ${sendResult.hash}`);
    return sendResult.hash;

  } catch (error) {
    console.error('Soroban transaction pipeline error:', error);
    throw error;
  }
}