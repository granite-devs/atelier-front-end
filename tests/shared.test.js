import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, render } from 'enzyme';

import StarRating from '../src/components/shared/StarRating';
import Star from '../src/components/shared/Star';

describe('StarRating component', () => {
  test('should have exactly 5 `Star` components as children', () => {
    const component = shallow( // mounts a `shallow` render of the component (does not render children)
      <StarRating rating={3} />
    );
    expect(component.find('Star')).toHaveLength(5);
  });
});

describe('Star component', () => {
  test('a Star with a rating fraction close to 1 should fill 100% of the star', () => {
    const component = shallow( // mounts a `shallow` render of the component (does not render children)
      <Star fraction={1} />
    );
    expect(component.containsMatchingElement(<stop offset='100%'></stop>)).toBe(true);
  });

  test('a Star with a rating fraction close to 0.75 should fill 75% of the star', () => {
    const component = shallow( // mounts a `shallow` render of the component (does not render children)
      <Star fraction={0.75} />
    );
    expect(component.containsMatchingElement(<stop offset='75%'></stop>)).toBe(true);
  });

  test('a Star with a rating fraction close to 0.5 should fill 50% of the star', () => {
    const component = shallow( // mounts a `shallow` render of the component (does not render children)
      <Star fraction={0.5} />
    );
    expect(component.containsMatchingElement(<stop offset='50%'></stop>)).toBe(true);
  });

  test('a Star with a rating fraction close to 0.25 should fill 25% of the star', () => {
    const component = shallow( // mounts a `shallow` render of the component (does not render children)
      <Star fraction={0.25} />
    );
    expect(component.containsMatchingElement(<stop offset='25%'></stop>)).toBe(true);
  });

  test('a Star with a rating fraction close to 0 should fill 0% of the star', () => {
    const component = shallow( // mounts a `shallow` render of the component (does not render children)
      <Star fraction={0} />
    );
    expect(component.containsMatchingElement(<stop offset='0%'></stop>)).toBe(true);
  });
});
