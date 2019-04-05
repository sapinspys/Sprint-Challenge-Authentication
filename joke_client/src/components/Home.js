import React from 'react'
import Axios from 'axios'

import requiresAuth from '../auth/requiresAuth.js'

import styled from 'styled-components'

class Home extends React.Component {
  state ={
    users: [],
  }

  render() {
    return (
      <ListContainer>
        <h2>List of Users</h2>
        <ul>
          {this.state.users.map((user,index) => (
            <li key={index}>{user.username}, <b>{user.department}</b></li>
          ))}
        </ul>
      </ListContainer>
    )
  }

  componentDidMount() {
    Axios
      .get('/users')
      .then(res => {
        this.setState({ users: res.data })
      })
      .catch(error => {
        console.log(error)
        // this.setState({
        //   error: error
        // });
      })
  }
}

// STYLED COMPONENTS

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 0;
  }

  li {
    margin-bottom: 10px;
    font-size: 1.5rem;
  }
`;

export default requiresAuth(Home);