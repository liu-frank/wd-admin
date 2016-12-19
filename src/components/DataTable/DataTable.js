import React from 'react'
import moment from 'moment'
import Box from 'components/Box'
import { inputTypes } from 'modules/inputs'

export default class DataTable extends React.Component {
  props: {
    data: React.propTypes.object,
    operations: React.propTypes.array,
    groupOps: React.propTypes.array,
    onConfirm: React.propTypes.func
  }

  constructor (props) {
    super(...props)
    this.state = {
      selection: []
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.data.list !== nextProps.data.list) {
      this.setState({
        selection: []
      })
    }
  }

  toggleSelection (index, e) {
    if (e.target.checked) {
      this.state.selection.push(index)
    } else {
      this.state.selection.splice(this.state.selection.indexOf(index), 1)
    }
    this.forceUpdate()
  }

  selectAll () {
    const selection = []

    for (let i = 0; i < this.props.data.list.length; i++) {
      selection.push(i)
    }
    this.setState({ selection })
  }

  clearAll () {
    this.setState({
      selection: []
    })
  }

  onButtonClick (operation, dataItem) {
    if (operation.confirm) {
      this.props.onConfirm({
        message: operation.confirm,
        onConfirm: operation.callback.bind(null, dataItem)
      })
    } else {
      operation.callback(dataItem)
    }
  }

  render () {
    const { data, operations, groupOps } = this.props

    return (
      <Box.Body>
        <div className='row' style={{overflow: 'auto'}}>
          <table ref='table' style={{
            margin: 10,
            width: '98%',
            minWidth: 800
          }} className='table table-bordered table-hover text-center table-responsive table-striped'>
            <thead>
              <tr>
              {
                groupOps && <th style={{
                  width: 50
                }}>
                  选择
                </th>
              }
              {
                data.tableFields.map((field, index) => {
                  const section = data.meta[field] || {}

                  return (<th style={{
                    verticalAlign: 'middle',
                    width: section.width || 'auto'
                  }} key={index}>{section.label}</th>)
                })
              }
              {
                operations && <th style={{
                  verticalAlign: 'middle',
                  width: data.meta['operations'] ? (data.meta['operations'].width || 'auto') : 'auto'
                }} >操作</th>
              }
              </tr>
            </thead>
            <tbody>
            {
              data.list.map((item, index) => (
                <tr key={index}>
                {
                  groupOps &&
                    <td >
                      <input
                        type='checkbox'
                        checked={this.state.selection.indexOf(index) >= 0}
                        onChange={this.toggleSelection.bind(this, index)} />
                    </td>
                }
                {
                  data.tableFields.map((field, index) => {
                    const section = data.meta[field]

                    if (section.display) {
                      return (
                        <td key={index}>{section.display(item)}</td>
                      )
                    } else if (section.type === inputTypes.SELECT) {
                      const option = section.options.find(option => option.value === (item[field] + ''))

                      return (
                        <td key={index}>{option && option.label}</td>
                      )
                    } else if (section.type === inputTypes.MULTISELECT) {
                      let value = ''

                      if (item[field] !== '') {
                        value = item[field].split(',').map(role => {
                          const selectedItem = section.options.find(option => (option.value + '') === role)
                          return selectedItem ? selectedItem.label : ''
                        }).join(',')
                      }

                      return <td key={index}>{value}</td>
                    } else if (section.type === inputTypes.TREESELECT) {
                      const value = item[field].split(',').map(resource => {
                        for (let system of section.options) {
                          for (let menu of system.options) {
                            if (menu.resourceID === resource) {
                              return menu.label
                            }
                            for (let button of menu.options) {
                              if (button.resourceId === resource) {
                                return button.label
                              }
                            }
                          }
                        }
                      }).join(', ')

                      return <td key={index}>{value}</td>
                    } else if (section.type === inputTypes.DATE) {
                      if (item[field]) {
                        return <td key={index}>{moment(item[field]).format('YYYY-MM-DD HH:mm:ss')}</td>
                      } else {
                        return <td key={index}></td>
                      }
                    } else {
                      return (
                        <td key={index}>{item[field]}</td>
                      )
                    }
                  })
                }
                {
                  operations &&
                    <td >
                    {
                      operations.map((operation, index) => (
                        <a
                          key={index}
                          style={index === 0 ? {cursor: 'pointer'} : {marginLeft: '10px', cursor: 'pointer'}}
                          onClick={this.onButtonClick.bind(this, operation, item)}>
                          {operation.name}
                        </a>
                      ))
                    }
                    </td>
                }
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
        <div className='row'>
        {
          groupOps &&
            <label style={{
              float: 'left',
              marginLeft: '30px',
              fontWeight: 'normal'
            }}>
              <input
                type='checkbox'
                style={{marginRight: '5px'}}
                checked={this.state.selection.length === this.props.data.list.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    this.selectAll()
                  } else {
                    this.clearAll()
                  }
                }} />
              全选
            </label>
        }
        {
          groupOps && groupOps.map((operation, index) => (
            <div className='col-sm-1 text-center' key={index}>
              <button
                className={`btn btn-xs btn-${operation.icon}`}
                disabled={this.state.selection.length === 0}
                onClick={this.onButtonClick.bind(this, operation,
                  this.state.selection.map(itemIndex => this.props.data.list[itemIndex]))}>
                {operation.name}
              </button>
            </div>
          ))
        }
        </div>
        {
          (data.list.length === 0) && <div className='row text-center'>没有数据</div>
        }
      </Box.Body>
    )
  }
}
