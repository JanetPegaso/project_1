var express = require('express');
var router = express.Router();
const imageUpload = require('../middleware/imageUploader')
const controller = require('../controllers/chefController');

router.get('/login', controller.showLogin);

// localhost:3000/chef
router.post('/login', controller.loginChef);

//localhost:3000/chef/id/:id
router.get('/id/:id', controller.selectOneChef);

//localhost:3000/chef/form -> POST
router.post('/form',imageUpload('photo'),controller.saveChef)

//localhost:3000/chef/delete/:id
router.get('/delete/:id_chef',controller.deleteChef)


module.exports = router;
