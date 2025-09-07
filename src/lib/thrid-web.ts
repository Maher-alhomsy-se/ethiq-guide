import { createThirdwebClient } from 'thirdweb';

const clientId = import.meta.env.VITE_CLIENT_ID as string;

export const client = createThirdwebClient({ clientId });
