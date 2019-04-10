import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import Skills from './Skills';
import SearchBar from './SearchBar/SearchBar';

it('has a search bar', () => {
  const props = {
    match: {
      url: '/skills'
    }
  };
  const wrapper = mount(
    <MemoryRouter initialEntries={["/skills/47"]}>
      <Skills {...props} />
    </MemoryRouter>
  );
  expect(wrapper.find(SearchBar)).toHaveLength(1);
  expect(wrapper.find(SearchBar).get(0).props.api).toBe('/skills/autocomplete');
  expect(wrapper.find(SearchBar).get(0).props.type).toBe('skills');
});
