import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

import App from '../src/App';
import RelatedProductsList from '../src/components/Related/RelatedProductsList';
import ProductCard from '../src/components/Related/ProductCard';


describe("Product Card", () => {

  it('is a stateful component', () => {
    const productCard = shallow(<ProductCard />);
    const productCardState = productCard.state();
    expect(productCardState).not.toBeNull();
  });

  it('should have an onClick method', () => {
    const productCard = shallow(<ProductCard productCardId={1} />);
    expect(productCard.props().onClick).toBeDefined();
  });

  it('should call updateAppProductId on click', () => {
    const updateAppProductId = jest.fn();
    const productCard = shallow(<ProductCard updateAppProductId={updateAppProductId} />);

    const productCardDiv = productCard.find('.product-card');
    expect(productCardDiv).toHaveLength(1);

    productCardDiv.simulate('click');

    expect(updateAppProductId).toHaveBeenCalled();
  });

  describe('Product Card Info', () => {
    let productCard, cardName, productCardState;

    beforeEach(() => {
      productCard = shallow(<ProductCard />);
      cardName = productCard.find('.card-name');
      productCardState = productCard.state();
    })

    it('has a card name element with class `product-card`', () => {
      expect(cardName).toHaveLength(1);
      expect(cardName.text()).toEqual(productCardState.name);
    });

    it('displays the name of the card in the .card-name div', () => {
      expect(cardName.text()).toEqual(productCardState.name);
    });

    it('displays the category of the card in the .card-category div', () => {
      expect(cardName.text()).toEqual(productCardState.name);
    });

  })

});

xdescribe("Related Products List", () => {
  let RelatedProductsList, relatedProductsListState, wrapperInstance;

  beforeEach(() => {
    RelatedProductsList = shallow(<RelatedProductsList />);
    relatedProductsListState = RelatedProductsList.state();
  });

  it('is a stateful component', () => {
    expect(relatedProductsListState).not.toBeNull();
  });

  it('should render a ProductCard component for every item in the relatedIds list', () => {
    const dummyIds = [1, 2, 3];

    RelatedProductsList.setState({ relatedIds: dummyIds }, () => {
      expect(RelatedProductsList.find('ProductCard')).toHaveLength(dummyIds.length);
    });
  });

});