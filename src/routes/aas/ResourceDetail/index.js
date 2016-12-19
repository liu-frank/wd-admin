import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'resource-detail',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const Container = require('./ResourceDetail.container.js').default
      const reducer = require('./ResourceDetail.module.js').default

      injectReducer(store, { key: 'resource-detail', reducer })
      next(null, Container)
    })
  }
})
