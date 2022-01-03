const ActionButton = ({list, actionBtnClick}) => {

  if (list === 'related') {
    return (
        <svg width="20" height="20"
          className='action-btn'
          onClick={() => {actionBtnClick('relatedList')}}>
        <polygon points="0,7.65 6.91,6.59 10,0 13.09,6.59 20,7.65 15,12.77 16.18,20 10,16.59 3.82,20 5,12.77"
          style={{
            fill: 'none',
            stroke: 'gray',
            strokeWidth: 2,
            fillRule: 'evenodd' //need?
          }} />
        </svg>
    );
  } else {
    return <div></div>
  }

}

export default ActionButton;