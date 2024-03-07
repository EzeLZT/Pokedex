const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
  fetch(URL + i)
    .then((response) => response.json())
    .then((data) => mostrarPokemon(data));
}

function mostrarPokemon(poke) {
  let tipos = poke.types.map(
    (tipo) =>
      `
  <p class="${tipo.type.name} tipo">${tipo.type.name}</p>
  `
  );
  tipos = tipos.join("");

  let pokeId = poke.id.toString();
  if (pokeId.length === 1) {
    pokeId = `00${pokeId}`;
  } else if (pokeId.length === 2) {
    pokeId = `0${pokeId}`;
  }

  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
  <p class="pokemon-id-back">#${pokeId}</p>
  <div class="pokemon-imagen">
      <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
  </div>
  <div class="pokemon-info">
      <div class="nombre-contenedor">
          <p class="pokemon-id">#${pokeId}</p>
          <h2 class="pokemon-nombre">${poke.name}</h2>
      </div>
      <div class="pokemon-tipos">
          ${tipos}
      </div>
      <div class="pokemon-stats">
          <p class="stat">${poke.height}cm</p>
          <p class="stat">${poke.weight}kg</p>
      </div>
  </div>
  `;
  listaPokemon.append(div);
}

botonesHeader.forEach((boton) =>
  boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    console.log(botonId);

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
      fetch(URL + i)
        .then((response) => response.json())
        .then((data) => {
          if (botonId === "ver-todos") {
            mostrarPokemon(data);
          } else {
            const tipos = data.types.map((type) => type.type.name);

            if (tipos.some((tipo) => tipo.includes(botonId))) {
              mostrarPokemon(data);
          }
        });
    }
  })
);
