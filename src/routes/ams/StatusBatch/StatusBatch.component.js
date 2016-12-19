import React from 'react'
import ReactDOM from 'react-dom'
import PageContent from 'components/PageContent'
import Box from 'components/Box'
import DataFilter from 'components/DataFilter'
import DataTable from 'components/DataTable'
import DataPaginator from 'components/DataPaginator'
import domain from 'utils/domain'
import { checkResources,getResource } from 'utils'


export default class StatusBatch extends React.Component {
  props: {
    data: React.propTypes.object,
    queryData: React.propTypes.func,
    switchPage: React.propTypes.func,
    updateFilter: React.propTypes.func,
    showConfirm: React.propTypes.func
  }

  componentWillMount () {
    this.props.queryData()
  }

  selectFile () {
    const $fileInput = $(ReactDOM.findDOMNode(this.refs['file-input']))
    $fileInput.click()
  }

  uploadFile (e) {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    $.ajax({
      url: `${domain.ams}/ams/v1/workOrder/upload/woacctstatuschangefile`,
      data: formData,
      method: 'POST',
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: false
    }).done(resp => {
      if (resp.respHeader.respCode === 'AMS-10000' || resp.respHeader.respCode === 'AAS-10000'){
        let failId = resp.woAcctStatusChangeFiles[0].fileID,
            detail = '/ams/v1/workOrder/download/woAcctStatusChangeFile?fileId='+failId;

        this.props.showConfirm({
          message: `共上传<strong>${resp.uploadTotal}</strong>条数据，
                 其中<strong>${resp.effectiveNumber}</strong>条数据有效，
                 <a href=${detail} target="数据明细">查看明细</a>`,
          onConfirm: () => this.props.queryChangeUpload(resp.woAcctStatusChangeFiles[0].fileID)
        })
      }else{
        this.props.showConfirm({
          message: `${resp.respHeader.respMessage}`
        })
      }
    }).fail(resp => {
      this.props.showConfirm({
        message: `${resp.message}`
      })
    });
    e.target.value = '';
  }

  render () {
    const { canQuery, canModify } = checkResources(this.props);
    const buttonUpload = getResource(this.props, '/modify'),
          queryButton = getResource(this.props, '/query')
    if(buttonUpload) {
      return (
        <PageContent>
          <Box>
            <DataFilter
              data={this.props.data}
              onFilter={queryButton && this.props.switchPage.bind(null,0)}
              onChange={this.props.updateFilter}/>
            <Box.Header>
              <div className="box-body">
              {buttonUpload &&
              <div className='col-sm-3'>
                <button
                  className='btn btn-primary btn-block'
                  onClick={this.selectFile.bind(this)}>
                  上传变更数据
                </button>
                <input
                  ref='file-input'
                  type='file'
                  accept=".xlsx"
                  onChange={this.uploadFile.bind(this)}
                  className='hidden'/>
              </div>
              }
              <div className='col-sm-6'>
                <p style={{color:'#a1a1a1'}}>仅支持excel文件，请参考模板整理数据 <a href='/templates/Sample.xlsx'>下载文件模板</a></p>
              </div>
                </div>
            </Box.Header>
            <DataTable
              data={this.props.data}
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
            <DataFilter
              data={this.props.data}
              onFilter={queryButton && this.props.switchPage.bind(null,0)}
              onChange={this.props.updateFilter}/>
            <DataTable
              data={this.props.data}
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
