import { useState } from 'react';

// import { approve } from 'thirdweb/extensions/erc20';
import { prepareContractCall, toUnits } from 'thirdweb';
import { useActiveAccount, useSendTransaction } from 'thirdweb/react';

import useUsdcContract from '../hooks/useUsdcContract';
import generateUserId from '../utils/generate-user-id';
import useWalletContract from '../hooks/useWalletContract';

const DepositUsdc = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');

  const activeAccount = useActiveAccount();
  const { mutateAsync } = useSendTransaction();

  const usdcContarct = useUsdcContract();
  const walletContract = useWalletContract();

  async function handleDeposit() {
    if (!activeAccount) return;
    const value = toUnits(amount, 18);

    const approveTx = prepareContractCall({
      contract: usdcContarct,
      params: ['0xAcDf5E2DF38986624bA364eDCB20581B93Cfa00d', value],
      method:
        'function approve(address spender, uint256 amount) public returns (bool)',
    });

    // const transaction = approve({
    //   amount,
    //   contract: usdcContarct,
    //   spender: '0xAcDf5E2DF38986624bA364eDCB20581B93Cfa00d',
    // });

    await mutateAsync(approveTx, {
      onSuccess: () => {
        console.log('Approved');
      },
      onError: ({ message }) => {
        console.log('Approve error');
        console.log(message);
      },
    });

    // const value = toUnits(amount, 18);
    const userId = generateUserId(email);

    const depositTx = prepareContractCall({
      params: [userId, value],
      contract: walletContract,
      method: 'function depositUsdc(bytes32 userId, uint256 amount) external',
    });

    await mutateAsync(depositTx, {
      onSuccess: () => {
        console.log('✅ Deposited');
      },
      onError: ({ message }) => {
        console.log('Deposit error');
        console.log(message);
      },
    });
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen max-w-xl mx-auto">
      <p className="text-xl text-center mb-6 underline">
        Note: email field just for testing purposes to generate user Id. in
        production we will generate userId via wallet address
      </p>

      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border border-indigo-800 w-full p-3 rounded-full mb-4 text-2xl"
      />

      <input
        type="text"
        value={amount}
        placeholder="USDC amount e.g. 350"
        onChange={(e) => setAmount(e.target.value)}
        className="border border-indigo-800 w-full p-3 rounded-full mb-4 text-2xl"
      />

      <button onClick={handleDeposit}>Deposit USDC</button>
    </div>
  );
};

export default DepositUsdc;
