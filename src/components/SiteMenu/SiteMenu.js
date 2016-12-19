import React from 'react'
import { Link } from 'react-router'

const MenuItem = ({menu, current}) => (
  <li className={(menu.url === current || isChildSelected(menu, current)) ? 'active' : ''}>
    <Link to={menu.url}>
      <i className={'fa fa-circle-o'} /> <span>{menu.name}</span>
    </Link>
  </li>
)

MenuItem.propTypes = {
  current: React.PropTypes.string.isRequired,
  menu: React.PropTypes.object.isRequired
}

const isChildSelected = function (menu, current) {
  if (menu.subs) {
    for (let sub of menu.subs) {
      if (sub.url === current) {
        return true
      } else if (sub.subs) {
        for (let third of sub.subs) {
          if (third.url === current) {
            return true
          }
        }
      }
    }
  }
  return false
}

class MenuTree extends React.Component {
  render () {
    const { menu, current } = this.props

    return (
      <li className={'treeview ' + (isChildSelected(menu, current) ? 'active' : '')}>
        <a href='#'>
          <i className={'fa fa-circle-o'}></i> <span>{menu.name}</span>
        </a>
        <ul className='treeview-menu' style={{display: 'block'}}>
        {
          menu.subs.map((sub, index) => {
            return (
              <li key={index} className={(sub.url === current || isChildSelected(sub, current)) ? 'active' : ''}>
              {
                sub.url.indexOf('.html') < 0
                ? <Link to={sub.url}>
                    <i className='fa fa-circle'></i> <span>{sub.name}</span>
                  </Link>
                : <a href={sub.url}>
                    <i className='fa fa-circle'></i> <span>{sub.name}</span>
                  </a>
              }
              </li>
            )
          })
        }
        </ul>
      </li>
    )
  }
}

MenuTree.propTypes = {
  menu: React.PropTypes.object.isRequired,
  current: React.PropTypes.string.isRequired
}

const SiteMenu = ({menus, url}) => (
  <aside className='main-sidebar'>
    <section className='sidebar'>
      <ul className='sidebar-menu'>
        {
          menus.map((menu, index) => {
            if (menu.subs && menu.subs.length) {
              return <MenuTree key={index} menu={menu} current={url} />
            } else {
              return <MenuItem key={index} menu={menu} current={url} />
            }
          })
        }
      </ul>
    </section>
  </aside>
)

SiteMenu.propTypes = {
  menus: React.PropTypes.array.isRequired,
  url: React.PropTypes.string.isRequired
}

export default SiteMenu
