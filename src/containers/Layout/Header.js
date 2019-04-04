import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';

/**
 * Displays the header of the application
 */
class Header extends Component {
  render() {
    return (
      <div>
          <ul className={styles.header}>
            <li className={styles.headerItem}>
              <Link to="/">Home</Link>
            </li>
            <li className={styles.headerItem}>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li className={styles.headerItem}>
              <Link to="/skills">Skills</Link>
            </li>
          </ul>
      </div>
    );
  }
}

export default Header;
