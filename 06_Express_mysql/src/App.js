import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("API funcionando");
});
app.listen(port,()=>{ //O listen ele sobe o servidor
    console.log(`APi rodando na porta ${port}`)
})