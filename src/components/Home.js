import React from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        exercises: [],
        errorMessage: '',
    };
}

// Fetch the data from An External API
componentDidMount() {
    axios.get('http://localhost:5000/exercises')
        .then((response) => {
            this.setState({ exercises: response.data });
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.setState({
                errorMessage: 'Movie with the supplied id does not exist'
            });
        }
        });
}

  render() {
    const { exercises } = this.state;
    const { errorMessage } = this.state;
    return (
      <>
        <Helmet><title>Home</title></Helmet>
        <h3>List of exercises</h3>
        <p style={{ color: 'red' }}>{errorMessage}</p> 
        <table border="1">
          <thead>
            <tr>
              <th>Username</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise) => (
              <tr key={exercise._id}>
                <td>{exercise.username}</td>
                <td>{exercise.description}</td>
              </tr>
                        ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Home;
