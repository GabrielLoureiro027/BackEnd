document.getElementById('imageInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          document.getElementById('preview').src = e.target.result;
          document.getElementById('preview').style.display = 'block';
      };
      reader.readAsDataURL(file);
  }
});

function uploadImage() {
  const input = document.getElementById('imageInput');
  const description = document.getElementById('descricaoInput').value;
  if (input.files.length === 0 || !description) {
      alert('Por favor, selecione uma imagem e adicione uma descrição!');
      return;
  }
  
  const file = input.files[0];
  const formData = new FormData();
  formData.append("foto", input.files[0]);  
  formData.append("alternativo", description);

  fetch("http://localhost:3000/foto", {
      method: "POST",
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);
      fetchImages(); // Atualiza a lista de imagens após o upload
  })
  .catch(error => {
      console.log("Error:", error);
  });
}

function fetchImages() {
  fetch("http://localhost:3000/foto")
  .then(response => response.json())
  .then(data => {
      const container = document.getElementById('imageContainer');
      container.innerHTML = ""; // Limpa antes de adicionar novas imagens
      data.forEach(foto => {
          addImageToList(`http://localhost:3000/public/img/${foto.caminho}`, foto.alternativo, foto.id_fotos);
      });
  })
  .catch(error => {
      console.log("Erro ao buscar imagens:", error);
  });
}


function addImageToList(imageSrc, description, id) {
  const container = document.getElementById('imageContainer');
  const div = document.createElement('div');
  div.classList.add('image-card');
  
  const img = document.createElement('img');
  img.src = imageSrc;
  img.alt = description;
  img.classList.add('image-preview');
  
  const desc = document.createElement('p');
  desc.innerText = description;
  desc.classList.add('image-description');
  
  // Botão para deletar a imagem
  const deleteButton = document.createElement('button');
  deleteButton.innerText = "Excluir";
  deleteButton.classList.add('delete-btn');
  deleteButton.onclick = () => deleteImage(id, div);

  // Botão para editar a descrição
  const editButton = document.createElement('button');
  editButton.innerText = "Editar";
  editButton.classList.add('edit-btn');
  editButton.onclick = () => editDescription(id, desc);

  div.appendChild(img);
  div.appendChild(desc);
  div.appendChild(editButton);
  div.appendChild(deleteButton);
  container.appendChild(div);
}

// Função para deletar a imagem
function deleteImage(id, cardElement) {
  if (!confirm("Tem certeza que deseja excluir esta imagem?")) {
      return;
  }

  fetch(`http://localhost:3000/foto/${id}`, {  // Garante que o ID está correto
      method: "DELETE"
  })
  .then(response => response.json())
  .then(data => {
      console.log("Resposta do servidor:", data);
      if (data.mensagem && data.mensagem.includes("apagada")) {
          alert("Imagem deletada com sucesso!");
          cardElement.remove();  // Só remove da tela se o back-end confirmar
      } else {
          alert("Erro ao deletar imagem. Verifique se o ID está correto.");
      }
  })
  .catch(error => {
      alert("Erro ao tentar excluir a imagem!");
      console.log("Erro ao deletar imagem:", error);
  });
}


// Função para editar a descrição
function editDescription(id, descElement) {
  const novaDescricao = prompt("Digite a nova descrição:");
  if (novaDescricao) {
      fetch(`http://localhost:3000/foto/${id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ alternativo: novaDescricao })
      })
      .then(response => response.json())
      .then(data => {
          alert("Descrição atualizada com sucesso!");
          descElement.innerText = novaDescricao; // Atualiza a descrição na tela
      })
      .catch(error => {
          console.log("Erro ao atualizar descrição:", error);
      });
  }
}


// Chamar fetchImages ao carregar a página para exibir as imagens cadastradas
document.addEventListener("DOMContentLoaded", fetchImages);
