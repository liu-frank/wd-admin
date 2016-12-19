import React from 'react'
import PageContent from 'components/PageContent'
import Box from 'components/Box'
import DataFilter from 'components/DataFilter'
import DataTable from 'components/DataTable'
import DataPaginator from 'components/DataPaginator'
import EditDialog from 'components/Popups/EditDialog'
import { checkResources } from 'utils'

export default class <%= pascalEntityName %> extends React.Component {
  props: {
    data: React.propTypes.object,
    popups: React.propTypes.object,
    queryData: React.propTypes.func,
    createData: React.propTypes.func,
    updateData: React.propTypes.func,
    deleteData: React.propTypes.func,
    switchPage: React.propTypes.func,
    updateFilter: React.propTypes.func,
    updateItem: React.propTypes.func,
    resetItem: React.propTypes.func,
    showConfirm: React.propTypes.func,
    showCreateDialog: React.propTypes.func,
    showUpdateDialog: React.propTypes.func,
    showViewDialog: React.propTypes.func,
    hideEdit: React.propsTypes.func,
    success: React.propTypes.boolean
  }

  componentWillMount () {
    // Auto load data
    this.props.queryData()
  }

  componentWillReceiveProps (nextProps) {
    // Hide EditDialog, don't remove this!
    if (!this.props.data.success && nextProps.data.success) {
      this.props.hideEdit()
    }
  }

  showCreate () {
    this.props.resetItem()
    this.props.showCreateDialog()
  }

  showView(item) {
    this.props.resetItem(item)
    this.props.showViewDialog()
  }

  showUpdate (item) {
    this.props.resetItem(item)
    this.props.showUpdateDialog()
  }

  render () {
    const { canQuery, canModify } = checkResources(this.props)
    const operations = [{
      name: '查看',
      icon: 'info',
      callback: this.showView.bind(this)
    }, {
      name: '编辑',
      icon: 'primary',
      callback: this.showUpdate.bind(this)
    }, {
      name: '删除',
      icon: 'danger',
      confirm: '请确认删除数据',
      callback: this.props.deleteData
    }]
    const groupOps = [{
      name: '删除',
      icon: 'danger',
      confirm: '请确认删除数据',
      callback: items => console.log('batch items: ', items)
    }]

    return (
      <PageContent>
        <Box>
          <DataFilter
            data={this.props.data}
            onFilter={canQuery && this.props.switchPage.bind(null, 0)}
            onCreate={canModify && this.showCreate.bind(this)}
            onChange={this.props.updateFilter} />
          <DataTable
            data={this.props.data}
            operations={operations}
            onConfirm={this.props.showConfirm} />
          <DataPaginator
            data={this.props.data}
            onSwitch={this.props.switchPage} />
        </Box>
        <EditDialog
          {...this.props}
          onChange={this.props.updateItem}
          onCreate={this.props.createData}
          onUpdate={this.props.updateData} />
      </PageContent>
    )
  }
}

