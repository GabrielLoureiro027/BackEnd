import express from 'express';
import { createProduto, deleteProduto, readProduto, updateProduto } from './controllers/ProdutoController.js';

const app = express();
const port = 3000;
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('API Funcionando');    
});

//CRUD Produto
app.post('/produto',createProduto);
app.get('/produto',readProduto);
app.put('/produto/:id_produto',updateProduto);
app.delete('/produto/:id_produto',deleteProduto)

app.listen(port,()=>{
    console.log(`API Rodando na porta ${port}`)
});
