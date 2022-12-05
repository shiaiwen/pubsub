import React, { Component } from 'react'
import Search from './components/Search'
import List from './components/List'
import './App.css'

export default class App extends Component {
  render() {
    // const { users } = this.state
    return (
      <div className='container'>
        <Search />
        <List />
      </div>
    )
  }
}
