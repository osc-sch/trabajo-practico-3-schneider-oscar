const urlTodosLosPersonajes = 'https://thesimpsonsapi.com/api/characters';
const urlUnPersonaje = 'https://thesimpsonsapi.com/api/characters/';

const contenedorCartas = document.querySelector('#contenedor_cards');
const buscador = document.querySelector('#buscador');
const btnLimpiar = document.querySelector('#btn-limpiar');

let personajes = [];

const obtener_todos_personajes = async () => {
    try {
        const responce = await fetch(urlTodosLosPersonajes);
        const data = await responce.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

const construir_cuerpo = (lista_personajes) => {

    contenedorCartas.innerHTML = "";

        lista_personajes.forEach(personaje => {
       
        contenedorCartas.innerHTML += `

        <div class="col">
            <div class="card" style="width: 18rem;">
                <img src="https://cdn.thesimpsonsapi.com/500${personaje.portrait_path}" class=" card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${personaje.name}</h5>
                    <p class="card-text">${personaje.occupation}</p>
                    <p class="${personaje.status === 'Alive'? 'card-text badge text-success bg-light' : 'card-text badge text-danger bg-light'}">${personaje.status}</p>
                    <hr>
                    <a href="#" class="btn btn-warning" data-id="${personaje.id}">Ver Detalle</a>
                </div>
            </div>
        </div>

        `;})
    }
    
btnLimpiar.addEventListener('click',()=>{
    buscador.value ='';
    construir_cuerpo(personajes.results);
})


document.addEventListener('DOMContentLoaded', async () => {
    personajes = await obtener_todos_personajes();

    construir_cuerpo(personajes.results);
})

buscador.addEventListener('input',() => {

    const buscar = personajes.results.filter(personaje => personaje.name.toLowerCase().includes(buscador.value));

    construir_cuerpo(buscar);
    console.log(buscar);
})