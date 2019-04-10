import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import Jobs from './Jobs';
import SearchBar from './SearchBar/SearchBar';

it('has a search bar', () => {
  const props = {
    match: {
      url: '/jobs'
    }
  };
  const wrapper = mount(
    <MemoryRouter>
      <Jobs {...props}/>
    </MemoryRouter>
  );
  expect(wrapper.find(SearchBar)).toHaveLength(1);
  expect(wrapper.find(SearchBar).get(0).props.api).toBe('/jobs/autocomplete');
  expect(wrapper.find(SearchBar).get(0).props.type).toBe('jobs');
});
