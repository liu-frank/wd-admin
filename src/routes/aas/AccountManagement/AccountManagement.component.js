import React from 'react'
import ReactDOM from 'react-dom'
import PageContent from 'components/PageContent'
import Box from 'components/Box'
import DataFilterEx from 'components/DataFilterEx'
import DataTable from 'components/DataTable'
import DataPaginator from 'components/DataPaginator'
import { checkResources, getResource } from 'utils'

class AccountManagement extends React.Component {
  componentWillMount () {
    const params = this.props.location.query
    let orgID = params.orgID

    this.props.queryRoles()
    this.props.queryCompanies()
    if (!orgID) {
      this.props.queryData()
    } else {
      this.props.resetOrgs()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.data.hasCompany && nextProps.data.hasCompany) {
      let company = this.props.location.query.company

      if (company) {
        this.props.updateFilter({
          field: 'company',
          value: company
        })
        this.props.queryOrgs(company)
      }
    }
    if (!this.props.data.hasOrg && nextProps.data.hasOrg) {
      const params = this.props.location.query
      let orgID = params.orgID

      if (orgID) {
        let company = params.company
        let level1 = params.level1
        let level2 = params.level2 || ''
        let level3 = params.level3 || ''

        this.props.updateFilter({
          field: 'company',
          value: company
        })
        this.props.updateFilter({
          field: 'level1',
          value: level1
        })
        this.props.updateFilter({
          field: 'level2',
          value: level2
        })
        this.props.updateFilter({
          field: 'level3',
          value: level3
        })
        this.props.queryData()
      }
    }
    if (!this.props.data.success && nextProps.data.success) {
      this.props.hideEdit()
    }
    if (!this.props.data.passwordSuccess && nextProps.data.passwordSuccess) {
      this.props.showConfirm({
        title: '重置成功',
        // message: `重置成功，密码为 <strong>${nextProps.data.newPassword}</strong>`,
        message: '重置密码成功，新密码已发送至用户手机',
        showCancel: false
      })
    }
  }

  showCreate () {
    this.props.push('/aas/account-detail')
  }

  showUpdate (item) {
    this.props.push('/aas/account-detail?id=' + item.userID)
  }

  selectFile () {
    const $fileInput = $(ReactDOM.findDOMNode(this.refs['file-input']))
    $fileInput.click()
  }

  uploadFile (e) {
    const $form = $(ReactDOM.findDOMNode(this.refs['file-form']))

    $form.submit()
    e.target.value = ''
  }

  onFilterChanged (param) {
    this.props.updateFilter(param)
    switch (param.field) {
      case 'company':
        this.props.queryOrgs(param.value)
        break
      default:
        break
    }
  }

  render () {
    const { queryRes, createRes, modifyRes, importRes } = checkResources(this.props)
    const passwordRes = getResource(this.props, '/password')
    const operations = []

    if (modifyRes) {
      operations.push({
        name: modifyRes.resourceDisplayName,
        callback: this.showUpdate.bind(this)
      })
    }

    if (passwordRes) {
      operations.push({
        name: passwordRes.resourceDisplayName,
        confirm: '请确认是否重置密码',
        callback: this.props.resetPassword
      })
    }

    return (
      <PageContent>
        <Box>
          <DataFilterEx
            data={this.props.data}
            onCreate={createRes && this.showCreate.bind(this)}
            createText={createRes && createRes.resourceDisplayName}
            onFilter={queryRes && this.props.switchPage.bind(null, 0)}
            filterText={queryRes && queryRes.resourceDisplayName}
            onChange={this.onFilterChanged.bind(this)} />
          {
            importRes &&
              <div style={{background: '#f1f7fb', height: 50, marginLeft: 12, marginRight: 12, marginTop: 2}}>
                <button
                  onClick={this.selectFile.bind(this)}
                  className='btn btn-primary'
                  style={{width: 160, height: 30, fontSize: 12, marginLeft: 10, marginTop: 10, float: 'left'}}
                >{importRes.resourceDisplayName}</button>
                <form
                  method='POST'
                  action='/aas/v1/user/upload'
                  encType='multipart/form-data'
                  ref='file-form'>
                  <input
                    ref='file-input'
                    type='file'
                    name='file'
                    accept='.xls'
                    onChange={this.uploadFile.bind(this)}
                    className='hidden' />
                </form>
                <span style={{fontSize: 12, color: '#9b9b9b', lineHeight: '50px', marginLeft: 10}}>
                  仅支持excel文件，请参考模板整理数据 <a href='/templates/user_template.xls'>下载文件模板</a>
                </span>
              </div>
          }
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

export default AccountManagement
