document.addEventListener("DOMContentLoaded", () => {
    const myPokemonCollection = JSON.parse(localStorage.getItem("myPokemon")) || [];
    const myPokemonList = document.getElementById("my-pokemon-list");

    myPokemonCollection.forEach(pokemonData => {
        displayMyPokemonData(pokemonData, myPokemonList);
    });
});

//Menghapus data pokemon yang disimpan
function removeFromMyPokemon(pokemonData) {
    const myPokemonCollection = JSON.parse(localStorage.getItem("myPokemon")) || [];

    const updatedCollection = myPokemonCollection.filter(pokemon => pokemon.name !== pokemonData.name);

    localStorage.setItem("myPokemon", JSON.stringify(updatedCollection));

    console.log("Pokemon removed from My Pokemon:", pokemonData);
}

function displayMyPokemonData(pokemonData, container) {
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
    btn.classList.add("btn", "btn-outline-danger", "mt-auto");
    btn.href = "#";
    btn.textContent = "Delete My Pokemon";
    footerTextCenter.appendChild(btn);
    btn.addEventListener("click", () => {
        removeFromMyPokemon(pokemonData);
        col.remove();
    });

    cardFooter.appendChild(footerTextCenter);
    card.appendChild(cardFooter);

    col.appendChild(card);
    container.appendChild(col);
}