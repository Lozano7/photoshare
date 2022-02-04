export const fetchUser = () => {
  const userInfo =
    localStorage.getItem('userInfo') !== 'undefined'
      ? JSON.parse(localStorage.getItem('userInfo'))
      : localStorage.clear();

  return userInfo;
};
