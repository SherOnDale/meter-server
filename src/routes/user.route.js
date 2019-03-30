const router = require('express').Router();
const upload = require('../db/multer');
const userController = require('../controllers/user.controller');

router
  .route('/')
  .get(userController.readByEmail)
  .post(userController.createAccount)
  .put(upload.single('avatar'), userController.setProfile);

router
  .route('/v2')
  .get(userController.read)
  .post(userController.create);

router.route('/:hash').get(userController.activate);

module.exports = router;
