import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';

import Reviews from '../src/components/reviews/Reviews';
import ReviewsList from '../src/components/reviews/ReviewsList';

// Reviews.jsx
test('`setFilter` method should filter reviews based on the supplied filter function', () => {
  const component = shallow(<Reviews />); // mounts a `shallow` render of the component (does not render children)
  const instance = component.instance();
  component.setState({ reviewsList: [1, 2, 3, 4] }); // insert dummy data into the list of reviews
  instance.setFilter((review) => { return review > 2; }, () => {
    expect(component.state('filteredReviewsList')).toEqual([3, 4]);
  });
});

test('`loadMoreReviews` should load a pre-determined number of reviews and add them to the list', () => {
  const component = shallow(<Reviews />); // mounts a `shallow` render of the component (does not render children)
  const instance = component.instance();
  const reviewsPerLoad = component.state('reviewsPerLoad');
  expect(component.state('reviewsList').length).toBe(0);
  instance.loadMoreReviews(() => {
    expect(component.state('reviewsList').length).toBe(reviewsPerLoad * 1);
    instance.loadMoreReviews(() => {
      expect(component.state('reviewsList').length).toBe(reviewsPerLoad * 2);
    });
  });
});

// ReviewsList.jsx
test('test', () => {
  const loadMoreReviews = jest.fn();
  const component = shallow(
    <ReviewsList reviews={[]} loadMoreReviews={loadMoreReviews}/>
  ); // mounts a `shallow` render of the component (does not render children)
  component.find('button').simulate('click');
  expect(loadMoreReviews).toHaveBeenCalled();
});
