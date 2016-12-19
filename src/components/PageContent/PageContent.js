import React from 'react'

const PageContent = ({children}) => (
  <section className='content'>
    {children}
  </section>
)

// TODO: Check this
PageContent.propTypes = {
  children: React.PropTypes.any
}

export default PageContent
