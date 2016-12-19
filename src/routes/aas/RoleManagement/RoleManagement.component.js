import React from 'react'
import PageContent from 'components/PageContent'
import Box from 'components/Box'
import DataFilterEx from 'components/DataFilterEx'
import DataTable from 'components/DataTable'
import DataPaginator from 'components/DataPaginator'
import EditDialog from 'components/Popups/EditDialog'
import { getResource } from 'utils'

export default class RoleManagement extends React.Component {
  componentWillMount () {
    this.props.queryResource()
    this.props.queryData()
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.data.success && nextProps.data.success) {
      this.props.hideEdit()
    }
  }

  showCreate () {
    this.props.resetItem()
    this.props.showCreateDialog()
  }

  showUpdate (item) {
    this.props.resetItem(item)
    this.props.showUpdateDialog()
  }

  render () {
    const queryResource = getResource(this.props, '/query')
    const createRes = getResource(this.props, '/add')
    const modifyResource = getResource(this.props, '/modify')
    const authorizeResource = getResource(this.props, '/authorize')

    const operations = modifyResource ? [{
      name: modifyResource.resourceDisplayName,
      callback: this.showUpdate.bind(this)
    }] : []

    if (authorizeResource) {
      operations.push({
        name: authorizeResource.resourceDisplayName,
        callback: item => this.props.push('/aas/role-detail?id=' + item.appRoleID + '&appID=' + item.appID)
      })
    }

    return (
      <PageContent>
        <Box>
          <DataFilterEx
            data={this.props.data}
            onFilter={queryResource && this.props.switchPage.bind(null, 0)}
            filterText={queryResource && queryResource.resourceDisplayName}
            onCreate={createRes && this.showCreate.bind(this)}
            createText={createRes && createRes.resourceDisplayName}
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
          name='角色'
          {...this.props}
          onChange={this.props.updateItem}
          onCreate={this.props.createData}
          onUpdate={this.props.updateData} />
      </PageContent>
    )
  }
}

RoleManagement.propTypes = {
  data: React.PropTypes.object,
  popups: React.PropTypes.object,
  queryData: React.PropTypes.func,
  queryResource: React.PropTypes.func,
  createData: React.PropTypes.func,
  updateData: React.PropTypes.func,
  switchPage: React.PropTypes.func,
  updateFilter: React.PropTypes.func,
  updateItem: React.PropTypes.func,
  resetItem: React.PropTypes.func,
  showConfirm: React.PropTypes.func,
  showCreateDialog: React.PropTypes.func,
  showUpdateDialog: React.PropTypes.func,
  push: React.PropTypes.func,
  showEdit: React.PropTypes.func,
  hideEdit: React.PropTypes.func
  //success: React.PropTypes.boolean
}
