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
        

    } catch (err){
        console.error(err);
    }

} 

// Displaying Pokemon Data Details
const displayCharactersDetails = (characters) => {
    const pokemonData = characters;
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
                    

    // insert ability names in drop down                        
    let getAbility = characters.abilities.map((ability) => {
        return `<div class="move">
        <option value="${ability.ability.url}">${ability.ability.name}</option>
        </div>`
    }).join("")
    document.querySelector("#ability").insertAdjacentHTML('afterbegin', getAbility)

    
    // insert move names into drop down
    let getMoves = characters.moves.map((move) => {
        return `<div class="move">
        <option value="${move.move.url}">${move.move.name}</option>
        </div>`
    }).join("")
    document.querySelector("#moves").insertAdjacentHTML('afterbegin', getMoves)


    // clickable items in dropdown menu
    const abilitiesSelect = document.querySelector("#ability")

    abilitiesSelect.addEventListener('change', (event) => {
    const url = event.target.value;
    console.log(url)
    getAbilityStats(url)
    })

    const movesSelect = document.querySelector("#moves")

    movesSelect.addEventListener('change', (event) => {
    const url = event.target.value;
    console.log(url)
    getMoveStats(url)
    })

}

// get data of moves from url
function getMoveStats(url) {
    fetch(url
    ).then((response) => {
        return response.json()
    }).then((data) => {
        displayMoveDetails(data)
    }).catch((error) => {
        return error;
    })
}

function displayMoveDetails(data) {
    const details = document.querySelector("#movesDetails")
    const detailsData = data.effect_entries;
    detailsData.forEach((detailItem) => {
        console.log(detailItem.effect)
        details.innerText = detailItem.effect
        
    })
}

function getAbilityStats(url) {
    fetch(url
    ).then((response) => {
        return response.json()
    }).then((data) => {
        displayAbiltiesDetails(data)
    }).catch((error) => {
        return error;
    })
}

function displayAbiltiesDetails(data) {
    const details = document.querySelector("#abilitiesDetails")
    const detailsData = data.effect_entries;
    detailsData.forEach((detailItem) => {
        if (detailItem.language.name === "en") {
            console.log(detailsData)
            details.innerText = detailItem.effect
        }
    })
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


function basicPopup(url) {
    popupWindow = window.open(url,'popUpWindow','height=700,width=750,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
        }

function basicPopup2(url) {
    popupWindow = window.open(url,'popUpWindow','height=700,width=750, left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
        }