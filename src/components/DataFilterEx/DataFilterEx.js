import React from 'react'
import FieldGroupEx from 'components/FieldGroupEx'
import _ from 'lodash';

export default class DataFilterEx extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }

  changeFilter (field, e) {
    this.props.onChange({
      field: field,
      value: e.target.value
    })
  }

  toggleFilter () {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  render () {
    const { data: { meta, filterFields, currentFilter },
      onCreate, onFilter, onChange } = this.props
    let multiFields = _.chunk(filterFields, 4)

    return (
      <div className='box-header' style={{background: '#f1f7fb', marginTop: 12, marginLeft: 12, marginRight: 12}}>
        <div className='clearfix'>
        {
          onCreate &&
            <input
              type='button'
              className='btn btn-success pull-left'
              style={{width: 80, height: 30, fontSize: 12}}
              onClick={onCreate}
              value={this.props.createText || '新增'} />
        }
        {
          onFilter &&
            <input
              type='button'
              className='btn btn-primary pull-right'
              style={{width: 80, height: 30, fontSize: 12}}
              onClick={onFilter}
              value={this.props.filterText || '查询'} />
        }
          <FieldGroupEx
            fields={multiFields[0]}
            meta={meta}
            item={currentFilter}
            onUpdate={onChange} />
        </div>
        {
          multiFields[1] && this.state.menuOpen &&
            <div style={{marginTop: 6, marginRight: 80}} className='clearfix'>
              <FieldGroupEx
                fields={multiFields[1]}
                meta={meta}
                item={currentFilter}
                secondLine={true}
                onUpdate={onChange} />
            </div>
        }
        {
          multiFields[1] &&
            <div className='text-center' style={{marginTop: 6}}>
              <a
                href='javascript:void(0);'
                style={{fontSize: 10}}
                onClick={this.toggleFilter.bind(this)}>
                {
                  this.state.menuOpen ? '收起' : '查看更多条件'
                }
                {
                  this.state.menuOpen
                    ? <i className='fa fa-caret-up'
                      style={{
                        fontSize: 12,
                        marginLeft: 2
                      }} />
                    : <i className='fa fa-caret-down'
                      style={{
                        fontSize: 12,
                        marginLeft: 2
                      }} />
                }
              </a>
            </div>
        }
      </div>
    )
  }
}
