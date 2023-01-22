const {
  sendMessage,
  getAllMessages,
} = require('../controllers/messageController');

const router = require('express').Router();

router.post('/messages', sendMessage);
router.post('/allMessages', getAllMessages);

module.exports = router;
