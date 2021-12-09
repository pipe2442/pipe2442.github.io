import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import './styles.scss'
import Menu from '../Menu'
import Bill from '../Bill'
import FoodCard from '../FoodCard'
import { ReactComponent as Basket } from '../../styles/basket.svg'
import { ReactComponent as Close } from '../../styles/circlex.svg'

const System = () => {
  const [renderResult, setRenderResult] = useState(false)
  const [menu, setMenu] = useState([])
  const [user, setUser] = useState('')
  const [usersArray, setUsersArray] = useState([])
  const [burger, setBurger] = useState(false)
  const [bill, setBill] = useState({
    users: [],
    tip: 0,
    menu: [],
    category: ''
  })
  const handleMenuChange = (dish) => {
    setMenu([...menu, dish])
    setBurger(true)
  }
  const handleMenuDelete = (newMenu) => {
    setMenu([...newMenu])
  }
  const handleUserInput = (event) => {
    setUser(event.target.value)
  }
  const handleUserSubmission = (event) => {
    event.preventDefault()
    setUsersArray([...usersArray, user])
    setUser('')
  }

  const {
    register,
    handleSubmit
  } = useForm()
  const onSubmit = (data) => {
    if (menu.length > 0 && usersArray.length > 0) {
      setBill({
        users: usersArray,
        tip: data.tip,
        menu: menu,
        category: data.category
      })
      setBurger(false)
      setRenderResult(true)
    }
  }

  return (
    <div>
      <div className='system-container'>
        {!burger && (
          <Basket className='basket' onClick={() => setBurger(true)} />
        )}
        <Menu handleMenuChange={handleMenuChange} />
        {burger && (
          <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <Close onClick={() => setBurger(false)} className='form__close' />
            <h2 className='form__title'>Start your order:</h2>
            <input
              type='text'
              placeholder='Add User'
              className='form__input'
              onChange={handleUserInput}
              name='user'
              value={user}
            />
            <button onClick={handleUserSubmission} type='button' className='button'>
              Add User
            </button>
            <h3>Users:</h3>
            {usersArray < 1 && <h4>Please add users to create a new order</h4>}
            {usersArray.map((user, idx) => <h3 key={idx}>{user}</h3>)}
            <button className='button' onClick={() => setUsersArray([])}>
              Clear
            </button>

            <input
              className='form__input'
              placeholder='Insert the tip percentage'
              {...register('tip', { required: true })}
            />

            <h3>Selected items:</h3>
            <div className='form__menu'>
              {menu.length < 1 && <h4>Please add your food to create a new order</h4>}
              <ul>
                {menu.map((menuItem, idx) => (
                  <li key={idx}>
                    <FoodCard
                      dish={menuItem}
                      menu={menu}
                      handleMenuDelete={handleMenuDelete}
                      index={idx}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <button className='button' onClick={() => setMenu([])}>
              Clear
            </button>

            <select
              className='form__input form__select'
              {...register('category', { required: true })}
            >
              <option value=''>Split the bill...</option>
              <option value='A'>Divide equal parts</option>
              <option value='B'>Custom percentages</option>
            </select>
            <input className='button' type='submit' value='Send order' />
          </form>
        )}
        {renderResult && (
          <Bill bill={bill} />
        )}
      </div>
    </div>
  )
}

export default System
