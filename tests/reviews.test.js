import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, render } from 'enzyme';

import Reviews from '../src/components/reviews/Reviews';
import ReviewsList from '../src/components/reviews/ReviewsList';
import ReviewTile from '../src/components/reviews/ReviewTile';

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
test('should attempt to load more reviews when the \'More Reviews\' button is clicked', () => {
  const loadMoreReviews = jest.fn();
  const component = shallow(
    <ReviewsList reviews={[]} loadMoreReviews={loadMoreReviews}/>
  ); // mounts a `shallow` render of the component (does not render children)
  component.find('button').simulate('click');
  expect(loadMoreReviews).toHaveBeenCalled();
});

// ReviewTile.jsx
test('a \'Show More\' button should be visible when the review body is longer than 250 characters', () => {
  const component = shallow( // mounts a `shallow` render of the component (does not render children)
    <ReviewTile review={{ // provide a sample review
      'review_id': 1094839,
      'rating': 5,
      'summary': 'test',
      'recommend': true,
      'response': null,
      'body': Array(1001).join('a'),
      'date': '2021-12-28T00:00:00.000Z',
      'reviewer_name': 'test',
      'helpfulness': 0,
      'photos': []
    }} />
  );
  expect(component.find('.showMoreBtn')).toHaveLength(1);
});

test('\'Show More\' button should not be visible when the review body is shorter than 250 characters', () => {
  const component = shallow( // mounts a `shallow` render of the component (does not render children)
    <ReviewTile review={{ // provide a sample review
      'review_id': 1094839,
      'rating': 5,
      'summary': 'test',
      'recommend': true,
      'response': null,
      'body': Array(101).join('a'),
      'date': '2021-12-28T00:00:00.000Z',
      'reviewer_name': 'test',
      'helpfulness': 0,
      'photos': []
    }} />
  );
  expect(component.find('.showMoreBtn')).toHaveLength(0);
});

test('if the body is longer than 250 charcaters and the \'Show More\' button has not been pressed, the length of the displayed body should be 253 charcters (250 + "...")', () => {
  const component = shallow( // mounts a `shallow` render of the component (does not render children)
    <ReviewTile review={{ // provide a sample review
      'review_id': 1094839,
      'rating': 5,
      'summary': 'test',
      'recommend': true,
      'response': null,
      'body': Array(1001).join('a'),
      'date': '2021-12-28T00:00:00.000Z',
      'reviewer_name': 'test',
      'helpfulness': 0,
      'photos': []
    }} />
  );
  expect(component.find('p').text()).toHaveLength(253);
});

test('if the body is longer than 250 charcaters and the \'Show More\' button has been pressed, the full length of the body should be displayed', () => {
  const component = shallow( // mounts a `shallow` render of the component (does not render children)
    <ReviewTile review={{ // provide a sample review
      'review_id': 1094839,
      'rating': 5,
      'summary': 'test',
      'recommend': true,
      'response': null,
      'body': Array(1001).join('a'), // a string of 1000 characters
      'date': '2021-12-28T00:00:00.000Z',
      'reviewer_name': 'test',
      'helpfulness': 0,
      'photos': []
    }} />
  );
  component.find('.showMoreBtn').simulate('click');
  expect(component.find('p').text()).toHaveLength(1000);
});
