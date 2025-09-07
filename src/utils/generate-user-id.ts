import { keccak256, toBytes } from 'thirdweb';

function generateUserId(email: string) {
  const emailBytes = toBytes(email);

  return keccak256(emailBytes);
}

export default generateUserId;
