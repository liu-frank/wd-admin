import React from 'react'
import moment from 'moment'
import PageContent from 'components/PageContent'
import Box from 'components/Box'
import DataTable from 'components/DataTable'
import DataPaginator from 'components/DataPaginator'
import { converter } from './MemberDetail.module'
import { provinces, cities } from 'modules/locations'

import { checkResources,getResource } from 'utils'
import classes from './MemberDetail.scss'


class MemberInfo extends React.Component {
  changePhone (e){
    this.phoneNumber = e.target.value;
  }
  editPhone () {
    this.phoneNumber = '';
    this.props.showCustomDialog({
      title: '变更电话号码',
      content: (
        <div className='box-body form-horizontal'>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='phone'>
              手机号码
            </label>
            <div className='col-sm-10'>
              <input type='phone'className='form-control' onChange={this.changePhone.bind(this)} id='phone' placeholder='手机号码' />
            </div>
          </div>
        </div>
      ),
      onConfirm: () =>
        this.phoneNumber !='' && this.phoneNumber.length == 11 ?
          this.props.changePhone(this.props.location.query.id,this.phoneNumber)
        :
        this.props.showFail({
          message: '请输入正确的手机号码'
        }),
      showCancel: true
    })
  }

  onChange (e) {
    this.nickName = e.target.value
  }

  editName () {
    this.nickName = ''
    this.props.data.currentItem.memberData.pwidtype ?
      this.props.showCustomDialog({
      title: '变更用户别名',
      content: (
        <div className='box-body form-horizontal'>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='name'>
              用户别名
            </label>
            <div className='col-sm-10'>
              <input
                id='name'
                type='text'
                className='form-control'
                onChange={this.onChange.bind(this)}
                placeholder='用户别名' />
            </div>
          </div>
        </div>
      ),
      onConfirm: () =>
        this.nickName !='' ?
          this.props.changeName(this.nickName,this.props.location.query.id)
          :
          this.props.showFail({
            message: '请输入别名'
          }),
        showCancel: true

    }) :
      this.props.showConfirm({
        message: '该用户未升级为万达会员，不可进行操作',
        showCancel: false
      })
  }
  changeRemark (e) {
    this.remarkInfo = e.target.value
  }
  applyFreeze () {
    this.remarkInfo = '';
    this.props.data.currentItem.memberData.pwidtype ?
      this.props.showCustomDialog({
        title: '请输入冻结原因',
        content: (
          <div className='box-body form-horizontal'>
            <div className='form-group'>
              <div className='col-sm-12'>
                <textarea
                  id='name'
                  type='text'
                  className='form-control'
                  onChange={this.changeRemark.bind(this)}
                  placeholder='请输入冻结原因'
                  required
                />
              </div>
            </div>
          </div>
        ),
        onConfirm: () => this.remarkInfo !='' ?
          this.props.queryChangeStatus(this.props.location.query.id,60,this.remarkInfo,this.props.fullOrgName)
          :
          this.props.showFail({
            message: '请输入冻结原因'
          })
          ,
        showCancel: true
      }):
      this.props.showConfirm({
        message: '该用户未升级为万达会员，不可进行操作',
        showCancel: false
      })
  }
  applyDelete (){
    this.remarkInfo = '';
    this.props.data.currentItem.memberData.pwidtype ?
      this.props.showCustomDialog({
        title: '请输入注销原因',
        content: (
          <div className='box-body form-horizontal'>
            <div className='form-group'>
              <div className='col-sm-12'>
                <textarea
                  id='name'
                  type='text'
                  className='form-control'
                  onChange={this.changeRemark.bind(this)}
                  placeholder='请输入注销原因'
                  required
                />
              </div>
            </div>
          </div>
        ),
        onConfirm: () =>
          this.remarkInfo !='' ?
            this.props.queryChangeStatus(this.props.location.query.id,80,this.remarkInfo,this.props.fullOrgName)
            :
            this.props.showFail({
              message: '请输入注销原因'
            }),
        showCancel: true
      }) :
      this.props.showConfirm({
        message: '该用户未升级为万达会员，不可进行操作',
        showCancel: false
      })
  }
  applyChangeStatus (){
    this.remarkInfo = '';

    this.props.data.currentItem.memberData.pwidtype ?
      this.props.showCustomDialog({
        title: '请输入解冻原因',
        content: (
          <div className='box-body form-horizontal'>
            <div className='form-group'>
              <div className='col-sm-12'>
                <textarea
                  id='name'
                  type='text'
                  className='form-control'
                  onChange={this.changeRemark.bind(this)}
                  placeholder='请输入解冻原因'
                  required
                />
              </div>
            </div>
          </div>
        ),
        onConfirm: () =>
          this.remarkInfo !='' ?
            this.props.queryChangeStatus(this.props.location.query.id,70,this.remarkInfo,this.props.fullOrgName)
            :
            this.props.showFail({
              message: '请输入解冻原因'
            }),
        showCancel: true

      }) :
      this.props.showConfirm({
        message: '该用户未升级为万达会员，不可进行操作',
        showCancel: false
      })
  }
  showStatusHistory () {
    this.props.queryUserLogStatus(this.props.location.query.id)
  }

