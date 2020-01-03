import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        description: '',
        errorMessage: ''
    };
}

handleAdd(e) {
  e.preventDefault();
  axios.post('http://localhost:5000/exercises/add', 
  {
    username: this.state.username,
    description: this.state.description
  })
  .then((response) => {
      window.location = '/';
  })
  .catch((error) => {
    if (error.response.status === 404) {
    this.setState({
      errorMessage: 'Something went wrong!'
  });
} else if (error.response.status === 400) {
  this.setState({
    errorMessage: 'Fill in all the fields'
});
}
  }); 
}

    render() {
      const { errorMessage } = this.state;
      const { username } = this.state;
      const { description } = this.state;
        return (
          <>
            <Helmet><title>Add</title></Helmet>
            <h3>Add Exercise</h3>
            <p style={{ color: 'red' }}>{errorMessage}</p>
            <form onSubmit={this.handleAdd.bind(this)}>
              <input type="text" name="username" value={username} placeholder="Username" onChange={(e) => this.setState({ username: e.target.value })} />
              <textarea name="description" value={description} placeholder="Description" onChange={(e) => this.setState({ description: e.target.value })} /> 
              <button type="submit">Enter</button>
            </form>
          </>
        );
    }
}
export default Add;
