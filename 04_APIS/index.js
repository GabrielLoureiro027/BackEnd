 // Importando o modulo http
 import http from 'http'; 

 // Criando Constante da porta
 const PORT = 3000;

 // 1. Processar solicitações recebidas (req), responder
 const exemploResposta = (req, res) => {

    // //responde texto plano
    // res.writeHead(200, {'Conten-type': 'text/plain'});
    // res.end('Primeiro APP')
    
    //responde html
    // res.writeHead(200, {'Conten-type': 'text/html'});
    // res.end('<h1>Bom dia </h1>')

    //Responde JSON
    // res.writeHead(200, {'Conten-type': 'application/json'});
    // res.end(JSON.stringify({nome: 'senai'}))

    res.writeHead(200, {'Conten-type': 'application/xml'});
    res.end(`
        <note>
          <to>Senai</to>
          <from>Findes</from>
          <heading>Lembrete</heading>
          <body>
             Treinamento NODE
          </body>
        </note>
  `);
 }

 // 2.Criando um servidor com exemploResposta
 const server = http.createServer(exemploResposta);

 // 3. Iniciando servidor com a constante exemplosResposta
 server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
 })