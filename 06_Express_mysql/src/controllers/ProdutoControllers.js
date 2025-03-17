import { atualizanProduto, criandoProduto, mostrarProdutos } from "../models/ProdutoModel.js";

// ! Exportando o createProduto
export const createProduto = async (req, res) => {
    console.log('produtoController :: create');
  const nome = req.body.nome;
  try {
    const [status, resposta] = await criandoProduto(nome);
    res.status(status).json(resposta);
  } catch {
    console.log(error);
    res.status(500).json({ mensagem: "Erro ao criar produto" });
  }
};

export const readProduto = async (req, res) => {
    console.log('produtoController :: read');
    try{
        const [status, resposta] = await mostrarProdutos();
        res.status(status).json(resposta);
    }catch(error){
        res.status(500).json({ mensagem: "Erro ao buscar produtos" });
    }
};

export const updateProduto = async (req, res) => {
    console.log('produtoController :: update');
  const id_produto = req.params.id;
  const nome = req.body.nome;

  try{
    const [status,resposta] = await atualizanProduto(id_produto,nome);
    res.status(status).json(resposta);

  }catch(error){
    res.status(500).json({ mensagem: "Erro ao atualizar produto" });
  }
};

export const deleteProduto = async (req, res) => {
    console.log('produtoController :: delete');
    const id_produto = req.params.id;
    

  try{
    const [status, resposta] = await deleteProduto(id_produto);
    res.status(status).json(resposta);
  }catch(error){
    res.status(500).json({ mensagem: "Erro ao deletar produto" });
  }
};
