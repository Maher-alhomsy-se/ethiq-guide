import { createBrowserRouter, RouterProvider } from 'react-router';

import Home from './routes/home';
import PayUsdc from './routes/pay-usdc';
import RootLayout from './layouts/root';
import PayEthiq from './routes/pay-ethiq';
import DepositUsdc from './routes/deposit-usdc';
import DepositEthiq from './routes/deposit-ethiq';
import CheckBalance from './routes/check-balance';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { element: <Home />, index: true },
        { element: <PayUsdc />, path: 'pay-usdc' },
        { element: <PayEthiq />, path: 'pay-ethiq' },
        { element: <DepositUsdc />, path: 'deposit-usdc' },
        { element: <DepositEthiq />, path: 'deposit-ethiq' },
        { element: <CheckBalance />, path: 'check-balance' },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
