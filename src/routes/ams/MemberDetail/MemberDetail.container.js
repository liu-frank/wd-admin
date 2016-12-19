import { connect } from 'react-redux'
import * as routerActions from 'react-router-redux'
import * as promptActions from 'modules/prompts'
import * as popupActions from 'modules/popups'
import * as moduleActions from './MemberDetail.module'
import component from './MemberDetail.component'

const mapActionCreators = {
  ...routerActions,
  ...promptActions,
  ...popupActions,
  ...moduleActions
}

const mapStateToProps = (state) => ({
  data: state['member-detail'],
  resources: state['administrator'].resources,
  fullOrgName : state['administrator'].fullOrgName,
  popups: state.popups // EditDialog
})

export default connect(mapStateToProps, mapActionCreators)(component)
