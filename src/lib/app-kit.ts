import { base } from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';

const projectId = '218f573f7987430400eac25d58a0ca68';

const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/'],
};

export const appKit = createAppKit({
  metadata,
  projectId,

  networks: [base],
  defaultNetwork: base,
  features: { analytics: true },
  adapters: [new EthersAdapter()],
});
