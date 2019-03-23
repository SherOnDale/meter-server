const router = require('express').Router();
const userController = require('../controllers/user.controller');

router
  .route('/')
  .get(userController.readByEmail)
  .post(userController.createAccount)
  .put(userController.setProfile);

router.route('/all').get(userController.read);

router.route('/:hash').get(userController.activate);

module.exports = router;
