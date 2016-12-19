import { injectReducer } from '../../../store/reducers'

export default (store) => ({
  path: 'member-info',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const Container = require('./MemberInfo.container').default
      const reducer = require('./MemberInfo.module').default

      injectReducer(store, { key: 'member-info', reducer })

      next(null, Container)
    })
  }
})
