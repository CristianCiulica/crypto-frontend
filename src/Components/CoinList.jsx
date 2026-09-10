import { useEffect, useState } from 'react'

function CoinList() {

    const [coins, setCoins] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/coins")
            .then(response => response.json())
            .then(data=>setCoins(data))
    }, []);
    console.log(coins)
    return (
        <section>
            <h2>Markets</h2>

            {coins.map(coin => (
                <div>
                    {coin.name}
                </div>
            ))}
        </section>
    )
}

export default CoinList