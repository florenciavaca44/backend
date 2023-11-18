const express = require ("express");
const cors = require("cors");
const {dbConnection} = require('../database/config')

class Server {
    constructor(){
        this.app= express();
        this.port = process.env.PORT;
        this.authPath= "/api/auth"
        this.usuariosPath="/api/usuarios"
        

        this.conectarDB()

        this.middLewares();

        this.routes();
    }
    async conectarDB(){
        await dbConnection();
    }


    middLewares(){
        //cors
        this.app.use(cors());
        //leer datos de cuerpo de la peticion en formato json
        this.app.use(express.json());

        //carpeta publica
        this.app.use(express.static("public"));
    }
    routes(){
        this.app.use(this.authPath, require("../routes/auth"));
        this.app.use(this.usuariosPath, require("../routes/usuarios"));
    }
listen(){
    this.app.listen(this.port, ()=>{
        console.log("server online port :", this.port );
    });

    }
}
module.exports =  Server