  render () {
    const meta = this.props.data.meta;
    const member = this.props.data.currentItem;
    const memberStatus = this.props.data.currentItem.personaData;
    const changeName  = getResource(this.props, '/changeName');
    const statusLog  = getResource(this.props, '/operationLog');
    const destroy  = getResource(this.props, '/destroy');
    const freeze  = getResource(this.props, '/freeze');
    const unfreeze  = getResource(this.props, '/unfreeze');
    if (member && memberStatus && member.accountList) {
      return (
        <Box.Body>
          <div className="col-md-12 form-group">
            <div className={classes.titleBox}>
              <span>会员基本信息</span>
              {member.memberData.pwidstatus == 1 &&
              <div className="col-lg-4" style={{float:'right',padding:'1px 0 0 10%'}}>
                {freeze &&
                <button onClick={this.applyFreeze.bind(this)} className="btn btn-warning">{freeze.resourceDisplayName}</button>
                }
                {destroy &&
                <button onClick={this.applyDelete.bind(this)} className="btn btn-danger">{destroy.resourceDisplayName}</button>
                }
              </div>
              }
              {member.memberData.pwidstatus == 2 &&
              <div className="col-lg-4" style={{float:'right',padding:'1px 0 0 10%'}}>
                {unfreeze &&
                <button onClick={this.applyChangeStatus.bind(this)}
                        className="btn btn-warning">{unfreeze.resourceDisplayName}</button>
                }
              </div>
              }
            </div>
          </div>

          <div className="col-md-12 form-group">
            <span className={classes.spanLabel}>账户信息</span>
          </div>
          <div className="col-md-12 form-group">
            <table className="table table-bordered">
              <tbody>
              <tr>
                <td className={classes.tableTd}><span>PWID</span></td>
                <td style={{width: '400px'}}>{member.memberData && member.memberData.pwid}</td>
                <td className={classes.tableTd}><span>用户别名(不可用户登录)</span></td>
                <td>
                  {memberStatus && memberStatus.aliasName}
                  {changeName && member.memberData.pwidstatus == 1 &&
                  <a className={classes.searchButton} title='编辑' onClick={this.editName.bind(this)}>
                    <i className="fa fa-pencil" style={{margin: '0 5px 0 0'}}></i>编辑</a>
                  }
                </td>
              </tr>
              <tr>
                <td className={classes.tableTd}><span>用户状态</span></td>
                <td style={{width: '400px'}}>
                    {converter.pwid[member.memberData.pwidstatus]}
                    {statusLog &&
                    <a className={classes.searchButton} title='查看记录' onClick={this.showStatusHistory.bind(this)}>
                      <i className="fa fa-search" style={{margin: '0 5px 0 0'}}></i>查看记录</a>
                    }

                </td>
                <td className={classes.tableTd}><span></span></td>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>


          {
            member.accountList && member.accountList.map((account, index) => {
              let type = converter.type[account.loginNameType]
              let verify = converter.status[account.loginStatus]
              let channel = converter.from[account.sysFrom]
              let accountLevel = converter.accountLevel[member.memberData.realNameLevel];
              return (
              <div key={index}>
              <div className="col-md-12 form-group" >
                <span className={classes.spanLabel}>{type}信息</span>
              </div>
              <div className="col-md-12 form-group">
                <table className="table table-bordered">
                <tbody>
                <tr>
                <td className={classes.tableTd}><span>{type}用户</span></td>
              <td style={{width: '400px'}}>{account.loginName}({verify})
                {
                  account.loginNameType == 2 && freeze &&
                  <a className={classes.searchButton} title='编辑' onClick={this.editPhone.bind(this)}><i className="fa fa-pencil" style={{margin: '0 5px 0 0'}}></i>修改</a>
                }

              </td>
              <td className={classes.tableTd}><span>注册渠道</span></td>
              <td>{channel}</td>
              </tr>
              <tr>
              <td className={classes.tableTd}><span>{type}用户等级</span></td>
              <td style={{width: '400px'}}>{accountLevel}</td>
              <td className={classes.tableTd}><span></span></td>
              <td></td>
              </tr>
              </tbody>
              </table>
              </div>
              </div>
              )
            })
          }
        </Box.Body>
      )
    }else{
      return (
        <div>
          </div>
      )
    }
  }
}

