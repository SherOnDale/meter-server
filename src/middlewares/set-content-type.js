module.exports = (req, res, next) => {
  if (
    req.headers["content-length"] &&
    req.headers["content-length"] !== "0" &&
    !req.headers["content-type"]
  ) {
    return res
      .status(400)
      .set("Content-Type", "application/json")
      .json({
        error: true,
        code: "920",
        message:
          'The "Content-Type" header must be set for requests with a non-empty payload'
      });
  }
  next();
};
