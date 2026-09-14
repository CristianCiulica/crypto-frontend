import { useEffect, useState } from 'react'
import { CartesianGrid, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import CoinCard from "./CoinCard.jsx";
import CoinTicker from "./CoinTicker.jsx";

const chartRanges = [
    { label: "1D", title: "Last 1 day", days: 1 },
    { label: "7D", title: "Last 7 days", days: 7 },
    { label: "1M", title: "Last month", days: 30 },
    { label: "1Y", title: "Last year", days: 365 },
]

function CoinList() {

    const [coins, setCoins] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [priceHistory, setPriceHistory] = useState([]);
    const [selectedRange, setSelectedRange] = useState("7D");
    const [isHistoryLoading, setIsHistoryLoading] = useState(false);

    useEffect(() => {
        if (!selectedCoin) {
            return;
        }

        const range = chartRanges.find((item) => item.label === selectedRange);
        setIsHistoryLoading(true);
        setPriceHistory([]);

        fetch("http://localhost:8080/api/coins/" + selectedCoin.id + "/history?days=" + range.days)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setPriceHistory(data)
            })
            .finally(() => setIsHistoryLoading(false))

    }, [selectedCoin, selectedRange]);


    useEffect(() => {
        fetch("http://localhost:8080/api/coins?ids=bitcoin,ethereum,solana")
            .then(response => response.json())
            .then(data=>setCoins(data))
    }, []);

    return (<>
            <CoinTicker />
            <div className="markets-header">
                <div>
                    <span className="dashboard-label">MARKET DASHBOARD</span>
                    <h2>Explore the market</h2>
                </div>
            </div>

            <div className="popular-coins-heading">

                <strong>Popular coins</strong>
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
                        <strong>{chartRanges.find((range) => range.label === selectedRange).title}</strong>
                    </div>
                    <div className="chart-ranges">
                        {chartRanges.map((range) => (
                            <button
                                className={selectedRange === range.label ? "active" : ""}
                                key={range.label}
                                type="button"
                                onClick={() => setSelectedRange(range.label)}
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>
                </div>
                {isHistoryLoading ? <div className="chart-loading-message">Loading price history...</div> : <ResponsiveContainer width="100%" height={360}>
                    <LineChart key={selectedRange} data={priceHistory}>
                        <CartesianGrid vertical={false} stroke="#f0f2f4" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} minTickGap={30} tickFormatter={(value) => new Date(Number(value)).toLocaleDateString("en-US", { month: "short", day: "numeric" })} />
                        <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value.toLocaleString()}`} width={72} />
                        <Tooltip cursor={{ stroke: "#dbe9fb", strokeWidth: 1 }} labelFormatter={(value) => new Date(Number(value)).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} />
                        <Line type="monotone" dataKey="price" stroke="#147ef5" strokeWidth={3} dot={false} activeDot={{ r: 5, fill: "#147ef5", stroke: "#fff", strokeWidth: 3 }} />
                    </LineChart>
                </ResponsiveContainer>}
            </div>
        </>
    )
}

export default CoinList
