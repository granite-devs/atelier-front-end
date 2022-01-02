const CompareModal = ({relatedItemFeatures, relatedItemName,
  displayModal, currentItemFeatures}) => {
    console.log(currentItemFeatures);
    return (
      <div className={displayModal ? 'compare modal-show' : 'compare modal-hide'}>
        <h5 className='compare-title'>Comparing</h5>
        <table>
          <thead>
            <tr>
              <th>{currentItemFeatures.name}</th>
              <th>Feature</th>
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
                    <td>{feature.feature}
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