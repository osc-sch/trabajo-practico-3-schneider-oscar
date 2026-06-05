const urlTodosLosPersonajes = 'https://thesimpsonsapi.com/api/characters';
const urlUnPersonaje = 'https://thesimpsonsapi.com/api/characters/';

const contenedorCartas = document.querySelector('#contenedor_cards');

let personajes = [];

const obtener_personajes = async () => {
    try {
        const responce = await fetch(urlTodosLosPersonajes);
        const data = await responce.json();

        return data.results;
    } catch (err) {
        console.log(err);
    }
}

const construir_cuerpo = (lista_personajes) => {
    contenedorCartas.innerHTML = "";

    lista_personajes.forEach(personaje => {
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

        console.log(personaje);
    })
}

document.addEventListener('DOMContentLoaded', async () => {
    personajes = await obtener_personajes();

    construir_cuerpo(personajes);
})