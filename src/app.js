import express from 'express';
import chamadosRouter from './routes/chamados.js';
import db from './config/database.js';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/chamados', chamadosRouter);

db.query('SELECT 1')
    .then(() => {
        console.log('MySQL conectado com sucesso!');
    })
    .catch((erro) => {
        console.error('Erro ao conectar ao MySQL:', erro.message);
    });

app.listen(port, () => {
    console.log('API STI rodando na porta: ' + port);
})