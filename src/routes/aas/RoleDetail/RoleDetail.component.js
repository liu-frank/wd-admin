import React from 'react'
import ReactDOM from 'react-dom'
import PageContent from 'components/PageContent'
import Box from 'components/Box'
import { getResource } from 'utils'
import classes from './RoleDetail.scss'

class MenuList extends React.Component {
  selectAll () {
    const resourceIDList = this.props.data.currentItem.resourceIDList === ''
      ? [] : this.props.data.currentItem.resourceIDList.split(',')
    const menuList = this.props.data.resourceList.filter(resource => resource.resourceType === 'menu')
    let allSelected = true

    menuList.forEach(menu => {
      if (resourceIDList.indexOf(menu.resourceID + '') === -1) {
        allSelected = false
      }
    })

    if (allSelected) {
      this.props.clearAllResources({
        resourceType: this.props.currentType
      })
    } else {
      this.props.selectAllResources({
        resourceType: this.props.currentType
      })
    }
  }
  render () {
    const resourceIDList = this.props.data.currentItem.resourceIDList === '' ? []
      : this.props.data.currentItem.resourceIDList.split(',')
    const menuList = this.props.data.resourceList.filter(resource => resource.resourceType === 'menu')
    let allSelected = true
    const modifyRes = getResource(this.props, '/modify')

    menuList.forEach(menu => {
      if (resourceIDList.indexOf(menu.resourceID + '') === -1) {
        allSelected = false
      }
    })

    return (
      <div className={classes.menus}>
        <div className={classes.inner}>
        {
          this.props.data.resourceList
            .filter(resource => resource.resourceType === 'menu')
            .map(resource => {
              const levels = resource.levelStructure ? resource.levelStructure.split('.') : [0, 0, 0]

              if (levels[1] === '0') {
                // Main Menu
                return (
                  <label key={resource.resourceID} className={classes.mainMenu}>
                    <span>
                      <i className='fa fa-circle-o'></i>
                      {resource.resourceDisplayName}
                    </span>
                    <input type='checkbox'
                      checked={resourceIDList.indexOf(resource.resourceID + '') >= 0}
                      onChange={this.props.updateResource.bind(null, resource)} />
                  </label>
                )
              } else if (levels[2] === '0') {
                // Sub Menu
                return (
                  <label key={resource.resourceID} className={classes.subMenu}>
                    <span>
                      <i className='fa fa-circle-o'></i>
                      {resource.resourceDisplayName}
                    </span>
                    <input
                      type='checkbox'
                      checked={resourceIDList.indexOf(resource.resourceID + '') >= 0}
                      onChange={this.props.updateResource.bind(null, resource)} />
                  </label>
                )
              } else {
                // Third Menu
                return (
                  <label key={resource.resourceID} className={classes.thirdMenu}>
                    <span>{resource.resourceDisplayName}</span>
                    <input type='checkbox'
                      checked={resourceIDList.indexOf(resource.resourceID + '') >= 0}
                      onChange={this.props.updateResource.bind(null, resource)} />
                  </label>
                )
              }
            })
        }
        </div>
        {
          menuList.length > 0 &&
            <div className={classes.selectAll}>
              <label>
                全选
                <input type='checkbox'
                  checked={allSelected}
                  onChange={this.selectAll.bind(this)} />
              </label>
            </div>
        }
        {
          modifyRes &&
            <button
              className={`btn btn-sm btn-primary pull-right ${classes.button}`}
              onClick={this.props.updateData}>
              {modifyRes.resourceDisplayName}
            </button>
        }
      </div>
    )
  }
}

MenuList.propTypes = {
  data: React.PropTypes.object,
  selectAllResources: React.PropTypes.func,
  clearAllResources: React.PropTypes.func,
  updateData: React.PropTypes.func,
  updateResource: React.PropTypes.func,
  currentType: React.PropTypes.string
}

class TableList extends React.Component {
  selectAll () {
    const resourceIDList = this.props.data.currentItem.resourceIDList === '' ? []
      : this.props.data.currentItem.resourceIDList.split(',')
    const menuList = this.props.data.resourceList
      .filter(resource => resource.resourceType === this.props.currentType)
    let allSelected = true

    menuList.forEach(menu => {
      if (resourceIDList.indexOf(menu.resourceID + '') === -1) {
        allSelected = false
      }
    })

    if (allSelected) {
      this.props.clearAllResources({
        resourceType: this.props.currentType
      })
    } else {
      this.props.selectAllResources({
        resourceType: this.props.currentType
      })
    }
  }

