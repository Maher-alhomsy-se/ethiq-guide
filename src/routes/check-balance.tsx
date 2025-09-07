import { useState } from 'react';
import { readContract } from 'thirdweb';

import { toTokens } from 'thirdweb/utils';

import generateUserId from '../utils/generate-user-id';
import useWalletContract from '../hooks/useWalletContract';

const CheckBalance = () => {
  const contract = useWalletContract();

  const [email, setEmail] = useState('');
  const [usdcBalance, setUsdcBalance] = useState('');
  const [ethiqBalance, setEthiqBalance] = useState('');

  async function handleEthiqBalance() {
    if (!email) return;

    const userId = generateUserId(email);

    const balance = await readContract({
      contract,
      method:
        'function getEthiqBalance(bytes32 userId) external view returns (uint256)',
      params: [userId],
    });

    const amount = toTokens(balance, 18);
    setEthiqBalance(amount);
  }

  async function handleUsdcBalance() {
    if (!email) return;

    const userId = generateUserId(email);

    const balance = await readContract({
      contract,
      method:
        'function getUsdcBalance(bytes32 userId) external view returns (uint256)',
      params: [userId],
    });

    const amount = toTokens(balance, 18);
    setUsdcBalance(amount);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen max-w-2xl mx-auto px-10">
      <input
        type="email"
        value={email}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        className="border border-indigo-800 w-full p-3 rounded-full mb-4 text-2xl mt-4"
      />

      <div className="space-y-2 text-center mb-4">
        <p>Ethiq Balance: {ethiqBalance}</p>
        <button onClick={handleEthiqBalance}>Get Ethiq Balance</button>
      </div>

      <div className="space-y-2 text-center">
        <p>Usdc Balance: {usdcBalance}</p>

        <button onClick={handleUsdcBalance}>Get Ethiq Balance</button>
      </div>
    </div>
  );
};

export default CheckBalance;
