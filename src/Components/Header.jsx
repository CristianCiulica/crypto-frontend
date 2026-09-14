import { useState } from "react"

function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

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
                    <a onClick={() => setMenuOpen(false)}>Dashboard</a>
                    <a onClick={() => setMenuOpen(false)}>Markets</a>
                    <a onClick={() => setMenuOpen(false)}>Market Sentiment</a>
                    <a onClick={() => setMenuOpen(false)}>Price Prediction</a>
                    <label className="nav-search">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="10.8" cy="10.8" r="6.8" />
                            <path d="m16 16 5 5" />
                        </svg>
                        <input type="search" placeholder="Search" aria-label="Search" />
                    </label>
                </nav>
            </header>
            {menuOpen && <button className="menu-overlay" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}
        </>
    )
}

export default Header
