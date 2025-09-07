import { useState } from 'react';

import { prepareContractCall, toUnits } from 'thirdweb';

import useWalletContract from '../hooks/useWalletContract';
import generateUserId from '../utils/generate-user-id';
import { useSendTransaction } from 'thirdweb/react';

const PayEthiq = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');

  const contract = useWalletContract();

  const { mutateAsync } = useSendTransaction();

  function handlePayEHIQ() {
    const userId = generateUserId(email);

    const value = toUnits(amount, 18);

    const payTx = prepareContractCall({
      contract,
      params: [userId, address, value],
      method:
        'function payEthiq(bytes32 userId, address to, uint256 amount) external',
    });

    mutateAsync(payTx, {
      onSuccess: ({ transactionHash }) => {
        console.log('Success');
        console.log('TX hash | ', transactionHash);
      },
      onError: ({ message }) => {
        console.log('Error');
        console.log(message);
      },
    });
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen max-w-xl mx-auto">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-indigo-800 w-full p-3 rounded-full mb-4 text-2xl"
      />

      <input
        type="text"
        placeholder="Address to send ETHIQ to it"
        onChange={(e) => setAddress(e.target.value)}
        className="border border-indigo-800 w-full p-3 rounded-full mb-4 text-2xl"
      />

      <input
        type="text"
        placeholder="Amount e.g. 50 ETHIQ"
        onChange={(e) => setAmount(e.target.value)}
        className="border border-indigo-800 w-full p-3 rounded-full mb-4 text-2xl"
      />

      <button onClick={handlePayEHIQ}>Pay ETHIQ</button>
    </div>
  );
};

export default PayEthiq;
