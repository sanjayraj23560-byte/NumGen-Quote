import { useState } from "react"

const RandomNumber = () => {
    const [number, SetNumber]     = useState(0)
    const [SN, SetSN]             = useState("")
    const [revealed, setRevealed] = useState(false)
    const [spinning, setSpinning] = useState(false)

    function GenerateNum() {
        setSpinning(true)
        setRevealed(false)
        SetSN("")
        setTimeout(() => {
            let Random = Math.floor(Math.random() * 10 + 1)
            SetNumber(Random)
            setSpinning(false)
        }, 500)
    }

    function Reset() {
        SetNumber(0)
        SetSN("")
        setRevealed(false)
        setSpinning(false)
    }

    function Special() {
        if (number === 1)       { SetSN("Code is like humor — when you have to explain it, it's bad.") }
        else if (number === 2)  { SetSN("Every bug you fix makes you a better developer than yesterday.") }
        else if (number === 3)  { SetSN("Don't fear errors — they are proof you're trying.") }
        else if (number === 4)  { SetSN("Great developers aren't born, they're built — one bug at a time.") }
        else if (number === 5)  { SetSN("Consistency beats talent. Code every day.") }
        else if (number === 6)  { SetSN("The best programmers didn't quit when it got hard.") }
        else if (number === 7)  { SetSN("Debugging is just problem-solving in disguise. Stay calm.") }
        else if (number === 8)  { SetSN("Your only competition is who you were yesterday.") }
        else if (number === 9)  { SetSN("Small progress is still progress — keep pushing code.") }
        else if (number === 10) { SetSN("One day your 'I'm still learning' will turn into 'I built this.'") }
        else                    { SetSN("Click Generate first to get your number!") }
        setRevealed(true)
        SetNumber("")
    }

    return (
        <div className="page">

            {/* Title */}
            <div className="hero">
                <p className="eyebrow">Dev Wisdom Engine</p>
                <h1 className="title">
                    <span className="t-before">Roll</span>
                    <span className="t-divider"></span>
                    <span className="t-after">Reveal</span>
                </h1>
                <p className="subtitle">Generate a number · Unlock your quote</p>
            </div>

            {/* Card */}
            <div className="card">

                {/* BEFORE */}
                <div className={`section ${revealed ? "section-muted" : ""}`}>
                    <span className="section-label before-label">BEFORE</span>
                    <div className={`number-ring ${spinning ? "ring-spin" : ""}`}>
                        <span className="number-text">
                            {spinning ? "?" : (number === "" ? "★" : number)}
                        </span>
                    </div>
                    <div className="btn-row">
                        <button className="btn btn-cyan" onClick={GenerateNum}>⚡ Generate</button>
                        <button className="btn btn-ghost" onClick={Reset}>↺</button>
                    </div>
                </div>

                {/* Divider */}
                <div className="divider">
                    <div className="divider-line" />
                    <span className="divider-dot">↓</span>
                    <div className="divider-line" />
                </div>

                {/* AFTER */}
                <div className="section">
                    <span className="section-label after-label">AFTER</span>

                    {!revealed ? (
                        <div className="locked">
                            <p className="lock-hint">🔒 Generate a number first</p>
                            <button className="btn btn-lime btn-disabled" onClick={Special}>
                                ✦ Reveal Quote
                            </button>
                        </div>
                    ) : (
                        <div className="quote-box">
                            <p className="quote-text">"{SN}"</p>
                        </div>
                    )}

                    {number !== "" && number !== 0 && !revealed && (
                        <button className="btn btn-lime" onClick={Special}>
                            ✦ Reveal Quote
                        </button>
                    )}
                </div>

            </div>

            {/* Steps */}
            <div className="steps">
                <div className={`step ${number !== 0 ? "step-on" : ""}`}>
                    <div className="step-dot" />
                    <span>Generate</span>
                </div>
                <div className="step-line" />
                <div className={`step ${revealed ? "step-on" : ""}`}>
                    <div className="step-dot" />
                    <span>Reveal</span>
                </div>
                <div className="step-line" />
                <div className={`step ${revealed ? "step-on" : ""}`}>
                    <div className="step-dot" />
                    <span>Level Up</span>
                </div>
            </div>

        </div>
    )
}

export default RandomNumber