let listaDeItens = [];
let itemAEditar;
const form = document.getElementById('form-itens');
const itensInput = document.getElementById('receber-item');
const liItens = document.getElementById('lista-de-itens');
const ulItensComprados = document.getElementById('itens-comprados');

form.addEventListener( 'submit' , evento => {
    evento.preventDefault();
    salvarItem();
    mostrarItem();
    itensInput.focus();
    itensInput.value = "";
})



function salvarItem(){
    const comprarItem = itensInput.value;
    const checarDuplicado = listaDeItens.find((elemento)=> elemento.valor === comprarItem);

    if(checarDuplicado){
        var teste = listaDeItens[listaDeItens.findIndex(e => e.valor === comprarItem)].valor;
         alert('O item '+ teste.toUpperCase() +' ja exite na lista')
      
        
       
       


    }else{
        listaDeItens.push({
                valor: comprarItem,
                checar: false
            })
           
    }}

function mostrarItem(){
    liItens.innerHTML ='';
    ulItensComprados.innerHTML='';
    listaDeItens.forEach((elemento, index)=>{
        if(elemento.checar){
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
        }else{
            liItens.innerHTML += `
                <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                    <div>
                        <input type="checkbox" class="is-clickable" />
                        <input type="text" class="is-size-5" value="${elemento.valor} "${index != itemAEditar ? 'disabled': ''}></input>
                    </div>
                    <div>
                        ${ index === Number(itemAEditar) ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
                        <i class="fa-solid fa-trash is-clickable deletar"></i>
                    </div>
                </li>
            `

        }
    })
//mostrar item a lista de adicionados e comprados
    const inputsCheck = document.querySelectorAll('input[type="checkbox"]')
    
    inputsCheck.forEach(i =>{
        i.addEventListener('click', (e)=>{
         var valordoElemento =  e.target.parentElement.parentElement.getAttribute('data-value');
         listaDeItens[valordoElemento].checar = e.target.checked;
         mostrarItem();
         
        })
    })
//deletar item da lista 

    const deletarElemento = document.querySelectorAll('.deletar')
    deletarElemento.forEach(el => {
        el.addEventListener('click', val => {
            valordoElemento = val.target.parentElement.parentElement.getAttribute('data-value')
            listaDeItens.splice(valordoElemento,1)
            mostrarItem()


        })
    })

    const editarItens = document.querySelectorAll('.editar')
    editarItens.forEach((el)=>{
        el.addEventListener('click', ev =>{
            itemAEditar = ev.target.parentElement.parentElement.getAttribute('data-value')
            mostrarItem()

        })
    })

    
}
function salvarEdicao(){
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"] `)
    console.log(itemEditado.value)
    listaDeItens[itemAEditar].valor = itemEditado.value
    itemAEditar =-1
    mostrarItem()
}






