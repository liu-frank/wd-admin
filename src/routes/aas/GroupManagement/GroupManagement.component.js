import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import PageContent from 'components/PageContent'
import Box from 'components/Box'
import DataFilterEx from 'components/DataFilterEx'
import EditDialog from 'components/Popups/EditDialog'
import { checkResources } from 'utils'

class GroupManagement extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      foldMap: {}
    }
  }

  componentWillMount () {
    this.props.queryCompanies()
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.data.success && nextProps.data.success) {
      this.props.hideEdit()
    }
  }

  queryCompanies () {
    const company = this.props.data.currentFilter.company

    if (_.isEmpty(company)) {
      this.props.showFail({
        message: '请选择公司'
      })
    } else {
      this.props.queryData()
    }
  }

  exportCompanies () {
    const company = this.props.data.currentFilter.company

    if (_.isEmpty(company)) {
      this.props.showFail({
        message: '请选择公司'
      })
    } else {
      ReactDOM.findDOMNode(this.refs['export-form-input']).value = company
      const $form = $(ReactDOM.findDOMNode(this.refs['export-form']))
      $form.submit()
    }
  }

  toggleFold (item) {
    this.state.foldMap[item.orgID] = !this.state.foldMap[item.orgID]
    this.forceUpdate()
  }

  isParentFolded (target) {
    if (target.displayLevel === 3) {
      return this.state.foldMap[target.parentOrgID] || this.state.foldMap[target.parentCompanyID]
    }
    return this.state.foldMap[target.parentOrgID]
  }

  createSub (department) {
    this.props.resetItem({
      parentOrgID: department.orgID,
      orgName: '',
      editFields: ['orgName']
    })
    this.props.showCreateDialog()
  }

  updateSub (department) {
    this.props.resetItem({
      orgID: department.orgID,
      orgName: department.orgName,
      parentOrgID: department.parentOrgID,
      status: department.status,
      editFields: ['orgName', 'status']
    })
    this.props.showUpdateDialog()
  }

  updateThird (department) {
    this.props.resetItem({
      orgID: department.orgID,
      orgName: department.orgName,
      status: department.status,
      level1: department.level1,
      level2: department.level2,
      parentOrgID: department.parentOrgID
    })
    this.props.showUpdateDialog()
  }

  showStuff (department) {
    const info = {
      company: this.props.data.currentFilter.company,
      level1: department.level1
    }

    if (department.level2) {
      info.level2 = department.level2
      if (department.level3) {
        info.level3 = department.level3
        info.orgID = department.level3
      } else {
        info.orgID = department.level2
      }
    } else {
      info.orgID = department.level1
    }

    let url = `/aas/account-management?company=${info.company}&orgID=${info.orgID}&level1=${info.level1}`

    if (info.level2) {
      url += `&level2=${info.level2}`
    }
    if (info.level3) {
      url += `&level3=${info.level3}`
    }

    this.props.push(url)
  }

  onFilterChanged (param) {
    this.props.updateFilter(param)
    switch (param.field) {
      case 'company':
        this.props.queryData()
        break
      default:
        break
    }
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

  _generateDisplayList (list) {
    let result = []

    if (list) {
      list.forEach(company => {
        company.displayLevel = 1
        company.level1 = company.orgID
        result.push(company)
        company.subs.forEach(sub => {
          sub.displayLevel = 2
          sub.level1 = company.orgID
          sub.level2 = sub.orgID
          result.push(sub)
          sub.subs.forEach(child => {
            child.displayLevel = 3
            child.level1 = company.orgID
            child.level2 = sub.orgID
            child.level3 = child.orgID
            child.parentCompanyID = company.orgID
            result.push(child)
          })
        })
      })
    }

    return result
  }

  render () {
    const {
      queryRes,
      createRes,
      modifyRes,
      importRes,
      exportRes,
      detailRes
    } = checkResources(this.props)

    let displayList = this._generateDisplayList(this.props.data.list)

    return (
      <PageContent>
        <Box>
          <DataFilterEx
            data={this.props.data}
            onCreate={exportRes && this.exportCompanies.bind(this)}
            createText={exportRes && exportRes.resourceDisplayName}
            onFilter={queryRes && this.queryCompanies.bind(this)}
            filterText={queryRes && queryRes.resourceDisplayName}
            onChange={this.props.updateFilter.bind(this)} />
          <form
            method='POST'
            action='/aas/v1/org/download'
            encType='multipart/form-data'
            ref='export-form'>
            <input
              ref='export-form-input'
              type='hidden'
              name='orgID' />
          </form>
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
                  action='/aas/v1/org/upload'
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
                  仅支持excel文件，请参考模板整理数据 <a href='/templates/org_template.xls'>下载文件模板</a>
                </span>
              </div>
          }
          <table className='table table-bordered table-hover table-responsive table-striped text-center'>
            <thead>
              <tr>
                <th style={{width: '40%'}}>用户组名称</th>
                <th style={{width: '15%'}}>ID</th>
                <th style={{width: '45%'}}>操作</th>
              </tr>
            </thead>
            <tbody>
            {
              displayList.map(item => {
                switch (item.displayLevel) {
                  case 1:
                    return (
                      <tr key={item.orgID}>
                        <td
                          style={{ textAlign: 'left', paddingLeft: 34, cursor: 'pointer' }}
                          onClick={this.toggleFold.bind(this, item)}>
                          {
                            this.state.foldMap[item.orgID]
                              ? <i className='fa fa-chevron-right' style={{marginRight: 8}}></i>
                              : <i className='fa fa-chevron-down' style={{marginRight: 4}}></i>
                          }
                          {item.orgName}
                        </td>
                        <td>{item.orgID}</td>
                        <td style={{textAlign: 'right'}}>
                        {
                          createRes &&
                            <a href='javascript:void(0);'
                              style={{paddingRight: 65}}
                              onClick={this.createSub.bind(this, item)}>{createRes.resourceDisplayName}</a>
                        }
                        {
                          modifyRes &&
                            <a href='javascript:void(0);'
                              style={{paddingRight: 65}}
                              onClick={this.updateSub.bind(this, item)}>{modifyRes.resourceDisplayName}</a>
                        }
                        {
                          detailRes &&
                            <a href='javascript:void(0);'
                              style={{paddingRight: 65}}
                              onClick={this.showStuff.bind(this, item)}>{detailRes.resourceDisplayName}</a>
                        }
                        </td>
                      </tr>
                    )
                  case 2:
                    if (this.isParentFolded(item)) {
                      return null
                    } else {
                      return (
                        <tr key={item.orgID}>
                          <td
                            style={{ textAlign: 'left', paddingLeft: 62, cursor: 'pointer' }}
                            onClick={this.toggleFold.bind(this, item)}>
                            {
                              this.state.foldMap[item.orgID]
                                ? <i className='fa fa-chevron-right' style={{marginRight: 8}}></i>
                                : <i className='fa fa-chevron-down' style={{marginRight: 4}}></i>
                            }
                            {item.orgName}
                          </td>
                          <td>{item.orgID}</td>
                          <td style={{textAlign: 'right'}}>
                          {
                            createRes &&
                              <a href='javascript:void(0);'
                                style={{paddingRight: 65}}
                                onClick={this.createSub.bind(this, item)}>{createRes.resourceDisplayName}</a>
                          }
                          {
                            modifyRes &&
                              <a href='javascript:void(0);'
                                style={{paddingRight: 65}}
                                onClick={this.updateSub.bind(this, item)}>{modifyRes.resourceDisplayName}</a>
                          }
                          {
                            detailRes &&
                              <a href='javascript:void(0);'
                                style={{paddingRight: 65}}
                                onClick={this.showStuff.bind(this, item)}>{detailRes.resourceDisplayName}</a>
                          }
                          </td>
                        </tr>
                      )
                    }
                  case 3:
                    if (this.isParentFolded(item)) {
                      return null
                    } else {
                      return (
                        <tr key={item.orgID}>
                          <td
                            style={{ textAlign: 'left', paddingLeft: 105 }}
                            onClick={this.toggleFold.bind(this, item)}>
                            {item.orgName}
                          </td>
                          <td>{item.orgID}</td>
                          <td style={{textAlign: 'right'}}>
                            {
                              modifyRes &&
                                <a href='javascript:void(0);'
                                  style={{paddingRight: 65}}
                                  onClick={this.updateThird.bind(this, item)}>{modifyRes.resourceDisplayName}</a>
                            }
                            {
                              detailRes &&
                                <a href='javascript:void(0);'
                                  style={{paddingRight: 65}}
                                  onClick={this.showStuff.bind(this, item)}>{detailRes.resourceDisplayName}</a>
                            }
                          </td>
                        </tr>
                      )
                    }
                  default:
                    break
                }
              })
            }
            </tbody>
          </table>
          <EditDialog
            {...this.props}
            name='组织机构'
            onChange={this.props.updateItem}
            onCreate={this.props.createData}
            onUpdate={this.props.updateData} />
        </Box>
      </PageContent>
    )
  }
}

export default GroupManagement
