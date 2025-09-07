import { useRef, useState } from 'react';

import {
  type Provider,
  useAppKitAccount,
  useAppKitProvider,
} from '@reown/appkit/react';
import { ethers } from 'ethers';

import { WALLET_ABI, WALLET_ADDRESS } from '../constants/contracts';

const PayFunction = () => {
  const { isConnected, address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>('eip155');

  const [loading, setLoading] = useState(false);
  const amountRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  async function handlePay() {
    try {
      if (!isConnected || !address) return;

      const amount = amountRef.current?.value;
      const receiver = addressRef.current?.value;

      if (!receiver || !amount) return;

      setLoading(true);

      const provider = new ethers.BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(WALLET_ADDRESS, WALLET_ABI, signer);

      console.log(contract);

      contract.pay();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mt-7">
      <h1>Pay Function</h1>

      <div className="mt-4 flex flex-col gap-y-3 mb-3">
        <input
          type="text"
          ref={addressRef}
          className="p-3 border border-cyan-700 rounded-full"
          placeholder="receiver address"
        />
        <input
          type="text"
          ref={amountRef}
          className="p-3 border border-cyan-700 rounded-full"
          placeholder="amount to send"
        />
      </div>

      <button onClick={handlePay} disabled={loading} className="w-full">
        Send
      </button>
    </div>
  );
};

export default PayFunction;
