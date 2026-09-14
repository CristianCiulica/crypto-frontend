import ADA from "@web3icons/core/svgs/tokens/branded/ADA.svg.js"
import APT from "@web3icons/core/svgs/tokens/branded/APT.svg.js"
import ARB from "@web3icons/core/svgs/tokens/branded/ARB.svg.js"
import ATOM from "@web3icons/core/svgs/tokens/branded/ATOM.svg.js"
import AVAX from "@web3icons/core/svgs/tokens/branded/AVAX.svg.js"
import BNB from "@web3icons/core/svgs/tokens/branded/BNB.svg.js"
import BTC from "@web3icons/core/svgs/tokens/branded/BTC.svg.js"
import DOGE from "@web3icons/core/svgs/tokens/branded/DOGE.svg.js"
import DOT from "@web3icons/core/svgs/tokens/branded/DOT.svg.js"
import ETH from "@web3icons/core/svgs/tokens/branded/ETH.svg.js"
import FIL from "@web3icons/core/svgs/tokens/branded/FIL.svg.js"
import LINK from "@web3icons/core/svgs/tokens/branded/LINK.svg.js"
import LTC from "@web3icons/core/svgs/tokens/branded/LTC.svg.js"
import NEAR from "@web3icons/core/svgs/tokens/branded/NEAR.svg.js"
import OP from "@web3icons/core/svgs/tokens/branded/OP.svg.js"
import PEPE from "@web3icons/core/svgs/tokens/branded/PEPE.svg.js"
import SOL from "@web3icons/core/svgs/tokens/branded/SOL.svg.js"
import SUI from "@web3icons/core/svgs/tokens/branded/SUI.svg.js"
import UNI from "@web3icons/core/svgs/tokens/branded/UNI.svg.js"
import XRP from "@web3icons/core/svgs/tokens/branded/XRP.svg.js"

const icons = {
    ADA,
    APT,
    ARB,
    ATOM,
    AVAX,
    BNB,
    BTC,
    DOGE,
    DOT,
    ETH,
    FIL,
    LINK,
    LTC,
    NEAR,
    OP,
    PEPE,
    SOL,
    SUI,
    UNI,
    XRP,
}

function CryptoIcon({ symbol }) {
    if (symbol === "XRP") {
        return <span className="real-crypto-icon xrp-fallback">X</span>
    }

    const icon = icons[symbol]
    if (!icon) return null

    return <span className="real-crypto-icon" dangerouslySetInnerHTML={{ __html: icon }} />
}

export default CryptoIcon
