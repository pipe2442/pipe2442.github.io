import React from 'react'
import './styles.scss'
import { deleteItem } from '../../logic/logic.js'

function FoodCard ({ dish, handleMenuChange, menu, handleMenuDelete, index }) {
  return (
    <div className='card-box'>
      <div className='card__info'>
        <img className='card__image' src={dish.image} alt='dish picture' />
        <div className='card__text'>
          <h4 className='card__title'>{dish.name}</h4>
          <p className='card__price'>{dish.value}</p>
        </div>
      </div>
      {handleMenuChange && (
        <button
          className='button button-card '
          onClick={() => handleMenuChange(dish)}
        >
          Add
        </button>
      )}
      {!handleMenuChange && (
        <div
          className='button button-card '
          onClick={() => handleMenuDelete(deleteItem(menu, index))}
        >
          Delete
        </div>
      )}
    </div>
  )
}

export default FoodCard
