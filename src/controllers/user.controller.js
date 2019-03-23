const pg = require('../db/pg');
const ValidationError = require('../helpers/classes/ValidationError');
const ResponseBody = require('../helpers/classes/ResponseBody');
const validate = require('../validators/user.validation');
const makeSalt = require('../helpers/functions/makeSalt');
const encryptString = require('../helpers/functions/encryptString');

const create = (req, res) => {
  const resBody = new ResponseBody();

  //validate payload
  const validationResults = validate.createValidation(req.body);
  if (validationResults instanceof ValidationError) {
    resBody.setMessage(validationResults.message);
    return res.status(400).json(resBody);
  }

  //encrypt payloads
  const salt = makeSalt();
  let hashedPassword = '';
  let hashedemail = '';
  try {
    hashedPassword = encryptString(req.body.password, salt);
    hashedemail = encryptString(req.body.email, salt);
  } catch (e) {
    resBody.setMessage('Error encrypting payloads');
    resBody.removePayload();
    return res.status(500).json(resBody);
  }

  //store payloads
  pg.query(
    'INSERT INTO users (email, hash, salt, fName, lName, avatarUrl, emailHash, referrer) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [
      req.body.email,
      hashedPassword,
      salt,
      req.body.firstName,
      req.body.lastName,
      'not-set',
      hashedemail,
      'not-set'
    ],
    (error, result) => {
      if (error) {
        resBody.setMessage(error.message);
        resBody.removePayload();
        return res.status(500).json(resBody);
      }
      resBody.setSuccess();
      resBody.setMessage('Successfully created a new user');
      return res.status(201).json(resBody);
    }
  );
};

const readByEmail = (req, res) => {
  const resBody = new ResponseBody();
  const validationResults = validate.readyByEmailValidation(req.query);
  if (validationResults instanceof ValidationError) {
    resBody.setMessage(validationResults.message);
    return res.status(400).json(resBody);
  }
  pg.query(
    'SELECT * FROM users WHERE email = $1',
    [req.query.email],
    (error, results) => {
      if (error) {
        resBody.setMessage(error.message);
        resBody.removePayload();
        return res.status(500).json(resBody);
      }
      resBody.setSuccess();
      resBody.setMessage('Successfully performed the operation');
      resBody.setPayload({ key: 'exists', value: results.rowCount > 0 });
      resBody.setPayload({ key: 'users', value: results.rows });
      res.json(resBody);
    }
  );
};

const activate = (req, res) => {};

const remove = (req, res) => {
  const resBody = new ResponseBody();
  resBody.removePayload();
  if (process.env.NODE_ENV === 'development') {
    pg.query('TRUNCATE users', error => {
      if (error) {
        resBody.setMessage(error.message);
        return res.status(500).json(resBody);
      }
      resBody.setSuccess();
      resBody.setMessage('Successfully deleted the table');
      res.json(resBody);
    });
  } else {
    resBody.setMessage('This operation is only available in development');
    res.status(400).json(resBody);
  }
};

const read = (req, res) => {
  pg.query('SELECT * FROM users ORDER BY id ASC', (error, users) => {
    const resBody = new ResponseBody();
    if (error) {
      resBody.setMessage(error.message);
      resBody.removePayload();
      return res.status(500).json(resBody);
    }
    resBody.setSuccess();
    resBody.setMessage('Successfully performed the operation');
    resBody.setPayload({ key: 'users', value: users.rows });
    res.json(resBody);
  });
};

module.exports = {
  create,
  read,
  activate,
  remove,
  readByEmail
};
