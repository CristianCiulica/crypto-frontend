function CoinCard({ coin }) {
    return (
        <div className="coin-card">
            <h3>{coin.name}</h3>
            <p>{coin.current_price}$</p>
            <p>{coin.market_cap}$</p>
            <p>{coin.price_change_percentage_24h}%</p>
        </div>
    )
}

export default CoinCard