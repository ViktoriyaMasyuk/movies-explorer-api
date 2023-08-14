const router = require('express').Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { validationCreateUser, validationLogin } = require('../middlewares/validation');

router.post('/signup', validationCreateUser, createUser);
router.post('/signin', validationLogin, login);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => {
  if (req.accepts('json')) {
    next(new NotFoundError('Страница не найдена'));
  }
  next();
});

module.exports = router;
