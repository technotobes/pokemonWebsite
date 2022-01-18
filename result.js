const searchBtn = document.getElementById("searchBtn")
let searchedPokemon = document.getElementById("searchedPokemon").value
const searchBtn2 = document.getElementById("searchBtn2")




const charactersList = document.getElementById("charactersList")

const params = new URLSearchParams(window.location.search)
let named = params.get('poke-name')
console.log(named)

const loadCharacters = async () => {
    
    console.log(searchedPokemon)

    try {
        let lowPokeSearch = named.toLowerCase()
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${lowPokeSearch}`)
        let pCharacters = await res.json();
        displayCharacters(pCharacters);

    } catch (err){
        console.error(err);
    }

} 
const displayCharacters = (characters) => {
    console.log(characters)
    charactersList.innerHTML = `${characters.forms[0].name}`

} 

document.getElementById("searchBtn").onclick = loadCharacters();
