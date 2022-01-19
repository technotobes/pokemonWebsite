const searchBtn = document.getElementById("searchBtn");
let searchedPokemon = document.getElementById("searchedPokemon").value;

const pokemonName = document.getElementById("pokemonName");
const pokeSpriteImage = document.getElementById("pokeSpriteImage")





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
    console.log(characters)
    pokemonName.innerHTML = `${characters.forms[0].name}`
    pokeSpriteImage.innerHTML = `<img src="${characters.sprites.other["official-artwork"].front_default}" />`

} 

document.getElementById("searchBtn").onclick = loadCharacters();



