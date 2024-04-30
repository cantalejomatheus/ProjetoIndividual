function entrar() {
    // aguardar();

    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;

    if (emailVar == "") {
        span_senha.innerHTML = `Preencha todos os campos`;
        return false;
        
        
        // finalizarAguardar();
        // cardErro.style.display = "block"
    }

    if (senhaVar == ""){
        span_senha.innerHTML = `Preencha todos os campos`;
        ipt_senha.style = "border-bottom: 1px solid red";
        return false;
    }

    else {
        setInterval(sumirMensagem, 5000)
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;

                setTimeout(function () {
                    alert("Login realizado!")
                    window.location = "quiz.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");
            span_senha.innerHTML = `Senha ou email inválido.`;
            ipt_senha.style = "border-bottom: 1px solid red";
            ipt_email.style = "border-bottom: 1px solid red";

            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none"
}