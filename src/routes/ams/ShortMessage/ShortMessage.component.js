import React from 'react'
import PageContent from 'components/PageContent'
import Box from 'components/Box'
import DataFilter from 'components/DataFilter'
import DataTable from 'components/DataTable'
import DataPaginator from 'components/DataPaginator'

export default class ShortMessage extends React.Component {
  props: {
    data: React.propTypes.object,
    popups: React.propTypes.object,
    queryData: React.propTypes.func,
    createData: React.propTypes.func,
    switchPage: React.propTypes.func,
    updateFilter: React.propTypes.func,
    updateItem: React.propTypes.func,
    resetItem: React.propTypes.func,
    showSuccess: React.propTypes.func,
    showEdit: React.propTypes.func,
    hideEdit: React.propsTypes.func,
    success: React.propTypes.boolean
  }

  componentWillMount () {
    this.props.queryData()
  }

  sendCode (item) {
    this.props.showSuccess({
      message: '发送成功!'
    })
  }

  render () {
    const operations = [{
      name: '重发验证码',
      icon: 'default',
      callback: this.sendCode.bind(this)
    }]

    return (
      <PageContent>
        <Box>
          <DataFilter
            data={this.props.data}
            onFilter={this.props.switchPage.bind(null,0)}
            onChange={this.props.updateFilter} />
          <DataTable
            data={this.props.data}
            operations={operations}
            onConfirm={this.props.showConfirm} />
          <DataPaginator
            data={this.props.data}
            onSwitch={this.props.switchPage} />
        </Box>
      </PageContent>
    )
  }
}
