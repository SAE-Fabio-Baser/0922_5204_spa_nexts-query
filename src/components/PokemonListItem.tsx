import { Pokeapi } from '@/lib/pokeapi'
import React from 'react'

import Fuse from 'fuse.js'
export interface Props {
  fuseResult: Fuse.FuseResult<Pokeapi.NamedResult>
  index?: number
}

export function PokemonListItem(props: Props) {
  const { fuseResult } = props
  const { item, matches } = fuseResult

  const nameArr = item.name.split('')
  const highlightedNameArr = nameArr.slice(
    matches?.[0].indices[0][0],
    1 + (matches?.[0].indices[0][1] || 0)
  )

  const matchName = highlightedNameArr.join('')

  const matchSpan = (name: string) => (
    <span key={name} style={{ background: 'yellow', color: 'black' }}>
      {name}
    </span>
  )

  let displayName
  const bob = item.name.split(matchName)
  if (!bob[0] || !bob[1]) {
    if (!bob[0]) {
      displayName = [matchSpan(matchName), bob[1]]
    }
    if (!bob[1]) {
      displayName = [bob[0], matchSpan(matchName)]
    }
  } else {
    displayName = [bob[0], matchSpan(matchName), bob[1]]
  }

  return (
    <div>
      <h4 style={{ fontWeight: 100 }}>{displayName}</h4>
    </div>
  )
}
