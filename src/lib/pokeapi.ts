import axios from 'axios'

export namespace Pokeapi {
  export interface NamedResult {
    name: string
    url: string
  }

  interface PaginatedResult {
    count: number
    next: string
    previous: string
    results: NamedResult[]
  }

  export function getAll(limit = 10000, offset = 0) {
    return new Promise<NamedResult[]>((resolve, reject) => {
      axios
        .get<PaginatedResult>('https://pokeapi.co/api/v2/pokemon', {
          params: { limit, offset },
        })
        .then((res) => resolve(res.data.results))
        .catch(reject)
    })
  }
}
