const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'root',
    database: 'gourmet'
});

connection.connect(
    function ( error ){
        if(error){
            throw error;
        }else{
            console.log('Conexion base de datos GOURMET')
        }
    }
);

module.exports = connection;