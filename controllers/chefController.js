const connection = require('../config/db');
const sha1 = require('sha1');

//this class will contain the methods to manage CRUD for db chef table
class chefController {

    showLogin(req,res){
        res.render('login',{message: "" , warning:false})
    }
    
    //Renders a message in login page (R)
    loginChef(req,res){
        const{email,password} = req.body;
        console.log(req.body)
        const pass = sha1(password);
        const sql = `SELECT * FROM chef WHERE email = '${email}' AND password = '${pass}'`
        connection.query(sql,(err,result)=>{
            if(err)throw err;
            if(!result[0]){
                res.render("login", {message:"Wrong data", warning:true})
            }
            else{
                res.render("login", {message:`Welcome ${result[0].chef_name} ${result[0].chef_last_name}`, warning:false})
            }
        })
    }

    //method to select and render all chefs (R)
    selectAllChef(req, res) {
        let sql = `SELECT * FROM chef`;
        let sqlDish= `SELECT * FROM dish`;

        connection.query(sql, (err, results) => {
            if (err) throw err;
            connection.query(sqlDish,(err,resultDish)=>{
                if (err) throw err;
            res.render('index', { results, resultDish })
        })
        })
    }

    //select one chef and his/her dishes and send it to one chef view (R)
    selectOneChef(req, res) {
        let { id } = req.params
        let sql = `SELECT * FROM chef WHERE id_chef = ${id}`;
        let sqlDish= `SELECT * FROM dish WHERE id_chef = ${id}`
        connection.query(sql, (err, resultChef) => {
            if (err) throw err;
            connection.query(sqlDish,(err,resultDish)=>{
                if (err) throw err;
                res.render('oneChef', {resultChef,resultDish} )
            })

        })
    }

    //Creates one chef (C)
    saveChef(req, res) {
        const { chef_name, chef_last_name, email, chef_description, phone } = req.body;
        let password = req.body.password
        //process password variable with Secure Hash Algorithm (SHA)
        let passSha1 = sha1(password)
        let photo = req.file.filename;
        let sql = `INSERT INTO chef (chef_name,chef_last_name,email,password,chef_description,phone,photo) VALUES ( 
            '${chef_name}', '${chef_last_name}','${email}','${passSha1}', '${chef_description}', ${phone}, '${photo}')`;
        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.redirect('/')
        })
    }

    //Deletes One Chef by id(D)
    deleteChef(req, res) {
        let id = req.params.id_chef
        let sql = `DELETE FROM chef WHERE id_chef = ${id}`
        connection.query(sql, (error, result) => {
            if (error) throw error
            res.redirect('/')
        })
    }

    
}

module.exports = new chefController();