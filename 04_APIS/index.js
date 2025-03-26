// Importano o modulo http
import http from "http";

// Criando Constante da porta
const PORT = 3000;

// 1. Processar solicitações recebidas (req), responder

const exemploResposta = (req, res) => {
  //Responde Texto plano
  // res.writeHead(200,{'Content-Type': 'text/plain'});
  // res.end('Primeiro APP');

  //Responde HTML
  // res.writeHead(200,{'Content-Type': 'text/html'});
  // res.end('<h1>Bom dia</h1>');

  //Responde JSON
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.end(JSON.stringify({ nome: "SENAI" }));

  //Responde XML
  res.writeHead(200, { "Content-Type": "application/xml" });
  res.end(`
        <note>
            <to>SENAI Vitória</to>
            <from>FINDES</from>
            <heading>Lembrete</heading>
            <body>
                Treinamento NODE
            </body>
        </note>   
    `);
};

// 2. Criando um servidor com exemploResposta
const server = http.createServer(exemploResposta);

// 3. Iniciando servidor com exemploResposta
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
