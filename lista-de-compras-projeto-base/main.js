let listaDeItens = []
let itemAEditar

const form = document.getElementById('form-itens')
const itensInput = document.getElementById('receber-item')
const ulItens = document.getElementById('lista-de-itens')
const ulItensComprados = document.getElementById('itens-comprados')
const listaRecuperada = localStorage.getItem('listaDeItens')

function atualizaLocalStorage(){
    localStorage.setItem('listaDeItens', JSON.stringify(listaDeItens))
}

if (listaRecuperada) {
    listaDeItens = JSON.parse(listaRecuperada)
    mostrarItem()
} else {
    listaDeItens = []
}

form.addEventListener('submit', function(evento){
    evento.preventDefault() //faz com que oq escrevemos no campo se mantenha no campo ao apertar o botão
    salvarItem()
    mostrarItem()
    itensInput.focus
})

function salvarItem(){
    const comprasItem = itensInput.value
    const checarDuplicado = listaDeItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase) //compara o valor escrito no campo com os itens já adicionados. O touppercase transformará todos em maiusculos assim suco e Suco serão iguas
    if (checarDuplicado) {
        alert('Item já existe')
    } else {
        listaDeItens.push({  //faz com que o valor colocado no campo não seja substituído ao adicionar um novo item
            valor: comprasItem,
            checar: false
        })
    }
itensInput.value = ''    
}



function mostrarItem(){
    ulItens.innerHTML = '' //faz com que os elementos não sejam inseridos repetidamente ex suco. suco, suco, manga
    ulItensComprados.innerHTML = ''
    listaDeItens.forEach((elemento, index) => {  //manipular itens de um array. verifica cada elemento da lista e retorna algo
        if (elemento.checar) {
            ulItensComprados.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" checked class="is-clickable" />  
                    <span class="itens-comprados is-size-5">${elemento.valor}</span>
                </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
            `
        } else {
        ulItens.innerHTML += `
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
            <div>
                <input type="checkbox" class="is-clickable" />
                <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemAEditar) ? 'disabled' : ''}></input>
            </div>

            <div>
                ${index === Number(itemAEditar) ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i><button>':'<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
                <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
        </li>
        `
        }
    }) 
    const inputsCheck = document.querySelectorAll('input[type="checkbox"]')
    inputsCheck.forEach(i => {
        i.addEventListener('click', (evento) => {
            valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value') //diferencia os checkbox entre si
            listaDeItens[valorDoElemento].checar = evento.target.checked
            mostrarItem()
        })
    })

    const deletarObjetos = document.querySelectorAll(".deletar")
    deletarObjetos.forEach(i => {
        i.addEventListener('click', (evento) => {
            valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value') //diferencia os checkbox entre si
            listaDeItens.splice(valorDoElemento,1)
            mostrarItem()
        })
    })

    const editarItens = document.querySelectorAll(".editar")
    editarItens.forEach(i => {
        i.addEventListener('click', (evento) => {
            itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value') //diferencia os checkbox entre si
            mostrarItem()
        })
    })

atualizaLocalStorage()
}



function salvarEdicao() {
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`)
    listaDeItens[itemAEditar].valor = itemEditado.value
    itemAEditar = -1
    mostrarItem()
}