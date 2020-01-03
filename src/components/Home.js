import React from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        exercises: [],
        errorMessage: '',
        successMessage: '',
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

handleDelete(id) {
  axios.delete(`http://localhost:5000/exercises/${id}`)
        .then((response) => {
          this.setState({
            exercises: [...this.state.exercises].filter((exercise) => exercise._id !== id),
            successMessage: 'Exercise deleted successfully'
          });
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.setState({
                errorMessage: 'Bad request'
            });
        } else if (error.response.status === 404) {
          this.setState({
            errorMessage: 'Not found'
        });
        }
        });
}

  render() {
    const { exercises } = this.state;
    const { errorMessage } = this.state;
    const { successMessage } = this.state;
    return (
      <>
        <Helmet><title>Home</title></Helmet>
        <h3>List of exercises</h3>
        <p style={{ color: 'red' }}>{errorMessage}</p> 
        <p style={{ color: 'green' }}>{successMessage}</p> 
        <table border="1">
          <thead>
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise) => (
              <tr key={exercise._id}>
                <td>{exercise.username}</td>
                <td>{exercise.description}</td>
                <td>
                  <Link to={`/Details/${exercise._id}`}><button type="submit">Details</button></Link>
                  <button type="submit" onClick={() => this.handleDelete(exercise._id)}>Delete</button>
                </td>
              </tr>
                        ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Home;
