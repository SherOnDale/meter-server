const router = require('express').Router();
const userController = require('../controllers/user.controller');

router
  .route('/')
  .post(userController.create)
  .put(userController.update);

router.route('/:hash').get(userController.activate);

module.exports = router;
