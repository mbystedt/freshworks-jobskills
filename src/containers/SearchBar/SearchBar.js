import React, { Component } from 'react';
import axios from 'axios';
import { Subject, from } from 'rxjs';
import { debounceTime, distinctUntilChanged, concatMap, catchError } from 'rxjs/operators';

import DropdownItem from '../DropdownItem/DropdownItem';
import Dropdown from '../Dropdown/Dropdown';

import { DROPDOWN_DELAY_MS, SEARCH_DEBOUNCE_MS } from '../../utils/constants';

import styles from './SearchBar.module.css';

/**
 * Displays a search bar and a dropdown with matched items to select
 * @prop api   The api to query for the matched items
 * @prop type   The type (skills or jobs) of these matched items.
 */
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
      // Debounce so we don't call too often
      debounceTime(SEARCH_DEBOUNCE_MS),
      // Don't do anything if nothing changed
      distinctUntilChanged(),
      // Convert the text into an observable with the results
      concatMap(value => {
        // If search is blank then no results are shown
        if (value === '') {
          return from([{
            data: []
          }]);
        }
        // Generate observable from promise
        return from(
          axios.get(this.props.api, {
            params: {
              begins_with: value
            }
          })
        ).pipe(
          // If nothing is found then an error is returned
          catchError(() => from([undefined]))
        );
      })
    ).subscribe((response) => {
      if (response) {
        // Either search was blank or search returned results
        this.setState({
          notFound: false,
          responses: response.data
        });
      } else {
        // Error condition - Assume nothing found
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
