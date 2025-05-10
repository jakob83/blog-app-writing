import { jwtDecode } from 'jwt-decode';

function checkAuth() {
  const token = localStorage.getItem('jwtToken');
  try {
    if (!token) {
      return false;
    }
    const decodedToken = jwtDecode(token);
    const now = Date.now() / 1000;
    if (decodedToken.exp < now) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

export default checkAuth;
