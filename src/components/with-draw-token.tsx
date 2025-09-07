import { useState, type ChangeEvent } from 'react';

import { ethers, keccak256, parseUnits, toUtf8Bytes } from 'ethers';
import { useAppKitProvider, type Provider } from '@reown/appkit/react';

import { WALLET_ABI, WALLET_ADDRESS } from '../constants/contracts';

const WithDrawToken = () => {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');

  const { walletProvider } = useAppKitProvider<Provider>('eip155');

  async function handleWithdraw() {
    const parsedAmount = parseUnits(amount);
    // parseUnits('0.0001', 'ether'),

    const userId = keccak256(toUtf8Bytes('test@test.com'));

    console.log(userId);

    if (!walletProvider) return;
    const provider = new ethers.BrowserProvider(walletProvider);
    const signer = await provider.getSigner();
    const wallet = new ethers.Contract(WALLET_ADDRESS, WALLET_ABI, signer);

    const tx = await wallet.withdrawToken(userId, address, parsedAmount);
    await tx.wait();
  }

  function handleChangeAddress(e: ChangeEvent<HTMLInputElement>) {
    setAddress(e.target.value);
  }

  function handleChangeAmount(e: ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value);
  }

  return (
    <div className="mt-6 flex flex-col">
      <h2 className="mb-4">With draw token</h2>

      <input
        type="text"
        value={address}
        placeholder="address"
        onChange={handleChangeAddress}
        className="p-4 border rounded-full border-cyan-400"
      />

      <input
        type="text"
        value={amount}
        placeholder="amount"
        onChange={handleChangeAmount}
        className="p-4 border rounded-full border-cyan-400 my-5"
      />

      <button onClick={handleWithdraw}>with draw</button>
    </div>
  );
};

export default WithDrawToken;
