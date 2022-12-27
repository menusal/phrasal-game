import React from 'react'
import { MAX_SCORE } from '../config'


export default function useScore() {
    const [score, setScore] = React.useState(0)

    const addPoint = (time: number) => {
        setScore(Math.floor(MAX_SCORE / time) + score)
    }

    const resetScore = () => {
        setScore(0)
    }

    return { score, addPoint, resetScore }
}
