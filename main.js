
const fetchPokemon = () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
    
    const ListaPokemon = []
    
    for(let i=1; i<=150;i++){
        ListaPokemon.push( 
        fetch(getPokemonUrl(i))
        .then(response => response.json())
        )
    }

    Promise.all(ListaPokemon)
        .then(pokemons => {
    
            const listPokemons = pokemons.reduce((accumulator,pokemon) => {
                console.log(pokemon)
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)
                accumulator += `
                <li class="card ">
                <div class="pokemon-img">
                    <div><img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"/></div>
                    <div></div>
                </div>
                

                <h2 class="card-title ${types[0]}">${pokemon.name}</h2>

                <p class='card-subtitle ${types[0]}'>${types.join(' | ')}</p>
                </li>`
                return accumulator
            },'') 
            const ul = document.querySelector('[data-js="pokedex"]')
            ul.innerHTML = listPokemons

        })
}

fetchPokemon()


