import React from 'react'
import PageContent from 'components/PageContent'
import Box from 'components/Box'
import DataFilter from 'components/DataFilter'
import DataTable from 'components/DataTable'
import { checkResources,getResource } from 'utils'


export default class MemberInfo extends React.Component {
  props: {
    data: React.propTypes.object,
    queryData: React.propTypes.func,
    updateFilter: React.propTypes.func,
    showConfirm: React.propTypes.func,
    push: React.propTypes.func
  }

  render () {
    const buttonQuery = getResource(this.props, '/query'),
          editButton = getResource(this.props, '/modify')
    const operations = editButton ? [{
      name: editButton.resourceDisplayName,
      icon: 'info',
      callback: item => window.open('/ams/member-detail?id=' + item.pwid + '&loginName=' + item.loginName)
    }] : []

    return (
      <PageContent>
        <Box>
          <DataFilter
            data={this.props.data}
            onFilter={buttonQuery && this.props.switchPage.bind(null,0)}
            onChange={this.props.updateFilter} />
          <DataTable
            data={this.props.data}
            operations={operations}
            onConfirm={this.props.showConfirm} />
        </Box>
      </PageContent>
    )
  }
}
