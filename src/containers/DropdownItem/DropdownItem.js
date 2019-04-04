import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './DropdownItem.module.css';

/**
 * A generic dropdown item
 * @prop link The router link for the item
 * @prop name The text to display for the link
 */
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
