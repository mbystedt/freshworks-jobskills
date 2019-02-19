import React, { Component } from 'react';

import styles from './Dropdown.module.css';

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
