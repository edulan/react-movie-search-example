import React from 'react'

import { buildMovieUrl } from './urlHelper'

const Movie = ({ id, title, plot, posterUrl }) => (
  <div className='Movie'>
    <p>{title}</p>
    <a href={buildMovieUrl(id)} target='_blank'>
      <img className='Movie-Image' src={posterUrl} alt={title} />
    </a>
  </div>
)

export default Movie
