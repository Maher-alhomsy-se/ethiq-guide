import { getContract } from 'thirdweb';
import { base } from 'thirdweb/chains';

import { client } from '../lib/thrid-web';

const useUsdcContract = () => {
  const address = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

  const contract = getContract({ client, address, chain: base });

  return contract;
};

export default useUsdcContract;
