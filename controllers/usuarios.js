const{ request, response } = require ("express")
const Usuario = require('../models/usuario.js')
const bcypt = require('bcrypt')

//funciones 
const usuariosGet = async(req=request, res=response) => {
    const {limite = 5, desde=0}= req.query

    // const usuarios = await usuario.find().limit(limite).skip(desde);
    // const total = await usuario.countDocuments()

    const [total, usuarios]=await Promise.all([
        usuario.countDocuments(),
        usuario.find().limit(limite).skip(desde)
    ]);

    res. status(200).json({
        total,
        usuarios
    });
};
const usuarioPost = async(req = request, res= response ) => {

        const {nombre, correo, password, role}= req.body
        const usuario =new Usuario({nombre, correo, password, role})
// //validar si el correo existe
// const existeEmail =await usuario.findOne ({email})
// if (existeEmail){
//     return res.status(400).json({
//         msg: `el correo ${email} ya esta registrado`
//     })
// } 

        const salt =bcypt.genSaltSync()
        usuario.password =bcypt.hashSync(password, salt)

        await usuario.save()
        res.status(201).json({
            message:"usuario creado",
            usuario
        })
};
const usuarioPut = async (req= request, res ) => {
    const {id}=req.params;
    const {password, __id, email, ...resto} = req.body;

    const salt =bcypt.genSaltSync()
    resto.password =bcypt.hashSync(password, salt)

   const ususario = await Usuario.finByIdAndUpadate(id,resto, {new:true});

    res.status(200).json({
        message:"usuario actualizado",
        usuario,
    })
};
const usuarioDelete = async (req, res ) => {
    const {id}=req.params;
    //borrado fisico
    // const ususarioBorrado = await usuario.findByIdAndDelete(id,)
    //inactivar un documento
    const ususarioBorrado = await usuario.findByIdAndUpdate(id,{state:false}, {new:true})


    //request response
    res.json({
        message:"Usuario eliminado",
        ususarioBorrado
    })
};


module.exports = {
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}