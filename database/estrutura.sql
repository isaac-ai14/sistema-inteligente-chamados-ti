USE sti;

CREATE TABLE chamados (
	id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    categoria VARCHAR(50) DEFAULT 'Não classificado',
    prioridade VARCHAR(50) DEFAULT 'Pendente de classificação',
    status VARCHAR(30) DEFAULT 'Aberto',
    data_abertura DATETIME DEFAULT CURRENT_TIMESTAMP
);

SHOW TABLES;