import express from 'express'

//inicializando express
const app = express();
const port = 3000;

//array frutas
const frutas = ['maçã', 'banana', 'laranja']
//inserção manual
frutas.push('pessego')

//Rota padrão teste
app.get('/', (req, res) =>{
    res.send('Olá mundo')
});

//frutas get
app.get('/frutas', (req, res) => {
    res.json(frutas);
})

app.post('/fruta/:fruta', (req, res) => {
    const fruta = req.params.fruta
    frutas.push(fruta)
    res.status(200).json({mensagem: 'fruta inserida'})
})

app.delete('/frutas/:fruta', (req, res) => {
    const fruta = req.params.fruta;
    const index = frutas.indexOf(fruta)

    if(index < 0){
        res.status(404).json({mensagem: 'Fruta não encontrada'})
    }
    else{
        frutas.splice(index,1);
        res.status(200).json({mensagem: 'Fruta deletada'})
    }
})

// Inicializando servidor
app.listen(port, () => {
    console.log(`Aplicativo rodando na porta ${port}`)
});

