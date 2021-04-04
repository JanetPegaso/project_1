//middleware => una funcion intermedia
//requerimos la libreria de multer
const multer = require('multer');

//esto es una funcion que exportamos para utilizar multer en nuestro proyecto
function uploadImage(column){

    var storage = multer.diskStorage({
        //el destino que voy a guardar la imagen
        destination: `./public/images`,
        //el nombre que le voy a poner a la imagen
        filename: function (req, file, cb) {
            const extension = file.originalname.slice((file.originalname.lastIndexOf('.')))
          cb(null,   Date.now() + '-' + file.originalname   )
        }
      }) 
      var upload = multer({ storage }).single(column);
       return upload;
}


module.exports= uploadImage;