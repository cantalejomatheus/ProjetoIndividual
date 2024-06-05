-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

-- tabelas
show tables;
select * from usuario;
desc usuario;


select * from quizResultado;
desc quizResultado;

select * from beatboxer;
desc beatboxer;

-- drop tabelas
drop table usuario;
drop table quizResultado;
drop database beatbox;

CREATE DATABASE beatbox;

USE beatbox;

CREATE TABLE beatboxer ( 
    idBeatboxer INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL
);

CREATE TABLE usuario ( 
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(50) NOT NULL
);

CREATE TABLE quizResultado ( 
    idQuiz INT PRIMARY KEY AUTO_INCREMENT,
    fkBeatboxer INT,
    fkUsuario INT,
    FOREIGN KEY (fkBeatboxer) REFERENCES beatboxer(idBeatboxer),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

INSERT INTO beatboxer (nome) VALUES 
('Codfish'),
('Helium'),
('Dlow'),
('Napom');




-- selects
/* SELECT fkUsuario, COUNT(idQuiz) AS contador
FROM quizResultado
GROUP BY fkUsuario;


SELECT COUNT(nome) AS totalUsuarios FROM usuario;


SELECT u.*, qr.*, b.*
FROM usuario u
JOIN quizResultado qr ON u.idUsuario = qr.fkUsuario
JOIN beatboxer b ON qr.fkBeatboxer = b.idBeatboxer;
 */

SELECT b.nome, COUNT(q.idQuiz) AS contador
FROM quizResultado q
JOIN beatboxer b ON q.fkBeatboxer = b.idBeatboxer
GROUP BY b.nome;

-- pegar beatboxer com maior numero de votos
SELECT b.nome, COUNT(q.idQuiz) AS contador
FROM quizResultado q
JOIN beatboxer b ON q.fkBeatboxer = b.idBeatboxer
GROUP BY b.nome
ORDER BY contador DESC
LIMIT 1;