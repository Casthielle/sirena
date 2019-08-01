/**
* Class for validate form data.
*/
class Validator {
  
  /**
  * Constructor
  */
  constructor() {
    this._errors = [];
    this._data = null;
  }

  /**
  * Make validation.
  * @param {object} data Data to be validated.
  * @param {object} rules Rules that will be applied to the data.
  * @return {boolean} Validation status.
  */
  make(data, rules) {
    this._errors = [];
    this._data = data;
    for (const i in rules) {
      if (!(i in data)) {
        data[i] = null;
      }
    }
    for (const i in this._data) {
      if (i) {
        const value = this._data[i];
        let stop = false;
        for (const j in rules[i]) {
          if (j) {
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
                    case 'min':
                      valid = this._min(value, parseInt(evaluate)); break;
                    case 'max':
                      valid = this._max(value, parseInt(evaluate)); break;
                    case 'maxDate':
                      valid = this._maxDate(value, data[evaluate]); break;
                    case 'minDate':
                      valid = this._minDate(value, data[evaluate]); break;
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
      }
    }
    this._attachErrors();
    return (this._errors.length === 0);
  };

  /**
  * Middleware for route express.
  * @param {object} rules Rules that will be applied to the data.
  * @param {string} section Section of request to be validated.
  * @return {function} Middleware function.
  */
  check(rules, section = 'body') {
    return async (req, res, next) => {
      const data = req[section];
      const valid = await this.make(data, rules);
      if (!valid) {
        res.status(400).json({error: true, errors: this.getErrors('array')});
      } else {
        next();
      }
    };
  };

  /**
  * Required rule.
  * @param {any} value Value to be checked.
  * @return {function} Validation status.
  */
  _required(value) {
    /* eslint-disable */
    return !(value === '' || value === null || (this._type(value) === 'array' && value.length === 0));
    /* eslint-enable */
  }

  /**
  * String rule.
  * @param {any} value Value to be checked.
  * @return {function} Validation status.
  */
  _string(value) {
    return !(this._type(value) !== 'string');
  }

  /**
  * Array rule.
  * @param {any} value Value to be checked.
  * @return {function} Validation status.
  */
  _array(value) {
    return !(this._type(value) !== 'array');
  }

  /**
  * Array of strings rule.
  * @param {any} value Value to be checked.
  * @return {function} Validation status.
  */
  _arrayString(value) {
    if (this._type(value) !== 'array') {
      return false;
    }
    return value.every((item) => this._type(item) === 'string');
  }

  /**
  * Numeric rule.
  * @param {any} value Value to be checked.
  * @return {function} Validation status.
  */
  _numeric(value) {
    return !(this._type(value) !== 'number');
  }

  /**
  * Date rule.
  * @param {any} value Value to be checked.
  * @return {function} Validation status.
  */
  _date(value) {
    return !(this._type(value) !== 'date');
  }

  /**
  * Email rule.
  * @param {any} value Value to be checked.
  * @return {function} Validation status.
  */
  _email(value) {
    return (/(.+)@(.+){2,}\.(.+){2,}/.test(value));
  }

  /**
  * Min number rule.
  * @param {any} value Value to be checked.
  * @param {number} min Min number.
  * @return {function} Validation status.
  */
  _min(value, min) {
    return !(value.length < min);
  }

  /**
  * Max number rule.
  * @param {any} value Value to be checked.
  * @param {number} max Max number.
  * @return {function} Validation status.
  */
  _max(value, max) {
    return !(value.length > max);
  }

  /**
  * Min date rule.
  * @param {any} date Value to be checked.
  * @param {date} minDate Min date.
  * @return {function} Validation status.
  */
  _minDate(date, minDate) {
    return !(date < minDate);
  }

  /**
  * Max number rule.
  * @param {any} date Value to be checked.
  * @param {date} maxDate Max date.
  * @return {function} Validation status.
  */
  _maxDate(date, maxDate) {
    return !(date > maxDate);
  }

  /**
  * Get type of any object
  * @param {any} obj Object to get type data
  * @return {string} Object type.
  */
  _type(obj) {
    return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
  }

  /**
  * Attach the current erros to error list.
  */
  _attachErrors() {
    const errors = this._errors.map((item) => {
      for (const i in item) {
        if (i) {
          const label = i.split('_')
              .map((c) => c[0].toUpperCase() + c.slice(1)).join(' ');
          const rule = item[i];
          let message;
          /* eslint-disable */
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
          /* eslint-enable */
          item[i] = message;
        }
      }
      return item;
    });
    this._errors = errors;
  }

  /**
  * Get current errors
  * @param {string} format Format in which errors will be returned
  * @return {any} Current errors.
  */
  getErrors(format = 'json') {
    let output;
    switch (format) {
      case 'json': output = JSON.stringify(this._errors); break;
      case 'array': output = this._errors.map((item) => {
        return Object.values(item)[0];
      }); break;
      default: console.log('Invalid format.'); break;
    }
    return output;
  }
}

export default new Validator();
