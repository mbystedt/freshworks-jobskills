import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import SearchBar from './SearchBar/SearchBar'
import JobDetail from './JobDetail/JobDetail'

class Skills extends Component {

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

export default Skills;
