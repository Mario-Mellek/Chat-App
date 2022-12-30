const { register } = require('../controllers/userscontroller');
const router = require('express').Router();

router.post('/register', register);

module.exports = router;
