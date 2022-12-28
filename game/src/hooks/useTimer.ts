import React from 'react'
import { MAX_SCORE } from '../config'

export default function useTimer() {
    const [time, setTime] = React.useState(1)
    const [timeFrom, setTimeFrom] = React.useState(0)
    const [isRunning, setIsRunning] = React.useState(false)

    React.useEffect(() => {
        let interval: any

        if (isRunning) {
            interval = setInterval(() => {
                setTimeFrom(time)
                setTime((time) => time + 1)
            }, 1000)
        } else if (!isRunning && time !== 0) {
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [isRunning, time])

    const start = () => {
        setIsRunning(true)
    }

    const stop = () => {
        setIsRunning(false)
    }

    const reset = () => {
        setTime(1)
        setTimeFrom(0)
        setIsRunning(false)
    }

    return { time, timeFrom, isRunning, start, stop, reset }
}
