var express = require('express');
var router = express.Router();
const controller = require('../controllers/chefController');


// localhost:3000/
router.get('/', controller.selectAllChef);


module.exports = router;
