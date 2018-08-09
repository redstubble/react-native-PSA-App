import { FileSystem } from 'expo';
import { Platform } from 'react-native';
import base64 from 'base-64';
import Environment from '../utils/environment';
import { setMemberAsync, setMemberBarcodeAsync } from '../utils/storageApi';
import Member from './dataTypes';

const subDir = Platform.OS === 'ios' ? 'childFolder' : 'childFolder/';
const DIR = `${FileSystem.documentDirectory}${subDir}`;

export class LoginAPI {
  constructor(e, p) {
    this.populateHeaders(e, p);
    this.options = {
      method: 'POST',
      headers: this.head,
    };
  }

  populateHeaders(email, password) {
    this.head = new Headers();
    const auth = base64.encode(`${email}:${password}`);
    this.head.append('Authorization', `Basic ${auth}`);
    this.head.append('Access-Control-Allow-Origin', '*');
    this.head.append(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
  }
  // Method
  signIn = async () => {
    let member = {};
    let body = '';
    try {
      const response = await fetch(Environment.LOGIN_END_POINT, this.options);
      body = await response.text();
      const JSONObj = body ? JSON.parse(body) || null : null;
      member = new Member(JSONObj);
      if (member.valid) {
        await setMemberAsync(member.export());
        // download barcode
        const barCodeImg = await this.downloadBlob(JSONObj.data.BarcodeSource);
        if (barCodeImg) member.creds.barcode_img = barCodeImg;

        // agreements
        const agreementEntries = Object.entries(
          JSONObj.data.CollectiveAgreement,
        );
        if (agreementEntries.length > 0) {
          member.creds.collective_agreements = await this.downloadCollectiveAgreements(
            agreementEntries,
          );
          if (member.creds.collective_agreements.length > 0) {
            await setMemberAsync(member.export());
          }
        }
      }
    } catch (e) {
      console.log('Error', e);
      // Check if error on .json() returned string
      const msg = e instanceof SyntaxError && body ? body : e.name;
      console.log(msg);
    }
    return member;
  };

  downloadCollectiveAgreements = async (agreementEntries) => {
    const agreements = await Promise.all(
      agreementEntries.map(async (entry) => {
        const value = entry.slice(1)[0]; // need second element of array
        const {
          Doc: agreementMetaData,
          BelongsTo: agreementChildrenMetaData,
        } = value;
        const agreement = await this.downloadDocs(agreementMetaData.link);
        agreement.name = agreementMetaData.name;
        agreement.children = await agreementChildrenMetaData.map(
          async (childMetaData) => {
            console.log('Child Agreement', childMetaData);
            const child = this.downloadDocs(childMetaData.link);
            child.name = childMetaData.name;
          },
        );
        return agreement;
      }),
    );
    return agreements;
  };

  getFileNameFromHttpResponse = (disposition) => {
    const result = disposition
      .split(';')[1]
      .trim()
      .split('=')[1];
    return result.replace(/"/g, '');
  };

  downloadBlob = async (link) => {
    const data = await fetch(link, this.options);
    const mime = data.headers.get('Content-Type');
    let result = false;
    if (mime.includes('png') && link.includes('barcode')) {
      const b = await data.blob();
      try {
        result = await this.readBlob(b);
        setMemberBarcodeAsync(result);
      } catch (rej) {
        console.log(rej);
      }
    }
    return result;
  };

  readBlob = (blob) => {
    const fileReaderInstance = new FileReader();
    return new Promise((resolve, reject) => {
      fileReaderInstance.onload = () => {
        resolve(fileReaderInstance.result);
      };

      fileReaderInstance.onerror = () => {
        fileReaderInstance.abort();
        reject(new DOMException('Problem parsing input file.'));
      };
      fileReaderInstance.readAsDataURL(blob);
    });
  };

  downloadDocs = async (link) => {
    let fileName = null;
    const data = await fetch(link, this.options);
    const mime = data.headers.get('Content-Type');
    const httpResponse = data.headers.get('Content-Disposition');

    if (httpResponse) fileName = this.getFileNameFromHttpResponse(httpResponse);
    const f = await FileSystem.getInfoAsync(DIR);
    if (f.exists === 0 || f.exists === false) {
      await FileSystem.makeDirectoryAsync(DIR, {
        intermediates: true,
      });
    }
    const path = `${DIR}/${fileName}`;
    try {
      await FileSystem.readDirectoryAsync(DIR);
    } catch (e) {
      return new Error([`Unable to create local Directory ${DIR}`.psaApi]);
    }

    try {
      const url = await FileSystem.downloadAsync(link, path);
      if (url.status === 200) {
        console.log(`${fileName} downloaded to ${path}`);
        return {
          path,
          fileName,
          mime,
        };
      }
      throw new Error();
    } catch (e) {
      console.log('Error', `Unable to download ${fileName} to ${DIR}`);
    }
  };
}

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
