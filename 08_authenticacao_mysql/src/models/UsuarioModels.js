import db from "../conexao.js";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

//! Criando pool de conexoes
const conexao = mysql.createPool(db);

export const criandoUsuario = async (nome, usuario, senha, tipo) => {
  console.log("UsuarioModel : criandoUsuario");
  //* Encriptando senha
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salt);

  const sql = `INSERT INTO usuarios
        (nome,usuario,senha,tipo) VALUES
        (?,?,?,?)
        `;
  const params = [nome, usuario, hash, tipo];

  try {
    const [resposta] = await conexao.query(sql, params);
    return [201, { mensagem: "Foto cadastrada!" }];
  } catch (error) {
    console.error({
      mensagem: "Erro Servidor",
      code: error.code,
      sql: error.sqlMessage,
    });
  }
};

export const mostrarUsuarios = async () => {
  console.log("UsuarioModel :: mostrandoUsuario");
  const sql = `SELECT * FROM usuarios`;
  try {
    const [resposta] = await conexao.query(sql);
    return [200, { resposta }];
  } catch (error) {
    console.error({
      mensagem: "Erro Servidor",
      code: error.code,
      sql: error.sqlMessage,
    });
    return [
      500,
      { mensagem: "Erro Servidor", code: error.code, sql: error.sqlMessage },
    ];
  }
};

export const atualizarUsuario = async (
  nome,usuario,senha,tipo,id_usuario
) => {
  console.log("UsuarioModel :: atualizarUsuario");
  //* Encriptando senha
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salt);

  const sql = `UPDATE usuarios SET nome=?, usuario=?, senha=?, tipo=? WHERE id_usuario=?`;
  const params = [nome, usuario, hash, tipo, id_usuario];
  try {
    const [resposta] = await conexao.query(sql, params);
    if (resposta.affectedRows < 1) {
      return [404, { mensagem: "Usuario não encontrado1!!" }];
    }
    return [200,{mensagem:"Usuario Atualizado"}]
  } catch (error) {
    //console.log(error);
    console.error({
      mensagem: "Error Servidor",
      code: error.code,
      sql: error.sqlMessage,
    });
    return [500,{
      mensagem:"Error Servidor",
      code: error.code,sql:
      error.sqlMessage,
    }]
  }
};

export const verificarSenha = async (usuario,senha)=>{
  console.log(("UsuarioModel :: verificarUsuario"))
  const sql = `SELECT * FROM usuarios WHERE usurio=?`
  const params = [usuario]
  try{
    const [resposta] = await conexao.query(sql,params)
    if(resposta.length<1){
      return [401,{mensagem:"Usuario não encontrado!!"}]
    }
    const hash = resposta[0].senha;
    const autenticado = bcrypt.compareSync(senha,hash);
    if(autenticado){
      return [200, {mensagem:"Usuário logado"}]
    }
  }catch(error){
    return [500,{
      mensagem:"Error Servidor",
      code: error.code,sql:
      error.sqlMessage,
    }]
  }
}

// const retorno = await mostrarUsuarios();
// const retorno = await (criandoUsuario("Joao Otario","Japao","bernabe",'123'))
// const retorno = await atualizarUsuario(
//   "Guilherme Brito","brasil3","Asaf","3",2);
const retorno = await verificarSenha(); //! falta fazer
console.log(JSON.stringify(retorno));
