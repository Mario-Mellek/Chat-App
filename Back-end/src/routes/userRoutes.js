const {
  register,
  login,
  setPic,
  showAllUsers,
} = require('../controllers/userscontroller');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/setPic/:id', setPic);
router.get('/allUsers/:id', showAllUsers);

module.exports = router;
