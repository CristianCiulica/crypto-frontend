import { useState } from "react"

function Header({ activePage, onNavigate, searchQuery, onSearchChange }) {
    const [menuOpen, setMenuOpen] = useState(false)

    const handleNav = (page) => {
        onNavigate(page)
        setMenuOpen(false)
    }
    
    return (
        <>
            <header>
                <h1>Ready to Invest?</h1>
                <button className="menu-toggle" type="button" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <span />
                    <span />
                    <span />
                </button>
                <nav className={menuOpen ? "mobile-menu open" : "mobile-menu"}>
                    <a className={activePage === "dashboard" ? "nav-active" : ""} onClick={() => handleNav("dashboard")}>Dashboard</a>
                    <a className={activePage === "markets" ? "nav-active" : ""} onClick={() => handleNav("markets")}>Markets</a>
                    <a className={activePage === "ai" ? "nav-active" : ""} onClick={() => handleNav("ai")}>AI Predict</a>
                    <label className="nav-search">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="10.8" cy="10.8" r="6.8" />
                            <path d="m16 16 5 5" />
                        </svg>
                        <input
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </label>
                </nav>
            </header>
            {menuOpen && <button className="menu-overlay" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}
        </>
    )
}

export default Header
