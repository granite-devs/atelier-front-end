import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'regenerator-runtime/runtime'

configure({ adapter: new Adapter() });

import React from 'react';
import DefaultView from '../src/components/overview/ImageGallery/DefaultView.jsx';
import ImageGallery from '../src/components/overview/ImageGallery/ImageGallery.jsx';
import Overview from '../src/components/overview/Overview.jsx';

describe('DefaultView component', () => {
  test('should render a page successfully', () => {
    let wrapper = shallow(<DefaultView/>);
    expect(wrapper.length).toBe(1);
  });
});


