import { ethers } from 'ethers';

export const makeNum = (value: bigint): string => {
  const numStr = ethers.formatUnits(value, 18);
  return numStr.substring(0, numStr.indexOf('.') + 4); // keep only 2 decimals
};
