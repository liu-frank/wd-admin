import React from 'react'
import ReactDOM from 'react-dom'
import FieldGroup from 'components/FieldGroup'
import { showTypes } from 'modules/popups'
import { inputTypes } from 'modules/inputs'

export default class EditDialog extends React.Component {
  props: {
    prompts: React.propTypes.object,
    onConfirm: React.propTypes.func,
    hideConfirm: React.propTypes.func,
    fields: React.propTypes.array,
    popups: React.propTypes.object,
    showFail: React.propTypes.func
  }

  componentDidMount () {
    $(ReactDOM.findDOMNode(this.refs.dialog)).on('hidden.bs.modal', () => {
      this.props.hideEdit()
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.popups.edit.show) {
      $(ReactDOM.findDOMNode(this.refs.dialog)).modal('show')
    } else {
      $(ReactDOM.findDOMNode(this.refs.dialog)).modal('hide')
    }
  }

  validate () {
    let validated = true
    for (let field of this.props.data.editFields) {
      const metaData = this.props.data.meta[field]
      const value = this.props.data.currentItem[field]

      if (metaData.validate && !metaData.validate(value)) {
        this.props.showFail({
          message: metaData.errorMessage
        })
        validated = false
        break
      }
      if (metaData.minLength && value.length < metaData.minLength) {
        this.props.showFail({
          message: `${metaData.label}长度需要大于等于${metaData.minLength}`
        })
        validated = false
        break
      }
      if (metaData.type === inputTypes.PHONE && !value.match(/^1\d{10}$/)) {
        this.props.showFail({
          message: `请输入正确的${metaData.label}`
        })
        validated = false
        break
      }
      if (metaData.type === inputTypes.EMAIL &&
        !value.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)) {
        this.props.showFail({
          message: `请输入正确的${metaData.label}`
        })
        validated = false
        break
      }

    }
    return validated
  }

  submitForm (e) {
    e.preventDefault()
    if (!this.validate()) {
      return
    }
    if (this.props.onValidate && !this.props.onValidate()) {
      return
    }
    if (this.props.popups.edit.showType === showTypes.VIEW) {
      this.props.hideEdit()
    } else if (this.props.popups.edit.showType === showTypes.CREATE) {
      this.props.onCreate()
    } else if (this.props.popups.edit.showType === showTypes.UPDATE) {
      this.props.onUpdate()
    }
  }

  render () {
    const {
      data: { editFields, meta, currentItem },
      popups: { edit: { showType } },
      name
    } = this.props
    // 允许调用方再次指定展示域
    let createFields = currentItem.editFields || editFields
    let title = '新增' + (name || '数据')

    if (showType === showTypes.UPDATE) {
      title = '编辑' + (name || '数据')
    } else if (showType === showTypes.VIEW) {
      title = '查看' + (name || '数据')
    }

    if (showType === showTypes.CREATE) {
      createFields = (currentItem.editFields || editFields).filter(field => {
        return !meta[field].createHide
      })
    }

    return (
      <div ref='dialog' className='modal'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>×</span>
              </button>
              <h4 className='modal-title'>{title}</h4>
            </div>
            <form className='form-horizontal' onSubmit={this.submitForm.bind(this)}>
              <div className='modal-body'>
                <FieldGroup
                  columns={0}
                  fields={createFields}
                  meta={meta}
                  item={currentItem}
                  showType={showType}
                  onUpdate={this.props.onChange} />
              </div>
              <div className='modal-footer' style={{textAlign: 'center'}}>
                <button type='button' className='btn btn-default' style={{marginRight: 50}} data-dismiss='modal'>
                  取消
                </button>
                <button type='submit' className='btn btn-primary'>确认</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
