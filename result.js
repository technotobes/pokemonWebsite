const searchBtn = document.getElementById("searchBtn");
let searchedPokemon = document.getElementById("searchedPokemon").value;
const charactersList = document.getElementById("charactersList");
let pokemonNameList = [];


// Grab user input from URL
const params = new URLSearchParams(window.location.search);
let pokeName = params.get('poke-name');


const loadCharacters = async () => {


    // Injecting user input from URL into API Link to GET data
    try {
        let name = pokeName.toLowerCase()
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        let pCharacters = await res.json();
        displayCharactersDetails(pCharacters);

    } catch (err){
        console.error(err);
    }

} 

// Displaying Pokemon Data Details
const displayCharactersDetails = (characters) => {
    charactersList.innerHTML = `${characters.forms[0].name}`

} 

document.getElementById("searchBtn").onclick = loadCharacters();


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
        if (!item.name.includes("-")) {
            pokemonNameList.push(item.name);
        }
    });
}

fetchPokemon()
console.log(pokemonNameList)