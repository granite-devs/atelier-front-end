const CompareModal = ({
  relatedItemFeatures,
  relatedItemName,
  displayModal,
  currentProductFeatures,
  actionBtnClick
}) => {

    return (
      <div className={displayModal ? 'compare modal-show' : 'compare modal-hide'}
        onClick={() => { actionBtnClick('relatedList') } }>
        <div className='compare-header'>
          <p className='compare-title'>Comparing</p>
          <p className='compare-exit'>X</p>
        </div>
        <table className='compare-table'>
          <thead>
            <tr>
              <th>{currentProductFeatures[0].name}</th>
              <th></th>
              <th>{relatedItemFeatures[0].name}</th>
            </tr>
          </thead>
          <tbody>
              {relatedItemFeatures.concat(currentProductFeatures)
                .map((feature, i) => {
                  return <tr key={i}>
                    <td>
                      {feature.belongsTo === 'currentProduct' ? '✔' : ''}
                    </td>
                    <td className='td-feature'>{feature.feature}
                      {feature.value ? ': ' + feature.value : ''}</td>
                    <td>
                      {feature.belongsTo === 'relatedItem' ? '✔' : ''}
                    </td>
                    </tr>
              })}
          </tbody>
        </table>
      </div>
    );

}

export default CompareModal;