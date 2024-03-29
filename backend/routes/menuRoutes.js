const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/getMenuItems', menuController.getMenuItems);

module.exports = router;