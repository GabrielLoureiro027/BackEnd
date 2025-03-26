import express from 'express';

// Inicilizando express
const app = express();
const port = 3000;

//Array frutas
const frutas = ['Maçã', 'Banana','Laranja'];

//Inserção manual
frutas.push('pessego');

// Rota padrão teste
app.get('/',(req, res) => {
    res.send('API Funcionando');
});

// Frutas Post
app.post('/frutas/:fruta',(req,res) =>{
    const fruta = req.params.fruta;
    frutas.push(fruta);
    res.status(200).json({mensagem:'fruta inserida'})
})

// Frutas Get
app.get('/frutas',(req,res)=>{
    res.json(frutas);
})

// Frutas Delete
app.delete('/frutas/:fruta', (req,res) =>{
    const fruta = req.params.fruta;
    const index = frutas.indexOf(fruta);

    if(index < 0){
        res.status(404).json({mensagem:'Fruta não encontrada'})
    }else{
        frutas.splice(index,1);
        res.status(200).json({mensagem:'Fruta Deletada'})
    }
})

// Inicializando servidor
app.listen(port,()=>{
    console.log(`Aplicativo rodando na porta ${port}`)
});

