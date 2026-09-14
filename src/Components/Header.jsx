function Header() {
    return (
        <header>
            <h1>Crypto Aggregator</h1>
            <nav>
                <a>Dashboard</a>
                <a>Markets</a>
                <button className="nav-search" type="button" aria-label="Search">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="10.8" cy="10.8" r="6.8" />
                        <path d="m16 16 5 5" />
                    </svg>
                    <span>Search</span>
                </button>
            </nav>
        </header>
    )
}

export default Header
