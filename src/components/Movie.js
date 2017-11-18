import React from 'react'

import { buildMovieUrl } from '../utils/urlHelper'

const Movie = ({ id, title, plot, posterUrl }) => (
  <div className='Movie'>
    <a className='Movie-Link' href={buildMovieUrl(id)} target='_blank'>
      <img className='Movie-Image' src={posterUrl} alt={title} />
    </a>
    <p>{title}</p>
  </div>
)

export default Movie
