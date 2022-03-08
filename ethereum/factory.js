import CampaignFactory from './build/CampaignFactory.json';
const { ethers } = require("ethers");
import provider from './web3.js';

const instance = new ethers.Contract(
    '0xDae3430bA3cE8b629E33D2088fcD8FecaEF37957',
    JSON.parse(CampaignFactory.interface),
    provider
);

export default instance;