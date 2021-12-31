import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ReactDOM from 'react-dom';

configure({ adapter: new Adapter() });

import React from 'react';
import DefaultView from '../src/components/overview/ImageGallery/DefaultView.jsx';
import ImageGallery from '../src/components/overview/ImageGallery/ImageGallery.jsx';
import Overview from '../src/components/overview/Overview.jsx';

describe('DefaultView component', () => {
  let exampleData = {
    styleImages: [
      {url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},
      {url: 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQ',
      thumbnail_url: 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQ'}
    ],
    mainImage: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'
  }

  it('should render a page successfully', () => {
    const wrapper = shallow(<DefaultView/>);
    expect(wrapper.length).toBe(1);
  });

  it('render the main page correctly', () => {
    const wrapper = shallow(<DefaultView state={exampleData}/>);
    expect(wrapper.find('#main').prop('src')).toEqual(exampleData.mainImage);
  });

  it('should change the main image when the user clicks the right arrow', () => {
    const wrapper = shallow(<DefaultView state={exampleData} handleRightArrow={ImageGallery.handleRightArrow}/>);
    wrapper.find('#right').simulate('click');
    expect(wrapper.find('#main').prop('src')).toEqual(exampleData.mainImage);
  });
});

describe('Overview Product information component', () => {


  it ('', () => {

  });
});



