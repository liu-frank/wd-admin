import React from 'react'

const Box = ({children}) => (
  <div className='box'>
    {children}
  </div>
)

Box.propTypes = {
  children: React.PropTypes.any
}

export const BoxHeader = ({children}) => (
  <div className='box-header with-border'>
    {children}
  </div>
)

BoxHeader.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.array
  ]).isRequired
}

export const BoxBody = ({children}) => (
  <div className='box-body'>
    {children}
  </div>
)

BoxBody.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.any
  ]).isRequired
}

export const BoxFooter = ({children}) => (
  <div className='box-footer'>
    {children}
  </div>
)

BoxFooter.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.arrayOf(React.PropTypes.element)
  ]).isRequired
}

export default Box
