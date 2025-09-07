import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { AutoConnect, ThirdwebProvider } from 'thirdweb/react';

import { client } from './lib/thrid-web.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThirdwebProvider>
      <AutoConnect client={client} />
      <App />
    </ThirdwebProvider>
  </StrictMode>
);
