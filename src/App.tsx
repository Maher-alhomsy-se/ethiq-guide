import { useState } from 'react';

import {
  useAppKit,
  useDisconnect,
  type Provider,
  useAppKitAccount,
  useAppKitProvider,
} from '@reown/appkit/react';
import { ethers, keccak256, parseUnits, toUtf8Bytes } from 'ethers';

import './App.css';
import './lib/app-kit';
import {
  TOKEN_ABI,
  WALLET_ABI,
  TOKEN_ADDRESS,
  WALLET_ADDRESS,
} from './constants/contracts';

function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('test@test.com');

  const { open } = useAppKit();
  const { disconnect } = useDisconnect();
  const { isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>('eip155');

  function getUserId(email: string) {
    return keccak256(toUtf8Bytes(email));
  }

  async function handleConnect() {
    await open();
  }

  async function handleDisconnect() {
    await disconnect();
  }

  // 🔑 Approve 500 FALC
  async function handleApprove() {
    if (!walletProvider) return;
    const provider = new ethers.BrowserProvider(walletProvider);
    const signer = await provider.getSigner();

    const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);

    // Approve 500 FALC
    const decimals = await token.decimals();
    const amount = parseUnits('500', decimals);
    console.log('Amount | ', amount);

    setStatus('Approving 500 FALC...');
    const tx = await token.approve(WALLET_ADDRESS, amount);
    await tx.wait();
    setStatus('Approved 500 FALC ✅');
  }

  // 🔑 Deposit 0.0001 ETH
  const handleDepositETH = async () => {
    if (!walletProvider) return;
    const provider = new ethers.BrowserProvider(walletProvider);
    const signer = await provider.getSigner();
    const wallet = new ethers.Contract(WALLET_ADDRESS, WALLET_ABI, signer);

    const userId = getUserId(email);

    setStatus('Depositing 0.0001 ETH...');
    const tx = await wallet.depositETH(userId, {
      value: parseUnits('0.0001', 'ether'),
    });
    await tx.wait();
    setStatus('Deposited 0.0001 ETH ✅');
  };

  // 🔑 Deposit 200 FALC
  const handleDepositToken = async () => {
    if (!walletProvider) return;
    const provider = new ethers.BrowserProvider(walletProvider);
    const signer = await provider.getSigner();
    const wallet = new ethers.Contract(WALLET_ADDRESS, WALLET_ABI, signer);
    const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);

    const decimals = await token.decimals();
    const amount = parseUnits('200', decimals);

    console.log('Amount | ', amount);

    const userId = getUserId(email);

    setStatus('Depositing 200 FALC...');
    const tx = await wallet.depositToken(userId, amount);
    await tx.wait();
    setStatus('Deposited 200 FALC ✅');
  };

  // 🔑 View balances
  const handleCheckBalances = async () => {
    if (!walletProvider) return;
    const provider = new ethers.BrowserProvider(walletProvider);
    const signer = await provider.getSigner();

    const wallet = new ethers.Contract(WALLET_ADDRESS, WALLET_ABI, signer);

    const userId = getUserId(email);
    console.log(userId);

    const ethBal = await wallet.getEthBalance(userId);
    const tokenBal = await wallet.getTokenBalance(userId);

    setStatus(
      `Balances for ${email}: ETH=${ethers.formatEther(
        ethBal
      )}, FALC=${ethers.formatUnits(tokenBal, 18)}`
    );
  };

  return (
    <>
      <h1 className="mb-4"> {isConnected ? 'connected' : 'not connected'}</h1>

      {!isConnected && (
        <button
          onClick={handleConnect}
          className="bg-radial from-sky-800 to-cyan-700"
        >
          Connect with wallet
        </button>
      )}

      {isConnected && (
        <button
          onClick={handleDisconnect}
          className="bg-radial from-red-400 to-red-700"
        >
          Disconnect
        </button>
      )}

      {isConnected && (
        <>
          <div className="space-y-3 mt-3">
            <input
              type="email"
              value={email}
              placeholder="Enter user email"
              className="border p-2 rounded-lg outline-0 border-sky-800"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex gap-2">
              <button
                onClick={handleApprove}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Approve 500 FALC
              </button>

              <button
                onClick={handleDepositETH}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Deposit 0.0001 ETH
              </button>

              <button
                onClick={handleDepositToken}
                className="bg-purple-500 text-white px-3 py-1 rounded"
              >
                Deposit 200 FALC
              </button>

              <button
                onClick={handleCheckBalances}
                className="bg-gray-700 text-white px-3 py-1 rounded"
              >
                Check Balances
              </button>
            </div>

            <p className="mt-4">{status}</p>
          </div>
        </>
      )}
    </>
  );
}

export default App;
