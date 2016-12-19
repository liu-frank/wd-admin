import React from 'react'
import PageContent from 'components/PageContent'
import Box from 'components/Box'
import DataFilter from 'components/DataFilter'
import DataTable from 'components/DataTable'
import DataPaginator from 'components/DataPaginator'
import { checkResources,getResource} from 'utils'


export default class StatusChange extends React.Component {
  props: {
    data: React.propTypes.object,
    queryData: React.propTypes.func,
    switchPage: React.propTypes.func,
    updateFilter: React.propTypes.func,
    showConfirm: React.propTypes.func,
    push: React.propTypes.func
  }

  componentWillMount () {
    this.props.queryData()
  }
  componentWillReceiveProps (nextProps) {
    if (!this.props.data.checkStatus && nextProps.data.checkStatus && nextProps.data.failNums > 0) {
      this.props.showConfirm({
        title: '失败',
        message: `失败<strong>${nextProps.data.failNums}</strong>条数据,请重新检查!`,
        showCancel: false
      })
    }
  }
  render () {
    const { canQuery, canModify } = checkResources(this.props)
    const buttonQuery = getResource(this.props, '/query'),
          passButton = getResource(this.props, '/accept'),
          editButton = getResource(this.props, '/modify'),
          failButton = getResource(this.props, '/deny')
    const operations = editButton ? [{
      name: editButton.resourceDisplayName,
      icon: 'info',
      callback: item => window.open('/ams/member-detail?id=' + item.PWID)
    }] : []
    // 二期新需求，去掉变更审核能力
    const groupOps = passButton && editButton &&[passButton ? {
      name: passButton.resourceDisplayName,
      icon: 'success',
      callback: selection => {
        console.log('approve', selection);
        var subA = [], //冻结状态
            subB = [], //销户状态
            subC = []; //解冻状态
        selection.map(function(sub,index){
          sub.WOType && sub.WOType == 70 && sub.status ==20 && subC.push(sub.WOID);
          sub.WOType && sub.WOType == 80 && sub.status ==20 && subB.push(sub.WOID);
          sub.WOType && sub.WOType == 60 && sub.status ==20 && subA.push(sub.WOID);
        });
        var totalList = subA.concat(subB).concat(subC);
        if(subA.length>0){
          var messageA = '<strong>' + subA.length + '</strong>条冻结';
        }else{
          var messageA = '';
        }
        if(subB.length>0){
          var messageB = '<strong>' + subB.length + '</strong>条销户';
        }else{
          var messageB = '';
        }
        if(subC.length>0){
          var messageC = '<strong>' + subC.length + '</strong>条解冻';
        }else{
          var messageC = '';
        }
        if(totalList.length>0){
          this.props.showConfirm({
            title: '提示',
            message: `共<strong>${selection.length}</strong>条数据
               （ ${messageA}${messageB}${messageC}）,
               请确定是否审核通过`,
            onConfirm: () => this.props.queryChangeStatus(totalList,30)
          })
        }else{
          this.props.showConfirm({
            title: '提示',
            message: `没有有效数据,请重新选择!`
          })
        }
      }
    } : {}, failButton ? {
      name: failButton.resourceDisplayName,
      icon: 'danger',
      callback: selection => {
        console.log('approve', selection);
        var subA = [], //冻结状态
          subB = [], //销户状态
          subC = []; //解冻状态
        selection.map(function(sub,index){
          sub.WOType && sub.WOType == 70 && sub.status ==20 && subC.push(sub.WOID);
          sub.WOType && sub.WOType == 80 && sub.status ==20 && subB.push(sub.WOID);
          sub.WOType && sub.WOType == 60 && sub.status ==20 && subA.push(sub.WOID);
        });
        var totalList = subA.concat(subB).concat(subC);
        if(subA.length>0){
          var messageA = '<strong>' + subA.length + '</strong>条冻结';
        }else{
          var messageA = '';
        }
        if(subB.length>0){
          var messageB = '<strong>' + subB.length + '</strong>条销户';
        }else{
          var messageB = '';
        }
        if(subC.length>0){
          var messageC = '<strong>' + subC.length + '</strong>条解冻';
        }else{
          var messageC = '';
        }
        if(totalList.length>0){
          this.props.showConfirm({
            title: '提示',
            message: `共<strong>${selection.length}</strong>条数据
               （ ${messageA}${messageB}${messageC}）,
               请确定是否审核拒绝`,
            onConfirm: () => this.props.queryChangeStatus(totalList,40)
          })
        }else{
          this.props.showConfirm({
            title: '提示',
            message: `没有有效数据,请重新选择!`
          })
        }

      }
    } : {}]

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
          <DataPaginator
            data={this.props.data}
            onSwitch={this.props.switchPage} />
        </Box>
      </PageContent>
    )
  }
}
