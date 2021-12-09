import React, { useState } from 'react'
import './styles.scss'
import { addValues, findTax, equalDivision } from '../../logic/logic.js'

function Bill ({ bill }) {
  const [percentage, setPercentage] = useState(0)
  const [percentageArray, setPercentageArray] = useState([])
  const total = addValues(bill)
  const tax = findTax(bill, total)
  const equalParts = equalDivision(total, tax, bill)

  const handlePercentageInput = (event) => {
    setPercentage(event.target.value)
  }
  const handlePercentageSubmission = (event) => {
    event.preventDefault()
    setPercentageArray([...percentageArray, percentage])
    setPercentage('')
    event.target.value = ''
  }
  return (
    <div className='bill'>
      <h1 className='bill__title'>Restaurant Bill</h1>
      <ul className='bill__menu'>
        {bill.menu.map((menu, idx) => (
          <li className='bill__item' key={idx}>
            <div className='item-container'>
              <img className='item__image' src={menu.image} alt='image' />
              <h3>{menu.name}</h3>
            </div>
            <h3 className='item__price'>${menu.value}</h3>
          </li>
        ))}
      </ul>
      <div className='values-container'>
        <div className='bill__values'>
          <h3>Tax</h3>
          <h3>Total</h3>
          <h3>Final</h3>
        </div>
        <div className='bill__values'>
          <h3>${tax}</h3>
          <h3>${total}</h3>
          <h3>${total + tax}</h3>
        </div>
      </div>
      {bill.category === 'B' && (
        <form className='bill__percentage'>
          <h2>Percentages:</h2>
          <h3>
            On this section you should add the percentage that each user wish to
            pay.
          </h3>
          <ul>
            {bill.users.map((user, idx) => (
              <li className='percentage__item' key={idx}>
                <h3>Percentage for {user}</h3>
                <input
                  type='text'
                  placeholder='Add Percentage'
                  className='percentage__input'
                  onChange={handlePercentageInput}
                  name='percentage'
                  value={percentage}
                />
                <button onClick={handlePercentageSubmission} type='button' className='button'>
                  Add Percentage
                </button>
              </li>
            ))}
          </ul>
        </form>
      )}
      {bill.category === 'A' && (
        <div>
          <h2>Equal parts:</h2>
          <h3>each user pays {equalParts}</h3>
        </div>
      )}
    </div>
  )
}

export default Bill
