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

router.post('/save-beatboxer-count', function (req, res) {
    usuarioController.saveBeatboxerCount(req, res);
});

router.get('/beatboxer-count', function (req, res) {
    usuarioController.getBeatboxerCount(req, res);
});



module.exports = router;