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

  describe('Product Card Information', () => {
    let productCard, productCardState, cardName, cardCategory, cardPrice, cardSale;

    beforeEach(() => {
      productCard = shallow(<ProductCard />);
      productCardState = productCard.state();
    });

    describe('Image', () => {
      it('renders a product image using the state primaryImg url or the default image if the primaryUrl is null', () => {
        const cardImg = productCard.find('.card-img');

        if (!productCardState.primaryImg) {
          productCardState.primaryImg ="https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
        }

        expect(cardImg).toHaveLength(1);
        expect(cardImg.prop('src')).toEqual(productCardState.primaryImg);
      });
    });

    describe('Action Button', () => {

      it('is a class component of the ProductCard component with the name `.action-btn`', () => {
      });

      it('calls the actionBtnClick method when clicked', () => {
      });

      describe('Comparison Modal', () => {

        it('is hidden by default', () => {
        });

        it('it becomes visible when the related list action button is clicked', () => {
        });

        it('has a title with class name `compare-title` and text value `Comparing`', () => {
        });

        it('has a table with table headers that match the name of the currentItem and the relatedItem', () => {
        });

        it('displays all of the features for both the currentItem and the relatedItem', () => {
        });

        it('displays a checkmark if either item has that feature', () => {
        });

      })

    });


    it('has a card name element with class `.card-name`', () => { //name
      cardName = productCard.find('.card-name');
      expect(cardName).toHaveLength(1);
    });

    it('displays the name of the card in the .card-name div', () => {
      cardName = productCard.find('.card-name');
      expect(cardName.text()).toEqual(productCardState.name);
    });

    it('has a card category element with class `.card-category`', () => { //category
      cardCategory = productCard.find('.card-category');
      expect(cardCategory).toHaveLength(1);
    });

    it('displays the category of the card in the `.card-category` div', () => {
      cardCategory = productCard.find('.card-category');
      expect(cardCategory.text()).toEqual(productCardState.category);
    });

    it('has a card price element with class `.card-price`', () => { //price
      cardPrice = productCard.find('.card-price');
      expect(cardPrice).toHaveLength(1);
    });

    it('displays the price of the card in the `.card-price` div', () => {
      cardPrice = productCard.find('.card-price');
      expect(cardPrice.text()).toEqual('$' + productCardState.price);
    });

    it('has a card sale element with class `.card-sale`', () => { //sale
      cardSale = productCard.find('.card-sale');
      expect(cardSale).toHaveLength(1);
    });

    it('displays the sale of the card in the `.card-sale` div', () => {
      cardSale = productCard.find('.card-sale');
      expect(cardSale.text()).toEqual(productCardState.salePrice);
    });
  })

  describe('Product Card Rating', () => {
    let productCard, productCardState, cardRating, starRating;

    beforeEach(() => {
      productCard = shallow(<ProductCard />);
      productCardState = productCard.state();
      starRating = productCard.find('StarRating');
    })

    it('renders a StarRating component with class `.card-rating`', () => {
      expect(starRating).toHaveLength(1);
      expect(starRating.find('.card-rating')).toHaveLength(1);
    });

    it('should pass the product rating from state as a prop to the StarRating component', () => {
      expect(starRating.prop('rating')).toEqual(productCardState.rating);
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