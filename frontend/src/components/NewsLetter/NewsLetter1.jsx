import React from 'react'
import './NewsLetter.css'

const NewsLetter1 = () => {
  return (
    <div className='newsletter'>
        <h1>Nhận các Ưu đãi Độc quyền qua Email của bạn</h1>
        <p>Đăng ký nhận bản tin của chúng tôi và luôn cập nhật thông tin mới nhất.</p>
        <div>
            <input type="email" placeholder='Your Email id' />
            <button>Đăng ký</button>
        </div>
    </div>
  )
}

export default NewsLetter1