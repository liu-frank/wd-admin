import { connect } from 'react-redux'
import * as routerActions from 'react-router-redux'
import * as promptActions from '../../../modules/prompts'
import * as popupActions from '../../../modules/popups'

import * as moduleActions from './StatusChange.module'
import component from './StatusChange.component'

const mapActionCreators = {
  ...routerActions,
  ...promptActions,
  ...popupActions,
  ...moduleActions
}

const mapStateToProps = (state) => ({
  data: state['status-change'],
  resources: state['administrator'].resources,
  popups: state.popups // EditDialog
})

export default connect(mapStateToProps, mapActionCreators)(component)
