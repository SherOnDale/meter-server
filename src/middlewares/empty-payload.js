const ResponseBody = require('../helpers/classes/ResponseBody');

module.exports = (req, res, next) => {
  if (
    ['POST', 'PATCH', 'PUT'].includes(req.method) &&
    req.headers['content-length'] === '0'
  ) {
    const responseBody = new ResponseBody();
    responseBody.setMessage('Payload should not be empty');
    responseBody.removePayload();
    return res.status(400).json(responseBody);
  }
  next();
};
