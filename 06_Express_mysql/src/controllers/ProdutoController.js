import { atualizandoProduto, criandoProduto, deletandoProduto, mostrarProdutos } from "../models/ProdutoModel.js";

//CRUD Produto
export const createProduto = async (req, res) => {
    console.log('ProdutoController :: createProduto');
    const nome = req.body.nome;

    try {
        const [status,resposta] = await criandoProduto(nome);
        res.status(status).json(resposta);
    } catch (error) {
        //console.log(error);
        res.status(500).json({mensagem: "erro ao criar produto"})
    }
}

export const readProduto = async (req,res) => {
    console.log('ProdutoController :: readProduto');

    try {
        const [status,resposta] = await mostrarProdutos();
        res.status(status).json(resposta);    
    } catch (error) {
        //console.log(error);
        res.status(500).json({mensagem: "erro ao mostrar produto"});    
    }
}

export const updateProduto = async (req,res) =>{
    console.log('ProdutoController :: updateProduto')
    const id_produto = req.params.id_produto;
    const nome = req.body.nome;

    try {
        const [status,resposta] = await atualizandoProduto(id_produto,nome);
        res.status(status).json(resposta);    
    } catch (error) {
        //console.log(error);
        res.status(500).json({mensagem: "erro ao atualizar produto"});    
    }
}

export const deleteProduto = async (req,res) =>{
    console.log('ProdutoController :: deleteProduto')
    const id_produto = req.params.id_produto; 

    try {
        const [status,resposta] = await deletandoProduto(id_produto);
        res.status(status).json(resposta);  
    } catch (error) {
        //console.log(error);
        res.status(500).json({mensagem: "erro ao deletar produto"});    
    }
} 