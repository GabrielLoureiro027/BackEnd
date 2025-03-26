import React, { useState, useEffect } from "react";
import style from "./Mostrar.module.css";
import axios from "axios";

const Mostrar = () => {
  const [file, setFile] = useState(null);
  const [alternativo, setAlternativo] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fotos, setFotos] = useState([]); // Estado para armazenar as fotos

  // Captura o arquivo e gera uma prévia
  const handleFileChange = (e) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      alert("Nenhum arquivo selecionado");
      return;
    }

    const selectedFile = files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile)); // Pré-visualização da imagem
  };

  // Envia a imagem para o backend
  const handleUpload = async () => {
    if (!file || !alternativo) {
      alert("Todos os campos precisam ser preenchidos");
      return;
    }

    const formData = new FormData();
    formData.append("foto", file);
    formData.append("alternativo", alternativo);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/foto",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Resposta do servidor:", response.data);
      alert("Imagem enviada com sucesso!");

      // Limpar campos após o envio
      setFile(null);
      setAlternativo("");
      setPreview(null);
      fetchFotos(); // Refazer a busca pelas fotos após o upload
    } catch (error) {
      console.error("Erro ao enviar a imagem:", error);
      alert("Erro ao enviar a imagem, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar todas as fotos
  const fetchFotos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/foto");
      setFotos(response.data); // Atualiza o estado com as fotos recebidas
    } catch (error) {
      console.error("Erro ao buscar as fotos:", error);
    }
  };

  // UseEffect para buscar as fotos ao carregar o componente
  useEffect(() => {
    fetchFotos();
  }, []);

  //!Função para excluir
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/foto/${id}`);
      alert("Imagem excluída com sucesso!");
      fetchFotos(); // Refazer a busca pelas fotos depois da exclusão
    } catch (error) {
      console.error("Erro ao excluir a imagem:", error);
      alert("Erro ao excluir a imagem, tente novamente.");
    }
  };

  return (
    <div className={style.bd}>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      <input
        type="text"
        placeholder="Digite uma descrição"
        value={alternativo}
        onChange={(e) => setAlternativo(e.target.value)}
      />

      {preview && (
        <div className={style.card}>
          <img src={preview} alt="Preview" style={{ width: "100%" }} />
        </div>
      )}

      <button
        type="submit"
        className={style.btn}
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>

      {/* Exibindo as fotos abaixo do formulário */}
      <div className={style.fotosContainer}>
        {fotos.length === 0 ? (
          <p>Não há fotos disponíveis.</p>
        ) : (
          fotos.map((foto) => (
            <div key={foto.id_foto} className={style.fotoCard}>
              <img
                src={`http://localhost:3000/public/img/${foto.caminho}`}
                alt={foto.alternativo}
              />
              <p>{foto.alternativo}</p>
              <button>Editar</button>
              <br />
              <button onClick={() => handleDelete(foto.id_foto)}>Excluir</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Mostrar;
