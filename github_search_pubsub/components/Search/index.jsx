import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'

export default class Search extends Component {
  search = () => {
    // console.log('search组件发送消息了')
    // 发布订阅模式 可以适用于任意组件
    // 获取用户的输入
    const {
      keywordElement: { value: keyword }
    } = this
    // console.log(keyword)
    // 发送网络请求
    // https://api.github.com/search?q=ajax
    // 后端用 cors 解决跨域
    PubSub.publish('search', {
      isFirst: false,
      isLoading: true
    })

    axios
      .get(`https://api.github.com/search/users?q=${keyword}`)
      .then(res => {
        PubSub.publish('search', {
          users: res.data.items,
          isLoading: false
        })
      })
      .catch(err => {
        console.log('请求失败的结果', err)

        PubSub.publish('search', {
          err,
          isLoading: false
        })
      })
    // avatar 神灵的化身
  }

  render() {
    return (
      <section className='jumbotron'>
        <h3 className='jumbotron-heading'>Search Github Users</h3>
        <div>
          <input
            type='text'
            placeholder='enter the name you search'
            ref={c => (this.keywordElement = c)}
          />
          &nbsp;<button onClick={this.search}>Search</button>
        </div>
      </section>
    )
  }
}
