import { connect } from 'react-redux'
import * as routerActions from 'react-router-redux'
import * as promptActions from '../../../modules/prompts'
import * as popupActions from '../../../modules/popups'

import * as moduleActions from './OperationLog.module'
import component from './OperationLog.component'

const mapActionCreators = {
  ...routerActions,
  ...promptActions,
  ...popupActions,
  ...moduleActions
}

const mapStateToProps = (state) => ({
  data: state['operation-log'],
  resources: state['administrator'].resources,
  popups: state.popups // EditDialog
})

export default connect(mapStateToProps, mapActionCreators)(component)
