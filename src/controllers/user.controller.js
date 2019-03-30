const pg = require('../db/pg');
const ValidationError = require('../helpers/classes/ValidationError');
const ResponseBody = require('../helpers/classes/ResponseBody');
const validate = require('../validators/user.validation');
const makeSalt = require('../helpers/functions/makeSalt');
const encryptString = require('../helpers/functions/encryptString');
const filterRow = require('../helpers/functions/filterRow');

const createAccount = (req, res) => {
  const resBody = new ResponseBody();

  //validate payload
  const validationResults = validate.createUserValidation(req.body);
  if (validationResults instanceof ValidationError) {
    resBody.setMessage(validationResults.message);
    return res.status(400).json(resBody);
  }

  //encrypt payloads
  const salt = makeSalt();
  let hashedemail = '';
  try {
    hashedemail = encryptString(req.body.email, salt);
  } catch (e) {
    resBody.setMessage('Error encrypting email');
    resBody.removePayload();
    return res.status(500).json(resBody);
  }

  //store payloads
  pg.query(
    'INSERT INTO users (email, email_salt, email_hash) VALUES ($1, $2, $3)',
    [req.body.email, salt, hashedemail],
    (error, result) => {
      if (error) {
        resBody.setMessage(error.message);
        resBody.removePayload();
        return res.status(500).json(resBody);
      }
      resBody.setSuccess();
      resBody.setMessage('Successfully created a new user');
      resBody.removePayload();
      return res.status(201).json(resBody);
    }
  );
};

const setProfile = (req, res) => {
  const resBody = new ResponseBody();

  //validate payload
  const validationResults = validate.setPofileValidation(req.body);
  if (validationResults instanceof ValidationError) {
    resBody.setMessage(validationResults.message);
    return res.status(400).json(resBody);
  }

  //encrypt payloads
  const salt = makeSalt();
  let hashedPassword = '';
  try {
    hashedPassword = encryptString(req.body.password, salt);
  } catch (e) {
    resBody.setMessage('Error encrypting password');
    resBody.removePayload();
    return res.status(500).json(resBody);
  }

  //store payloads
  pg.query(
    'UPDATE users SET first_name = $1, last_name = $2, hash = $3, hash_salt = $4, profile = TRUE, avatar_url = $5 WHERE email = $6',
    [
      req.body.firstName,
      req.body.lastName,
      hashedPassword,
      salt,
      req.file && req.file.path ? req.file.path : null,
      req.body.email
    ],
    (error, result) => {
      if (error) {
        resBody.setMessage(error.message);
        resBody.removePayload();
        return res.status(500).json(resBody);
      }
      if (result.rowCount !== 1) {
        resBody.setMessage('Provided email adddress does not exist');
        resBody.removePayload();
        return res.status(400).json(resBody);
      }
      resBody.setSuccess();
      resBody.setMessage('Successfully set the user profile');
      resBody.removePayload();
      return res.json(resBody);
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
      const queryResult = results.rows.map(filterRow);
      resBody.setSuccess();
      resBody.setMessage('Successfully performed the operation');
      resBody.setPayload({ key: 'exists', value: results.rowCount > 0 });
      resBody.setPayload({ key: 'users', value: queryResult });
      res.json(resBody);
    }
  );
};

const activate = (req, res) => {
  const resBody = new ResponseBody();

  //validate payload
  const validationResults = validate.verifyAccountValidation(req.params);
  if (validationResults instanceof ValidationError) {
    resBody.setMessage(validationResults.message);
    return res.status(400).json(resBody);
  }

  //activate account
  pg.query(
    'UPDATE users SET verified = TRUE WHERE email_hash = $1',
    [req.params.hash],
    (error, results) => {
      if (error) {
        resBody.setMessage(error.message);
        resBody.removePayload();
        return res.status(500).json(resBody);
      }
      if (results.rowCount !== 1) {
        resBody.setMessage('Provided email address does not exist');
        resBody.removePayload();
        return res.status(400).json(resBody);
      }
      resBody.setSuccess();
      resBody.setMessage('Successfully verified the account');
      resBody.removePayload();
      return res.json(resBody);
    }
  );
};

const read = (req, res) => {
  pg.query('SELECT * FROM users ORDER BY id ASC', (error, users) => {
    const resBody = new ResponseBody();
    if (error) {
      resBody.setMessage(error.message);
      resBody.removePayload();
      return res.status(500).json(resBody);
    }
    const queryResult = users.rows.map(filterRow);
    resBody.setSuccess();
    resBody.setMessage('Successfully performed the operation');
    resBody.setPayload({ key: 'users', value: queryResult });
    res.json(resBody);
  });
};

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
    'INSERT INTO users (email, hash, hash_salt, first_name, last_name, email_hash, email_salt) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [
      req.body.email,
      hashedPassword,
      salt,
      req.body.firstName,
      req.body.lastName,
      hashedemail,
      salt
    ],
    (error, result) => {
      if (error) {
        resBody.setMessage(error.message);
        resBody.removePayload();
        return res.status(500).json(resBody);
      }
      resBody.setSuccess();
      resBody.setMessage('Successfully created a new user');
      resBody.removePayload();
      return res.status(201).json(resBody);
    }
  );
};

module.exports = {
  read,
  activate,
  readByEmail,
  setProfile,
  createAccount,
  create
};
