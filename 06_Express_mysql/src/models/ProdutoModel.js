import db from '../conexao.js';
import mysql from 'mysql2/promise';

// Criação do pool de conexões
const conexao = mysql.createPool(db);

//Craindo Produto
const criandoProduto = async (nomeProduto) => {
    //SQL inserção
    console.log('ProdutoModul :: criandoProduto');
    const sql = `INSERT INTO produtos (nome_produto) VALUES (?)`;
    //Parametros de Inserção
    const params = [nomeProduto];

    try {
        const [resposta] = await conexao.query(sql, params);
        console.log(resposta);
    } catch (error) {
        console.log('Erro ao criar produto:', error);
    }
}

//Mostrando a tabela de produtos
const mostrarProdutos = async () => { 
    console.log('ProdutoModul :: mostrarProduto');
    //SQL para realizar consulta
    const sql = 'SELECT * FROM produtos';
    try {
        //Pegando primeiro array da resposta
        const [resposta] = await conexao.query(sql);
        console.log(resposta);
    } catch (error) {
        console.log('Erro ao buscar produtos:', error);
    }
};

const atualizanProduto = async (id_produto, nomeProduto) => {
    // SQL Update produto
    const sql = 'UPDATE produtos SET nome_produto = ? WHERE id_produto = ?'; 
    const params = [nomeProduto, id_produto];

    try {
        const [resposta] = await conexao.query(sql, params);
        console.log(resposta);
    } catch (error) {
        console.log(error);
    }
};

const deletarProduto = async (id_produto) => {
    const sql = 'DELETE FROM produtos WHERE id_produto = ?';
    const params = [id_produto];

    try {
        const [resposta] = await conexao.query(sql, params);
        if(resposta.affectedRows<1){
            return [404,{mensagem:'Produto nao encontrado'}]
        }else{
            return [200,{mensagem:'Produto deletado'}]
        }
    } catch (error) {
        console.log(error);
        return[500,{mensagem:'Erro Servidor', 
            code:error.code,
            sql:error.sql}]
    };
}
console.log( await  deletarProduto(5));
// atualizanProduto(6,'roma')
// mostrarProdutos();
//criandoProduto('roma');
