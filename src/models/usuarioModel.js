var database = require("../database/config")
const { route } = require("../routes/usuarios");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, email, senha FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

/* function saveBeatboxerCount(userId, beatboxer) {
    console.log("Salvando beatboxer:", userId, beatboxer);

    // Primeiro, selecione o ID do beatboxer com base no nome
    var selectBeatboxerSql = `SELECT idBeatboxer FROM beatboxer WHERE nome = '${beatboxer}';`;
    console.log("Executando a instrução SQL: \n" + selectBeatboxerSql);

    return database.executar(selectBeatboxerSql).then(result => {
        if (result.length === 0) {
            throw new Error("Beatboxer não encontrado");
        }
        var beatboxerId = result[0].idBeatboxer;

        // Em seguida, insira um novo registro em quizResultado
        var insertQuizResultadoSql = `INSERT INTO quizResultado (fkBeatboxer) VALUES (${beatboxerId});`;
        console.log("Executando a instrução SQL: \n" + insertQuizResultadoSql);

        return database.executar(insertQuizResultadoSql).then(result => {
            var quizResultadoId = result.insertId;

            // Finalmente, atualize o usuário com o ID do quizResultado
            var updateUserSql = `UPDATE usuario SET fkQuiz = ${quizResultadoId} WHERE id = ${userId};`;
            console.log("Executando a instrução SQL: \n" + updateUserSql);

            return database.executar(updateUserSql);
        });
    });
}

// Nova função para obter a contagem dos beatboxers
function getBeatboxerCount() {
    console.log("ACESSEI O USUARIO MODEL \n function getBeatboxerCount()");
    var instrucaoSql = `
        SELECT fkQuiz, COUNT(*) as count FROM usuario GROUP BY fkQuiz;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
} */

// Função para salvar o resultado do quiz no banco de dados
function salvarResultadoQuiz(idUsuario, fkBeatboxer) {
    console.log("ACESSEI O USUARIO MODEL \n function salvarResultadoQuiz()");
    var instrucaoSql = `
        INSERT INTO quizResultado (fkUsuario, fkBeatboxer)
        VALUES (${idUsuario}, ${fkBeatboxer});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasContagens() {
    console.log("ACESSEI O USUARIO MODEL \n function buscarUltimasContagens()");
    var instrucaoSql = `
    SELECT beatboxer.nome, COUNT(quizResultado.idQuiz) AS count 
    FROM quizResultado
    JOIN beatboxer ON quizResultado.fkBeatboxer = beatboxer.idBeatboxer
    GROUP BY beatboxer.nome;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarContagemTempoReal() {
    console.log("ACESSEI O USUARIO MODEL \n function buscarContagemTempoReal()");
    var instrucaoSql = `
        SELECT beatboxer.nome, COUNT(quizResultado.idQuiz) AS count
        FROM quizResultado
        JOIN beatboxer ON quizResultado.fkBeatboxer = beatboxer.idBeatboxer
        GROUP BY beatboxer.nome;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}




module.exports = {
    autenticar,
    cadastrar,
    buscarUltimasContagens,
    buscarContagemTempoReal,
    salvarResultadoQuiz
    /*     saveBeatboxerCount,
        getBeatboxerCount */
}; 