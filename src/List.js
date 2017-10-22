import React from 'react'

const List = ({ items, itemRenderer }) => (
  <ul className='List'>
    {items.map((item, index) => (
      <li className='List-Item' key={index}>
        {itemRenderer(item)}
      </li>
    ))}
  </ul>
)

export default List
