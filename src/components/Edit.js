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

    render() {
        return (
          <div>
            <h3>Edit</h3>
            <form>
              <input type="text" name="username" value={this.state.username} placeholder="Username" onChange={(e) => this.setState({ username: e.target.value })} />
              <textarea name="description" value={this.state.description} placeholder="Description" onChange={(e) => this.setState({ description: e.target.value })} /> 
              <button type="submit">Enter</button>
            </form>
          </div>
        );
    }
}
