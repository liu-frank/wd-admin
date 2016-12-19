import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'

export default (store) => {
  const routes = {
    path: '/',
    component: CoreLayout(store),
    indexRoute: Home,
    getChildRoutes (location, next) {
      require.ensure([], (require) => {
        next(null, [
          require('./aas').default(store),
          require('./ams').default(store),
          require('./NotFound').default
        ])
      })
    }
  }

  return routes
}
