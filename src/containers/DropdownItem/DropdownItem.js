import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './DropdownItem.module.css';

class DropdownItem extends Component {
  render() {
    return (
      <div className={styles.dropdownItem}>
        <Link to={this.props.link}>{this.props.name}</Link>
      </div>
    );
  }
}

export default DropdownItem;
