const router = require('express').Router();

router
  .route('/')
  .post((req, res) => {})
  .put((req, res) => {});

router.route('/:hash').get((req, res) => {});

module.exports = router;
