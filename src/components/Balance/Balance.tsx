import { FC, useState } from 'react';
import { ethers, JsonRpcSigner } from 'ethers';

import { Button } from '../';
import { makeNum, truncateEthAddress } from '../../utils';
import './balance.scss';

const CONTRACT_ADDRESS = '0x18B2A687610328590Bc8F2e5fEdDe3b582A49cdA';
const abi = [
  {"inputs":[],"name":"currentEpoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}
]

const Balance: FC = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [currentEpoch, setCurrentEpoch] = useState<number | null>(null);

  const connectToMetamask = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const s = await provider.getSigner();
    setSigner(s);
    const b = await provider.getBalance(s.address);
    setBalance(makeNum(b));

    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
    const c = await contract.currentEpoch();
    setCurrentEpoch(ethers.getNumber(c));
  }

  const handleDisconnect = () => {
    setSigner(null);
    setBalance(null);
  }

  return (
    <div className="balance-details">
      { balance && 
        <div className="balance-details__card">
          <div>
            <img width="18" src="https://bscscan.com/assets/bsc/images/svg/logos/token-light.svg?v=24.1.4.0" alt="bnb-logo" />
            <span>{balance} BNB</span>
          </div>

          <div>Pancake Current Epoch: {currentEpoch}</div>
        </div>
      }
      
      { signer?.address ? 
        <Button type="button" className="btn btn--secondary" handleClick={handleDisconnect}>{truncateEthAddress(signer.address)}</Button> :
        <Button type="button" className="btn btn--secondary" handleClick={connectToMetamask}>Connect Wallet</Button>
      }
    </div>
  );
}

export default Balance;
