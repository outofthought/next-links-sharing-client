import cookie from 'js-cookie';
import Router from 'next/router';

//SET in cookie

export const setCookie = (key, value) => {
  if (process.browser) {
    // for next js to determine we are on the client or server. ==ENV For server:process.server
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

//REMOVE
export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key);
  }
};

//GET FROM COOKIE
// export const getCookie = (key) => {
//   if (process.browser) {
//     return cookie.get(key);
//   }
// };

export const getCookie = (key, req) => {
  // if (process.browser) {
  //     return cookie.get(key)
  // }
  return process.browser
    ? getCookieFromClient(key)
    : getCookieFromServer(key, req);
};
export const getCookieFromClient = (key) => {
  return cookie.get(key);
};
export const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  console.log('req.headers.cookie', req.headers.cookie);
  let token = req.headers.cookie
    .split(';')
    .find((c) => c.trim().startsWith(`${key}=`));
  if (!token) {
    return undefined;
  }
  let tokenValue = token.split('=')[1];
  console.log('getCookieFromServer', tokenValue);
  return tokenValue;
};

//SET in localStorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

//REMOVE
export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

// AUth user

export const authenticate = (response, next) => {
  setCookie('token', response.data.token);
  setLocalStorage('user', response.data.user);
  next();
};

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
      } else {
        return false;
      }
    }
  }
};
export const logout = () => {
  removeCookie('token');
  removeLocalStorage('user');
  Router.push('/login');
};
