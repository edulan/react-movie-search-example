export function buildSearchPath (term) {
  return `/search/${encodeURIComponent(term)}`
}

export function buildMovieUrl (id) {
  return `http://www.imdb.com/title/${id}`
}

export function defaultSearchPath () {
  return buildSearchPath('The Matrix')
}
