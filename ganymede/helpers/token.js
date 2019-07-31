import jwt from 'jwt-simple';
import moment from 'moment';

/**
* Token class for create and decode tokens.
*/
class Token {
  /**
  * Create an user token.
  * @param {object} user The user object.
  * @return {string} The token.
  */
  create(user) {
    const payload = {
      sub: user._id,
      iat: moment().unix(),
      exp: moment().add(2, 'weeks').unix(),
    };
    return jwt.encode(payload, process.env.API_KEY);
  }

  /**
  * Decode the user token.
  * @param {string} token The token.
  * @return {promise} A promise that resolve the valid token.
  */
  decode(token) {
    const decode = new Promise((resolve, reject) => {
      try {
        const payload = jwt.decode(token, process.env.API_KEY);
        if (payload.exp <= moment().unix()) {
          reject(new Error({
            status: 403,
            message: 'Forbiden',
          }));
        } else {
          resolve(true);
        }
      } catch (error) {
        reject(new Error({
          status: 500,
          message: 'Invalid Token',
        }));
      }
    });
    return decode;
  }
}

export default new Token();
