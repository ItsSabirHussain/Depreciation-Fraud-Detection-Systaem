import React from 'react';
import ExtratDocumented from './ExtratDocumented';
import { mount } from 'enzyme'

it('renders without crashing', () => {
  mount(<ExtratDocumented />);
});
