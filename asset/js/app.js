const urlTodosLosPersonajes = 'https://thesimpsonsapi.com/api/characters';
const urlUnPersonaje = 'https://thesimpsonsapi.com/api/characters/';

const contenedorCartas = document.querySelector('#contenedor_cards');
const buscador = document.querySelector('#buscador');
const btnLimpiar = document.querySelector('#btn-limpiar');

const myModalHTML = document.querySelector('#myModal');
const modal = new bootstrap.Modal(myModalHTML);

const nombre = document.querySelector('#nombre');
const edad = document.querySelector('#age');
const cumple = document.querySelector('#cumple');
const genero = document.querySelector('#sex');
const ocupacion = document.querySelector('#ocu');
const estado = document.querySelector('#state');
const frace = document.querySelector('#phas');
const image = document.querySelector('#image_detalle');
const tituloModal = document.querySelector('#myModalLabel');


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

const obtener_un_personaje = async (id) => {
    try{
        const responce = await fetch(`${urlUnPersonaje + id}`);
        const data = await responce.json();
        return data
    }catch(err){
        console.log(err)
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
                    <button type="button" class="btn btn-warning btn-verMas" data-id="${personaje.id}">
                    Ver Detalles...
                    </button>
                </div>
            </div>
        </div>`;})

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

contenedorCartas.addEventListener('click', async (e) =>{
    
    if(e.target.classList.contains('btn-verMas')){
        console.log(e.target.dataset.id);

        const lista_valores = [image,nombre,edad,cumple,genero,ocupacion,estado,frace,tituloModal];

        const unPersonaje = await obtener_un_personaje(e.target.dataset.id);

        image.src = `https://cdn.thesimpsonsapi.com/500/character/${e.target.dataset.id}.webp`
        nombre.textContent = unPersonaje.name
        edad.textContent = edad.textContent === null ? unPersonaje.age : 'Desconocido'
        cumple.textContent = cumple.textContent === null ? unPersonaje.birthdate : 'Desconocido'
        genero.textContent = unPersonaje.gender
        ocupacion.textContent = unPersonaje.occupation
        estado.textContent = unPersonaje.status
        frace.textContent = unPersonaje.phrases[0]
        tituloModal.textContent = unPersonaje.name


        if(estado.textContent === "Alive"){
            estado.classList.add('badge','text-success','bg-light');
        }else{
            estado.classList.add('badge' ,'text-danger' ,'bg-light');
        }

        console.log(unPersonaje)
        modal.show();
    }
})

