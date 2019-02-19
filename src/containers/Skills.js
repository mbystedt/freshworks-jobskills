import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import SearchBar from './SearchBar/SearchBar'
import SkillDetail from './SkillDetail/SkillDetail'

class Skills extends Component {
  render() {
    return (
      <div>
        <SearchBar
          api="/skills/autocomplete"
          type="skills"
          />

        <Route path={`${this.props.match.url}/:uuid`} component={SkillDetail} />
      </div>
    );
  }
}

export default Skills;
