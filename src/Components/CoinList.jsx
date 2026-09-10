import { useEffect, useState } from 'react'
import CoinCard from "./CoinCard.jsx";

function CoinList() {

    const [coins, setCoins] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/coins")
            .then(response => response.json())
            .then(data=>setCoins(data))
    }, []);

    return (
        <section>
            <h2>Markets</h2>

            {coins.map(coin => (
                <CoinCard coin={coin} />
            ))}
        </section>
    )
}

export default CoinList