import CryptoIcon from "./CryptoIcon.jsx"

function CoinLogo({ coinId }) {
    const symbolById = {
        bitcoin: "BTC",
        ethereum: "ETH",
        solana: "SOL",
    }

    return <span className="coin-logo"><CryptoIcon symbol={symbolById[coinId] || "BTC"} /></span>
}

export default CoinLogo
