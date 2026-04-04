import {useEffect } from "react"
import { useState } from "react";
import "./index.css"
const Clock = () => {

    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="Clock">
            <h1>{time.toLocaleTimeString()}</h1>
        </div>
    )
}

export default Clock