import { PokemonListItem } from '@/components/PokemonListItem'
import { Pokeapi } from '@/lib/pokeapi'
import { searchPokemon } from '@/lib/searchPokemon'
import { useState } from 'react'
import { useQuery } from 'react-query'

export default function Search() {
  const [searchString, setSearchString] = useState('')

  const { data = [] } = useQuery(['allPokemon'], () => Pokeapi.getAll(), {
    staleTime: Infinity,
  })

  const searchedPokemon =
    searchString.length > 0
      ? searchPokemon(data, searchString)
      : data.map((a) => ({ item: a, refIndex: 0 }))

  return (
    <>
      <h1>Suchen</h1>
      <input
        placeholder="Pokemon search..."
        value={searchString}
        onChange={({ target: { value } }) => setSearchString(value)}
      />
      <ul>
        {searchedPokemon.map((item) => (
          <PokemonListItem key={item.item.name} fuseResult={item} />
        ))}
      </ul>
    </>
  )
}
