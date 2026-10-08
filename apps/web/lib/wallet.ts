import {
  isConnected,
  requestAccess,
  getAddress,
} from "@stellar/freighter-api";

// Helper timeout to prevent UI hang if extension fails to respond
function withTimeout<T>(promise: Promise<T>, ms: number = 2500): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("Freighter response timed out")), ms)
    ),
  ]);
}

export async function connectFreighterWallet(): Promise<string | null> {
  try {
    // Check if window.freighter exists or if API is connected
    const connected = await withTimeout(isConnected(), 2000).catch(() => false);
    if (!connected) {
      alert("Freighter wallet extension not detected or unlocked. Please open your browser extension to unlock it.");
      return null;
    }

    // Attempt direct address retrieval
    const addrObj = await withTimeout(getAddress(), 2500).catch(() => null);
    if (addrObj?.address) {
      return addrObj.address;
    }

    // Fallback to explicit access request
    const accessObj = await withTimeout(requestAccess(), 3000).catch(() => null);
    if (accessObj?.address) {
      return accessObj.address;
    }

    alert("Failed to retrieve public key from Freighter. Please ensure the extension popup is accepted.");
    return null;
  } catch (err) {
    console.error("Freighter Connection Error:", err);
    alert("Connection request timed out or was rejected in Freighter.");
    return null;
  }
}