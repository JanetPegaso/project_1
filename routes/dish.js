var express = require('express');
var router = express.Router();
const imageUpload = require('../middleware/imageUploader')
let controller = require('../controllers/dishController')

//localhost:3000/chef/edit/:id
router.get('/edit/:id_dish', controller.viewEditDishForm)

//localhost:3000/chef/update/:id
router.post('/update/:id_dish/:id_chef', controller.updateDish)

//localhost:3000/chef/form -> GET 
router.get('/create', controller.viewCreateDishForm);

//localhost:3000/chef/update/:id
router.post('/create', imageUpload('dish_image'), controller.createDish)

//localhost:3000/chef/delete/:id
router.get('/delete/:id_dish/:id_chef',controller.deleteDish)


module.exports = router;