  render () {
    const resourceIDList = this.props.data.currentItem.resourceIDList === '' ? []
      : this.props.data.currentItem.resourceIDList.split(',')
    const menuList = this.props.data.resourceList
      .filter(resource => resource.resourceType === this.props.currentType)
    let allSelected = true
    const modifyRes = getResource(this.props, '/modify')

    menuList.forEach(menu => {
      if (resourceIDList.indexOf(menu.resourceID + '') === -1) {
        allSelected = false
      }
    })

    return (
      <div className={classes.menus}>
        <div className={classes.inner}>
          <table className={`table table-bordered table-hover text-center ${classes.table}`}>
            <thead>
              <tr>
                <th>ID</th>
                <th>显示名称</th>
                <th>资源描述</th>
                <th>LinkURL</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {
              this.props.data.resourceList
                  .filter(resource => resource.resourceType === this.props.currentType)
                  .map(resource => {
                    return (
                      <tr key={resource.resourceID}
                        onClick={this.props.updateResource.bind(null, resource)}>
                        <td>{resource.resourceID}</td>
                        <td>{resource.resourceDisplayName}</td>
                        <td>{resource.description}</td>
                        <td>{resource.linkURL}</td>
                        <td>
                          <input type='checkbox'
                            checked={resourceIDList.indexOf(resource.resourceID + '') >= 0}
                            onChange={() => {}} />
                        </td>
                      </tr>
                    )
                  })
            }
            </tbody>
          </table>
        </div>
        {
          menuList.length > 0 &&
            <div className={classes.selectAll}>
              <label>
                全选
                <input type='checkbox'
                  className={classes.tableAll}
                  checked={allSelected}
                  onChange={this.selectAll.bind(this)} />
              </label>
            </div>
        }
        {
          modifyRes &&
            <button
              className={`btn btn-sm btn-primary pull-right ${classes.button}`}
              onClick={this.props.updateData}>
              {modifyRes.resourceDisplayName}
            </button>
        }
      </div>
    )
  }
}

TableList.propTypes = {
  data: React.PropTypes.object,
  selectAllResources: React.PropTypes.func,
  clearAllResources: React.PropTypes.func,
  updateData: React.PropTypes.func,
  updateResource: React.PropTypes.func,
  currentType: React.PropTypes.string
}

export default class RoleDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentType: 'menu'
    }
  }

  componentDidMount () {
    this.props.queryResource({
      appID: this.props.location.query.appID
    })
    this.props.queryData({
      id: this.props.location.query.id
    })
    const $box = $(ReactDOM.findDOMNode(this.refs.box))
    if (document.body.clientHeight <= 720) {
      $box.height(400)
    } else {
      $box.height(document.body.clientHeight - 400)
    }
  }

  componentWillReceiveProps (nextProps) {
    // Hide EditDialog, don't remove this!
    if (!this.props.data.success && nextProps.data.success) {
      this.props.hideEdit()
    }
  }

  render () {
    return (
      <PageContent>
        <Box>
          <div className={classes.wrapper}>
            <div className={classes.line}>
              <span>角色名称：</span>
              <strong>{this.props.data.currentItem.roleName}</strong>
            </div>
            <div className={classes.line}>
              <span>所属系统：</span>
              <strong>{this.props.data.currentItem.appName}</strong>
            </div>
            <div className={classes.line}>
              <span>选择权限：</span>
            </div>
            <div className={classes.box} ref='box'>
              <div className={classes.menu}>
                <ul>
                {
                  this.props.data.typeList.map(type => {
                    return (
                      <li key={type.id}
                        className={this.state.currentType === type.id ? classes.active : null}
                        onClick={() => this.setState({ currentType: type.id })}>
                        {type.label}
                      </li>
                    )
                  })
                }
                </ul>
              </div>
              <div className={classes.content}>
              {
                this.state.currentType === 'menu'
                  ? <MenuList {...this.props} {...this.state} />
                  : <TableList {...this.props} {...this.state} />
              }
              </div>
            </div>
          </div>
        </Box>
      </PageContent>
    )
  }
}

RoleDetail.propTypes = {
  data: React.PropTypes.object,
  selectAllResources: React.PropTypes.func,
  clearAllResources: React.PropTypes.func,
  updateData: React.PropTypes.func,
  updateResource: React.PropTypes.func,
  currentType: React.PropTypes.string,
  queryResource: React.PropTypes.func,
  hideEdit: React.PropTypes.func,
  queryData: React.PropTypes.func,
  location: React.PropTypes.object
}

