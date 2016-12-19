import React from 'react'
import _ from 'lodash'
import PageContent from 'components/PageContent'
import Box from 'components/Box'

export default class AccountDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.queryCompanies()
    this.props.queryRoles()
    this.props.queryGroups()

    let userID = this.props.location.query.id

    if (userID) {
      this.props.queryData(userID)
    } else {
      this.props.resetItem({
        appRoleIDList: [],
        groupIDList: [],
        company: '',
        level1: '',
        level2: '',
        level3: ''
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.data.success && nextProps.data.success) {
      this.props.goBack()
    }
  }

  onSubmit (e) {
    e.preventDefault()

    let currentItem = this.props.data.currentItem

    //if (!(/^1[34578]\d{9}$/.test(currentItem.mobile))) {
    //  this.props.showFail({
    //    message: '手机号码不合法'
    //  })
    //  return
    //}

    if ([0, 1, '0', '1'].indexOf(currentItem.sex) < 0) {
      this.props.showFail({
        message: '请选择用户性别'
      })
      return
    }

    if ([0, 1, '0', '1'].indexOf(currentItem.employeeType) < 0) {
      this.props.showFail({
        message: '请选择用户类型'
      })
      return
    }

    if (_.isEmpty(currentItem.company)) {
      this.props.showFail({
        message: '请选择所在公司'
      })
      return
    }

    if (_.isEmpty(currentItem.level1)) {
      this.props.showFail({
        message: '请选择所在部门'
      })
      return
    }

    if (this.props.location.query.id) {
      this.props.updateData()
    } else {
      this.props.createData()
    }
  }

  onFieldChange (field, e) {
    if (field === 'company') {
      this.props.queryOrgs(e.target.value)
    }

    this.props.updateItem({
      field,
      value: e.target.value
    })
  }

  hasRole (currentItem, role) {
    return currentItem.appRoleIDList.indexOf(role.value) >= 0
  }

  hasAllRoles (currentItem, meta) {
    return currentItem.appRoleIDList.length === meta.appRoleIDList.options.length
  }

  toggleAllRoles (currentItem, meta) {
    let list = []

    if (!this.hasAllRoles(currentItem, meta)) {
      list = meta.appRoleIDList.options.map(role => role.value)
    }

    this.props.updateItem({
      field: 'appRoleIDList',
      value: list
    })
  }

  onRoleChange (currentItem, role, e) {
    let list = currentItem.appRoleIDList

    if (this.hasRole(currentItem, role)) {
      list = list.filter(item => item !== role.value)
    } else {
      list.push(role.value)
    }

    this.props.updateItem({
      field: 'appRoleIDList',
      value: list
    })
  }

  hasGroup (currentItem, group) {
    return currentItem.groupIDList.indexOf(group.value) >= 0
  }

  hasAllGroups (currentItem, meta) {
    return currentItem.groupIDList.length === meta.groupIDList.options.length
  }

  toggleAllGroups (currentItem, meta) {
    let list = []

    if (!this.hasAllGroups(currentItem, meta)) {
      list = meta.groupIDList.options.map(group => group.value)
    }

    this.props.updateItem({
      field: 'groupIDList',
      value: list
    })
  }

  onGroupChange (currentItem, group, e) {
    let list = currentItem.groupIDList

    if (this.hasGroup(currentItem, group)) {
      list = list.filter(item => item !== group.value)
    } else {
      list.push(group.value)
    }

    this.props.updateItem({
      field: 'groupIDList',
      value: list
    })
  }

  render () {
    let currentItem = this.props.data.currentItem
    let meta = this.props.data.meta
    let roleGroups = this.props.data.roleGroups
    let groupList = meta.groupIDList.options

    return (
      <PageContent>
        <Box>
          <div className='box-header with-border'>
          {
            this.props.location.query.id ? '修改用户' : '新增用户'
          }
          </div>
          <form style={{margin: 10}} onSubmit={this.onSubmit.bind(this)}>
            <div className='row'>
              <div className='col-md-5'>
                <div className='form-group'>
                  <label className='control-label'>
                    万信号
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    maxLength={20}
                    value={currentItem.iMAccount || ''}
                    onChange={this.onFieldChange.bind(this, 'iMAccount')}
                  />
                </div>
              </div>
              <div className='col-md-offset-1 col-md-5'>
                <div className='form-group'>
                  <label className='control-label'>
                    用户姓名
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    required
                    maxLength={20}
                    value={currentItem.userName || ''}
                    onChange={this.onFieldChange.bind(this, 'userName')}
                  />
                </div>
              </div>
            </div>
            <div className='row' style={{marginTop: 10}}>
              <div className='col-md-5'>
                <div className='form-group'>
                  <label className='control-label'>
                    手机号
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    required
                    maxLength={11}
                    value={currentItem.mobile || ''}
                    onChange={this.onFieldChange.bind(this, 'mobile')}
                  />
                </div>
              </div>
              <div className='col-md-offset-1 col-md-5'>
                <div className='form-group'>
                  <label className='control-label'>
                    Email
                  </label>
                  <input
                    className='form-control'
                    type='email'
                    maxLength={50}
                    value={currentItem.email || ''}
                    onChange={this.onFieldChange.bind(this, 'email')}
                  />
                </div>
              </div>
            </div>
            <div className='row' style={{marginTop: 10}}>
              <div className='col-md-5'>
                <div className='form-group'>
                  <label className='control-label'>
                    性别
                  </label>
                  <div className='row'>
                    <label className='checkbox-inline'>
                      <input
                        type='radio'
                        id='sex'
                        checked={currentItem.sex == 0}
                        onChange={this.onFieldChange.bind(this, 'sex')}
                        value={0} /> 男
                    </label>
                    <label className='checkbox-inline'>
                      <input
                        type='radio'
                        id='sex'
                        checked={currentItem.sex == 1}
                        onChange={this.onFieldChange.bind(this, 'sex')}
                        value={1} /> 女
                    </label>
                  </div>
                </div>
              </div>
              <div className='col-md-offset-1 col-md-5'>
                <div className='form-group'>
                  <label className='control-label'>
                    用户类型
                  </label>
                  <div className='row'>
                    <label className='checkbox-inline'>
                      <input
                        type='radio'
                        id='sex'
                        checked={currentItem.employeeType == 0}
                        onChange={this.onFieldChange.bind(this, 'employeeType')}
                        value={0} /> 正式员工
                    </label>
                    <label className='checkbox-inline'>
                      <input
                        type='radio'
                        id='sex'
                        checked={currentItem.employeeType == 1}
                        onChange={this.onFieldChange.bind(this, 'employeeType')}
                        value={1} /> 外包
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className='row' style={{marginTop: 10}}>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label className='control-label'>
                  所在公司
                  </label>
                  <select
                    className='form-control'
                    value={currentItem.company}
                    onChange={this.onFieldChange.bind(this, 'company')}
                  >
                  {
                    meta.company.options.map(company =>
                      <option
                        key={company.value}
                        value={company.value}>
                        {company.label}
                      </option>
                    )
                  }
                  </select>
                </div>
              </div>
            </div>
            <div className='row' style={{marginTop: 10}}>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label className='control-label'>
                  一级部门
                  </label>
                  <select
                    className='form-control'
                    value={currentItem.level1}
                    onChange={this.onFieldChange.bind(this, 'level1')}
                  >
                  {
                    meta.level1.options.map(level1 =>
                      <option
                        key={level1.value}
                        value={level1.value}>
                        {level1.label}
                      </option>
                    )
                  }
                  </select>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label className='control-label'>
                  二级部门
                  </label>
                  <select
                    className='form-control'
                    value={currentItem.level2}
                    onChange={this.onFieldChange.bind(this, 'level2')}
                  >
                  {
                    meta.level2.options.map(level2 =>
                      <option
                        key={level2.value}
                        value={level2.value}>
                        {level2.label}
                      </option>
                    )
                  }
                  </select>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label className='control-label'>
                  三级部门
                  </label>
                  <select
                    className='form-control'
                    value={currentItem.level3}
                    onChange={this.onFieldChange.bind(this, 'level3')}
                  >
                  {
                    meta.level3.options.map(level3 =>
                      <option
                        key={level3.value}
                        value={level3.value}>
                        {level3.label}
                      </option>
                    )
                  }
                  </select>
                </div>
              </div>
            </div>
            <div style={{marginBottom: 5}}>
              选择角色
              <label>
                <input
                  style={{marginLeft: 40}}
                  type='checkbox'
                  checked={this.hasAllRoles(currentItem, meta)}
                  onChange={this.toggleAllRoles.bind(this, currentItem, meta)}
                /> 全选
              </label>
            </div>
            <table className='table table-bordered'>
              <tbody>
              {
                Object.keys(roleGroups).map(roleIndex => {
                  let roles = roleGroups[roleIndex]

                  return (
                    <tr key={roleIndex}>
                      <td style={{
                        width: 150,
                        paddingLeft: 11,
                        background: '#F8FBFD',
                        color: '#666666'
                      }}>
                      {roles[0].appName}
                      </td>
                      <td style={{
                        marginLeft: 150,
                        lineHeight: '35px',
                        paddingLeft: 20,
                        paddingRight: 20
                      }}>
                      {
                        roles.map(role =>
                          <label key={role.value} style={{
                            marginRight: 30
                          }}>
                            <input
                              type='checkbox'
                              style={{
                                marginRight: 4
                              }}
                              checked={this.hasRole(currentItem, role)}
                              onChange={this.onRoleChange.bind(this, currentItem, role)}
                            />{role.label}
                          </label>
                        )
                      }
                      </td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
            <div style={{marginBottom: 5}}>
              选择用户组
              <label>
                <input
                  style={{marginLeft: 40}}
                  type='checkbox'
                  checked={this.hasAllGroups(currentItem, meta)}
                  onChange={this.toggleAllGroups.bind(this, currentItem, meta)}
                /> 全选
              </label>
            </div>
            <table className='table table-bordered'>
              <tbody>
                <tr>
                  <td style={{
                    width: 150,
                    paddingLeft: 11,
                    background: '#F8FBFD',
                    color: '#666666'
                  }}>
                    用户组名称
                  </td>
                  <td style={{
                    marginLeft: 150,
                    lineHeight: '35px',
                    paddingLeft: 20,
                    paddingRight: 20
                  }}>
                  {
                    groupList.map(group =>
                      <label key={group.value} style={{
                        marginRight: 30
                      }}>
                        <input
                          type='checkbox'
                          style={{
                            marginRight: 4
                          }}
                          checked={this.hasGroup(currentItem, group)}
                          onChange={this.onGroupChange.bind(this, currentItem, group)}
                        />{group.label}
                      </label>
                    )
                  }
                  </td>
                </tr>
              </tbody>
            </table>
            {
              this.props.location.query.id &&
              <div className='row' style={{marginTop: 10}}>
                <div className='col-md-5'>
                  <div className='form-group'>
                    <label className='control-label'>
                      用户状态
                    </label>
                    <div className='row'>
                      <label className='checkbox-inline'>
                        <input
                          type='radio'
                          id='status'
                          checked={currentItem.status == 0}
                          onChange={this.onFieldChange.bind(this, 'status')}
                          value={0}/> 启用
                      </label>
                      <label className='checkbox-inline'>
                        <input
                          type='radio'
                          id='status'
                          checked={currentItem.status == 1}
                          onChange={this.onFieldChange.bind(this, 'status')}
                          value={1}/> 停用
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            }
            <div className='text-center' style={{paddingBottom: 20}}>
              <input
                type='submit'
                className='btn btn-primary'
                style={{width: 160, height: 40, fontSize: 14}}
                value='确定' />
            </div>
          </form>
        </Box>
      </PageContent>
    )
  }
}
