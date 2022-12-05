import React, { Component } from 'react'
import PubSub from 'pubsub-js'
// import axios from 'axios'

export default class Search extends Component {
  // 箭头函数 在 括号前面加上 async
  // fetch 不用 xhr  但是兼容性不好 
  search = async () => {
    // console.log('search组件发送消息了')
    // 发布订阅模式 可以适用于任意组件
    // 获取用户的输入
    /**
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


    */
    /**

    const {
      keywordElement: { value: keyword }
    } = this
    fetch(`https://api.github.com/search/users?q=${keyword}`)
      .then(
        res => {
          // console.log(res.json(), '数据请求成功了,服务器联系成功罢了')
          return res.json() // res.json() 是个 Promise
          // 接口 404 也算成功
        }
        // e => {
        //   // 断网的时候进 error
        //   console.log(e, '数据请求失败')
        //   // 返回一个初始状态的 Promise
        //   return new Promise(() => {})
        // }
      )
      .then(
        ret => {
          console.log(ret, '数据请求成功了')
        }
        // err => {
        //   console.log(err, '数据获取失败')
        // }
      )
      .catch(err => {
        console.log(err, '统一处理错误')
      })

      */
    // 使用 Promise 解决回调地狱
    const {
      keywordElement: { value: keyword }
    } = this

    PubSub.publish('search', {
      isFirst: false,
      isLoading: true
    })
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${keyword}`
      )
      const data = await response.json()
      PubSub.publish('search', {
        users: data.items,
        isLoading: false
      })
    } catch (err) {
      PubSub.publish('search', {
        err,
        isLoading: false
      })
    }
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
