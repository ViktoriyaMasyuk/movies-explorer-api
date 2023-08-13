const router = require('express').Router();
const {
  getUsers, updateUser,
} = require('../controllers/users');
const { validationUpdateUser, validationUserId } = require('../middlewares/validation');

router.patch('/me', validationUpdateUser, updateUser);
router.get('/me', validationUserId, getUsers);

module.exports = router;
