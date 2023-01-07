import DefaultView from './views/DefaultView'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Game = lazy(
  () => import(/* webpackPrefetch: true */ './views/Game'),
)

export const ROUTE_PATHS = {
  DEFAULT: '/',
  GAME: '/game',
  SCORE: 'score',
}

const routes = [
  {
    path: ROUTE_PATHS.DEFAULT,
    element: (
        <DefaultView />
    ),
  },
  {
    path: ROUTE_PATHS.GAME,
    element: (
        <Game />
    ),
  },
]

export default routes
