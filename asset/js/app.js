const urlTodosLosPersonajes = 'https://thesimpsonsapi.com/api/characters';
const urlUnPersonaje = 'https://thesimpsonsapi.com/api/characters/';

fetch(urlTodosLosPersonajes)
    .then(result => result.json())
    .then(data => console.log(data.results[0]))