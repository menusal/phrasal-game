import React from 'react'
import { MAX_SCORE } from '../config'


export default function useScore() {
    const [score, setScore] = React.useState(0)
    const [scoreFrom, setScoreFrom] = React.useState(0)

    const addPoint = (time: number) => {
        setScoreFrom(score)
        setScore(Math.floor(MAX_SCORE / time) + score)
    }

    const resetScore = () => {
        setScore(0)
    }

    return { score, scoreFrom, addPoint, resetScore }
}
