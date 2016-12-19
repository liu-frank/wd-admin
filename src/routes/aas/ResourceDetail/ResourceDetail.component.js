import React from 'react'
import ReactDOM from 'react-dom'
import PageContent from 'components/PageContent'
import Box from 'components/Box'
import DataFilter from 'components/DataFilter'
import DataTable from 'components/DataTable'
import DataPaginator from 'components/DataPaginator'
import domain from 'utils/domain'
import { converter } from './ResourceDetail.module'
import { checkResources,getResource } from 'utils'


export default class StatusBatch extends React.Component {

  props: {
    data: React.propTypes.object,
    queryData: React.propTypes.func,
    queryRecource:React.propTypes.func,
    queryUpdate:React.propTypes.func,
    switchPage: React.propTypes.func,
    updateFilter: React.propTypes.func,
    showConfirm: React.propTypes.func
  }
  UpdateRecource() {
    this.props.queryUpdate(this.props.location.query.resourceID,this.props.data.currentItem);
  }
  componentWillMount () {
    this.props.queryData(this.props.location.query.resourceID);
  }
  componentWillReceiveProps (nextProps) {
    if (!this.props.data.checkStatus && nextProps.data.checkStatus && nextProps.data.message) {
      this.props.showConfirm({
        title: '提示',
        message: `<div style='text-align:center'><strong>${nextProps.data.message}</strong></div>`,
        showCancel: false
      })
    }
  }
  render () {
    const buttonSave = getResource(this.props, '/modify');
    const member = this.props.data.currentItem.infoList;
    const systemInfo = this.props.data.currentItem.systemList;
    if(member && systemInfo) {
      return (
        <PageContent>
          <Box>
            <Box.Body>
              <div className='clearfix'>
                <div className='col-sm-1 form-group'>
                  <label style={{color:'#646464'}}>资源ID</label >
                </div>
                <div className='col-sm-3 form-group'>
                  <p style={{background:'#f1f2f4'}} className='form-control'>{member.resourceID}</p>
                </div>
              </div>

              <div className='clearfix'>
                <div className='col-sm-1 form-group'>
                  <label style={{color:'#646464'}}>所属系统</label >
                </div>
                <div className='col-sm-3 form-group'>
                  <p style={{background:'#f1f2f4'}} className='form-control'>{converter.systemMap[member.appID]}</p>
                </div>
                <div className='col-sm-1 form-group'>
                  <label style={{color:'#646464'}}>显示名称</label >
                </div>
                <div className='col-sm-3 form-group'>
                  <input type="text" onChange={e=>this.props.updateResource(e.target.value,'resourceDisplayName')} className="form-control"  value={member.resourceDisplayName || ''}/>
                </div>
              </div>

              <div className='clearfix'>
                <div className='col-sm-1 form-group'>
                  <label style={{color:'#646464'}}>资源类型</label >
                </div>
                <div className='col-sm-3 form-group'>
                  <select className="form-control"  onChange={e=>this.props.updateResource(e.target.value,'resourceType')} value={member.resourceType || ''}>
                    <option value="">全部</option>
                    {
                      systemInfo.map((sub, index) => {
                          return (
                            <option key={index} value={sub.code}>{sub.codeDesc}</option>
                          )
                      })
                    }
                  </select>
                </div>
                <div className='col-sm-1 form-group'>
                  <label style={{color:'#646464'}}>资源名称</label >
                </div>
                <div className='col-sm-3 form-group'>
                  <input type="text" onChange={e=>this.props.updateResource(e.target.value,'resourceName')} className="form-control" id="showname" value={member.resourceName || ''} />
                </div>
              </div>

              <div className='clearfix'>
                <div className='col-sm-1 form-group'>
                  <label style={{color:'#646464'}}>LinkURL</label >
                </div>
                <div className='col-sm-8 form-group'>
                  <input type="text" onChange={e=>this.props.updateResource(e.target.value,'linkURL')} className="form-control" id="showname" value={member.linkURL || ''}/>
                </div>
              </div>

              {member.resourceType == 'menu' && <div className='clearfix'>
                <div className='col-sm-1 form-group'>
                  <label style={{color:'#646464'}}>层级</label >
                </div>
                <div className='col-sm-1 form-group'>
                  <input type="number" min="0" maxlength="3"  className="form-control" onChange={e=>this.props.updateLevel(e.target.value,'levelA')} value={this.props.data.currentItem.levelA ? this.props.data.currentItem.levelA : ''}/>
                </div>
                <div className='col-sm-1 form-group text-center'>
                  <label style={{color:'#646464'}}>.</label >
                </div>
                <div className='col-sm-1 form-group'>

                  <input type="number" min="0" maxlength="3" className="form-control" onChange={e=>this.props.updateLevel(e.target.value,'levelB')} value={this.props.data.currentItem.levelB ? this.props.data.currentItem.levelB :''}/>


                </div>
                <div className='col-sm-1 form-group text-center'>
                  <label style={{color:'#646464'}}>.</label >
                </div>
                <div className='col-sm-1 form-group'>
                  <input type="number" min="0" maxlength="3" className="form-control"  onChange={e=>this.props.updateLevel(e.target.value,'levelC')} value={this.props.data.currentItem.levelC ? this.props.data.currentItem.levelC : ''}/>
                </div>
              </div>
              }


              <div className='clearfix'>
                <div className='col-sm-1 form-group'>
                  <label style={{color:'#646464'}}>资源描述</label >
                </div>
                <div className='col-sm-8 form-group'>
                  <textarea className="form-control" onChange={e=>this.props.updateResource(e.target.value,'description')} value={member.description || ''}></textarea>
                </div>

              </div>

              <div className='clearfix'>
                <div className='col-sm-1 form-group'>
                  <label style={{color:'#646464'}}>资源状态</label >
                </div>
                <div className='col-sm-3 form-group'>
                  <select className="form-control" onChange={e=>this.props.updateResource(e.target.value,'status')} value={member.status || ''}>
                     <option value="0" >可用</option>

                    <option value="2" >停用</option>
                  </select>
                </div>

              </div>
              <div className="col-sm-offset-4 col-sm-3">
                {buttonSave &&
                <button onClick={this.UpdateRecource.bind(this)} className="btn btn-primary btn-block">{buttonSave.resourceDisplayName || ''}</button>
                }
              </div>

            </Box.Body>
          </Box>
        </PageContent>
      )
    }else{
      return(
        <div>
        </div>
      )
    }



  }
}
