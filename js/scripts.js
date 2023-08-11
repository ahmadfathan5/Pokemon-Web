//MEMANGGIL DATA POKEMON
// Men-set url API dan jumlah data yang akan ditampilkan
const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
const limit = 300; 
let offset = 0;

// memanggil data sesuai dengan limit yang diinginkan
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

// memanggil data secara detail dari setiap pokemon
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

// membuat tampilan berdasarkan data yang diminta ke dalam HTML
function displayPokemonData(pokemonData) {
    const pokemonList = document.getElementById("pokemon-list");

    const col = document.createElement("div");
    col.classList.add("col", "mb-5");

    const card = document.createElement("div");
    card.classList.add("card", "h-100");

    const image = document.createElement("img");
    image.classList.add("card-img-top");
    image.src = pokemonData.image;
    image.alt = "Pokemon Image";
    card.appendChild(image);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "p-4");

    const textCenter = document.createElement("div");
    textCenter.classList.add("text-center");

    const name = document.createElement("h5");
    name.classList.add("fw-bolder");
    name.textContent = pokemonData.name;
    textCenter.appendChild(name);

    const types = document.createElement("p");
    types.textContent = "Types: " + pokemonData.types.join(", ");
    textCenter.appendChild(types);

    const height = document.createElement("p");
    height.textContent = "Height: " + pokemonData.height;
    textCenter.appendChild(height);

    const weight = document.createElement("p");
    weight.textContent = "Weight: " + pokemonData.weight;
    textCenter.appendChild(weight);

    cardBody.appendChild(textCenter);
    card.appendChild(cardBody);

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer", "p-4", "pt-0", "border-top-0", "bg-transparent");

    const footerTextCenter = document.createElement("div");
    footerTextCenter.classList.add("text-center");

    const btn = document.createElement("button");
    btn.classList.add("btn", "btn-outline-dark", "mt-auto");
    btn.href = "#";
    btn.textContent = "I Want This!!";
    footerTextCenter.appendChild(btn);
    btn.addEventListener("click", () => {
        const newPokemonName = prompt("Masukkan nama pengganti untuk Pokemon ini:");
        if (newPokemonName) {
            const modifiedPokemonData = { ...pokemonData, name: newPokemonName };
            addToMyPokemon(modifiedPokemonData);
        }
    });

    cardFooter.appendChild(footerTextCenter);
    card.appendChild(cardFooter);

    col.appendChild(card);
    pokemonList.appendChild(col);
}

fetchPokemons();


// MEMINDAHKAN DATA POKEMON

function addToMyPokemon(pokemonData) {
    const myPokemonCollection = JSON.parse(localStorage.getItem("myPokemon")) || [];

    // Pastikan Pokemon belum ada di koleksi sebelum ditambahkan
    if (!myPokemonCollection.some(pokemon => pokemon.name === pokemonData.name)) {
        myPokemonCollection.push(pokemonData);
        localStorage.setItem("myPokemon", JSON.stringify(myPokemonCollection));

        console.log("Pokemon added to My Pokemon:", pokemonData);
    } else {
        console.log("Pokemon is already in My Pokemon:", pokemonData);
    }
}