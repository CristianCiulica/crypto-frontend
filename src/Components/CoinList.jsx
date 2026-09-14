import { useEffect, useState } from 'react'
import { CartesianGrid, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"
import CoinCard from "./CoinCard.jsx";

function CoinList() {

    const [coins, setCoins] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [priceHistory, setPriceHistory] = useState([]);

    useEffect(() => {
        if (!selectedCoin) {
            return;
        }

        fetch("http://localhost:8080/api/coins/" + selectedCoin.id + "/history?days=60")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setPriceHistory(data)
            })

    }, [selectedCoin]);


    useEffect(() => {
        fetch("http://localhost:8080/api/coins?ids=bitcoin,ethereum,solana")
            .then(response => response.json())
            .then(data=>setCoins(data))
    }, []);

    return (<>
            <div className="markets-header">
                <div>
                    <span className="dashboard-label">MARKET DASHBOARD</span>
                    <h2>Popular coins</h2>
                    <p>A simple view of the coins people are watching today.</p>
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

            <div className="chart-container">
                <div className="chart-heading">
                    <div>
                        <span>PRICE HISTORY</span>
                        <strong>Last 7 days</strong>
                    </div>
                    <span className="chart-live"><i /> Live</span>
                </div>
                <LineChart width={800} height={400} data={priceHistory}>
                    <CartesianGrid vertical={false} stroke="#f0f2f4" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} minTickGap={30} tickFormatter={(value) => new Date(Number(value)).toLocaleDateString("en-US", { month: "short", day: "numeric" })} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value.toLocaleString()}`} width={72} />
                    <Tooltip cursor={{ stroke: "#dbe9fb", strokeWidth: 1 }} labelFormatter={(value) => new Date(Number(value)).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} />
                    <Line type="monotone" dataKey="price" stroke="#147ef5" strokeWidth={3} dot={false} activeDot={{ r: 5, fill: "#147ef5", stroke: "#fff", strokeWidth: 3 }} />
                </LineChart>
            </div>
        </>
    )
}

export default CoinList
