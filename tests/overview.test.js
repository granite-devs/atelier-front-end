import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ReactDOM from 'react-dom';

configure({ adapter: new Adapter() });

import React from 'react';
import DefaultView from '../src/components/overview/ImageGallery/DefaultView.jsx';
import ImageGallery from '../src/components/overview/ImageGallery/ImageGallery.jsx';
import Overview from '../src/components/overview/Overview.jsx';
import ProductInformation from '../src/components/overview/ProductInformation/ProductInformation.jsx';
import ProductDesc from '../src/components/overview/ProductInformation/ProductDesc.jsx';
import StyleSelector from '../src/components/overview/StyleSelector/StyleSelector.jsx';

let exampleData = {
  selectedStyleDefaultImages: [
    {url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},
    {url: 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQ',
    thumbnail_url: 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQ'}
  ],
  mainImage: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
  selectedProductName: 'Camo Onesie',
  selectedProductCategory: 'Jackets',
  selectedProductDefaultPrice: '140',
  selectedProductSlogan: 'Blend in to your crowd',
  selectedProductDesc: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
  selectedProductStyle: {
    name: 'Forest Green & Black',
    originalPrice: '140',
    salePrice: null
  },
  currentStlye: {
    photos: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
  },

};

describe('DefaultView component', () => {

  it('should render a page successfully', () => {
    const wrapper = shallow(<DefaultView state={exampleData}/>);
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

  it('should render a page successfully', () => {
    const wrapper = shallow(<ProductInformation state={exampleData}/>);
    expect(wrapper.length).toBe(1);
  });

  it('should display a productName', () => {
    const wrapper = shallow(<ProductInformation state={exampleData}/>);
    expect(wrapper.find('#productName').text()).toEqual(exampleData.selectedProductName);
  });

  it('should display a category', () => {
    const wrapper = shallow(<ProductInformation state={exampleData}/>);
    expect(wrapper.find('#category').text()).toEqual(`Category - [${exampleData.selectedProductCategory}]`);
  });

  it('should display a price', () => {
    const wrapper = shallow(<ProductInformation state={exampleData}/>);
    expect(wrapper.find('#price').text()).toEqual(exampleData.selectedProductDefaultPrice);
  });

  it('should display a slogan', () => {
    const wrapper = shallow(<ProductDesc state={exampleData}/>);
    expect(wrapper.find('#slogan').text()).toEqual(exampleData.selectedProductSlogan);
  });

  it('should display a description', () => {
    const wrapper = shallow(<ProductDesc state={exampleData}/>);
    expect(wrapper.find('#productDescription').text()).toEqual(exampleData.selectedProductDesc);
  });
});

describe('Overview Style Selector Component', () => {

  it('should render a page successfully', () => {
    const wrapper = shallow(<StyleSelector state={exampleData}/>);
    expect(wrapper.length).toBe(1);
  });

});
