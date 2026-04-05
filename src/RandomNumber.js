import { useState, useEffect } from "react"

const RandomNumber = () => {

    const [number, setNumber] = useState(0)
    const [quote, setQuote] = useState("")
    const [history, setHistory] = useState([])

    // 🔥 Load saved data on start
    useEffect(() => {
        const savedQuote = localStorage.getItem("quote")
        const savedHistory = JSON.parse(localStorage.getItem("quotes")) || []

        if (savedQuote) setQuote(savedQuote)
        setHistory(savedHistory)
    }, [])

    // 🔥 Fake AI generator
    const generateAIQuote = () => {
        const starts = [
            "Keep pushing",
            "Never stop",
            "You are building",
            "Focus on progress",
            "Stay consistent",
            "Every line of code"
        ]

        const middles = [
            "even when it's hard",
            "because greatness takes time",
            "one step at a time",
            "even when no one sees it",
            "through every bug",
            "through every failure"
        ]

        const ends = [
            "you will succeed.",
            "you are becoming stronger.",
            "your future self will thank you.",
            "this will pay off.",
            "you are leveling up.",
            "great things are coming."
        ]

        return (
            starts[Math.floor(Math.random() * starts.length)] + " " +
            middles[Math.floor(Math.random() * middles.length)] + ", " +
            ends[Math.floor(Math.random() * ends.length)]
        )
    }

    const generate = () => {
        const random = Math.floor(Math.random() * 10) + 1
        setNumber(random)
    }

    const reveal = () => {
        if (number === 0) return

        const aiQuote = generateAIQuote()

        setQuote(aiQuote)

        // 🔥 Save quote
        localStorage.setItem("quote", aiQuote)

        // 🔥 Save history
        let oldQuotes = JSON.parse(localStorage.getItem("quotes")) || []
        oldQuotes.push(aiQuote)

        localStorage.setItem("quotes", JSON.stringify(oldQuotes))
        setHistory(oldQuotes)

        setNumber(0)
    }

    const reset = () => {
        setNumber(0)
        setQuote("")
        setHistory([])

        localStorage.removeItem("quote")
        localStorage.removeItem("quotes")
    }

    return (
        <div className="container">

            <h1>🎯 AI Motivation Generator</h1>

            {/* Number */}
            <div className="box">
                <h2>{number === 0 ? "?" : number}</h2>
            </div>

            {/* Buttons */}
            <div className="buttons">
                <button onClick={generate}>Generate</button>
                <button onClick={reveal}>Reveal</button>
                <button onClick={reset}>Reset</button>
            </div>

            {/* Quote */}
            {quote && (
                <div className="quote">
                    <p>"{quote}"</p>
                </div>
            )}

            {/* History */}
            {history.length > 0 && (
                <div className="history">
                    <h3>📜 History</h3>
                    {history.map((q, i) => (
                        <p key={i}>• {q}</p>
                    ))}
                </div>
            )}

        </div>
    )
}

export default RandomNumber