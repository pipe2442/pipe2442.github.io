import React from 'react'
import './styles.scss'

function Banner () {
  return (
    <>
      <section className='banner'>
        <h1 className='banner__title'>BILL ESTIMATOR</h1>
        <h2 className='banner__text'>Divide your bills with no complaints</h2>
        <div className='banner__download'>
          <a href='https://www.koombea.com/'>
            <img
              className='download__image'
              src='https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg'
              alt='android'
            />
          </a>
          <a href='https://www.koombea.com/'>
            <img
              className='download__image'
              src='https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg'
              alt='apple'
            />
          </a>
        </div>
      </section>
    </>
  )
}

export default Banner
