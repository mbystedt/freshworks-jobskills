import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * Displays helpful text on the home page
 */
class Home extends Component {
  render() {
    return (
      <div>
        <h2>Job / Skills Database</h2>

        <p>To begin, search for a <Link to="/jobs">job</Link> or <Link to="/skills">skill</Link>.</p>
      </div>
    );
  }
}

export default Home;
