// let request = new XMLHttpRequest(); 
// request.open('GET', 'https://pokeapi.co/api/v2/move/');
// request.send();
// request.onload = () => {
//   console.log(request)
//   if (request.status == 200) {
//     console.log(JSON.parse(request.response));
//   } else {
//     console.log(`error ${request.status} ${request.statusText}`)
//   }
// }

// function fetchMoves() {

//   fetch(`https://pokeapi.co/api/v2/move/`)
//   .then(response => {
//     if (!response.ok) {
//       throw Error("ERROR");
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log(data.results);
//     const html = data.results
//       .map(user => {
//         return `
//         <div class = "move">
//           <option>${user.name}</option>
          
//         </div>
//         `
//     }).join(''); 

//     document.querySelector("#moves").insertAdjacentHTML('afterbegin', html);
    
//   })
//   .catch(error => {
//     console.log(error);
//   })
// }


//  fetchMoves();

// function fetchAbilities() {
//   fetch(`https://pokeapi.co/api/v2/ability/`)
//   .then(response => {
//     if (!response.ok) {
//       throw Error("ERROR");
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log(data.results);
//     const html = data.results
//       .map(user => {
//         return `
//         <div class = "move">
//           <option>${user.name}</option>
          
//         </div>
//         `
//     }).join(''); 

//     document.querySelector("#ability").insertAdjacentHTML('afterbegin', html);
    
//   })
//   .catch(error => {
//     console.log(error);
//   })
// }

// fetchAbilities();

// const fetchMovesAbilities = async () => {
    
//   // Injecting user input from URL into API Link to GET data
//   try {
//       let name = pokeName.toLowerCase()
//       const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
//       let pCharacters = await res.json();
//       displayAbilitiesMoves(pCharacters);
      
//   } catch (err){
//       console.error(err);
//   }
// }
// const displayAbilitiesMoves = (characters) => {
//   console.log(characters)
//   const getAbilities = characters.map(ability => {
//     return `  <div class = "move">
//               <option>${ability.name}</option>
//               </div>`
//   }).join(" ")
//   document.querySelector("#ability").insertAdjacentHTML('afterbegin', getAbilities)

// } 

// fetchMovesAbilities()