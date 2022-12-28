import React from 'react'
import { ScoreHistory } from '../types'

export default function useScoreHystoryFromLocalStorage() {
    const [scoreHistory, setScoreHistory] = React.useState<ScoreHistory[]>([])

    React.useEffect(() => {
        const scoreHistory = localStorage.getItem('scoreHistory')
        if (scoreHistory) {
            setScoreHistory(JSON.parse(scoreHistory))
        }
    }, [])

    const addScore = (score: number) => {
       
        const newScoreHistory = [
            ...scoreHistory,
            {
                score,
                date: new Date().toISOString(),
            },
        ]
        setScoreHistory(newScoreHistory)
        localStorage.setItem('scoreHistory', JSON.stringify(newScoreHistory))
    }

    return { scoreHistory, addScore }
}
