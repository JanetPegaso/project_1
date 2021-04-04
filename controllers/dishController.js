const connection= require('../config/db');


class dishController {
    //Read from database (R)
    viewCreateDishForm(req, res) {
        let sql= `SELECT id_chef, chef_name, chef_last_name FROM chef`;
        connection.query(sql,(err, results)=>{
            if (err) throw err;
            res.render('createDish', { results })
        })
    }

    //Create dish (C)
    createDish(req,res){
        const {id_chef,dish_name,dish_description} = req.body;
        let dish_image = req.file.filename;
        //save to database
        let sql= `INSERT INTO dish (id_chef,dish_name,dish_description,dish_image) VALUES (
            ${id_chef},'${dish_name}','${dish_description}', '${dish_image}')`
        connection.query(sql,(err,result)=>{
            if(err)throw err;
            //redirect to oneChef
            res.redirect(`/chef/id/${id_chef}`)
        })
    }

    //Deletes Dishes by id (D)
    deleteDish(req, res) {
        const id = req.params.id_dish
        const id_chef = req.params.id_chef
        let sql = `DELETE FROM dish WHERE id_dish = ${id}`
        connection.query(sql, (error, result) => {
            if (error) throw error
            res.redirect(`/chef/id/${id_chef}`)
        })
    }
    
    //Render Edit Form
    viewEditDishForm(req, res){
        let id = req.params.id_dish;
        let sql = `SELECT * FROM dish WHERE id_dish= ${id}`;
        connection.query(sql, (err, result) => {
        if (err) throw err;
        res.render('editForm', { result})
        })
    }

    //update Method (U)
    updateDish(req, res) {
        const { dish_name, dish_description } = req.body
        const id = req.params.id_dish
        const id_chef = req.params.id_chef
        let sql = `UPDATE dish SET dish_name='${dish_name}',dish_description='${dish_description}' 
        WHERE id_dish = ${id}`;
        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.redirect(`/chef/id/${id_chef}`)
        })
    }
   
}


module.exports = new dishController();