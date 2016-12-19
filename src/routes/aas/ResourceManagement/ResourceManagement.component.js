import React from 'react'
import ReactDOM from 'react-dom'
import PageContent from 'components/PageContent'
import Box from 'components/Box'
import DataFilterEx from 'components/DataFilterEx'
import DataTable from 'components/DataTable'
import DataPaginator from 'components/DataPaginator'
import domain from 'utils/domain'
import { checkResources,getResource } from 'utils'


export default class StatusBatch extends React.Component {
  switchPageprops: {
    data: React.propTypes.object,
    queryData: React.propTypes.func,
    queryRecource:React.propTypes.func,
    querySystem:React.propTypes.func,
    switchPage: React.propTypes.func,
    updateFilter: React.propTypes.func,
    queryChangeStatus:React.propTypes.func,
    showConfirm: React.propTypes.func,
    queryDownload : React.propTypes.func,
    switchPage : React.propTypes.func
  }

  componentWillMount () {
    this.props.querySystem()
    this.props.queryRecource()
    this.props.queryData()
  }

  selectFile () {
    const $fileInput = $(ReactDOM.findDOMNode(this.refs['file-input']))
    $fileInput.click()
  }
  downloadFile(){
    const filter = this.props.data.currentFilter,
          appID =filter.system ? filter.system : null,
          resourceType = filter.resource ? filter.resource :null,
          resourceName = filter.recourseName ? filter.recourseName : null,
          resourceDisplayName =filter.showname ? filter.showname : null,
          resourceUrl = '/aas/v1/resource/download?appID='+appID + '&resourceType=' + resourceType + '&resourceName=' + resourceName + '&resourceDisplayName='+resourceDisplayName;
    console.log(resourceUrl);
    window.open(resourceUrl);
  }
  uploadFile (e) {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    $.ajax({
      url: `${domain.ams}/aas/v1/resource/upload`,
      data: formData,
      method: 'POST',
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: false
    }).done(resp => {
      if (resp.respHeader.respCode === 'ASM-10000' || resp.respHeader.respCode === 'AAS-10000'){
        let totalId = resp.uploadOrDownloadTotal;
        this.props.showConfirm({
          message: `共上传<strong>${totalId}</strong>条数据有效执行`,
          showCancel: false
        })
      }else{
        let errorMessage = resp.respHeader.resMessageExt

        if (!errorMessage) {
          errorMessage = resp.respHeader.respMessage || ''
        }
        this.props.showConfirm({
          message: `${errorMessage}`,
          showCancel: false
        })
      }
    }).fail(resp => {
      this.props.showConfirm({
        message: `${resp.message}`,
        showCancel: false
      })
    });
    e.target.value = '';
  }

  render () {
    const { canQuery, canModify } = checkResources(this.props);
    const modifyResource = getResource(this.props, '/modify'),
          buttonStart = getResource(this.props, '/enable'),
          buttonEnd = getResource(this.props, '/disable'),
          uploadButton = getResource(this.props, '/import'),
          downLoad = getResource(this.props, '/export'),
          queryButton = getResource(this.props, '/query')
    const operations = modifyResource ? [{
      name: modifyResource.resourceDisplayName,
      icon: 'info',
      callback: item => this.props.push('/aas/resource-detail?resourceID='+item.resourceID)
    }] : []
    const groupOps = [buttonStart ? {
      name: buttonStart.resourceDisplayName,
      icon: 'success',
      callback: selection => {
        console.log('approve', selection);
        var subA = [] //选取ID list
        selection.map(function(sub,index){
          sub.status && sub.status == '2' && subA.push(sub.resourceID);
        });
        var messageA = '启用'+subA.length+'条数据'
        if(subA.length>0){
          this.props.showConfirm({
            title: '提示',
            message: `共<strong>${selection.length}</strong>条数据
               （ ${messageA}）,
               请确定是否启用`,
            onConfirm: () => this.props.queryChangeStatus(subA,'0')
          })
        }else{
          this.props.showConfirm({
            title: '提示',
            message: `没有有效数据,请重新选择!`
          })
        }
      }
    } : {}, buttonEnd ? {
      name: buttonEnd.resourceDisplayName,
      icon: 'danger',
      callback: selection => {
        console.log('approve', selection);
        var subA = [] //选取ID list
        selection.map(function(sub,index){
          sub.status && sub.status == '0' && subA.push(sub.resourceID);
        });
        var messageA = '停用'+subA.length+'条数据'
        if(subA.length>0){
          this.props.showConfirm({
            title: '提示',
            message: `共<strong>${selection.length}</strong>条数据
               （ ${messageA}）,
               请确定是否停用`,
            onConfirm: () => this.props.queryChangeStatus(subA,'2')
          })
        }else{
          this.props.showConfirm({
            title: '提示',
            message: `没有有效数据,请重新选择!`
          })
        }
      }
    }: {}]

    if(modifyResource) {
      return (
        <PageContent>
          <Box>
            <DataFilterEx
              data={this.props.data}
              onFilter={canQuery && this.props.switchPage.bind(null,0)}
              onChange={this.props.updateFilter}/>
            <Box.Header>
              <div className="box-body">
                {downLoad &&
                <div className='col-sm-3'>
                  <button
                    className='btn btn-default btn-block'
                    onClick={this.downloadFile.bind(this)}>
                    {downLoad.resourceDisplayName}
                  </button>
                </div>
                }
              {uploadButton &&
                <div className='col-sm-3'>
                <button
                  className='btn btn-primary btn-block'
                  onClick={this.selectFile.bind(this)}>
                  {uploadButton.resourceDisplayName}
                </button>
                <input
                  ref='file-input'
                  type='file'
                  accept=".csv"
                  onChange={this.uploadFile.bind(this)}
                  className='hidden'/>
                </div>
              }

              <div className='col-sm-6'>
                <p style={{color:'#a1a1a1'}}>仅支持csv文件，请参考模板整理数据<a href='/templates/recourceSample.csv'>下载文件模板</a></p>
              </div>
              </div>
            </Box.Header>
            <DataTable
              data={this.props.data}
              operations={operations}
              groupOps={groupOps}
              onConfirm={this.props.showConfirm}/>
            <DataPaginator
              data={this.props.data}
              onSwitch={this.props.switchPage}/>
          </Box>
        </PageContent>
      )
    }else{
      return (
        <PageContent>
          <Box>
            <DataFilterEx
              data={this.props.data}
              onFilter={ queryButton && this.props.bind(null,0)}
              onChange={this.props.updateFilter}/>
            <DataTable
              data={this.props.data}
              operations={operations}
              groupOps={groupOps}
              onConfirm={this.props.showConfirm}/>
            <DataPaginator
              data={this.props.data}
              onSwitch={this.props.switchPage}/>
          </Box>
        </PageContent>
      )

    }
  }
}
