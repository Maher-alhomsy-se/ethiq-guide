import { getContract } from 'thirdweb';
import { base } from 'thirdweb/chains';

import { client } from '../lib/thrid-web';

const useEthiqContract = () => {
  const address = '0x586086B58c8A1A0f0D4948eC52f073B485066dA1';

  const contract = getContract({ client, address, chain: base });

  return contract;
};

export default useEthiqContract;
