import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

import RelatedProductsList from '../src/components/Related/RelatedProductsList';


describe("Related Products List", () => {
  let wrapper, wrapperState, wrapperInstance;

  beforeEach(() => {
    wrapper = shallow(<RelatedProductsList />);
    wrapperState = wrapper.state();
  });

  it('is a stateful component', () => {
    expect(wrapperState).not.toBeNull();
  });

  it('should render a ProductCard component for every item in the relatedIds list', () => {
    const dummyIds = [1, 2, 3];

    wrapper.setState({ relatedIds: dummyIds }, () => {
      expect(wrapper.find('ProductCard')).toHaveLength(dummyIds.length);
    });
  });

});