'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const datalist = document.querySelector('datalist');
    const searchInput = document.querySelector('#searchedPokemon');
    let pokemonNameList = [];

    searchInput.addEventListener('keyup', () => {
        if (searchInput.value) {
            datalist.id = "pokemonNameList";    		
        } else {
            datalist.id = "";
        }
    });

    function fetchPokemon() {
        fetch(
            `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1118`
        ).then((response) => {
            return response.json();
        }).then((data) => {
            addPokemonToList(data);
        });
    }

    function addPokemonToList(data) {
        const pokemonData = data.results;
                
        pokemonData.forEach((item) => {
            pokemonNameList.push(item.name);
        });

        updatePokemonSelectElement();
    }

    function updatePokemonSelectElement() {

        pokemonNameList.forEach((item) => {
            const optionElement = document.createElement('option');
            optionElement.value = item;
            optionElement.innerText = item;

            datalist.append(optionElement);
        });
    }

    fetchPokemon();
});