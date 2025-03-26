import db from '../conexao.js';
import mysql from 'mysql2/promise';

//Criando conexão com a databse inet
const conexao = mysql.createPool(db);

//Criando Produto
export const criandoProduto = async (nomeProduto) =>{
    console.log('ProdutoModel :: criandoProduto');

    //SQl de Inserção
    const sql = `INSERT INTO 
                    produtos (nome_produto)
                    VALUES (?)`;

    //parametros de inserção
    const params = [nomeProduto];
    
    try {
        const [resposta] = await conexao.query(sql,params);
        //console.log(resposta)
        return [201,{mensagem:'Produto cadastrado com sucesso'}];
    } catch (error) {
        //console.error(error);
        return[500,{
            mensagem:'Erro Servidor',
            code:error.code,
            sql:error.sqlMessage
        }]
    }
}

//Mostrando produtos da Tabela produtos
export const mostrarProdutos = async () =>{
    console.log('ProdutoModel :: mostrarProdutos');

    //SQL Para realizar consulta
    const sql = 'SELECT * FROM produtos';
    try {
        //Pegando primeiro array de resposta
        const [resposta] = await conexao.query(sql);
        //console.log(resposta);
        return [200,resposta]
    } catch (error) {
        //console.error(error);
        return[500,{
            mensagem:'Erro Servidor',
            code:error.code,
            sql:error.sqlMessage
        }]
    }
};

export const atualizandoProduto = async(id_produto,nomeProduto)=>{
    console.log('ProdutoModel :: atualizandoProduto');

    //SQL Update produto
    const sql = `UPDATE produtos SET nome_produto = ? WHERE id_produto = ?`;

    const params = [nomeProduto,id_produto];

    try {
        const [resposta] = await conexao.query(sql,params);
        //console.log(resposta);
        if (resposta.affectedRows<1){
            return [404,{mensagem:'Produto não encontrado'}]
        }else{
            return [200,{mensagem:'Produto atualizado com sucesso'}]
        }
    } catch (error) {
        //console.error(error);
        return[500,{
            mensagem:'Erro Servidor',
            code:error.code,
            sql:error.sqlMessage
        }]
    }
}

export const deletandoProduto = async (id_produto) =>{
    console.log('ProdutoModel :: deletandoProduto');

    //SQL Deletando Produto
    const sql = `DELETE FROM produtos WHERE id_produto = ?`;

    const params = [id_produto];

    try {
        const [resposta] = await conexao.query(sql,params);
        //console.log(resposta);
        if (resposta.affectedRows<1){
            return [404,{mensagem:'Produto não encontrado'}]
        }else{
            return [200,{mensagem:'Produto deletado com sucesso'}]
        }
    } catch (error) {
        //console.error(error);
        return[500,{
            mensagem:'Erro Servidor',
            code:error.code,
            sql:error.sqlMessage
        }]
    }
}
//console.log(await deletandoProduto(7));     
//atualizandoProduto(6,'tangirina');
//criandoProduto('melancia');
//mostrarProdutos();