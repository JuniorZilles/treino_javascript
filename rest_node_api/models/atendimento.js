const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clientEhValido = atendimento.cliente.length >= 5;

        const validadcoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: "Data deve ser maior ou igual a data atual"
            },
            {
                nome: 'cliente',
                valido: clientEhValido,
                mensagem: "Cliente deve ter pelo menos 5 caracteres"
            }
        ];

        const erros = validadcoes.filter(campo => !campo.valido);

        const existeErros = erros.length;

        if (existeErros) {
            res.status(400).json(erros);
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data };

            const sql = "INSERT INTO atendimentos SET ?";

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro);
                } else {
                    res.status(201).json({...atendimento});
                }
            });
        }
    }

    lista(res) {
        const sql = "SELECT * FROM atendimentos;";

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        });
    }

    buscaPorId(id, res) {
        const sql = "SELECT * FROM atendimentos WHERE id = ?;";

        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                if (resultados.length > 0) {
                    res.status(200).json(resultados[0]);
                } else {
                    res.status(404).json("Not Found");
                }
            }
        });
    }

    altera(id, valores, res) {
        const sql = 'UPDATE atendimentos SET ? WHERE id=?'

        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        }

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({...valores, id});
            }
        });
    }

    deleta(id, res){
        const sql = 'DELETE FROM atendimentos WHERE id=?'
        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({id});
            }
        });
    }
}

module.exports = new Atendimento();