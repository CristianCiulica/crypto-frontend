import CoinLogo from "./CoinLogo.jsx"

function CoinCard({ coin , onSelect}) {
    return (
        <div className="coin-card" onClick={onSelect}>
            <h3><CoinLogo coinId={coin.id} />{coin.name}<span>{coin.symbol.toUpperCase()}</span></h3>
            <p>${coin.current_price.toFixed(2)}</p>
            <p>${formatMarketCap(coin.market_cap)}</p>
            <p className={coin.price_change_percentage_24h >= 0 ? "positive" : "negative"}>
                {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
        </div>
    )
}


function formatMarketCap(value) {
    if (value >= 1_000_000_000_000) return (value / 1_000_000_000_000).toFixed(1) + "T";
    if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1) + "B";
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";
    return value
}
export default CoinCard
