import React, { Component } from 'react';

import styles from './Dropdown.module.css';

/**
 * Wraps the dropdown content in dropdown container compontent
 * @prop children   
 * @prop active     True if the dropdown is shown
 * @prop content    The dropdown content
 */
class Dropdown extends Component {
  render() {
    return (
      <div className={styles.dropdown + ' ' + (this.props.active ? styles.active : '')}>
        {this.props.children}
        {this.props.active && <div className={styles.dropdownContent}>
          {this.props.content}
        </div>}
      </div>
    );
  }
}

export default Dropdown;
