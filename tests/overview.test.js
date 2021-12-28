import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

import React from 'react';
import Overview from '../src/components/overview/Overview';
import DefaultView from '../src/components/overview/ImageGallery/DefaultView.jsx';


describe('DefaultView component get style photos from Overview component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<DefaultView/>);
  });

  it('should show photos url', () => {
    expect(wrapper.state()).toEqual([]]);
  });
});