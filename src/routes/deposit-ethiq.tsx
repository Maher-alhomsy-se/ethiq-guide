import { useState } from 'react';

import { approve } from 'thirdweb/extensions/erc20';
import { prepareContractCall, toUnits } from 'thirdweb';
import { useActiveAccount, useSendTransaction } from 'thirdweb/react';

import useEthiqContract from '../hooks/useEthiqContract';
import useWalletContract from '../hooks/useWalletContract';
import generateUserId from '../utils/generate-user-id';

const spender = '0xAcDf5E2DF38986624bA364eDCB20581B93Cfa00d';

const DepositEthiq = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');

  const { mutateAsync } = useSendTransaction();

  const ethiqContract = useEthiqContract();
  const activeAccount = useActiveAccount();
  const walletContract = useWalletContract();

  async function handleDeposit() {
    if (!activeAccount) return;
    if (!amount || isNaN(Number(amount))) return;

    try {
      const approveTx = approve({ contract: ethiqContract, spender, amount });

      await mutateAsync(approveTx);
      console.log('✅ Approved');

      const value = toUnits(amount, 18);
      const userId = generateUserId(email);

      const depositTx = prepareContractCall({
        params: [userId, value],
        contract: walletContract,
        method:
          'function depositEthiq(bytes32 userId, uint256 amount) external',
      });

      await mutateAsync(depositTx);
      console.log('✅ Deposited');
    } catch (error) {
      console.error(
        '❌ Deposit flow error:',
        (error as Error)?.message || error
      );
    }
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
        placeholder="ETHIQ amount e.g. 350"
        onChange={(e) => setAmount(e.target.value)}
        className="border border-indigo-800 w-full p-3 rounded-full mb-4 text-2xl"
      />

      <button onClick={handleDeposit}>Deposit ETHIQ</button>
    </div>
  );
};

export default DepositEthiq;
