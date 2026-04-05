import { useState, useRef, useEffect } from "react"

function RandomNumber() {
  const [number, setNumber]   = useState(0)
  const [quote, setQuote]     = useState("")
  const [history, setHistory] = useState([])
  const [state, setState]     = useState("idle")

  const boxRef   = useRef(null)
  const quoteRef = useRef(null)

  const quotes = {
    1:  "Code is like humor — when you have to explain it, it's bad.",
    2:  "Every bug you fix makes you a better developer than yesterday.",
    3:  "Don't fear errors — they are proof you're trying.",
    4:  "Great developers aren't born, they're built — one bug at a time.",
    5:  "Consistency beats talent. Code every day.",
    6:  "The best programmers didn't quit when it got hard.",
    7:  "Debugging is just problem-solving in disguise. Stay calm.",
    8:  "Your only competition is who you were yesterday.",
    9:  "Small progress is still progress — keep pushing code.",
    10: "One day your 'I'm still learning' will turn into 'I built this.'"
  }

  // 🔥 LOAD FROM LOCAL STORAGE
  useEffect(() => {
    const savedQuote = localStorage.getItem("quote")
    const savedHistory = JSON.parse(localStorage.getItem("history")) || []

    if (savedQuote) setQuote(savedQuote)
    setHistory(savedHistory)
  }, [])

  // ── Sound ──────────────────────────────────────────────────────
  const playSound = (type) => {
    const ctx  = new (window.AudioContext || window.webkitAudioContext)()
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)

    if (type === "generate") {
      osc.type = "sine"
      osc.frequency.setValueAtTime(300, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.3)
      gain.gain.setValueAtTime(0.3, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.4)
    }

    if (type === "reveal") {
      osc.type = "triangle"
      osc.frequency.setValueAtTime(523, ctx.currentTime)
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.12)
      osc.frequency.setValueAtTime(784, ctx.currentTime + 0.24)
      osc.frequency.setValueAtTime(1046, ctx.currentTime + 0.36)
      gain.gain.setValueAtTime(0.25, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.6)
    }

    if (type === "reset") {
      osc.type = "square"
      osc.frequency.setValueAtTime(400, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.2)
      gain.gain.setValueAtTime(0.15, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.25)
    }
  }

  // ── Generate ───────────────────────────────────────────────────
  const generate = () => {
    playSound("generate")
    setState("spinning")
    setQuote("")

    let count  = 0
    const total = 18
    const interval = setInterval(() => {
      setNumber(Math.floor(Math.random() * 10) + 1)
      count++
      if (count >= total) {
        clearInterval(interval)
        const final = Math.floor(Math.random() * 10) + 1
        setNumber(final)
        setState("idle")
      }
    }, 60)
  }

  // ── Reveal ─────────────────────────────────────────────────────
  const reveal = () => {
    if (!number) {
      playSound("reset")
      return
    }

    playSound("reveal")
    setState("revealed")

    const q = quotes[number]

    setQuote(q)

    // 🔥 SAVE QUOTE
    localStorage.setItem("quote", q)

    // 🔥 SAVE HISTORY
    const newHistory = [
      { number, quote: q },
      ...history.slice(0, 9)
    ]

    setHistory(newHistory)
    localStorage.setItem("history", JSON.stringify(newHistory))

    setNumber(0)
  }

  // ── Reset ──────────────────────────────────────────────────────
  const reset = () => {
    playSound("reset")
    setState("idle")
    setNumber(0)
    setQuote("")
    setHistory([])

    // 🔥 CLEAR STORAGE
    localStorage.removeItem("quote")
    localStorage.removeItem("history")
  }

  return (
    <div className="container">
      <h1>Quote Machine</h1>

      <div className={`box ${state === "spinning" ? "box-spin" : ""} ${state === "revealed" ? "box-revealed" : ""}`}>
        <h2 className={state === "spinning" ? "num-spin" : "num-still"}>
          {number || "—"}
        </h2>
        {state === "spinning" && (
          <p className="spin-hint">rolling...</p>
        )}
      </div>

      <div className="buttons">
        <button
          className={`btn-generate ${state === "spinning" ? "btn-loading" : ""}`}
          onClick={generate}
          disabled={state === "spinning"}
        >
          {state === "spinning" ? "Rolling..." : "⚡ Generate"}
        </button>
        <button
          className="btn-reveal"
          onClick={reveal}
          disabled={!number || state === "spinning"}
        >
          ✦ Reveal
        </button>
        <button className="btn-reset" onClick={reset}>
          ↺ Reset
        </button>
      </div>

      {quote && (
        <div className={`quote ${state === "revealed" ? "quote-in" : ""}`}>
          <p>"{quote}"</p>
        </div>
      )}

      {history.length > 0 && (
        <div className="history">
          <h3>History</h3>
          {history.map((h, i) => (
            <p key={i} className="history-item">
              #{h.number} — {h.quote}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default RandomNumber