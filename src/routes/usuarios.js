var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

// lambda function
router.post("/autenticar", (req, res)=>{
    usuarioController.autenticar(req, res);
});

router.post("/cadastrar", (req, res)=>{
    usuarioController.cadastrar(req, res);
});

module.exports = router;