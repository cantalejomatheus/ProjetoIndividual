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

/* router.post('/save-beatboxer-count', function (req, res) {
    usuarioController.saveBeatboxerCount(req, res);
});

router.get('/beatboxer-count', function (req, res) {
    usuarioController.getBeatboxerCount(req, res);
}); */

router.get('/ultimas-contagens', function (req, res) {
    usuarioController.buscarUltimasContagens(req, res);
});

router.get('/contagem-tempo-real', function (req, res) {
    usuarioController.buscarContagemTempoReal(req, res);
});

router.post('/salvar-resultado', function(req, res) {
    usuarioController.salvarResultado(req, res);
});

router.get("/numero-usuarios", function (req, res) {
    usuarioController.numeroUsuarios(req, res);
});

router.get("/beatboxer-popular", function (req, res) {
    usuarioController.beatboxerPopular(req, res);
});




module.exports = router;