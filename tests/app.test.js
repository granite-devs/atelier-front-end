import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import API_KEY from '../src/config.js';

import App from '../src/App';

test('`productId` of the App component should be equal to the first ID loaded from the API', () => {
  const component = shallow(<App />); // mounts a `shallow` render of the component (does not render children)

  const intializationConfig = {
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products',
    headers: {
      Authorization: API_KEY,
    },
  };

  axios(intializationConfig)
    .then((response) => {
      let expectedId = response.data[0].id;
      expect(component.state('productId')).toEqual(expectedId);
    })
    .catch((error) => {
      console.log(error);
    });
});