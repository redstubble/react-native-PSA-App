import RNFetchBlob from 'react-native-fetch-blob';
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
        debugger;
        this.getDocs(member.creds);
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

const getFileNameFromHttpResponse = (disposition) => {
  let result = disposition
    .split(';')[1]
    .trim()
    .split('=')[1];
  return result.replace(/"/g, '');
};

const getCollectiveAgreement = async () => {};

export const getDocs = async (creds) => {
  const docs = creds.collective_agreements;
  const docCollective = Object.keys(docs);
  docCollective.map(async (id) => {
    const { Doc: doc, BelongsTo: docChild } = docs[id];
    try {
      const data = await fetch(Doc.link);
      const mime = data.headers.get('Content-Type');
      const httpResponse = data.headers.get('Content-Disposition');
      const fileName = this.getFileNameFromHttpResponse(httpResponse);
      console.log(data.headers);
      const pdfResponse = RNFetchBlob.fetch('GET', data.link);
      const { status } = pdfResponse.info();
      if (status == 200) {
        debugger;
        console.log(
          `download complete: '${pdfResponse.toUrl()} + ${pdfResponse.getMetaData()}`,
        );
      }
    } catch (e) {
      return e.msg;
    }

    return '';
  });
};

//       fileTransfer
//         .download(docData.link, this.file.dataDirectory + fileName)
//         .then((entry) => {
//           console.log(
//             'download complete: ' +
//               entry.toURL() +
//               ' - ' +
//               entry.getMetadata(),
//           );
//           this.storage.ready().then(() => {
//             // set a key/value
//             agreement.path = entry.toURL();
//             agreement.mime = mime;
//             this.currentMember.collective_agreements.push(agreement);
//             this.storage.set('member', this.currentMember);
//           });
//         })
//         .catch((error) => {
//           // handle error
//           console.log('download failed for ' + docData.link);
//           console.log(error);
//           this.currentMember.collective_agreements.push(agreement);
//           this.storage.set('member', this.currentMember);
//         });
//     },
//     (err) => {
//       console.log(err);
//       this.currentMember.collective_agreements.push(agreement);
//       this.storage.set('member', this.currentMember);
//     },
//   );
// });

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
