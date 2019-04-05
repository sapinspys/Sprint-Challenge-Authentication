import React from 'react'
import Axios from 'axios'

import requiresAuth from '../auth/requiresAuth.js'

import styled from 'styled-components'

class JokeList extends React.Component {
  state ={
    jokes: [],
  }

  render() {
    return (
      <ListContainer>
        <h2>Dad Jokes</h2>
        <ul>
          {this.state.jokes.map((joke,index) => (
            <li key={index}>{joke.joke}</li>
          ))}
        </ul>
      </ListContainer>
    )
  }

  componentDidMount() {
    Axios
      .get('/jokes')
      .then(res => {
        this.setState({ jokes: res.data })
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

export default requiresAuth(JokeList);