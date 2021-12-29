import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

import React from 'react';
import DefaultView from '../src/components/overview/ImageGallery/DefaultView.jsx';

describe('DefaultView component', () => {
  it('should render a page successfully', () => {
    let wrapper = shallow(<DefaultView/>);
    expect(wrapper.length).toBe(1);
  });

  it('When the user click one images, it should render a main image', () => {
    let wrapper = shallow(<DefaultView/>);
    wrapper.find('img').simulate('click');
    expect(wrapper.find('#main').length).toBe(1);
  });
});