import express from "express";
import {createProduto, readProduto, updateProduto} from "./controllers/ProdutoControllers.js";
import { deletarProduto } from "./models/ProdutoModel.js";
const app = express();
const port = 3000;

// ! Condigura o backend para se comunicar com o Json
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API funcionando");
});
// & CURD produto
app.post('/produto',createProduto)
app.get('/produto',readProduto)
app.put('/produto/:id',updateProduto)
app.delete('/produto/:id',deletarProduto)
app.listen(port,()=>{ //O listen ele sobe o servidor
    console.log(`APi rodando na porta ${port}`)
})