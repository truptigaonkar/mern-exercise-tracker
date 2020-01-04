import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            description: '',
            users: [],
        };
    }

    componentDidMount() {
      // Single exercise
        const { id } = this.props.match.params;
        axios.get(`http://localhost:5000/exercises/${id}`)
        .then((response) => {
            this.setState({ 
                username: response.data.username,
                description: response.data.description,
            });
        });

        // List of users
        axios.get('http://localhost:5000/users')
      .then((response) => {
          this.setState({ users: response.data });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          this.setState({
              errorMessage: 'User with the supplied id does not exist'
          });
      }
      });
      }

    handleEdit(e) {
        e.preventDefault();
        const { id } = this.props.match.params;
        axios.post(`http://localhost:5000/exercises/update/${id}`, 
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
        const { users } = this.state;
        return (
          <div>
            <h3>Edit</h3>
            <p style={{ color: 'red' }}>{errorMessage}</p>
            <form onSubmit={this.handleEdit.bind(this)}>
              {/* <input type="text" name="username" value={this.state.username} placeholder="Username" onChange={(e) => this.setState({ username: e.target.value })} /> */}
              <select 
                value={username}
                onChange={(e) => this.setState({ username: e.target.value })}
              >
                {
                users.map((user) => (
                  <>
                    <option 
                      key={user.username}
                      value={user.username}
                    >
                      {user.username}
                    </option>
                  </>
))
              }
              </select>
              <textarea name="description" value={description} placeholder="Description" onChange={(e) => this.setState({ description: e.target.value })} /> 
              <button type="submit">Update</button>
            </form>
          </div>
        );
    }
}
