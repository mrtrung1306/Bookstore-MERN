import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
  const imageUrl = "http://localhost:3000/uploads/" + props.image;
  const formatPrice = (price) => {
        return parseFloat(price).toLocaleString('vi-VN');
  };
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={imageUrl} alt=""/></Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
          {formatPrice(props.new_price)}<span className='currency'> đ</span>
        </div>
        <div className="item-price-old">
          {formatPrice(props.old_price)}<span className='currency'> đ</span>
        </div>
      </div>
    </div>
  )
}

export default Item