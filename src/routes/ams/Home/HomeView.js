import React from 'react'
import welcome from './welcome.png'

const HomeView = ({administrator}) => (
  <section className='content'>
    <div style={{
      marginLeft:'40%',
      marginTop: 20,
      width: 120,
      fontSize: 12,
      color: '#646464',
      textAlign: 'center'
    }}>
      <img style={{
      paddingTop: 10
    }} src={welcome} />
      </div>
    <div style={{
      marginLeft:'45%',
      marginTop: 20,
      width: 120,
      fontSize: 12,
      color: '#646464',
      textAlign: 'center'
    }}>

      <p>亲爱的{administrator.name}</p>
      <p>欢迎使用运营平台</p>
    </div>
  </section>
)

export default HomeView
