import Environment from '../utils/environment';

export const login = async (h) => {
  const options = {
    method: 'POST',
    headers: h,
  };
  let [success, body, data] = ['', '', ''];
  try {
    const response = await fetch(Environment.LOGIN_END_POINT, options);
    body = await response.text();
    data = JSON.parse(body);
    success = data && data.success;
    return {
      success,
      data,
    };
  } catch (e) {
    console.log('Error', e);
    success = false;
    // Check if error on .json() returned string
    data = { msg: e instanceof SyntaxError && body ? body : e.name };
    return {
      success,
      data,
    };
  }
};

export const logout = () =>
  fetch(Environment.LOGOUT_END_POINT)
    .then((response) => {
      console.log('Logout', response);
      console.log('server logged out');
    })
    .catch((e) => {
      console.log(e);
      console.log('server log out failed');
    });

//  public updateMember(credentials) {
//     return Observable.create((observer) => {
//       if (this.network.type == 'none') {
//         observer.error('No Network Connection Found');
//       } else {
