const urlTodosLosPersonajes = 'https://thesimpsonsapi.com/api/characters';
const urlUnPersonaje = 'https://thesimpsonsapi.com/api/characters/';

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

document.addEventListener('DOMContentLoaded', async () => {
    personajes = await obtener_personajes();

    console.log(personajes);
})