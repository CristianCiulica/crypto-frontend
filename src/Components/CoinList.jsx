import { useEffect, useState } from 'react'
import CoinCard from "./CoinCard.jsx";

function CoinList() {

    const [coins, setCoins] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [priceHistory, setPriceHistory] = useState([]);

    useEffect(() => {
        if (!selectedCoin) {
            return;
        }

        fetch("http://localhost:8080/api/coins/" + selectedCoin.id + "/history?days=7")
            .then(response => response.json())
            .then(data => setPriceHistory(data))

    }, [selectedCoin]);


    useEffect(() => {
        fetch("http://localhost:8080/api/coins")
            .then(response => response.json())
            .then(data=>setCoins(data))
    }, []);

    return (<>
            <div className="markets-header">
                <div>
                    <h2>Markets</h2>
                    <p>Track cryptocurrency prices and market performance</p>
                </div>
            </div>

            <section className="coin-list">
            {coins.map(coin => (<CoinCard
                key={coin.id}
                coin={coin}
                onSelect={() => setSelectedCoin(coin)}
            />))}
            </section>

            {selectedCoin && (
                <div className="selected-coin">
                    <h2>{selectedCoin.name}</h2>
                    <p>${selectedCoin.current_price.toFixed(2)}</p>
                </div>
            )}
        </>
    )
}

export default CoinList