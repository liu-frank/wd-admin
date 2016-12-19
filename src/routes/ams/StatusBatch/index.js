import { injectReducer } from '../../../store/reducers'

export default (store) => ({
  path: 'status-batch',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const Container = require('./StatusBatch.container').default
      const reducer = require('./StatusBatch.module').default

      injectReducer(store, { key: 'status-batch', reducer })

      next(null, Container)
    })
  }
})
