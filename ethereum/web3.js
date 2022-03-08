import { ethers } from 'ethers';

let provider;
let signer;

if (typeof window !== 'undefined') { 
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
} 
    else {
    //We are in the server and no metamask
    provider = new ethers.providers.JsonRpcProvider(
        'https://rinkeby.infura.io/v3/dcb3c7b7564346749303aca1e364fd8b');
};


export default provider;