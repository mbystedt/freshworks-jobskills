import React, { Component } from 'react';
import axios from 'axios';
import { Subject, from } from 'rxjs';
import { debounceTime, distinctUntilChanged, concatMap, catchError } from 'rxjs/operators';

import DropdownItem from '../DropdownItem/DropdownItem';
import Dropdown from '../Dropdown/Dropdown';

import { DROPDOWN_DELAY_MS, SEARCH_DEBOUNCE_MS } from '../../utils/constants';

import styles from './SearchBar.module.css';

class SearchBar extends Component {
  searchText$ = new Subject();

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      responses: [],
      notFound: false,
      focus: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.setFocus = this.setFocus.bind(this);
  }

  componentDidMount() {
    this.searchText$.pipe(
      debounceTime(SEARCH_DEBOUNCE_MS),
      distinctUntilChanged(),
      concatMap(value => {
        if (value === '') {
          return from([{
            data: []
          }]);
        }
        return from(
          axios.get(this.props.api, {
            params: {
              begins_with: value
            }
          })
        ).pipe(
          catchError(() => from([undefined]))
        );
      })
    ).subscribe((response) => {
      if (response) {
        this.setState({
          notFound: false,
          responses: response.data
        });
      } else {
        this.setState({
          notFound: true,
          responses: []
        });
      }
    });
  }

  handleChange({target: {value}}) {
    this.searchText$.next(value);
    this.setState({value});
  }

  setFocus(focus) {
    setTimeout(() => {
      this.setState({focus});
    }, DROPDOWN_DELAY_MS);
  }

  render() {
    const foundItems = this.state.responses.map((response) =>
      <DropdownItem
        key={response.uuid}
        link={`/${this.props.type}/${response.uuid}`}
        name={response.suggestion}></DropdownItem>
    );
    const content = (foundItems.length > 0 || this.state.notFound) && (
      <React.Fragment>
        {foundItems.length > 0 ? foundItems : '' }
        {this.state.notFound ? 'Not found' : '' }
      </React.Fragment>
      );
    return (
      <div className={styles.searchBar}>
        <div className={styles.smallText}>Find {this.props.type}</div>
        <Dropdown
          content={content}
          active={this.state.focus && foundItems.length > 0}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            onBlur={() => this.setFocus(false)}
            onFocus={() => this.setFocus(true)}/>
        </Dropdown>
      </div>
    );
  }
}

export default SearchBar;
