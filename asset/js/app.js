const urlTodosLosPersonajes = 'https://thesimpsonsapi.com/api/characters';
const urlUnPersonaje = 'https://thesimpsonsapi.com/api/characters/';

const contenedorCartas = document.querySelector('#contenedor_cards');
const buscador = document.querySelector('#buscador');
const btnLimpiar = document.querySelector('#btn-limpiar');
const btnVerMas = document.querySelector('#btn_verMas');


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
                    <button type="button" class="btn btn-warning btn-verMas" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${personaje.id}">
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

        const per = await obtener_un_personaje(e.target.dataset.id);

        const nombre = document.querySelector('#nombre');
        const age = document.querySelector('#age');
        const cum = document.querySelector('#cumple');
        const sex = document.querySelector('#sex');
        const ocu = document.querySelector('#ocu');
        const state = document.querySelector('#state');
        const phas = document.querySelector('#phas');
        const img = document.querySelector('#image_detalle');

        img.src = `https://cdn.thesimpsonsapi.com/500/character/${e.target.dataset.id}.webp`
        nombre.textContent = `Nombre Completo: ${per.name}`
        age.textContent = `Edad: ${per.age}`
        cum.textContent = `Cumpleaños: ${per.birthdate}`
        sex.textContent = `Genero: ${per.gender}`
        ocu.textContent = `Ocupacion: ${per.occupation}`
        state.textContent = `Estado: ${per.status}`
        phas.textContent = `Frace Iconica: ${per.phrases}`

        console.log(per)



    }

    
})

