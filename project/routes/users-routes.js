const express = require('express');
const { check } = require('express-validator');

const usersControllers = require('../controllers/users-controllers');
const Auth = require('../middleware/auth');

const router = express.Router();

router.post(
  '/signup',
  [
    check('name')
      .not()
      .isEmpty(),
    check('age')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  usersControllers.signup
);

router.post('/login',usersControllers.login);

router.use(Auth);

router.get('/:uId',usersControllers.getUser);


module.exports = router;


