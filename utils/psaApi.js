import Environment from '../utils/environment';
import { setMemberAsync } from '../utils/storageApi';
import Member from './dataTypes';

export const login = async (h) => {
  const options = {
    method: 'POST',
    headers: h,
  };

  let member = {};
  let body = '';

  try {
    const response = await fetch(Environment.LOGIN_END_POINT, options);
    body = await response.text();
    if (body && JSON.parse(body)) {
      member = new Member(body);
      if (member.valid) {
        debugger;
        console.log(member.creds);
        await setMemberAsync(member.export());
      }
    } else console.log({ member });
    return member;
  } catch (e) {
    console.log('Error', e);
    // Check if error on .json() returned string
    const msg = e instanceof SyntaxError && body ? body : e.name;
    console.log(msg);
    return member;
  }
};

export const signOut = async () => {
  try {
    const response = await fetch(Environment.LOGOUT_END_POINT);
    const body = await response.text();
    if (body) console.log('server logged out');
  } catch (e) {
    console.log(e);
    console.log('server log out failed');
  }
};

//  public updateMember(credentials) {
//     return Observable.create((observer) => {
//       if (this.network.type == 'none') {
//         observer.error('No Network Connection Found');
//       } else {
