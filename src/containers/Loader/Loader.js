import React, { Component } from 'react';

import styles from './Loader.module.css';

/**
 * Displays a generic loader spinner
 */
class Loader extends Component {
  render() {
    return (
      <div>
        <div className={styles.loaderBlock}>
          <span className={styles.loader}>|</span> Loading...
        </div>
      </div>
    );
  }
}

export default Loader;
