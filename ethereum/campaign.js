import { ethers } from 'ethers';
import Campaign from './build/Campaign.json';
import provider from './web3.js';

const namedCampaign = (address) => {
    return new ethers.Contract(
        address,
        JSON.parse(Campaign.interface),
        provider
    );
};

export default namedCampaign;