import { useEffect, useState } from 'react'
import { CartesianGrid, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import CoinCard from "./CoinCard.jsx";
import CoinTicker from "./CoinTicker.jsx";
import AiPredictionCard from "./AiPredictionCard.jsx";

const chartRanges = [
    { label: "1D", title: "Last 1 day", days: 1 },
    { label: "7D", title: "Last 7 days", days: 7 },
    { label: "1M", title: "Last month", days: 30 },
    { label: "1Y", title: "Last year", days: 365 },
]

function safeFetch(url) {
    return fetch(url).then(async (response) => {
        const text = await response.text();
        let data = null;
        try { data = JSON.parse(text); } catch { /* not JSON */ }

        if (!response.ok) {
            const msg = (data && data.error) || text || ("Server error: " + response.status);
            throw new Error(msg);
        }
        if (data === null) {
            throw new Error("Invalid response from server");
        }
        return data;
    });
}

function CoinList() {

    // --- Coins state ---
    const [coins, setCoins] = useState([]);
    const [coinsLoading, setCoinsLoading] = useState(true);
    const [coinsError, setCoinsError] = useState(null);
    const [coinsRetry, setCoinsRetry] = useState(0);

    // --- Selected coin ---
    const [selectedCoin, setSelectedCoin] = useState(null);

    // --- Chart state ---
    const [priceHistory, setPriceHistory] = useState([]);
    const [selectedRange, setSelectedRange] = useState("7D");
    const [isHistoryLoading, setIsHistoryLoading] = useState(false);
    const [historyError, setHistoryError] = useState(null);
    const [historyRetry, setHistoryRetry] = useState(0);

    // --- AI Prediction state ---
    const [prediction, setPrediction] = useState(null);
    const [isPredicting, setIsPredicting] = useState(false);
    const [predictionError, setPredictionError] = useState(null);

    // --- Handlers ---
    const handleSelectCoin = (coin) => {
        setSelectedCoin(coin);
        setPrediction(null);
        setPredictionError(null);
    };

    const handlePredict = (coinId) => {
        if (!coinId) return;
        setIsPredicting(true);
        setPredictionError(null);

        safeFetch("http://localhost:8080/api/coins/" + coinId + "/prediction")
            .then((data) => setPrediction(data))
            .catch((err) => {
                console.error("Prediction error:", err);
                setPredictionError(err.message || "Could not connect to AI service");
            })
            .finally(() => setIsPredicting(false));
    };

    // --- Fetch coins on load (with retry) ---
    useEffect(() => {
        setCoinsLoading(true);
        setCoinsError(null);

        safeFetch("http://localhost:8080/api/coins?ids=bitcoin,ethereum,solana")
            .then((data) => setCoins(data))
            .catch((err) => {
                console.error("Coins fetch error:", err);
                setCoinsError(err.message || "Could not load coins");
            })
            .finally(() => setCoinsLoading(false));
    }, [coinsRetry]);

    // --- Fetch price history when coin or range changes ---
    useEffect(() => {
        if (!selectedCoin) return;

        const range = chartRanges.find((item) => item.label === selectedRange);
        setIsHistoryLoading(true);
        setPriceHistory([]);
        setHistoryError(null);

        safeFetch("http://localhost:8080/api/coins/" + selectedCoin.id + "/history?days=" + range.days)
            .then((data) => setPriceHistory(data))
            .catch((err) => {
                console.error("History error:", err);
                setHistoryError(err.message || "Could not load price history");
            })
            .finally(() => setIsHistoryLoading(false));
    }, [selectedCoin, selectedRange, historyRetry]);

    // --- Render ---
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

            {coinsLoading ? (
                <div className="chart-loading-message">Loading coins...</div>
            ) : coinsError ? (
                <div className="coins-error-message">
                    <span>⚠️ {coinsError}</span>
                    <p>CoinGecko may be rate-limiting. Wait a moment and try again.</p>
                    <button type="button" onClick={() => setCoinsRetry(r => r + 1)}>Retry</button>
                </div>
            ) : (
                <section className="coin-list">
                    {coins.map(coin => (<CoinCard
                        key={coin.id}
                        coin={coin}
                        onSelect={() => handleSelectCoin(coin)}
                    />))}
                </section>
            )}

            {selectedCoin && (
                <div className="selected-coin">
                    <div className="selected-coin-details">
                        <h2>{selectedCoin.name}</h2>
                        <p>${selectedCoin.current_price.toFixed(2)}</p>
                    </div>
                    <button
                        type="button"
                        className={`ai-predict-btn ${isPredicting ? "loading" : ""}`}
                        onClick={() => handlePredict(selectedCoin.id)}
                        disabled={isPredicting}
                    >
                        {isPredicting ? (
                            <>
                                <span className="ai-btn-spinner" />
                                <span>Analyzing with AI...</span>
                            </>
                        ) : (
                            <>
                                <span className="ai-btn-sparkle">✨</span>
                                <span>AI Predict</span>
                            </>
                        )}
                    </button>
                </div>
            )}

            {selectedCoin && (
                <AiPredictionCard
                    coin={selectedCoin}
                    prediction={prediction}
                    isLoading={isPredicting}
                    error={predictionError}
                    onRetry={() => handlePredict(selectedCoin.id)}
                />
            )}

            {selectedCoin && (
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
                    {isHistoryLoading ? (
                        <div className="chart-loading-message">Loading price history...</div>
                    ) : historyError ? (
                        <div className="chart-error-message">
                            <span>⚠️ {historyError}</span>
                            <button type="button" onClick={() => setHistoryRetry(r => r + 1)}>Retry</button>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height={360}>
                            <LineChart key={selectedRange} data={priceHistory}>
                                <CartesianGrid vertical={false} stroke="#f0f2f4" />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} minTickGap={30} tickFormatter={(value) => new Date(Number(value)).toLocaleDateString("en-US", { month: "short", day: "numeric" })} />
                                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value.toLocaleString()}`} width={72} />
                                <Tooltip cursor={{ stroke: "#dbe9fb", strokeWidth: 1 }} labelFormatter={(value) => new Date(Number(value)).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} />
                                <Line type="monotone" dataKey="price" stroke="#147ef5" strokeWidth={3} dot={false} activeDot={{ r: 5, fill: "#147ef5", stroke: "#fff", strokeWidth: 3 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>
            )}
        </>
    )
}

export default CoinList
