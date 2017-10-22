import React from 'react'

const Company = ({ id, name, logoUrl }) => (
  <div className='Company'>
    <p>{name}</p>
    <img className='Company-Image' src={logoUrl} alt={name} />
  </div>
)

export default Company
