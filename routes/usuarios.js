const {Router} = require ("express");
const {check}= require ('express-validator')
const { validarCampos } = require("../middelwares/validar-campos");
const { esRolValido, emailExiste, existeUsuarioPorId} = require ('../helpers/db-validators')

const { 
    usuariosGet, 
    usuarioPost, 
    usuarioPut, 
    usuarioDelete 
} = require("../controllers/usuarios");


const router = Router();

router.get("/", usuariosGet);
router.post("/", 
[
    check("nombre","el nombre es obligatorio"). notEmpty(),
    check("password", "la contrasena debe tener mas de 6 caracteres"). isLength({min:6}),
    check("email","el email no es valido"). isEmail(),
    check("email"). custom(emailExiste),
    check("role").custom(esRolValido),
    validarCampos
], usuarioPost);
router.put("/:id", [
    check("id", "no es un id valido"). isMongoId(),
    check("id").custom(existeUsuarioPorId),     //valiar si el id esxiste
    check("role").custom(esRolValido),
    validarCampos
],usuarioPut);
router.delete("/:id",[
    check("id", "no es un id valido"). isMongoId(),
    check("id").custom(existeUsuarioPorId),
    // check("state").custom()
], usuarioDelete);

module.exports = router;