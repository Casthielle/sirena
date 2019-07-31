import Token from '../helpers/token';

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({message: 'Unauthorized'});
  } else {
    const token = req.headers.authorization.split(' ')[1];
    try {
      await Token.decode(token);
      next();
    } catch (error) {
      return res.status(500).send(error);
    }
  }
};

export default auth;
