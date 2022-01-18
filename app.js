"use strict";

(function() {

  const BASE_URL = "https://pokeapi.co/api/v2/";

 
  const TYPE_COLOR = {
    bug: 'rgba(168, 184, 32, 0.7)',
    dark: 'rgba(112, 88, 72, 0.7)',
    dragon: 'rgba(112, 56, 248, 0.7)',
    electric: 'rgba(248, 208, 48, 0.7)',
    fairy: 'rgba(238, 153, 172, 0.7)',
    fighting: 'rgba(192, 48, 40, 0.7)',
    fire: 'rgba(240, 128, 48, 0.7)',
    flying: 'rgba(168, 144, 240, 0.7)',
    ghost: 'rgba(112, 88, 152, 0.7)',
    grass: 'rgba(120, 200, 80, 0.7)',
    ground: 'rgba(224, 192, 104, 0.7)',
    ice: 'rgba(152, 216, 216, 0.7)',
    normal: 'rgba(168, 168, 120, 0.7)',
    poison: 'rgba(160, 64, 160, 0.7)',
    psychic: 'rgba(248, 88, 136, 0.7)',
    rock: 'rgba(184, 160, 56, 0.7)',
    steel: 'rgba(184, 184, 208, 0.7)',
    unknown: 'rgba(104, 160, 144, 0.7)',
    water: 'rgba(104, 144, 240, 0.7)'
  };

  window.addEventListener("load", init);

  
  function init() {
    id("poke-name").addEventListener("keypress", event => makeRequest(event));
  }

 
  async function makeRequest(event) {
    if (event.key === "Enter") {
      try {
        let basePokemon = await makePokemonSpeciesRequest(event);
        let evolutionChain = await makeEvolutionRequest(basePokemon.evolution_chain.url);
        let evolutionArray = parseEvolution(evolutionChain.chain);
        generateTree(evolutionArray);
      } catch (err) {
        handleError();
      }
    }
  }

  
  function handleError() {
    let message = gen("p");
    message.classList.add("error");
    message.textContent = "Unable to find Pokémon requested. Please try again.";
    id("poke-evolution").innerHTML = "";
    id("poke-evolution").appendChild(message);
  }

  
  async function makePokemonRequest(name) {
    let resp = await fetch(BASE_URL + "pokemon/" + name);
    resp = await statusCheck(resp);
    resp = await resp.json();
    return resp;
  }


  async function makePokemonSpeciesRequest(event) {
  
    let formattedName = event.target.value.replace(/[.,/#!$%^&*;:{}=_`'~()]/g, "")
      .replace(/\s+/g, '-')
      .toLowerCase();
    let resp = await fetch(BASE_URL + "pokemon-species/" + formattedName);
    resp = await statusCheck(resp);
    resp = await resp.json();
    return resp;
  }

  
  async function makeEvolutionRequest(evolutionURL) {
    let resp = await fetch(evolutionURL);
    resp = await statusCheck(resp);
    resp = await resp.json();
    return resp;
  }

 
  function parseEvolution(evolutionChain) {
    let evolutionArray = [[evolutionChain.species.name]];
    let evolutionQueue = [evolutionChain.evolves_to];

    while (evolutionQueue[0] !== undefined && evolutionQueue[0].length !== 0) {
      evolutionChain = evolutionQueue.shift();
      let subEvolutionArray = [];

   
      for (let field in evolutionChain) {

       
        if (!isNaN(parseInt(field))) {
          subEvolutionArray.push(evolutionChain[field].species.name);
          evolutionQueue.push(evolutionChain[field].evolves_to);
        }
      }
      evolutionArray.push(subEvolutionArray);
    }
    return evolutionArray;
  }


  async function generateTree(evolutionArray) {
    let container = id("poke-evolution");
    container.innerHTML = "";
    try {
      for (let stage of evolutionArray) {
        let arrow = gen("img");
        arrow.src = "../pokedex/images/arrow.png";
        arrow.alt = "Arrow symbol";
        arrow.classList.add("arrow");
        await addStage(stage);
        container.appendChild(arrow);
      }

     
      container.removeChild(container.lastChild);
    } catch (err) {
      handleError();
    }
  }

  async function addStage(stage) {
    let stageContainer = gen("poke-stage");
    stageContainer.classList.add("poke-stage");

   
    for (let name of stage) {
      let card = gen("div");
      let img = gen("img");
      let pokeInfo = await makePokemonRequest(name);
      img.src = pokeInfo.sprites.other["official-artwork"].front_default;
      img.alt = "Official artwork of " + name;
      card.appendChild(img);
      addCardStyle(card, pokeInfo);
      addCardText(card, name, pokeInfo);
      stageContainer.appendChild(card);
    }
    id("poke-evolution").appendChild(stageContainer);
  }

  
  function addCardText(card, name, pokeInfo) {
    let textName = gen("h3");
    let textType = gen("h3");
    textName.textContent = name;
    if (pokeInfo.types[1] === undefined) {
      textType.textContent = "type: " + pokeInfo.types[0].type.name;
    } else {
      textType.textContent = "type: " + pokeInfo.types[0].type.name +
        ", " + pokeInfo.types[1].type.name;
    }
    card.appendChild(textName);
    card.appendChild(textType);
  }


  function addCardStyle(card, pokeInfo) {
    card.classList.add("card");

  
    if (pokeInfo.types[1] !== undefined) {

   
      card.style.backgroundImage = "-webkit-linear-gradient(35deg, " +
        TYPE_COLOR[pokeInfo.types[0].type.name] + " 50%, " +
        TYPE_COLOR[pokeInfo.types[1].type.name] + " 50%)";
    } else {
      card.style.backgroundColor = TYPE_COLOR[pokeInfo.types[0].type.name];
    }
  }

 
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }


  function id(idName) {
    return document.getElementById(idName);
  }

 
  function gen(tagName) {
    return document.createElement(tagName);
  }

})();
