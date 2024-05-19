var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está indefinido!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                                nome: resultadoAutenticar[0].nome,
                                email: resultadoAutenticar[0].email,
                                senha: resultadoAutenticar[0].senha,
                                id: resultadoAutenticar[0].id
                        })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res){
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (nome == undefined){
        res.status(400).send("Seu nome está indefinido.")
    }
    else if (email == undefined){
        res.status(400).send("Seu email está indefinido.")
    }
    else if (email == undefined){
        res.status(400).send("Sua senha está indefinido.")
    } else {
        usuarioModel.cadastrar(nome, email, senha)
        .then(
            (resultado)=>{
                res.json(resultado);
            }
        ).catch(
            (erro)=>{
                console.log(erro);
                console.log('\nHouve um erro ao realizar o cadastro! Erro: ', erro.sqlMessage);
                res.status(500).json(erro.sqlMessage)
            }
        )

    }


}

module.exports = {
    autenticar,
    cadastrar
}