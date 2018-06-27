import { FileSystem } from 'expo';
import { Platform } from 'react-native';
import Environment from '../utils/environment';
import { setMemberAsync } from '../utils/storageApi';
import Member from './dataTypes';

const subDir = Platform.OS === 'ios' ? 'childFolder' : 'childfolder/';
const DIR = `${FileSystem.documentDirectory}${subDir}`;

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
    const JSONObj = body ? JSON.parse(body) || null : null;
    member = new Member(JSONObj);
    if (member.valid) {
      await setMemberAsync(member.export());
      // agreements
      const agreementEntries = Object.entries(JSONObj.data.CollectiveAgreement);
      if (agreementEntries.length > 0) {
        member.creds.collective_agreements = await downloadCollectiveAgreements(
          agreementEntries,
        );
        if (member.creds.collective_agreements.length > 0) {
          await setMemberAsync(member.export());
        }
      }
      return member;
    }
  } catch (e) {
    console.log('Error', e);
    // Check if error on .json() returned string
    const msg = e instanceof SyntaxError && body ? body : e.name;
    console.log(msg);
    return member;
  }
};

const downloadCollectiveAgreements = async (agreementEntries) => {
  const agreements = await Promise.all(
    agreementEntries.map(async ([key, value]) => {
      const {
        Doc: agreementMetaData,
        BelongsTo: agreementChildrenMetaData,
      } = value;
      const agreement = await downloadDocs(agreementMetaData.link);
      agreement.name = agreementMetaData.name;
      agreement.children = await agreementChildrenMetaData.map(
        async (childMetaData) => {
          console.log('Child Agreement', childMetaData);
          const child = downloadDocs(childMetaData.link);
          child.name = childMetaData.name;
        },
      );
      return agreement;
    }),
  );
  return agreements;
};

const getFileNameFromHttpResponse = (disposition) => {
  const result = disposition
    .split(';')[1]
    .trim()
    .split('=')[1];
  return result.replace(/"/g, '');
};

const downloadDocs = async (link) => {
  const data = await fetch(link);
  const mime = data.headers.get('Content-Type');
  const httpResponse = data.headers.get('Content-Disposition');
  const fileName = getFileNameFromHttpResponse(httpResponse);
  const f = await FileSystem.getInfoAsync(DIR);
  debugger;
  if (f.isDirectory === false) {
    const createDir = await FileSystem.makeDirectoryAsync(DIR, {
      intermediates: true,
    });
  }
  debugger;

  const path = `${DIR}/${fileName}`;
  // let agreement = {};
  try {
    const s = await FileSystem.readDirectoryAsync(DIR);
  } catch (e) {
    console.log(`Unable to readDirectory ${DIR}`);
    throw new Error('Unable to read Directory to save assets');
  }
  try {
    const url = await FileSystem.downloadAsync(link, path);
    if (url.status === 200) {
      debugger;
      console.log(`${fileName} downloaded to ${path}`);
      return {
        path,
        fileName,
        mime,
      };
    }
    throw new Error('unable to download file');
  } catch (e) {
    console.log('Error', `Unable to download ${fileName} to ${DIR}`);
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
