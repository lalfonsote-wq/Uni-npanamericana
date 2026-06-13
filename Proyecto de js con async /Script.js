async function buscarPokemon() {

  const numero =

    document.getElementById("pokemonNumero").value;

  const respuesta =
    await fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`);

  const data = await respuesta.json();
  let pokemonGrid=document.getElementById("pokemonGrid")
  
  pokemonGrid.innerHTML+=`        <div class="pokemon-card">

  <img
    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${numero}.png"
  >

  <h3>${data.name}</h3>

</div>`
} 
