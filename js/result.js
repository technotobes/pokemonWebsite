const searchBtn = document.getElementById("searchBtn");
let searchedPokemon = document.getElementById("searchedPokemon").value;

const pokemonName = document.getElementById("pokemonName");
const pokeSpriteImage = document.getElementById("pokeSpriteImage")
const pokemonBio = document.getElementById("pokemonBio")
const pokedexNumber = document.getElementById("pokedexNumber")
const baseStats = document.getElementById("baseStats")




// Grab user input from URL
const params = new URLSearchParams(window.location.search);
let pokeName = params.get('poke-name');

// fetching information from /pokemon API
const loadCharacters = async () => {


    // Injecting user input from URL into API Link to GET data
    try {
        let name = pokeName.toLowerCase()
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        let pCharacters = await res.json();
        displayCharactersDetails(pCharacters);
        fetchPokeSpecies();
        getPokeID(pCharacters)

    } catch (err){
        console.error(err);
    }

} 

// Displaying Pokemon Data Details
const displayCharactersDetails = (characters) => {
    console.log(characters)
    pokemonName.innerHTML = `<strong>${characters.forms[0].name.slice(0,1).toUpperCase()}${characters.forms[0].name.slice(1,characters.forms[0].name.length)}</strong>`
    pokeSpriteImage.innerHTML = `<img src="${characters.sprites.other["official-artwork"].front_default}" />`
    pokedexNumber.innerHTML = `Pokedex #: ${characters.game_indices[8].game_index}`
    baseStats.innerHTML = ` <p>Base HP: ${characters.stats[0].base_stat}</p>
                            <p>Base Att: ${characters.stats[1].base_stat}</p>
                            <p>Base Def: ${characters.stats[2].base_stat}</p>
                            <p>Base Sp. Att: ${characters.stats[3].base_stat}</p>
                            <p>Base Sp. Def: ${characters.stats[4].base_stat}</p>
                            <p>Base Spd: ${characters.stats[5].base_stat}</p>`

} 


// fetching Infomation from /pokemon-species API

const fetchPokeSpecies = async () => {
    
    // Injecting user input from URL into API Link to GET data
    try {
        let name = pokeName.toLowerCase()
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
        let pCharacters = await res.json();
        displayCharactersBio(pCharacters);
        
    } catch (err){
        console.error(err);
    }
}
const displayCharactersBio = (characters) => {
    console.log(characters)
    pokemonBio.innerHTML = `<strong>${characters.flavor_text_entries[0].flavor_text}</strong>`

} 

document.getElementById("searchBtn").onclick = loadCharacters();

let id = ""

function getPokeID(character) {
    id.push(character.id)
    
}
console.log(id)
console.log(id[0])
