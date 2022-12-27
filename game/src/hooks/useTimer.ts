import React from 'react'

export default function useTimer() {
    const [time, setTime] = React.useState(0)
    const [isRunning, setIsRunning] = React.useState(false)

    React.useEffect(() => {
        let interval: any

        if (isRunning) {
            interval = setInterval(() => {
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
        setTime(0)
        setIsRunning(false)
    }

    const formatTime = (time: number) => {
        const getSeconds = `0${(time % 60)}`.slice(-2)
        const minutes = `${Math.floor(time / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2)

        return `${getHours} : ${getMinutes} : ${getSeconds}`
    }

    return { time, isRunning, start, stop, reset, formatTime }
}
