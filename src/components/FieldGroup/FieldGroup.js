import React from 'react'
import moment from 'moment'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import { showTypes } from 'modules/popups'
import { inputTypes } from 'modules/inputs'

export default class FieldGroup extends React.Component {
  props: {
    item: React.propTypes.object.isRequired,
    onUpdate: React.propTypes.func.isRequired,
    showType: React.propTypes.string
  }

  changeItem (field, e) {
    this.props.onUpdate({
      field,
      value: e.target.value
    })
  }

  changeOption (field, section, linkedField, e) {
    const { item } = this.props
    const selection = item[field] ? item[field].split(',') : []

    if (e.target.checked) {
      if (selection.indexOf(section.value + '') === -1) {
        selection.push(section.value + '')
      }
      // 下层级联上层
      if (linkedField && (selection.indexOf(linkedField.value + '') === -1)) {
        selection.push(linkedField.value)
      }
      // 上层级联下层
      if (section.options) {
        section.options.forEach(child => {
          if (selection.indexOf(child.value + '') === -1) {
            selection.push(child.value + '')
          }
        })
      }
    } else {
      // 上层级联下层
      if (section.options) {
        selection.splice(selection.indexOf(section.value + ''), 1)
        section.options.forEach(child => {
          if (selection.indexOf(child.value + '') > -1) {
            selection.splice(selection.indexOf(child.value + ''), 1)
          }
        })
      } else {
        selection.splice(selection.indexOf(section.value + ''), 1)
      }
    }

    this.props.onUpdate({
      field,
      value: selection.join(',')
    })
  }

  setDate (section, event, picker) {
    this.props.onUpdate({
      field: section.startField,
      value: picker.startDate.format('YYYY-MM-DD')
    })
    this.props.onUpdate({
      field: section.endField,
      value: picker.endDate.format('YYYY-MM-DD')
    })
  }

  clearDate (section, event, picker) {
    console.log('cancel clicked')
    this.props.onUpdate({
      field: section.startField,
      value: null
    })
    this.props.onUpdate({
      field: section.endField,
      value: null
    })
    picker.startDate = moment()
    picker.endDate = moment()
  }

  inputComponent (section, field) {
    // TODO: Use exported consts for string
    const { item, showType = showTypes.CREATE } = this.props
    const locale = {
      applyLabel: '确定',
      cancelLabel: '取消',
      daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      format: 'YYYY-MM-DD',
      separator: ' - ',
      fromLabel: '起始',
      toLabel: '终止',
      customRangeLabel: '自定义',
      weekLabel: 'W',
      firstDay: 1
    }

    switch (section.type) {
      case inputTypes.DATERANGE:
        return (
          <DateRangePicker
            locale={locale}
            maxDate={section.maxDate || null}
            onApply={this.setDate.bind(this, section)}
            onCancel={this.clearDate.bind(this, section)}>
          {
            item[section.startField]
              ? <p className='form-control'>
                  {item[section.startField]} ~ {item[section.endField]}
              </p>
              : <p className='form-control'>点击选择日期</p>
          }
          </DateRangePicker>
        )
      case inputTypes.TREESELECT:
        const selection = item[field] ? item[field].split(',') : []
        return (
          <div className='box-body'>
          {
            section.options.map((menu, index) => (
              <div key={index}>
                <div className='box-header'>
                  <label>
                    <input
                      type='checkbox'
                      disabled={showType === showTypes.VIEW}
                      checked={(selection.indexOf(menu.value + '') >= 0)}
                      onChange={this.changeOption.bind(this, field, menu, null)}
                    /> {menu.label}
                  </label>
                </div>
                {
                  (menu.options.length > 0)
                  ? <div className='box-body checkbox'>
                    {
                      menu.options.map((button, index) => (
                        <label className='col-sm-4' key={index}>
                          <input
                            type='checkbox'
                            disabled={showType === showTypes.VIEW}
                            checked={(selection.indexOf(button.value + '') >= 0)}
                            onChange={this.changeOption.bind(this, field, button, menu)}
                          />{button.label}
                        </label>
                      ))
                    }
                  </div> : null
                }
              </div>
            ))
          }
          </div>
        )
      case inputTypes.SELECT:
        return (
          <select
            className='form-control'
            disabled={showType === showTypes.VIEW || (showType === showTypes.UPDATE && section.readOnly)}
            id={field}
            value={item[field] || (section.options[0] ? section.options[0].value : '')}
            onChange={this.changeItem.bind(this, field)}>
            {
              section.options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))
            }
          </select>
        )
      case inputTypes.MULTISELECT:
        console.log('item[field]', item[field])
        const multi = item[field] ? item[field].split(',') : []
        return (
          <div className='row'>
          {
            section.options.map((option, index) => (
              <div key={index} className='checkbox col-sm-4'>
                <label>
                  <input
                    type='checkbox'
                    disabled={showType === showTypes.VIEW}
                    checked={(multi.indexOf(option.value + '') >= 0)}
                    onChange={this.changeOption.bind(this, field, option, null)} />
                  {option.label}
                </label>
              </div>
            ))
          }
          </div>
        )
      case inputTypes.CHECKBOX:
        return (
          <div className='checkbox'>
            <label>
              <input
                type='checkbox'
                id={field}
                checked={section.value}
                onChange={this.changeItem.bind(this, section)} />
              {section.name}
            </label>
          </div>
        )
      case inputTypes.PHONE:
        return (
          <input
            type='text'
            className='form-control'
            id={field}
            required={section.required}
            disabled={showType === showTypes.VIEW}
            value={item[field] || ''}
            onChange={this.changeItem.bind(this, field)}
            placeholder={section.label} />
        )
      case inputTypes.EMAIL:
        return (
          <input
            type='email'
            className='form-control'
            id={field}
            required={section.required}
            maxLength={section.maxLength}
            disabled={showType === showTypes.VIEW}
            value={item[field] || ''}
            onChange={this.changeItem.bind(this, field)}
            placeholder={section.label} />
        )
      case inputTypes.TEXT:
      default:
        return (
          <input
            type={'text'}
            className='form-control'
            id={field}
            required={section.required}
            maxLength={section.maxLength}
            disabled={showType === showTypes.VIEW}
            value={item[field] || ''}
            onChange={this.changeItem.bind(this, field)}
            placeholder={section.label} />
        )
    }
  }

  render () {
    const { fields = [], meta, item, onUpdate, columns } = this.props
    let columClass = ''

    switch (columns) {
      case 2:
        columClass = 'col-sm-6'
        break
      case 3:
        columClass = 'col-sm-4'
        break
      case 4:
        columClass = 'col-sm-3'
        break
    }

    return (
      <div className='box-body'>
      {
        fields.map((field, index) => {
          const section = meta[field]

          if (columns === 0) {
            return (
              <div className={'form-group'} key={index}>
                <label
                  className='control-label col-sm-2'
                  htmlFor={field}>{section.label}</label>
                <div className='col-sm-10'>
                  {this.inputComponent(section, field)}
                </div>
              </div>
            )
          } else {
            return (
              <div
                className={'form-group ' + columClass}
                key={index}>
                <label htmlFor={field}>{section.label}</label>
                {this.inputComponent(section, field)}
              </div>
            )
          }
        })
      }
      {this.props.children}
      </div>
    )
  }
}
