const ResponseBody = require('../helpers/classes/ResponseBody');

module.exports = (req, res, next) => {
  if (
    !req.headers['content-type'].includes('application/json') &&
    !req.headers['content-type'].includes('multipart/form-data')
  ) {
    const rBody = new ResponseBody();
    rBody.setMessage(
      'The "Content-Type" header must always be "application/json" or "multipart/form-data'
    );
    rBody.removePayload();
    rBody.removePayload();
    return res.status(415).json(rBody);
  }
  next();
};
