import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';

import Home from './containers/Home';
import Header from './containers/Layout/Header';
import Loader from './containers/Loader/Loader';
import { API_LOCATION } from './utils/constants';

import './App.css';

const Jobs = React.lazy(() => import('./containers/Jobs'));
const Skills = React.lazy(() => import('./containers/Skills'));

class App extends Component {
  constructor(props) {
    super(props);

    axios.defaults.baseURL = API_LOCATION;
  }

  render() {
    return (
      <Router>
        <div className="App">

          <Header />
          
          <Route exact path="/" component={Home} />
          <Route path="/jobs" render={(props) => (
            <Suspense fallback={<Loader />}>
              <Jobs {...props} />
            </Suspense>
            )}
          />
          <Route path="/skills" render={(props) => (
            <Suspense fallback={<Loader />}>
              <Skills {...props} />
            </Suspense>
            )}
          />
        </div>
    </Router>
    );
  }
}

export default App;
