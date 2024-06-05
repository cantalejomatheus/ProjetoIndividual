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
                        console.log("ESTOU NO USUARIO CONTROLLER")
                        res.json({
                                nome: resultadoAutenticar[0].nome,
                                email: resultadoAutenticar[0].email,
                                senha: resultadoAutenticar[0].senha,
                                idUsuario: resultadoAutenticar[0].idUsuario
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

/* // Novo controlador para salvar a contagem dos beatboxers
function saveBeatboxerCount(req, res) {
    var beatboxer = req.body.beatboxer;
    var userId = req.body.userId;

    if (beatboxer == undefined || userId == undefined) {
        res.status(400).send("Beatboxer ou usuário indefinido!");
    } else {
        usuarioModel.saveBeatboxerCount(beatboxer, userId)
            .then(
                (resultado) => {
                    res.json({ message: 'Contagem atualizada com sucesso' });
                }
            ).catch(
                (erro) => {
                    console.log(erro);
                    console.log('\nHouve um erro ao salvar a contagem! Erro: ', erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

// Novo controlador para obter a contagem dos beatboxers
function getBeatboxerCount(req, res) {
    usuarioModel.getBeatboxerCount()
        .then(
            (resultado) => {
                let counts = { Napom: 0, Codfish: 0, Dlow: 0, Helium: 0 };
                resultado.forEach(row => {
                    counts[row.fkQuiz] = row.count;
                });
                res.json(counts);
            }
        ).catch(
            (erro) => {
                console.log(erro);
                console.log('\nHouve um erro ao obter a contagem! Erro: ', erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
} */

function buscarUltimasContagens(req, res) {
    usuarioModel.buscarUltimasContagens().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as últimas contagens.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarContagemTempoReal(req, res) {
    usuarioModel.buscarContagemTempoReal().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a contagem em tempo real.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function salvarResultado(req, res) {
    var idUsuario = req.body.idUsuario;
    var fkBeatboxer = req.body.fkBeatboxer;

    console.log('ID do Usuário:', idUsuario);
    console.log('ID do Beatboxer:', fkBeatboxer);

    usuarioModel.salvarResultadoQuiz(idUsuario, fkBeatboxer)
        .then(function(resultado) {
            res.json(resultado);
        })
        .catch(function(erro) {
            console.log("Houve um erro ao salvar o resultado do quiz: ", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function numeroUsuarios(req, res) {
    usuarioModel.numeroUsuarios()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar o número de usuários: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function beatboxerPopular(req, res) {
    usuarioModel.beatboxerPopular()
        .then(function (resultado) {
            res.json(resultado[0]);
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar o beatboxer mais popular! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    autenticar,
    cadastrar,
    buscarUltimasContagens,
    buscarContagemTempoReal,
    salvarResultado,
    numeroUsuarios,
    beatboxerPopular
    /*     saveBeatboxerCount,
        getBeatboxerCount */
};