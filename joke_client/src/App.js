import React, { Component } from 'react'
import { Route, Link, Redirect, withRouter } from 'react-router-dom'

import logo from './logo.svg';
import './App.css';

import LoginForm from './components/LoginForm.js'
import RegistrationForm from './components/RegistrationForm.js'
import JokeList from './components/JokeList.js'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Link className='App-link' to="/">Jokes</Link>
          &nbsp;&#124;&nbsp;
          <Link className='App-link' to="/login">Login</Link>
          &nbsp;&#124;&nbsp;
          <Link className='App-link' to="/Register">Register</Link>
          <button onClick={this.logout}>Logout</button>
        </header>
        
        <>
          <PrivateRoute exact path='/' component={JokeList} />
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegistrationForm} />
        </>
      </div>
    );
  }

  logout = () => {
    localStorage.removeItem('token');
    alert('Successfully logged out!')
    this.props.history.push('/login');
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
)

export default withRouter(App);
