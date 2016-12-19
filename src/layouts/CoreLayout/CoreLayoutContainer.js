import { connect } from 'react-redux'
import * as menuActions from 'modules/menus'
import * as promptActions from 'modules/prompts'
import * as popupActions from 'modules/popups'
import * as administratorActions from 'modules/administrator'

import CoreLayout from './CoreLayout'

const mapActionCreators = {
  ...menuActions,
  ...promptActions,
  ...popupActions,
  ...administratorActions
}

const mapStateToProps = (state, ownProps) => ({
  menus: state.menus.list,
  prompts: state.prompts,
  popups: state.popups,
  loading: state.loading,
  url: ownProps.location.pathname,
  administrator: state.administrator
})

export default connect(mapStateToProps, mapActionCreators)(CoreLayout)
