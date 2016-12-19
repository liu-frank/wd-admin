import React from 'react'

const Loading = ({option}) => (
  option.show
    ? <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 10000
      }}>
      <i style={{
        position: 'absolute',
        top: '45%',
        left: '45%',
        color: 'white',
        fontSize: '5rem'
      }}
        className='fa fa-refresh fa-spin' />
    </div> : null
)

export default Loading
