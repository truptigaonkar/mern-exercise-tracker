import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        description: '',
        errorMessage: '',
        duration: 0,
        date: new Date(),
        users: [],
    };
}

componentDidMount() {
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

handleAdd(e) {
  e.preventDefault();
  axios.post('http://localhost:5000/exercises/add', 
  {
    username: this.state.username,
    description: this.state.description,
    duration: this.state.duration,
    date: this.state.date
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
      const { duration } = this.state;
      const { date } = this.state;
      const { users } = this.state;
        return (
          <>
            <Helmet><title>Add</title></Helmet>
            <h3>Add Exercise</h3>
            <p style={{ color: 'red' }}>{errorMessage}</p>
            <form onSubmit={this.handleAdd.bind(this)}>
              {/* <input type="text" name="username" value={username} placeholder="Username" onChange={(e) => this.setState({ username: e.target.value })} /> */}
              <select 
                value={username}
                onChange={(e) => this.setState({ username: e.target.value })}
              >
                <option value="select">Select</option>
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
              <input type="text" name="duration" value={duration} placeholder="duration in minutes" onChange={(e) => this.setState({ duration: e.target.value })} />
              <DatePicker
                selected={date}
                onChange={(date) => this.setState({ date: date })}
              />
              <button type="submit">Enter</button>
            </form>
          </>
        );
    }
}
export default Add;
