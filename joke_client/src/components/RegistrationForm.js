import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

import styled from "styled-components";

export class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    department: ""
  };

  render() {
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <h2>Register</h2>

        <label htmlFor="username">Username</label>
        <input
          onChange={this.handleChange}
          name="username"
          type="text"
          value={this.state.username}
        />

        <label htmlFor="password">Password</label>
        <input
          onChange={this.handleChange}
          name="password"
          type="password"
          value={this.state.password}
        />

        <label htmlFor="department">Department</label>
        <input
          onChange={this.handleChange}
          name="department"
          type="text"
          value={this.state.department}
          className="last-input"
        />

        <button type="submit" className="login-btn">
          Submit
        </button>

        <label style={loginError(this.state.error)}>
          Error: {this.state.error}. Please try again.
        </label>
      </StyledForm>
    );
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/auth/register", this.state)
      .then(res => {
        alert("Registration successful, please log in");
        console.log(res.data.message);
        this.props.history.push("/login");
      })
      .catch(error => {
        console.log(error);
        // this.setState({
        //   error: error
        // });
      });
  };
}

// STYLED COMPONENTS
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }

  label {
    margin-bottom: 10px;
    font-size: 1.5rem;
  }

  input {
    margin-bottom: 15px;
    padding: 5px 0;
    background: lightgray;
    font-size: 1.2rem;
    text-align: center;
  }

  button {
    padding: 6px 24px;
    font-weight: bold;
    font-size: 1.5rem;
    margin: 15px 0;
    border-radius: 5px;
    background: lightgray;
    color: black;
    border: none;
    box-shadow: 4px 4px 0 gray;
    transition: 0.15s;
    margin-right: 10px;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

// INLINE COMPONENTS (FOR TOGGLING)
const loginError = toggleFlag => {
  return {
    color: "red",
    fontSize: "0.9rem",
    display: toggleFlag ? "block" : "none",
    marginTop: "25px"
  };
};

export default withRouter(LoginForm);
