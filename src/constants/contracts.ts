export const TOKEN_ABI = [
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function decimals() view returns (uint8)',
];

export const WALLET_ABI = [
  'function depositETH(bytes32 userId) external payable',
  'function depositToken(bytes32 userId, uint256 amount) external',
  'function getEthBalance(bytes32 userId) external view returns (uint256)',
  'function getTokenBalance(bytes32 userId) external view returns (uint256)',
];

export const TOKEN_ADDRESS = '0x586086B58c8A1A0f0D4948eC52f073B485066dA1';
export const WALLET_ADDRESS = '0x2e8de5dEba37EE39fEe55B323735b48Aa850D0eC';
