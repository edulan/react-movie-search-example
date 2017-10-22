const OMDB_ENDPOINT = 'http://www.omdbapi.com/'
const OMDB_API_KEY = 'BanMePlz'

const IMAGE_NOT_AVAILABLE = 'N/A'
const ERROR_RESPONSE = 'False'

function buildOMDBUrl (title) {
  const urlParams = new window.URLSearchParams()

  urlParams.set('apikey', OMDB_API_KEY)
  urlParams.set('s', title)

  return `${OMDB_ENDPOINT}?${urlParams.toString()}`
}

function mapPoster (poster) {
  return poster === IMAGE_NOT_AVAILABLE
    ? null
    : poster
}

function mapMovie (movie) {
  return {
    id: movie.imdbID,
    title: movie.Title,
    plot: movie.Plot,
    posterUrl: mapPoster(movie.Poster)
  }
}

function mapSearch (search) {
  return search.map(mapMovie)
}

function mapResult (result) {
  if (result.Response === ERROR_RESPONSE) {
    return {
      error: {
        message: result.Error
      },
      result: null
    }
  }

  return {
    error: null,
    result: mapSearch(result.Search)
  }
}

export function searchMovie (title) {
  return window.fetch(buildOMDBUrl(title))
    .then((response) => response.json())
    .then((result) => mapResult(result))
}
