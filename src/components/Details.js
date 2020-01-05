import React, { Component } from 'react';
import axios from 'axios';

export default class Details extends Component {
      constructor(props) {
        super(props);
        this.state = {
          exercise: null,
          errorMessage: '',
        };
      }

      componentDidMount() {
        const { id } = this.props.match.params;
        axios.get(`http://localhost:5000/exercises/${id}`)
        .then((response) => {
            this.setState({ exercise: response.data });
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
        const { exercise } = this.state;
        const { errorMessage } = this.state;
        if (exercise === null) {
          return <p>Problem to fetch movie.....</p>;
      }
        return (
          <div>
            <h3>Details dfsfdsd</h3>
            <p style={{ color: 'red' }}>{errorMessage}</p>
            <p>
Id:
              {exercise._id}
            </p>
            <p>
Username:
              {exercise.username}
            </p>
            <p>
Description:
              {exercise.description}
            </p>
            <p>
Duration:
              {exercise.duration}
            </p>
            <p>
Date:
              {exercise.date}
            </p>
          </div>
        );
    }
}
