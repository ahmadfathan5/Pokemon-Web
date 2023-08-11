// Memanggil data dari API 
const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
const limit = 20; // Jumlah data per halaman
let offset = 0; // Mulai dari data ke-0

function fetchPokemons() {
  fetch(`${apiUrl}?limit=${limit}&offset=${offset}`)
    .then(response => response.json())
    .then(data => {
      const pokemons = data.results;
      pokemons.forEach(pokemon => {
        fetchPokemonDetails(pokemon.url);
      });
    })
    .catch(error => {
      console.error("Terjadi kesalahan:", error);
    });
}

function fetchPokemonDetails(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const pokemonData = {
        image: data.sprites.front_default,
        name: data.name,
        types: data.types.map(type => type.type.name),
        height: data.height,
        weight: data.weight
      };
      displayPokemonData(pokemonData);
    })
    .catch(error => {
      console.error("Terjadi kesalahan:", error);
    });
}

function displayPokemonData(pokemonData) {
  const pokemonList = document.getElementById("pokemon-list");
  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add("pokemon-card");

  const image = document.createElement("img");
  image.src = pokemonData.image;
  image.alt = `${pokemonData.name} Image`;
  pokemonCard.appendChild(image);

  const name = document.createElement("h2");
  name.textContent = pokemonData.name;
  pokemonCard.appendChild(name);

  const types = document.createElement("p");
  types.textContent = "Types: " + pokemonData.types.join(", ");
  pokemonCard.appendChild(types);

  const height = document.createElement("p");
  height.textContent = "Height: " + pokemonData.height;
  pokemonCard.appendChild(height);

  const weight = document.createElement("p");
  weight.textContent = "Weight: " + pokemonData.weight;
  pokemonCard.appendChild(weight);

  pokemonList.appendChild(pokemonCard);
}

fetchPokemons();



