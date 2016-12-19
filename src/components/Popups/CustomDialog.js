import React from 'react'
import ReactDOM from 'react-dom'

export default class CustomDialog extends React.Component {
  props: {
    option: React.propTypes.object,
    onConfirm: React.propTypes.func,
    hideConfirm: React.propTypes.func
  }

  componentDidMount () {
    $(ReactDOM.findDOMNode(this.refs['custom-dialog'])).on('hidden.bs.modal', () => {
      this.props.hideCustomDialog()
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.option.show) {
      $(ReactDOM.findDOMNode(this.refs['custom-dialog'])).modal('show')
    } else {
      $(ReactDOM.findDOMNode(this.refs['custom-dialog'])).modal('hide')
    }
  }

  onConfirm () {
    this.props.hideCustomDialog()
    this.props.option.onConfirm && this.props.option.onConfirm()
  }

  render () {
    const { title, content, showCancel,width} = this.props.option

    return (
      <div ref='custom-dialog' className='modal'>
        <div className='modal-dialog' style={{width:width}}>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>×</span>
              </button>
              <h4 className='modal-title'>{title || '请确认'}</h4>
            </div>
            <div className='modal-body'>
              { content }
            </div>
            <div className='modal-footer'>
            {
              showCancel &&
                <button type='button' className='btn btn-default pull-right' data-dismiss='modal'>
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
