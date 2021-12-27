import React from 'react';


class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedIds: []
    }
  }

  componentDidMount() {
    getRelatedIds(this.props.productId)
  }

  getRelatedIds(productId) {

    var relatedIdsRequestConfig = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/${productId}/related`,
      headers: {
        'Authorization': API_KEY
      }
    };

    axios(relatedIdsRequestConfig)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div className=''>
        {relatedIds.map(relatedId => {
          return <ProductCard />
        })}
      </div>
    );
  }
}

export default Related;
