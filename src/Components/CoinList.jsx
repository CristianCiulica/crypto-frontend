import { useEffect, useState } from 'react'
import CoinCard from "./CoinCard.jsx";

function CoinList() {

    const [coins, setCoins] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/coins")
            .then(response => response.json())
            .then(data=>setCoins(data))
    }, []);

    return (<>
        <h2>Markets</h2>
        <section className="coin-list">
            {coins.map(coin => (<CoinCard coin={coin} />))}
        </section>
        </>
    )
}

export default CoinList