class BasicTab extends React.Component {
  showLogHistory() {
    this.props.queryUserRemarks(this.props.location.query.id);
  }
  showStatusBankFail(){
    this.props.queryBankFailInfo(this.props.location.query.id)

  }
  addLog(){
    this.nickName = ''
      this.props.showCustomDialog({
        title: '添加备注',
        content: (
          <div className='box-body form-horizontal'>
            <div className='form-group'>
              <label className='control-label col-sm-2' htmlFor='name'>
                添加备注
              </label>
              <div className='col-sm-10'>
                <textarea
                  className='form-control'
                  onChange={this.onChange.bind(this)}
                >
                </textarea>
              </div>
            </div>
          </div>
        ),
        onConfirm: () => this.props.AddUserlog(this.props.location.query.id,this.remarkInfo)
      })
  }
  onChange (e) {
    this.remarkInfo = e.target.value;
  }
  AdduserlogInfo() {
    this.props.AddUserlog(this.props.location.query.id,this.remarkInfo);
  }
  render () {
    const infoLog  = getResource(this.props, '/personalLog');
    const saveButton  = getResource(this.props, '/changeNote');
    const member = this.props.data.currentItem.memberData
    const cardMember = this.props.data.currentItem

    if(member && cardMember) {
      let idType = converter.systemType[member.realNameLevel>100 ? '0' : '1'];
      return (
        //<div className='active tab-pane clearfix' id='basic'>
        //  <div className='col-sm-6 form-group'>
        //    <label>用户姓名</label>
        //    <p className='form-control'>{member.name}</p>
        //  </div>
        //  <div className='col-sm-6 form-group'>
        //    <label>注册时间</label>
        //    <p className='form-control'>{member.createTime ? moment(member.createTime).format('YYYY-MM-DD HH:mm:ss') : ''}</p>
        //  </div>
        //  <div className='col-sm-6 form-group'>
        //    <label>上次登录时间</label>
        //    <p className='form-control'>{member.lastLoginTime ? moment(member.lastLoginTime).format('YYYY-MM-DD HH:mm:ss') : ''}</p>
        //  </div>
        //  <div className='col-sm-6 form-group'>
        //    <label>身份证号</label>
        //    <p className='form-control'>
        //      <span>{member.idNumber}{idType}</span>
        //    </p>
        //  </div>
        //  <div className='col-sm-12 form-group'>
        //    <label>地址信息</label>
        //    <p className='form-control'>{member.address}</p>
        //  </div>
        //  <div className='col-sm-12 form-group'>
        //    <label>银行卡信息</label>
        //    <div className='well'>
        //      {
        //        cardMember.cardList && cardMember.cardList.map((card, index) => {
        //          let bankName = card.bankName ? card.bankName : '-';
        //          let bankBranch = card.bankBranch ? card.bankBranch : '-'
        //          let provinces = card.branchProvince ? provinces[card.branchProvince] : '-'
        //          let cities = card.branchCity ? cities[card.branchCity]:'-'
        //          let accountName = card.accountName ? card.accountName : '-'
        //          let bankAcctId = card.bankAcctId ? card.bankAcctId : '-'
        //          let mobileInBank = card.mobileInBank ? card.mobileInBank : '-'
        //          return(
        //          <p key={index}>
        //            {
        //              bankName + ', ' + bankBranch + ', ' + provinces + ', ' +
        //              cities + ', ' + accountName + ', ' + bankAcctId + ', ' +
        //              mobileInBank + converter.systemType[card.status == 0 ? '1' : '0']
        //            }
        //          </p>
        //          )
        //        })
        //      }
        //
        //    </div>
        //  </div>
        //  <div className='col-sm-12 form-group'>
        //    <label>备注</label>
        //  <textarea className='form-control' onChange={this.onChange.bind(this)}>
        //  </textarea>
        //    {infoLog &&
        //    <a className='pull-right' title='查看记录' onClick={this.showLogHistory.bind(this)}>
        //      {infoLog.resourceDisplayName}<i className='fa fa-eye'/>
        //    </a>
        //    }
        //  </div>
        //  {saveButton &&
        //  <div className='col-sm-offset-4 col-sm-3'>
        //    <button onClick={this.AdduserlogInfo.bind(this)} className='btn btn-primary btn-block'>
        //      {saveButton.resourceDisplayName}
        //    </button>
        //  </div>
        //  }
        //
        //</div>
        <div className='active tab-pane clearfix' id='basic'>
          <div className="col-md-12 form-group">
            <table className="table table-bordered">
              <tbody>
              <tr>
                <td className={classes.tableTd}><span>用户姓名</span></td>
                <td style={{width: '350px'}}>{member.name}</td>
                <td className={classes.tableTd}><span>注册时间</span></td>
                <td>{member.createTime ? moment(member.createTime).format('YYYY-MM-DD HH:mm:ss') : ''}</td>
              </tr>
              <tr>
                <td className={classes.tableTd}><span>上次登录时间</span></td>
                <td style={{width: '350px'}}>{member.lastLoginTime ? moment(member.lastLoginTime).format('YYYY-MM-DD HH:mm:ss') : ''}</td>
                <td className={classes.tableTd}><span>身份证号码</span></td>
                <td>{member.idNumber}{idType}</td>
              </tr>
              <tr>
                <td className={classes.tableTd}><span>地址信息</span></td>
                <td style={{width: '350px'}}>{member.address}</td>
                <td className={classes.tableTd}><span>生日</span></td>
                <td style={{width: '350px'}}>{member.birthday}</td>
              </tr>
              <tr>
                <td className={classes.tableTd}><span>银行卡信息</span></td>
                <td colSpan="3" >
                  <div className="clearfix">

                    <table className="table table-bordered">
                      <thead>
                      <tr>
                        <td className={classes.tableTd}>开户行</td>
                        <td className={classes.tableTd}><span>卡类型</span></td>
                        <td className={classes.tableTd}><span>卡号</span></td>

                        <td className={classes.tableTd}><span>绑卡时间</span></td>
                        <td className={classes.tableTd}><span>是否默认</span></td>
                      </tr>
                      </thead>
                      <tbody>
                      {
                        cardMember.cardList && cardMember.cardList.map((card, index) => {
                          //let bankName = card.bankName ? card.bankName : '';
                          //let bankAcctId = card.bankAcctId ? card.bankAcctId : '';
                          //let cardType = card.cardType ?converter.bankType[card.cardType] : ''
                          //let cities = card.branchCity ? cities[card.branchCity]:'-'
                          //let accountName = card.accountName ? card.accountName : '-'
                          let bankTime = card.enableTime ? moment(card.enableTime).format('YYYY-MM-DD HH:mm:ss') : ''
                          return(
                          <tr key={index}>
                            <td >{card.bankName}</td>
                            <td >{converter.bankType[card.cardType]}</td>
                            <td >{card.bankAcctId}</td>

                            <td >{bankTime}</td>
                            <td >{converter.Default[card.isDefault]}</td>
                          </tr>
                          )
                        })
                      }
                      </tbody>
                    </table>

                    <a className={classes.searchButton} title='查看记录' onClick={this.showStatusBankFail.bind(this)}>
                      <i className="fa fa-search" style={{margin: '0 5px 0 0'}} ></i>查询失败绑卡记录</a>
                  </div>
                </td>

              </tr>

              <tr>
                <td className={classes.tableTd}><span>备注</span></td>
                <td >
                  <div className="clearfix">
                    {infoLog &&
                    <a onClick={this.showLogHistory.bind(this)} className={classes.searchButton}
                       style={{margin: '0 70px 0 60px'}} title='查看记录'>
                      <i className="fa fa-search" style={{margin: '0 5px 0 0'}}></i>查看记录</a>
                    }
                    {saveButton &&
                    <a onClick={this.addLog.bind(this)} className={classes.searchButton} title='查看记录'>
                      <i className="fa fa-plus-circle" style={{margin: '0 5px 0 0'}}></i>增加记录</a>
                    }
                  </div>
                </td>
                <td className={classes.tableTd}><span></span></td>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>


      )
    }else{
      return (
      <div>
      </div>
      )
    }
  }
}

