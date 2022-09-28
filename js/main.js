const formulario = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((elemento) => {
  criaElemento(elemento)
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = evento.target.elements["nome"];
  const quantidade = evento.target.elements["quantidade"];

  const existe = itens.find(elemento => elemento.nome === nome.value);

  const itemAtual = {
    "nome": nome.value,
    "quantidade": quantidade.value
  }

  if(existe) {
    itemAtual.id = existe.id;
    atualizaElemento(itemAtual);
  }else {    
    itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;
    criaElemento(itemAtual);
    
    itens.push(itemAtual);
  }

  localStorage.setItem("itens", JSON.stringify(itens));

  nome.value = "";
  quantidade.value = "";
});

function criaElemento(item) {
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");

  const numeroItem = document.createElement("strong");
  numeroItem.dataset.id = item.id
  numeroItem.innerHTML = item.quantidade;

  novoItem.appendChild(numeroItem);
  novoItem.innerHTML += item.nome;

  novoItem.appendChild(botaoDeleta(item.id));

  lista.appendChild(novoItem);
};

function deletaElemento(tag, id) {
  tag.remove();

  itens.splice(itens.findIndex(elemento => elemento.id === id), 1);
  localStorage.setItem("itens", JSON.stringify(itens));
}

function atualizaElemento(item) {
  document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;

  itens[itens.findIndex(elemento => elemento.id === item.id)] = item;
};

function botaoDeleta(id) {
  const elementoBotao = document.createElement("button");
  elementoBotao.innerText = "X";

  elementoBotao.addEventListener("click", function() {
    deletaElemento(this.parentNode, id);
  });

  return elementoBotao;
}