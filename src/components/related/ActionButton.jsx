const ActionButton = ({currentList, actionBtnClick}) => {

  if (currentList === 'related') {
    return (
        <svg width="20" height="20"
          className='action-btn'
          onClick={() => {actionBtnClick('relatedList')}}>
        <polygon points="0,7.65 6.91,6.59 10,0 13.09,6.59 20,7.65 15,12.77 16.18,20 10,16.59 3.82,20 5,12.77"
          style={{
            fill: 'none',
            stroke: 'gray',
            strokeWidth: 2
          }} />
        </svg>
    );
  } else {
    return (
      <svg width="20" height="20"
        className='action-btn'
        onClick={() => {actionBtnClick('yourOutfit')}}>
      <path d="M0 2 2 0 9 7 16 0 18 2 11 9 18 16 16 18 9 11 2 18 0 16 7 9 0 2"
        style={{
          fill: 'gray',
          stroke: 'gray',
          strokeWidth: 2
        }} />
      </svg>
  );
  }

}

export default ActionButton;