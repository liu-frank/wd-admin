import React from 'react'
import classes from './FlashMessage.scss'
import successIcon from './success-icon.png'
import failIcon from './fail-icon.png'

export default class FlashMessage extends React.Component {
  componentDidUpdate (prevProps) {
    if (!prevProps.flash.show && this.props.flash.show) {
      clearTimeout(this.timer)
      this.timer = setTimeout(this.props.hideFlash, 2000)
    }
  }

  render () {
    const { show, success, title, message } = this.props.flash

    return (
      <div
        ref='flash-message'
        className={classes.locator + ' ' + (show ? '' : 'hidden')}>
        {
          success
            ? <div
              className={classes['flash-message']}>
              <img src={successIcon} />
              {message}
            </div>
            : <div
              className={classes['flash-message'] + ' ' + classes.fail}>
              <img src={failIcon} />
              {message}
            </div>
        }
      </div>
    )
  }
}
/**
    return (
      <div
        ref='flash-message'
        className={flashClass + ' ' + backgroundClass}>
        <h4> <i className={iconClass} /> {title || defaultTitle}</h4>
        {message || defaultTitle}
      </div>
    )
*/
