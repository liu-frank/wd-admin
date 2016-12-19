import React from 'react'
import Box from 'components/Box'
import FieldGroup from 'components/FieldGroup'

export default class DataFilter extends React.Component {
  changeFilter (field, e) {
    this.props.onChange({
      field: field,
      value: e.target.value
    })
  }

  render () {
    const { data: { meta, filterFields, currentFilter },
      onCreate, onFilter, onChange } = this.props

    return (
      <Box.Header>
        <FieldGroup
          columns={4}
          fields={filterFields}
          meta={meta}
          item={currentFilter}
          onUpdate={onChange}>
          <div className='row col-sm-12'>
            {
              onFilter &&
              <div className='col-sm-1' >
                <label></label>
                <input
                  type='button'
                  style={{marginTop: '5px'}}
                  className='btn btn-info '
                  onClick={onFilter}
                  value={this.props.filterText || '查询'} />
              </div>
            }
          {
            onCreate &&
              <div className='col-sm-1' >
                <label></label>
                <input
                  type='button'
                  style={{marginTop: '5px'}}
                  className='btn btn-primary'
                  onClick={onCreate}
                  value={this.props.createText || '新增'} />
              </div>
          }

          </div>
        </FieldGroup>
      </Box.Header>
    )
  }
}

DataFilter.propTypes = {
  //data: {
  //  meta: React.PropTypes.object,
  //  currentFilter: React.PropTypes.object,
  //  filterFields: React.PropTypes.array.isRequired
  //},
  onCreate: React.PropTypes.func,
  onFilter: React.PropTypes.func,
  filterText: React.PropTypes.string,
  createText: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
}
