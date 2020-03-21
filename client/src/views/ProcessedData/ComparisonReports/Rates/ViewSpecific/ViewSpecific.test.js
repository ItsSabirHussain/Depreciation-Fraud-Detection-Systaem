import React from 'react';
import { mount } from 'enzyme'
import ViewSpecific from './ViewSpecific';

it('renders without crashing', () => {
  mount(<ViewSpecific />);
});
