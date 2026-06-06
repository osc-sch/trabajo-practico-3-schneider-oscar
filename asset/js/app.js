const urlTodosLosPersonajes = 'https://thesimpsonsapi.com/api/characters';
const urlUnPersonaje = 'https://thesimpsonsapi.com/api/characters/';

const contenedorCartas = document.querySelector('#contenedor_cards');

let personajes = [];

const obtener_todos_personajes = async () => {
    try {
        const responce = await fetch(urlTodosLosPersonajes);
        const data = await responce.json();

        console.log(data)
        return data;
    } catch (err) {
        console.log(err);
    }
}

const construir_cuerpo = (lista_personajes) => {

    contenedorCartas.innerHTML = "";

    if(lista_personajes.results){
        lista_personajes.results.forEach(personaje => {
       
        contenedorCartas.innerHTML += `

        <div class="col-3">
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

        `;

    })
    }else{
        contenedorCartas.innerHTML += `

        <div class="col-3">
                    <div class="card" style="width: 18rem;">
                        <img src="https://cdn.thesimpsonsapi.com/500${lista_personajes.portrait_path}" class=" card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${lista_personajes.name}</h5>
                            <p class="card-text">${lista_personajes.occupation}</p>
                            <p class="${lista_personajes.status === 'Alive'? 'card-text badge text-success bg-light' : 'card-text badge text-danger bg-light'}">${lista_personajes.status}</p>
                            <hr>
                            <a href="#" class="btn btn-warning" data-id="${lista_personajes.id}">Ver Detalle</a>
                        </div>
                    </div>
                </div>

        `;
        console.log(lista_personajes);
    }

}

document.addEventListener('DOMContentLoaded', async () => {
    personajes = await obtener_todos_personajes();

    construir_cuerpo(personajes);
})