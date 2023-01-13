import DefaultView from './views/DefaultView'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Scores from './views/Scores'

const Game = lazy(
  () => import(/* webpackPrefetch: true */ './views/Game'),
)

export const ROUTE_PATHS = {
  DEFAULT: '/',
  GAME: '/game',
  SCORES: '/scores',
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
  {
    path: ROUTE_PATHS.SCORES,
    element: (
        <Scores />
    ),
  },
]

export default routes