class ProfileTab extends React.Component {
  render () {
    const member = this.props.data.currentItem.personaData
    if(member) {
      return (
        <div className='tab-pane' id='profile' style={{overflow: 'hidden'}}>
          <div className="col-md-12 form-group">
            <span className={classes.smallLabel}>个人信息</span>
          </div>
          <div className="col-md-12 form-group">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td className={classes.tableTd}><span>星座</span></td>
                  <td style={{width: '350px'}}>{member.constellation}</td>
                  <td className={classes.tableTd}><span>血型</span></td>
                  <td>{member.blood}</td>
                </tr>
                <tr>
                  <td className={classes.tableTd}><span>生日</span></td>
                  <td style={{width: '350px'}}>{member.birthday}</td>
                  <td className={classes.tableTd}><span></span></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-md-12 form-group">
            <span className={classes.smallLabel}>地址信息</span>
          </div>
          <div className="col-md-12 form-group">
            <table className="table table-bordered">
              <tbody>
              <tr>
                <td className={classes.tableTd}><span>所在省</span></td>
                <td style={{width: '350px'}}>{member.province}</td>
                <td className={classes.tableTd}><span>所在市</span></td>
                <td>{member.city}</td>
              </tr>
              <tr>
                <td className={classes.tableTd}><span>地址</span></td>
                <td style={{width: '350px'}}>{member.address}</td>
                <td className={classes.tableTd}><span></span></td>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>

          <div className="col-md-12 form-group">
            <span className={classes.smallLabel}>社交信息</span>
          </div>
          <div className="col-md-12 form-group">
            <table className="table table-bordered">
              <tbody>
              <tr>
                <td className={classes.tableTd}><span>QQ号</span></td>
                <td style={{width: '350px'}}>{member.qq}</td>
                <td className={classes.tableTd}><span>微信号</span></td>
                <td>{member.wechatAccount}</td>
              </tr>
              <tr>
                <td className={classes.tableTd}><span>微博号</span></td>
                <td style={{width: '350px'}}>{member.weiboAccount}</td>
                <td className={classes.tableTd}><span></span></td>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>

          <div className="col-md-12 form-group">
            <span className={classes.smallLabel}>职业信息</span>
          </div>
          <div className="col-md-12 form-group">
            <table className="table table-bordered">
              <tbody>
              <tr>
                <td className={classes.tableTd}><span>职业</span></td>
                <td style={{width: '350px'}}>{converter.occupation[member.occupation]}</td>
                <td className={classes.tableTd}><span>收入范围</span></td>
                <td>{converter.income[member.incomeRange]}</td>
              </tr>
              <tr>
                <td className={classes.tableTd}><span>孩子信息</span></td>
                <td style={{width: '350px'}}>{member.kids}</td>
                <td className={classes.tableTd}><span></span></td>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>

          <div className="col-md-12 form-group">
            <span className={classes.smallLabel}>教育信息</span>
          </div>
          <div className="col-md-12 form-group">
            <table className="table table-bordered">
              <tbody>
              <tr>
                <td className={classes.tableTd}><span>教育背景</span></td>
                <td style={{width: '350px'}}>{converter.education[member.education]}</td>
                <td className={classes.tableTd}><span>学校</span></td>
                <td>{member.school}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    }else{
      return (
      <div></div>
      )
    }
  }
}

class DeviceTab extends React.Component {
  render () {
    return (
      <div className='tab-pane' id='device'>
        <DataTable data={this.props.data.device} />
        <DataPaginator data={this.props.data.device} />
      </div>
    )
  }
}

class LogTab extends React.Component {
  componentDidMount () {
    this.props.queryLog(this.props.location.query.id)
  }

