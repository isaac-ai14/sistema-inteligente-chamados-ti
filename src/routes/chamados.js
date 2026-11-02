
import { Router } from 'express';
import db from '../config/database.js';

const router = Router();

// Armazenamento temporário dos chamados
let chamados = [];
let proximoId = 1;

// GET - Listar todos os chamados
router.get('/', async (req, res) => {
    try {
        const [chamados] = await db.execute(
            'SELECT * FROM chamados'
        );

        res.json(chamados);

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao buscar chamados'
        });
    }
});

// GET - Buscar chamado pelo ID
router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        const [chamados] = await db.execute(
            'SELECT * FROM chamados WHERE id = ?',
            [id]
        );

        if (chamados.length === 0) {
            return res.status(404).json({
                mensagem: 'Chamado não encontrado'
            });
        }

        res.json(chamados[0]);

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao buscar chamado'
        });
    }
});

// POST - Criar um novo chamado
router.post('/', async (req, res) => {
    try {
        const { titulo, descricao, categoria, prioridade } = req.body;

        if (!titulo || !descricao) {
            return res.status(400).json({
                mensagem: 'Título e descrição são obrigatórios'
            });
        }

        const sql = `
            INSERT INTO chamados (titulo, descricao, categoria, prioridade)
            VALUES (?, ?, ?, ?)
        `;

        const [resultado] = await db.execute(sql, [
            titulo,
            descricao,
            categoria || 'Não classificado',
            prioridade || 'Pendente de classificação'
        ]);

        res.status(201).json({
            mensagem: 'Chamado criado com sucesso!',
            id: resultado.insertId
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao criar chamado'
        });
    }
});

// PUT - Atualizar um chamado

router.put('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        const { titulo, descricao, categoria, prioridade, status } = req.body;

        // Verifica se o chamado existe
        const [chamados] = await db.execute(
            'SELECT * FROM chamados WHERE id = ?',
            [id]
        );

        if (chamados.length === 0) {
            return res.status(404).json({
                mensagem: 'Chamado não encontrado'
            });
        }

        // Mantém os valores antigos quando não forem enviados
        const chamado = chamados[0];

        const sql = `
            UPDATE chamados
            SET titulo = ?, descricao = ?, categoria = ?,
                prioridade = ?, status = ?
            WHERE id = ?
        `;

        await db.execute(sql, [
            titulo ?? chamado.titulo,
            descricao ?? chamado.descricao,
            categoria ?? chamado.categoria,
            prioridade ?? chamado.prioridade,
            status ?? chamado.status,
            id
        ]);

        res.json({
            mensagem: 'Chamado atualizado com sucesso!'
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao atualizar chamado'
        });
    }
});


// DELETE - Excluir um chamado
router.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        // Verifica se o ID é válido
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                mensagem: 'ID inválido'
            });
        }

        // Exclui o chamado do MySQL
        const [resultado] = await db.execute(
            'DELETE FROM chamados WHERE id = ?',
            [id]
        );

        // Verifica se algum chamado foi excluído
        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Chamado não encontrado'
            });
        }

        res.status(200).json({
            mensagem: 'Chamado excluído com sucesso!'
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao excluir chamado'
        });
    }
});

export default router;
