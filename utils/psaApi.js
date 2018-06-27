import { FileSystem } from 'expo';
import Environment from '../utils/environment';
import { setMemberAsync } from '../utils/storageApi';
import Member from './dataTypes';
import base64 from 'base-64';

const DIR = `${FileSystem.documentDirectory}childFolder/`;

export class LoginAPI {
  constructor(headers) {
    this.options = {
      method: 'POST',
      headers,
      mode: 'no-cors',
    };
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
        debugger;
        const barCodeImg = await this.downloadDocs(JSONObj.data.BarcodeSource);

        if (barCodeImg) member.creds.barcode_img = barCodeImg.path;
        debugger;

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

  downloadCollectiveAgreements = async (agreementEntries) => {
    const agreements = await Promise.all(
      agreementEntries.map(async ([key, value]) => {
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

  downloadDocs = async (link) => {
    let fileName = null;
    const data = await fetch(link, this.options);
    const mime = data.headers.get('Content-Type');
    const httpResponse = data.headers.get('Content-Disposition');

    if (httpResponse) fileName = this.getFileNameFromHttpResponse(httpResponse);
    else if (mime.includes('png') && link.includes('barcode')) {
      const d = await data.blob();
      debugger;
      link =
        'https://vignette.wikia.nocookie.net/fantendo/images/6/6e/Small-mario.png';
      // try {
      //   const p = await data.blob();
      //   const re = base64(p);
      // } catch {
      //   debugger;
      // }
      fileName = 'barcode.png';
      debugger;
    }
    const f = await FileSystem.getInfoAsync(DIR);
    if (f.exists === 0) {
      const d = await FileSystem.makeDirectoryAsync(DIR, {
        intermediates: true,
      });
    }

    const path = `${DIR}/${fileName}`;
    // let agreement = {};
    try {
      const s = await FileSystem.readDirectoryAsync(DIR);
    } catch (e) {
      debugger;
      return new Error([`Unable to create local Directory ${DIR}`['psaApi']]);
      console.log(`Unable to readDirectory ${DIR}`);
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
    const response = await fetch(Environment.LOGOUT_END_POINT, {
      mode: 'no-cors',
    });
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
