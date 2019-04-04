import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import SearchBar from './SearchBar/SearchBar'
import JobDetail from './JobDetail/JobDetail'

/**
 * Wraps the search bar with the job api and type
 */
class Jobs extends Component {

  render() {
    return (
      <div>
        <SearchBar
          api="/jobs/autocomplete"
          type="jobs"
          />

        <Route path={`${this.props.match.url}/:uuid`} component={JobDetail} />
      </div>
    );
  }
}

export default Jobs;
