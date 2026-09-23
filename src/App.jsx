import { useState } from 'react'
import './App.css'
import Header from "./Components/Header.jsx";
import CoinTicker from "./Components/CoinTicker.jsx";
import DashboardPage from "./Components/DashboardPage.jsx";
import MarketsPage from "./Components/MarketsPage.jsx";
import AiPredictPage from "./Components/AiPredictPage.jsx";

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


function App(){
    const [activePage, setActivePage] = useState("dashboard");
    const [searchQuery, setSearchQuery] = useState("");

    const handleNavigate = (page) => {
        setActivePage(page);
        setSearchQuery("");
    };

    return <div>
        <Header
            activePage={activePage}
            onNavigate={handleNavigate}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
        />
        <CoinTicker />

        {activePage === "dashboard" && (
            <DashboardPage safeFetch={safeFetch} searchQuery={searchQuery} />
        )}
        {activePage === "markets" && (
            <MarketsPage safeFetch={safeFetch} searchQuery={searchQuery} />
        )}
        {activePage === "ai" && (
            <AiPredictPage safeFetch={safeFetch} />
        )}
    </div>
}

export default App
