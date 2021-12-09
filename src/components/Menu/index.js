import React from 'react'
import './styles.scss'
import FoodCard from '../FoodCard'
import { menu } from '../../mockups'

function Menu ({ handleMenuChange }) {
  return (
    <div className='menu-container'>
      <ul className='menu'>
        {menu.map((menu, idx) => (
          <li key={idx} className='menu__item'>
            <FoodCard dish={menu} handleMenuChange={handleMenuChange} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Menu
