import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'resource-management',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const Container = require('./ResourceManagement.container').default
      const reducer = require('./ResourceManagement.module').default

      injectReducer(store, { key: 'resource-management', reducer })
      next(null, Container)
    })
  }
})
