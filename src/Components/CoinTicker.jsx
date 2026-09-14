import CryptoIcon from "./CryptoIcon.jsx"

const tickerCoins = [
    { symbol: "BTC", name: "Bitcoin" },
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "SOL", name: "Solana" },
    { symbol: "BNB", name: "BNB" },
    { symbol: "XRP", name: "XRP" },
    { symbol: "ADA", name: "Cardano" },
    { symbol: "AVAX", name: "Avalanche" },
    { symbol: "DOGE", name: "Dogecoin" },
    { symbol: "DOT", name: "Polkadot" },
    { symbol: "LINK", name: "Chainlink" },
    { symbol: "UNI", name: "Uniswap" },
    { symbol: "LTC", name: "Litecoin" },
    { symbol: "ATOM", name: "Cosmos" },
    { symbol: "NEAR", name: "Near" },
    { symbol: "APT", name: "Aptos" },
    { symbol: "ARB", name: "Arbitrum" },
    { symbol: "OP", name: "Optimism" },
    { symbol: "SUI", name: "Sui" },
    { symbol: "PEPE", name: "Pepe" },
    { symbol: "FIL", name: "Filecoin" },
]

function CoinTicker() {
    const repeatedCoins = [...tickerCoins, ...tickerCoins]

    return (
        <div className="coin-ticker" aria-label="Popular cryptocurrencies">
            <div className="ticker-track">
                {repeatedCoins.map((coin, index) => (
                    <div className="ticker-coin" key={`${coin.symbol}-${index}`}>
                        <CryptoIcon symbol={coin.symbol} />
                        <span><strong>{coin.symbol}</strong><small>{coin.name}</small></span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CoinTicker
