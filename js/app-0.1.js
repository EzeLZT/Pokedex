// Traigo las cosas del DOM
const listaPokemon = document.querySelector("#listaPokemon");
const btnHeader = document.querySelectorAll(".btn-header");
const URL = "https://pokeapi.co/api/v2/pokemon/";

// itero sobre los 151 primeros 
for (let i = 1; i <= 151; i++) {
  fetch(URL + i)    
    .then((response) => response.json())
    .then((data) => mostrarPokemon(data));
}

function mostrarPokemon(poke) {
  const pokemon = document.createElement("div");
  pokemon.classList.add("pokemon");

  let tipos = poke.types.map((tipo) => {
    return `<p class="${tipo.type.name} tipo">${tipo.type.name}</p>`;
  });

  tipos = tipos.join("");

  let pokeID = poke.id.toString();
  if (pokeID.length === 1) {
    pokeID = `00${pokeID}`;
  } else if (pokeID.length === 2) {
    pokeID = `0${pokeID}`;
  }

  pokemon.innerHTML = `
    <p class="pokemon-id-back">#${pokeID}</p>
    <div class="pokemon-imagen">
        <img src="${poke.sprites.other["official-artwork"].front_default}"
            alt="${poke.name}">
    </div>
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokeID}</p>
            <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
        <div class="pokemon-tipos">
            ${tipos}
        </div>
        <div class="pokemon-stats">
            <p class="stat">${poke.height} cm</p>
            <p class="stat">${poke.weight} kg</p>
        </div>
    </div>
    `;

  listaPokemon.appendChild(pokemon);
}

btnHeader.forEach((button) => {
  button.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = '';

    for (let i = 1; i <= 151; i++) {
      fetch(URL + i)
        .then((response) => response.json())
        .then((data) => {
            if (botonId === 'ver-todos') {
                mostrarPokemon(data)
                
            } else {
                const tipos = data.types.map(type => type.type.name)
                
                if (tipos.some(tipo => tipo.includes(botonId))) {
                  console.log(tipos)
                  mostrarPokemon(data)
                }
            }
        });
    }
  });
});
