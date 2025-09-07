import { getContract } from 'thirdweb';
import { base } from 'thirdweb/chains';

import { client } from '../lib/thrid-web';

const useWalletContract = () => {
  const address = '0xAcDf5E2DF38986624bA364eDCB20581B93Cfa00d';

  const contract = getContract({ client, address, chain: base });

  return contract;
};

export default useWalletContract;
