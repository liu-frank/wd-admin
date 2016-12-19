import { injectReducer } from '../../../store/reducers'

export default (store) => ({
  path: 'member-detail',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const Container = require('./MemberDetail.container').default
      const reducer = require('./MemberDetail.module').default

      injectReducer(store, { key: 'member-detail', reducer })

      next(null, Container)
    })
  }
})
