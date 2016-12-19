import React from 'react'
import moment from 'moment'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import { showTypes } from 'modules/popups'
import { inputTypes } from 'modules/inputs'
import _ from 'lodash';

export default class FieldGroupEx extends React.Component {
  changeItem (field, e) {
    this.props.onUpdate({
      field,
      value: e.target.value
    })
  }

  render () {
    const { fields = [], meta, item, onUpdate, secondLine } = this.props

    // 按钮或输入框的重要度都是左边比右边重要
    // 第一行按钮或输入框靠右对齐，所以要将数组反序然后右侧浮动
    // 第二行按钮或输入框靠左对齐，所以不用反序直接左侧浮动

    if (!secondLine) {
      _.reverse(fields)
    }

    return (
      <div style={{width: 680, float: 'right'}}>
      {
        fields.map((field, index) => {
          const section = meta[field]

          if (section.type === inputTypes.SELECT) {
            return (
              <select
                key={index}
                className='form-control'
                style={{
                  width: 160,
                  height: 30,
                  marginRight: 10,
                  fontSize: 12,
                  float: secondLine ? 'left' : 'right'
                }}
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
          } else {
            return (
              <input
                key={index}
                type={'text'}
                className='form-control'
                style={{
                  width: 160,
                  height: 30,
                  marginRight: 10,
                  fontSize: 12,
                  float: secondLine ? 'left' : 'right'
                }}
                id={field}
                maxLength={section.maxLength}
                value={item[field] || ''}
                onChange={this.changeItem.bind(this, field)}
                placeholder={section.label}
              />
            )
          }
        })
      }
      {this.props.children}
      </div>
    )
  }
}
