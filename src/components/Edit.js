import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            description: '',
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        axios.get(`http://localhost:5000/exercises/${id}`)
        .then((response) => {
            this.setState({ 
                username: response.data.username,
                description: response.data.description,
            });
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
        return (
          <div>
            <h3>Edit</h3>
            <p style={{ color: 'red' }}>{errorMessage}</p>
            <form onSubmit={this.handleEdit.bind(this)}>
              <input type="text" name="username" value={this.state.username} placeholder="Username" onChange={(e) => this.setState({ username: e.target.value })} />
              <textarea name="description" value={this.state.description} placeholder="Description" onChange={(e) => this.setState({ description: e.target.value })} /> 
              <button type="submit">Update</button>
            </form>
          </div>
        );
    }
}
