import React, { Component } from 'react'
import pubSub from 'pubsub-js'
import './index.css'
// axios 在前端是对 xhr 的封装 在 node 中是对 http 的封装
// fetch 内置的 不借助 xhr




export default class List extends Component {
  state = {
    users: [], //初始化状态,为空数组
    isFirst: true, // 是否为第一次打开页面
    isLoading: true, // 是否为加载中
    err: '' // 请求相关的错误信息
  }
  // 组件初始化
  componentDidMount() {
    // 订阅消息
    pubSub.unsubscribe('search') // 不先取消订阅这个方法会执行多次
    this.token = pubSub.subscribe('search', (_, dataObj) => {
      // console.log(data, 'list 组件收到数据了11')
      this.setState(dataObj)
    })
  }
  // 组件卸载的钩子
  componentWillUnmount() {
    // 取消订阅消息
    pubSub.unsubscribe(this.token)
  }
  
  


  render() {
    const { users, isFirst, isLoading, err } = this.state
    return (
      /**
       * 1. users
       * 2. first
       * 3. error
       * 4. loading 加载中
       *
       */
      <div className='row'>
        {isFirst ? (
          <h2>欢迎使用，输入关键字随后点击搜索</h2>
        ) : isLoading ? (
          <h2>loading...</h2>
        ) : err ? (
          <h2 style={{ color: 'red' }}>出错了....</h2>
        ) : (
          users.map(user => {
            return (
              <div key={user.id} className='card'>
                <a href={user.html_url} target='_blank' rel='noreferrer'>
                  <img
                    src={user.avatar_url}
                    style={{ width: '100px' }}
                    alt='avatar'
                  />
                </a>
                <p className='card-text'>{user.login}</p>
              </div>
            )
          })
        )}
      </div>
    )
  }
}
