import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBRB9op35_GbU4sVCXD17c5RtOUUT4ng40",
    authDomain: "projetopet-e5238.firebaseapp.com",
    projectId: "projetopet-e5238",
    storageBucket: "projetopet-e5238.firebasestorage.app",
    messagingSenderId: "376651414881",
    appId: "1:376651414881:web:6d39d52ca29de0fafad920"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("produtoForm");

    // Referência à coleção "produtos"
    const produtosCollection = collection(database, "produtos");

    // Função para adicionar produto ao Firebase
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        let nome = document.getElementById("nome").value;
        let quantidade = document.getElementById("quantidade").value;
        let validade = document.getElementById("validade").value;

        addDoc(produtosCollection, {
            nome: nome,
            quantidade: quantidade,
            validade: validade
        }).then(() => {
            console.log("Produto adicionado!");
            formulario.reset(); // Limpa o formulário
            mostrarProdutos(); // Atualiza a tabela
        }).catch(error => console.error("Erro ao adicionar: ", error));
    });

    // Função para exibir produtos cadastrados
    function mostrarProdutos() {
        const tabela = document.getElementById("listaProdutos");
        tabela.innerHTML = "";

        getDocs(produtosCollection).then(snapshot => {
            snapshot.forEach(doc => {
                let produto = doc.data();
                let row = `<tr>
                    <td>${produto.nome}</td>
                    <td>${produto.quantidade}</td>
                    <td>${produto.validade}</td>
                    <td><button onclick="removerProduto('${doc.id}')">Excluir</button></td>
                </tr>`;
                tabela.innerHTML += row;
            });
        }).catch(error => console.error("Erro ao exibir produtos: ", error));
    }

    // Função para remover produto do Firebase
    window.removerProduto = function (id) {
        const produtoDoc = doc(database, "produtos", id);
        deleteDoc(produtoDoc).then(() => {
            console.log("Produto removido!");
            mostrarProdutos(); // Atualiza a tabela
        }).catch(error => console.error("Erro ao remover: ", error));
    };

    mostrarProdutos(); // Carrega os produtos ao iniciar
});

