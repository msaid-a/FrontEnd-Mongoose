import React, { Component } from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import { connect } from 'react-redux'

import Header from './Header'
import Login from './Login'
import Register from './Register'
import Task from './Task'
import {session} from '../actions/index'
import Profile from './Profile'
import UpdateProfile from './UpdateProfile'


class App extends Component {
  state = {
    check : false
  }
  componentDidMount(){
    // backup user dari localstorage ke redux
    let userData = JSON.parse(localStorage.getItem('userData'))
    if (userData){
      // kirim ke redux
      console.log(userData)
      this.props.session(userData)

    }

    this.setState({check : true})
}
  render() {
    if (this.state.check === true){
    return (
      <BrowserRouter>
              <div>
                <Header/>
                <Route path='/'  component={Task} exact/>
                <Route path='/login'  component={Login} />
                <Route path='/register'  component={Register} />
                <Route path='/profile'  component={Profile} />
                <Route path='/updateprofile'  component={UpdateProfile} />

              </div>
        </BrowserRouter>
    )
  }
  return (<div className="text-center">
  <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
  </div>
</div>)
}
}

export default connect(null,{session})(App)