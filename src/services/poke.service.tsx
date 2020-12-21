
export const fetchAllPokemons = async (url: string) => {
  const response = await fetch(url)
  const pokemons = await response.json()

  return pokemons
}

export const fetchPokemon = async (name: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  const pokemon = await response.json()
  console.log(pokemon)
  return pokemon
}
