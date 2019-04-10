import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';
import { Link } from 'react-router-dom';

it('has title', () => {
  const wrapper = shallow(<Home />);
  expect(wrapper.find('h2').text()).toBe('Job / Skills Database');
});


it('has two links', () => {
  const wrapper = shallow(<Home />);
  expect(wrapper.find(Link)).toHaveLength(2);
});

