const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const timeAgo = (dateStr) => {
  const date = new Date(dateStr);
  const curDate = new Date();
  console.log(curDate.getFullYear());
  console.log(date.getFullYear());
  if (curDate - date < 60000) {
    return `${Math.floor((curDate - date) / 1000)} seconds ago`;
  } else if (curDate - date < 3600000) {
    return `${Math.floor((curDate - date) / 60000)} minutes ago`;
  } else if (curDate - date < 86400000) {
    return `${Math.floor((curDate - date) / 3600000)} hours ago`;
  } else if (curDate - date < 172800000) {
    return 'yesterday';
  } else if (curDate - date < 2419200000) {
    return `${Math.floor((curDate - date) / 86400000)} days ago`;
  } else if (curDate.getFullYear() === date.getFullYear()) {
    return `${monthNames[date.getMonth()]}. ${date.getDate()}`;
  } else {
    return `${monthNames[date.getMonth()]}. ${date.getDate()} ${date.getFullYear()}`;
  }
};

export default timeAgo;