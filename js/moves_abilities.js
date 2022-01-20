let request = new XMLHttpRequest(); 
request.open('GET', 'https://pokeapi.co/api/v2/move/');
request.send();
request.onload = () => {
  console.log(request)
  if (request.status == 200) {
    console.log(JSON.parse(request.response));
  } else {
    console.log(`error ${request.status} ${request.statusText}`)
  }
}

function fetchData1() {
  
  console.log(id[0])
  fetch(`https://pokeapi.co/api/v2/move/`)
  .then(response => {
    if (!response.ok) {
      throw Error("ERROR");
    }
    return response.json();
  })
  .then(data => {
    console.log(data.results);
    const html = data.results
      .map(user => {
        return `
        <div class = "move">
          <option>${user.name}</option>
          
        </div>
        `
    }).join(''); 

    document.querySelector("#moves").insertAdjacentHTML('afterbegin', html);
    
  })
  .catch(error => {
    console.log(error);
  })
}



fetchData1();

function fetchData2() {
  fetch(`https://pokeapi.co/api/v2/ability/`)
  .then(response => {
    if (!response.ok) {
      throw Error("ERROR");
    }
    return response.json();
  })
  .then(data => {
    console.log(data.results);
    const html = data.results
      .map(user => {
        return `
        <div class = "move">
          <option>${user.name}</option>
          
        </div>
        `
    }).join(''); 

    document.querySelector("#ability").insertAdjacentHTML('afterbegin', html);
    
  })
  .catch(error => {
    console.log(error);
  })
}

fetchData2();
