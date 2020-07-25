function isLogged() {
  const token = localStorage.getItem('tk-hopt');
  var isToken;
  token !== null ? (isToken = true) : (isToken = false);
  return isToken;
}

module.exports = isLogged;
