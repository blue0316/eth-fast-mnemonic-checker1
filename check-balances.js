const { ethers } = require('ethers');
const fs = require('fs');

// Read the wallet addresses and private keys from hits.txt
const data = fs.readFileSync('hits.txt', 'utf8');
const lines = data.trim().split('\n');

// Extract wallet addresses
const wallets = lines.map(line => line.split(',')[0]);

// Connect to an Ethereum provider (e.g., Infura or Alchemy)
const provider = new ethers.providers.InfuraProvider('mainnet', 'e73a3477a2de421b885b893af0229e0a');

async function checkBalances() {
    for (const wallet of wallets) {
        try {
            // Get the balance of the wallet address
            const balance = await provider.getBalance(wallet);
            // Convert balance from Wei to Ether
            const etherString = ethers.utils.formatEther(balance);
            console.log(`Address: ${wallet}, Balance: ${etherString} ETH`);

            // Check if balance is greater than 0
            if (parseFloat(etherString) > 0) {
                // Append the winner to winner.txt
                fs.appendFileSync('winner.txt', `${wallet}\n`, 'utf8');
                console.log(`Address ${wallet} with balance ${etherString} ETH has been added to winner.txt`);
            }
        } catch (error) {
            console.error(`Error fetching balance for ${wallet}:`, error);
        }
    }
}

checkBalances();
