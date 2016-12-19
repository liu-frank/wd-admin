import { injectReducer } from '../../../store/reducers'

export default (store) => ({
  path: 'operation-log',
  getComponent (nextState, next) {
    require.ensure([
      './OperationLog.container',
      './OperationLog.module'
    ], (require) => {
      const Container = require('./OperationLog.container').default
      const reducer = require('./OperationLog.module').default

      injectReducer(store, { key: 'operation-log', reducer })

      next(null, Container)
    })
  }
})
