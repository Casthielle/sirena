class Validator {
  constructor() {
    this._errors = [];
    this._data = null;
  }

  make(data, rules) {
    this._errors = [];
    this._data = data;
    for (const i in rules) {
      if (!(i in data)) {
        data[i] = null;
      }
    }
    for (const i in this._data) {
      const value = this._data[i];
      let stop = false;
      for (const j in rules[i]) {
        let rule = rules[i][j];
        let valid; const error = {};
        if (!stop) {
          switch (rule) {
            case 'required': valid = this._required(value); break;
            case 'numeric': valid = this._numeric(value); break;
            case 'string': valid = this._string(value); break;
            case 'array': valid = this._array(value); break;
            case 'arrayString': valid = this._arrayString(value); break;
            case 'date': valid = this._date(value); break;
            case 'email': valid = this._email(value); break;
            default:
              const evaluate = rule.split(':')[1];
              rule = rule.split(':')[0];
              switch (rule) {
                case 'min': valid = this._min(value, parseInt(evaluate)); break;
                case 'max': valid = this._max(value, parseInt(evaluate)); break;
                case 'maxDate': valid = this._maxDate(value, data[evaluate]); break;
                case 'minDate': valid = this._minDate(value, data[evaluate]); break;
                default: console.log('invalid rule'); break;
              }
              break;
          }
          if (!valid) {
            error[i] = rule;
            this._errors.push(error);
            stop = true;
          }
        }
      }
    }
    this._attachErrors();
    return (this._errors.length === 0);
  };

  check(rules, section = 'body') {
    return async (req, res, next) => {
      const data = req[section];
      const valid = await this.make(data, rules);
      if (!valid) res.status(400).json({error: true, errors: this.getErrors('array')});
      else {
        next();
      }
    };
  };

  _required(value) {
    return !(value === '' || value === null || (this._type(value) === 'array' && value.length === 0));
  }
  _string(value) {
    return !(this._type(value) !== 'string');
  }
  _array(value) {
    return !(this._type(value) !== 'array');
  }
  _arrayString(value) {
    if (this._type(value) !== 'array') {
      return false;
    }
    return value.every((item) => this._type(item) === 'string');
  }
  // _numeric(value){ return !(this._type((isNaN(parseInt(value))) ? "string" : parseInt(value)) != 'number'); }
  _numeric(value) {
    return !(this._type(value) !== 'number');
  }
  _date(value) {
    return !(this._type(value) !== 'date');
  }
  _email(value) {
    return (/(.+)@(.+){2,}\.(.+){2,}/.test(value));
  }
  _min(value, min) {
    return !(value.length < min);
  }
  _max(value, max) {
    return !(value.length > max);
  }
  _minDate(date, minDate) {
    return !(date < minDate);
  }
  _maxDate(date, maxDate) {
    return !(date > maxDate);
  }

  _type(obj) {
    return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
  }

  _attachErrors() {
    const errors = this._errors.map((item) => {
      for (const i in item) {
        const label = i.split('_').map((c) => c[0].toUpperCase() + c.slice(1)).join(' ');
        const rule = item[i];
        let message;
        switch (rule) {
          case 'required': message = `the ${label} field is required`; break;
          case 'numeric': message = `the ${label} field must be numeric`; break;
          case 'date': message = `the ${label} field must be a date`; break;
          case 'email': message = `the ${label} field must have a valid email format`; break;
          case 'string': message = `the ${label} field must be a string`; break;
          case 'array': message = `the ${label} field must be an array`; break;
          case 'arrayString': message = `the elements of the array ${i} must be of a string type`; break;
          case 'min': message = `the ${label} field must have more characters`; break;
          case 'max': message = `the ${label} field must have fewer characters`; break;
          case 'maxDate': message = `the ${label} field must be less than the maximum date`; break;
          case 'minDate': message = `the ${label} field must be greater than the maximum date`; break;
          default: console.log('Error undefined.'); break;
        }
        item[i] = message;
      }
      return item;
    });
    this._errors = errors;
  }

  getErrors(format = 'json') {
    let output;
    switch (format) {
      case 'json': output = JSON.stringify(this._errors); break;
      case 'array': output = this._errors.map((item) => Object.values(item)[0]); break;
      default: console.log('Invalid format.'); break;
    }
    return output;
  }
}

export default new Validator();
