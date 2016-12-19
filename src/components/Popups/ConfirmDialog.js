import React from 'react'
import ReactDOM from 'react-dom'

export default class ConfirmDialog extends React.Component {
  props: {
    confirm: React.propTypes.object,
    onConfirm: React.propTypes.func,
    hideConfirm: React.propTypes.func
  }

  componentDidMount () {
    $(ReactDOM.findDOMNode(this.refs['confirm-dialog'])).on('hidden.bs.modal', () => {
      this.props.hideConfirm()
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.option.show) {
      $(ReactDOM.findDOMNode(this.refs['confirm-dialog'])).modal('show')
    } else {
      $(ReactDOM.findDOMNode(this.refs['confirm-dialog'])).modal('hide')
    }
  }

  onConfirm () {
    this.props.hideConfirm()
    this.props.option.onConfirm && this.props.option.onConfirm()
  }

  render () {
    // TODO: Error without default
    const { title, message, showCancel = true } = this.props.option

    return (
      <div ref='confirm-dialog' className='modal'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>×</span>
              </button>
              <h4 className='modal-title'>{title || '请确认'}</h4>
            </div>
            <div className='modal-body'>
              <p dangerouslySetInnerHTML={{__html: message}} />
            </div>
            <div className='modal-footer' style={{textAlign: 'center'}}>
            {
              showCancel &&
                <button
                  type='button'
                  className='btn btn-default'
                  style={{marginRight: 50}}
                  data-dismiss='modal'>
                  取消
                </button>
            }
              <button
                type='button'
                className='btn btn-primary'
                onClick={this.onConfirm.bind(this)}>
                确定
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
