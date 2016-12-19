import CoreLayout from './CoreLayoutContainer'
import { injectReducer } from '../../store/reducers'
import menusReducer from 'modules/menus'
import promptsReducer from 'modules/prompts'
import popupsReducer from 'modules/popups'
import loadingReducer from 'modules/loading'
import administratorReducer from 'modules/administrator'

export default (store) => {
  injectReducer(store, { key: 'menus', reducer: menusReducer })
  injectReducer(store, { key: 'prompts', reducer: promptsReducer })
  injectReducer(store, { key: 'popups', reducer: popupsReducer })
  injectReducer(store, { key: 'loading', reducer: loadingReducer })
  injectReducer(store, { key: 'administrator', reducer: administratorReducer })

  return CoreLayout
}
