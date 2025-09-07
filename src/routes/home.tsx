import { base } from 'thirdweb/chains';
import { ConnectButton } from 'thirdweb/react';

import { client } from '../lib/thrid-web';

const Home = () => {
  return (
    <>
      <ConnectButton
        autoConnect
        chain={base}
        client={client}
        detailsButton={{ className: '!mt-4' }}
        connectButton={{ className: '!mt-4 bg-red-500' }}
      />
    </>
  );
};

export default Home;
