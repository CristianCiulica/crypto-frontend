import CryptoIcon from "./CryptoIcon.jsx"

const symbolById = {
    bitcoin: "BTC",
    ethereum: "ETH",
    solana: "SOL",
    binancecoin: "BNB",
    ripple: "XRP",
    cardano: "ADA",
    "avalanche-2": "AVAX",
    dogecoin: "DOGE",
    polkadot: "DOT",
    chainlink: "LINK",
    uniswap: "UNI",
    litecoin: "LTC",
    cosmos: "ATOM",
    near: "NEAR",
    aptos: "APT",
    arbitrum: "ARB",
    optimism: "OP",
    sui: "SUI",
    pepe: "PEPE",
    filecoin: "FIL",
}

function CoinLogo({ coinId }) {
    return <span className="coin-logo"><CryptoIcon symbol={symbolById[coinId] || "BTC"} /></span>
}

export default CoinLogo
