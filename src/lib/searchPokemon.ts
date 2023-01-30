import type { Pokeapi } from './pokeapi'
import Fuse from 'fuse.js'

export function searchPokemon(
  pokemon: Pokeapi.NamedResult[] = [],
  pattern = ''
) {
  console.log('Search: ', pattern)

  const searchOptions: Fuse.IFuseOptions<any> = {
    keys: ['name'],
    includeMatches: true,
    minMatchCharLength: 3,
  }

  const fuse = new Fuse(pokemon, searchOptions)

  const searchResult = fuse.search(pattern)
  console.log(searchResult)
  return searchResult
}
