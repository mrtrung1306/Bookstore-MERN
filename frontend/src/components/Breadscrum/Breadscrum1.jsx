import React from 'react'
import './Breadscrum.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'

const Breadscrum1 = (props) => {
    const {product} = props;
  return (
    <div className='breadscrum'>
        Trang chủ <img src={arrow_icon} alt=""/> {product.category.name} <img src={arrow_icon} alt="" /> {product.name}
    </div>
  )
}

export default Breadscrum1