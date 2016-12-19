import Home from './Home'

export const createRoutes = (store) => {
  const routes = {
    path: 'ams',
    indexRoute: Home,
    getChildRoutes (location, next) {
      require.ensure([], (require) => {
        next(null, [
          require('./MemberInfo').default(store),
          require('./MemberDetail').default(store),
          require('./OperationLog').default(store),
          require('./ShortMessage').default(store),
          require('./StatusBatch').default(store),
          require('./StatusChange').default(store)
        ])
      })
    }
  }

  return routes
}

export default createRoutes
