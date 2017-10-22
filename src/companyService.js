const COMPANY_ENDPOINT = 'https://autocomplete.clearbit.com/v1/companies/suggest'

function buildCompanyUrl (title) {
  const urlParams = new window.URLSearchParams()

  urlParams.set('query', title)

  return `${COMPANY_ENDPOINT}?${urlParams.toString()}`
}

function mapCompany (logo) {
  return {
    id: logo.domain,
    name: logo.name,
    logoUrl: logo.logo
  }
}

function mapSearch (search) {
  return search.map(mapCompany)
}

function mapResult (result) {
  return {
    error: null,
    result: mapSearch(result)
  }
}

export function searchCompany (title) {
  return window.fetch(buildCompanyUrl(title))
    .then((response) => response.json())
    .then((result) => mapResult(result))
}
