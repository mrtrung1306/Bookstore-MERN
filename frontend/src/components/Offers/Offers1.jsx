import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/banner1.png'

const Offers = () => {
  return (
    <div className='offers'>
      <div className="offers-left">
        <h1>Ưu đãi Đặc biệt</h1>
        <h1>Dành Cho Bạn</h1>
        <p>CHỈ CÓ TẠI CÁC SẢN PHẨM BÁN CHẠY NHẤT</p>
        <button>Kiểm Tra Ngay</button>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  )
}

export default Offers