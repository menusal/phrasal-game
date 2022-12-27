import React from 'react'

export default function useLifes() {
    const [lifes, setLifes] = React.useState(3)

    const removeLife = () => {
        setLifes(lifes - 1)
    }

    const resetLifes = () => {
        setLifes(3)
    }

    return { lifes, removeLife, resetLifes }
}
