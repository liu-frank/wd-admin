import React from 'react'
import { Link } from 'react-router'

const findMenu = (menus, url) => {
  let mainMenu = null
  let subMenu = null
  let thirdMenu = null

  for (let menu of menus) {
    if (menu.url === url) {
      mainMenu = url
    } else if (menu.subs && menu.subs.length) {
      for (let sub of menu.subs) {
        if (sub.url === url) {
          mainMenu = menu
          subMenu = sub
          break
        } else if (sub.subs && sub.subs.length) {
          for (let third of sub.subs) {
            if (third.url === url) {
              mainMenu = menu
              subMenu = sub
              thirdMenu = third
              break
            }
          }
        }
      }
    }
  }

  return {
    mainMenu,
    subMenu,
    thirdMenu
  }
}

const PageHeader = ({menus, url}) => {
  const {mainMenu, subMenu, thirdMenu} = findMenu(menus, url)

  if (thirdMenu) {
    return (
      <section className='content-header' style={{fontSize: 14}}>
        <Link to={mainMenu.url} style={{marginRight: 5}}>首页</Link>
        <i className='fa fa-angle-right' style={{marginRight: '5px'}}></i>
        <Link to={subMenu.url} style={{marginRight: '5px'}}>{subMenu.name}</Link>
        <i className='fa fa-angle-right' style={{marginRight: '5px'}}></i>
        <span>{thirdMenu.name}</span>
      </section>
    )
  } else if (subMenu) {
    return (
      <section className='content-header' style={{fontSize: 14}}>
        <Link to={mainMenu.url} style={{marginRight: '5px'}}>首页</Link>
        <i className='fa fa-angle-right' style={{marginRight: '5px'}}></i>
        <span>{subMenu.name}</span>
      </section>
    )
  } else {
    return (
      <section className='content-header' style={{fontSize: 14}}>
        <span style={{marginRight: '5px'}}>首页</span>
      </section>
    )
  }
}

PageHeader.propTypes = {
  menus: React.PropTypes.array.isRequired,
  url: React.PropTypes.string.isRequired
}

export default PageHeader
