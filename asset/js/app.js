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
        console.log(personaje);
    })
}

document.addEventListener('DOMContentLoaded', async () => {
    personajes = await obtener_personajes();

    construir_cuerpo(personajes);
})