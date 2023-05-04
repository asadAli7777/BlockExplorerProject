import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useState } from "react";
import './App.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [address, setAddress] = useState("");
  const [addressBalance, setAddressBalance] = useState(null);
  const [blockNumber,setBlockNumber] = useState();
  const onInputChange = (e) => {
    setAddress(e.target.value);
  };

  const getBalance = async () => {
    const response = await alchemy.core.getBalance(address);
    setAddressBalance(Utils.formatEther(response.toString()));
  };
  const getLatestBlockNumber = async()=>{
    const blockNUmber = await alchemy.core.getBlockNumber();
    setBlockNumber(blockNUmber);
  }
  return (
    <div>
      <div className="balance">
        <h1>Get ETH Balance</h1>
        <div>
          <input type="text" onChange={onInputChange} />
        </div>
        <div className="btn">
          <button className="button-20" onClick={getBalance}>Get Balance</button>
          {addressBalance && <p>{addressBalance} ETH</p>}
        </div>
        <button className="button-20" onClick={getLatestBlockNumber}>Get Latest Block </button> <br />
          CurrentBlockNumber: {blockNumber}
      </div>
    </div>
  );
}

export default App;
