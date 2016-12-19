import React from 'react'
import classes from './SiteHeader.scss'
import avatar from './avatar.png'

export default class SiteHeader extends React.Component {
  render () {
    const { administrator, logout, resetPassword } = this.props

    return (
      <header className='main-header'>
        <a href='#' className='logo'>
          <span className='logo-mini'><b>O</b>SP</span>
          <span className='logo-lg'><b>网络科技客服平台</b></span>
        </a>

        <nav className='navbar navbar-static-top' role='navigation'>
          <a href='javascript:void(0);' className='sidebar-toggle' data-toggle='offcanvas' role='button'>
            <span className='sr-only'>Toggle navigation</span>
          </a>
          {
            administrator.navigations.map((menu, index) => (
              <a key={index} href={menu.url} target='_blank'
                className={`${classes.link} ${(window.location.href.indexOf(menu.url) >= 0) ? classes.active : classes.default}`}>
                {menu.name}
              </a>
            ))
          }
          <div className='navbar-custom-menu'>
            <ul className='nav navbar-nav'>
              <li className='dropdown user user-menu'>
                <a href='#' className='dropdown-toggle' data-toggle='dropdown'>
                  <img src={avatar} className='user-image' alt='User Image' />
                  <span className='hidden-xs'>{administrator.name}</span>
                </a>
                <ul className='dropdown-menu'>
                  <li className='user-header'>
                    <img src={avatar} className='img-circle' alt='User Image' />
                    <p>
                      {administrator.name}
                      <small style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>{administrator.roles.join(', ')}</small>
                    </p>
                  </li>
                  <li className='user-footer'>
                    <div className='pull-left'>
                      <a onClick={resetPassword}
                        href='javascript:void(0);'
                        className='btn btn-default btn-flat'>
                        修改密码
                      </a>
                    </div>
                    <div className='pull-right'>
                      <a onClick={logout}
                        href='javascript:void(0);'
                        className='btn btn-danger btn-flat'>
                        安全退出
                      </a>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}
