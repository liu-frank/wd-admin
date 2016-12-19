import React from 'react'
import SiteHeader from 'components/SiteHeader'
import SiteMenu from 'components/SiteMenu'
import PageHeader from 'components/PageHeader'
import SiteFooter from 'components/SiteFooter'
import CustomDialog from 'components/Popups/CustomDialog'
import ConfirmDialog from 'components/Popups/ConfirmDialog'
import FlashMessage from 'components/Prompts/FlashMessage'
import Loading from 'components/Loading'
import '../../styles/core.scss'
import { getSystem } from 'utils'

export default class CoreLayout extends React.Component {
  props: {
    query: React.PropTypes.any,
    url: React.PropTypes.string,
    menus: React.PropTypes.array,
    prompts: React.PropTypes.object,
    children: React.PropTypes.element.isRequired,
    hideConfirm: React.PropTypes.func
  }

  componentWillMount () {
    // Administrator
    this.props.getData()
  }

  componentDidMount () {
    const system = getSystem()

    switch (system) {
      case 'aas':
        document.title = '万达统一权限平台'
        break
      case 'ams':
      default:
        document.title = '万达统一运营平台'
        break
    }

    setTimeout(() => {
      $.AdminLTE.init()
    }, 100)
  }

  render () {
    const { menus, prompts, popups, url, administrator, children, hideConfirm, hideFlash } = this.props

    return (
      <div className='wrapper'>
        <SiteHeader
          administrator={administrator}
          logout={this.props.logout}
          resetPassword={this.props.resetPassword} />
        <SiteMenu menus={menus} url={url} />
        <div className='content-wrapper'>
          <PageHeader menus={menus} url={url} />
          {children}
        </div>
        <SiteFooter />
        <CustomDialog
          option={popups.custom}
          hideCustomDialog={this.props.hideCustomDialog} />
        <ConfirmDialog
          option={popups.confirm}
          hideConfirm={hideConfirm} />
        <FlashMessage
          flash={prompts.flash}
          hideFlash={hideFlash} />
        <Loading
          option={this.props.loading} />
      </div>
    )
  }
}
