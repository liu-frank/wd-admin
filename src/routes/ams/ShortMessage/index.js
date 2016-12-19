import { injectReducer } from '../../../store/reducers'

export default (store) => ({
  path: 'short-message',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const Container = require('./ShortMessage.container').default
      const reducer = require('./ShortMessage.module').default

      injectReducer(store, { key: 'short-message', reducer })

      next(null, Container)
    })
  }
})
