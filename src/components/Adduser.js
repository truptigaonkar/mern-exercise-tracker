import React, { Component } from 'react';
import axios from 'axios';

class Adduser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
    }

    handleAddUser(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/users/add', 
  {
    username: this.state.username
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
        return (
          <>
            <h3>Add User</h3>
            <form onSubmit={this.handleAddUser.bind(this)}>
              <input type="text" name="username" placeholder="Add user" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} />
              <button type="submit">Add User</button>    
            </form> 
          </>
        );
    }
}
export default Adduser;
