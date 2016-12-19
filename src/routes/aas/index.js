import Home from './Home'

export default (store) => {
  const routes = {
    path: 'aas',
    indexRoute: Home,
    getChildRoutes (location, next) {
      require.ensure([], (require) => {
        next(null, [
          require('./AccountManagement').default(store),
          require('./AccountDetail').default(store),
          require('./RoleManagement').default(store),
          require('./RoleDetail').default(store),
          require('./ResourceManagement').default(store),
          require('./ResourceDetail').default(store),
          require('./GroupManagement').default(store)
        ])
      })
    }
  }

  return routes
}
