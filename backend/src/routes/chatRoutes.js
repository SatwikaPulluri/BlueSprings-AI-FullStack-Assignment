const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/stream', chatController.streamChat);
router.post('/session', chatController.createSession);

module.exports = router;
