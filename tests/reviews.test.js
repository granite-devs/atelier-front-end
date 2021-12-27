import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';

import Reviews from '../src/components/reviews/Reviews';

test('`setFilter` method should filter reviews based on the supplied filter function', () => {
  const component = shallow(<Reviews />); // mounts a `shallow` render of the componend (does not render children)
  const instance = component.instance();
  component.setState({ reviewsList: [1, 2, 3, 4] }); // insert dummy data into the list of reviews
  instance.setFilter((review) => { return review > 2; });
  expect(component.state('filteredReviewsList')).toEqual([3, 4]);

});