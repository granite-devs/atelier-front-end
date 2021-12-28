import timeAgo from '../src/utils/timeAgo';

test('`timeAgo` should express timestamps less than a minute old in the format \'(x) seconds ago\'', () => {
  const curDate = new Date();
  const testDate = curDate - 4000;
  expect(timeAgo(testDate)).toBe('4 seconds ago');
});

test('`timeAgo` should express timestamps less than an hour old in the format \'(x) minutes ago\'', () => {
  const curDate = new Date();
  const testDate = curDate - 1000 * 60 * 4;
  expect(timeAgo(testDate)).toBe('4 minutes ago');
});

test('`timeAgo` should express timestamps less than a day old in the format \'(x) hours ago\'', () => {
  const curDate = new Date();
  const testDate = curDate - 1000 * 60 * 60 * 4;
  expect(timeAgo(testDate)).toBe('4 hours ago');
});

test('`timeAgo` should express timestamps between 24 and 48 hours old as \'yesterday\'', () => {
  const curDate = new Date();
  const testDate = curDate - 1000 * 60 * 60 * 36;
  expect(timeAgo(testDate)).toBe('yesterday');
});

test('`timeAgo` should express timestamps less than 28 days old in the format \'(x) days ago\'', () => {
  const curDate = new Date();
  const testDate = curDate - 1000 * 60 * 60 * 24 * 4;
  expect(timeAgo(testDate)).toBe('4 days ago');
});