  render () {
    return (
      <div className='tab-pane' id='log'>
        <DataTable data={this.props.data.log} />
        <DataPaginator data={this.props.data.log}
                       onSwitch={this.props.switchLogPage}
        />
      </div>
    )
  }
}

class MemberTabs extends React.Component {
  componentWillReceiveProps(nextProps){
    if (!this.props.data.showRemarkStatus && nextProps.data.showRemarkStatus){
      this.props.showCustomDialog({
        title: '用户备注记录',
        width:'60%',
        content: (
          <div>
            <DataTable data={nextProps.data.remarkInfo} />
            <DataPaginator data={nextProps.data.remarkInfo}
                           onSwitch={nextProps.switchPage}/>
          </div>
        )
      })
    }

    if (!this.props.data.showUserLogStatus && nextProps.data.showUserLogStatus){
      this.props.showCustomDialog({
        title: '用户状态记录',
        width:'60%',
        content: (
          <div>
            <DataTable data={nextProps.data.status} />
            <DataPaginator data={nextProps.data.status}
                           onSwitch={nextProps.switchStatusPage}/>
          </div>
        )
      })
    }

    if (!this.props.data.showBankFailStatus && nextProps.data.showBankFailStatus){
      this.props.showCustomDialog({
        title: '绑卡失败记录',
        width:'60%',
        content: (
          <div>
            <DataTable data={nextProps.data.bankFailInfo} />
          </div>
        )
      })
    }

  }
  render () {
    return (
      <Box.Body>
        <div className='nav-tabs-custom'>
          <ul className='nav nav-tabs'>
            <li className='active'>
              <a href='#basic' data-toggle='tab'>基本信息</a>
            </li>
            <li>
              <a href='#profile' data-toggle='tab'>人口特征</a>
            </li>
            <li>
              <a href='#device' data-toggle='tab'>设备查询</a>
            </li>
            <li>
              <a href='#log' data-toggle='tab'>操作日志</a>
            </li>
          </ul>
          <div className='tab-content'>
            <BasicTab {...this.props} />
            <ProfileTab {...this.props} />
            <DeviceTab {...this.props} />
            <LogTab {...this.props} />
          </div>
        </div>
      </Box.Body>
    )
  }
}

export default class MemberDetail extends React.Component {
  props: {
    data: React.propTypes.object,
    queryData: React.propTypes.func
  }

  componentWillMount () {
    this.props.queryData(this.props.location.query.id, this.props.location.query.loginName)
  }
  render () {
    return (
      <PageContent>
        <Box>
          <div className='box-header with-border'>
          </div>
          <MemberInfo {...this.props} />
          <MemberTabs {...this.props} />
        </Box>
      </PageContent>
    )
  }
}
