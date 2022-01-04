const CompareModal = ({relatedItemFeatures, relatedItemName,
  displayModal, currentItemFeatures, actionBtnClick}) => {
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
              <th>{currentItemFeatures.name}</th>
              <th></th>
              <th>{relatedItemName}</th>
            </tr>
          </thead>
          <tbody>
              {relatedItemFeatures.concat(currentItemFeatures.features)
                .map((feature, i) => {
                  return <tr key={i}>
                    <td>
                      {feature.belongsTo === 'currentItem' ? '✔' : ''}
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