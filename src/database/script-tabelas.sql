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

CREATE DATABASE beatbox;

USE beatbox;

CREATE TABLE beatboxer ( 
    idBeatboxer INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL
);

CREATE TABLE quizResultado (
    idQuiz INT PRIMARY KEY AUTO_INCREMENT,
    fkBeatboxer INT,
    FOREIGN KEY (fkBeatboxer) REFERENCES beatboxer(idBeatboxer)
);

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(50) NOT NULL,
    fkQuiz INT NOT NULL,
    FOREIGN KEY (fkQuiz) REFERENCES quizResultado(idQuiz)
);

INSERT INTO beatboxer (nome) VALUES 
('Codfish'),
('Helium'),
('Dlow'),
('Napom');

INSERT INTO quizResultado (fkBeatboxer) VALUES 
(1), (2), (3), (4);


-- selects
/* select count(fkQuiz) as contador from usuario group by fkQuiz;

select count(nome) as nome from usuario;

select * from usuario join quizResultado on fkQuiz = idQuiz join beatboxer on fkBeatboxer = idBeatboxer; */

SELECT b.nome, COUNT(q.idQuiz) AS contador
FROM quizResultado q
JOIN beatboxer b ON q.fkBeatboxer = b.idBeatboxer
GROUP BY b.nome;

