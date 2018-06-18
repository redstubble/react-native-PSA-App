// tried joi but uses node modules unavailable for RN
// ideally use JSON schema validation tool.

export default class ValidateMember {
  constructor(JSONString) {
    this.creds = {};
    const JSONObj = JSON.parse(JSONString);
    debugger;
    if (JSONObj && this.validateMemberObj(JSONObj.data)) {
      this.valid = true;
    }
  }

  valid = false;
  errMsg = [];
  isValid = () => this.valid;
  export = () => JSON.stringify(this.creds);

  checkType = (action, property) => {
    let result = true;
    switch (action.type) {
      case 'number':
        if (typeof property !== 'number') {
          this.errMsg.push(`${property} is not of type ${action.type}`);
          result = false;
        }
        break;
      case 'string':
        if (typeof property !== 'string') {
          this.errMsg.push(`${property} is not of type ${action.type}`);
          result = false;
        }
        break;
      default:
        result = true;
    }
    return result;
  };

  validateMemberObj = (memberObj) => {
    Object.entries(this.schema).forEach(([k, v]) => {
      const prop = memberObj[k];
      if (v.required && !prop) {
        this.errMsg.push(`${k} not found in JSON response object as required`);
      }
      if (prop.toString().length > 0) {
        this.checkType(v, prop);
      }
    });

    if (this.errMsg.length === 0) {
      this.creds = {
        id: memberObj.ID,
        password: memberObj.Password, // todo, build token system
        first_name: memberObj.FirstName,
        surname: memberObj.Surname,
        email: memberObj.Email,
        member_no: memberObj.PSAMemberNumber,
        barcode_no: memberObj.BarcodeNumber,
        expiry: memberObj.Expiry,
        token: memberObj.Token,
        collective_agreements: [],
        valid: true,
      };
    }
    return this.errMsg.length === 0;
  };

  schema = {
    BarcodeNumber: {
      type: 'number',
      required: true,
    },
    BarcodeSource: {
      type: 'string',
      required: true,
    },
    CollectiveAgreement: {
      type: 'object',
      required: true,
    },
    Email: {
      type: 'string',
      required: true,
    },
    FirstName: {
      type: 'string',
      required: true,
    },
    ID: {
      type: 'number',
      required: true,
    },
    PSAMemberNumber: {
      type: 'string',
      required: true,
    },
    Surname: {
      type: 'string',
      required: true,
    },
    Token: {
      type: 'string',
      required: true,
    },
  };

  // pass in function, decorator, passes back something you pass back in with args
  fluent = (fn) => (...args) => {
    fn.apply(this, args);
    return this;
  };
}
