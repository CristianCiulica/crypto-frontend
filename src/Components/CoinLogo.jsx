function CoinLogo({ coinId }) {
    if (coinId === "ethereum") {
        return (
            <span className="coin-logo ethereum-logo" aria-hidden="true">
                <svg viewBox="0 0 32 32">
                    <path d="M16 4 8.5 16.2 16 20.5l7.5-4.3L16 4Z" fill="#8b98bd" />
                    <path d="m16 20.5-7.5-4.3L16 28l7.5-11.8-7.5 4.3Z" fill="#56668f" />
                </svg>
            </span>
        )
    }

    if (coinId === "solana") {
        return (
            <span className="coin-logo solana-logo" aria-hidden="true">
                <svg viewBox="0 0 32 32">
                    <path d="M8 9.5h15.7l-3 3H5L8 9.5Z" fill="#9945ff" />
                    <path d="M8.3 14.5H24l-3 3H5.3l3-3Z" fill="#19fb9b" />
                    <path d="M8 19.5h15.7l-3 3H5l3-3Z" fill="#14f195" />
                </svg>
            </span>
        )
    }

    return (
        <span className="coin-logo bitcoin-logo" aria-hidden="true">
            <svg viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="16" fill="#f7931a" />
                <text x="16" y="22" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="700" fontFamily="Arial, sans-serif">₿</text>
            </svg>
        </span>
    )
}

export default CoinLogo
