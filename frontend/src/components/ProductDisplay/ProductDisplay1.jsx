import React, { useContext } from 'react'
import './ProducDisplay.css'
import start_icon from "../Assets/star_icon.png"
import start_dull_icon from "../Assets/star_dull_icon.png"
import axios from 'axios'
import Cookies from 'js-cookie'
const ProductDisplay1 = (props) => {
    const {product} = props;
    const token = Cookies.get('token');
    const imageUrl = "http://localhost:3000/uploads/" + product.image;
    const formatPrice = (price) => {
        return parseFloat(price).toLocaleString('vi-VN');
    };
    const addToCart = async (productId) => {
        try {
            await axios.post(
                'http://127.0.0.1:3000/api/v1/carts/add',
                { bookId: productId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            alert('Sản phẩm đã được thêm vào giỏ hàng thành công!');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('Xin vui lòng đăng nhập');
        }
    }
    return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={imageUrl} alt="" />
                <img src={imageUrl} alt="" />
                <img src={imageUrl} alt="" />
                <img src={imageUrl} alt="" />
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={imageUrl} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-start">
                <img src={start_icon} alt=""/>
                <img src={start_icon} alt=""/>
                <img src={start_icon} alt=""/>
                <img src={start_icon} alt=""/>
                <img src={start_dull_icon} alt=""/>
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">${formatPrice(product.old_price)}</div>
                <div className="productdisplay-right-price-new">${formatPrice(product.new_price)}</div>
            </div>
            <div className="productdisplay-right-description">
                {product.description.substring(0, 87)}
            </div>
            <button onClick={() => addToCart(product._id)}>Thêm vào giỏ</button>
            <p className="productdisplay-right-category"><span>Loại :</span> {product.category.name}</p>
            <p className="productdisplay-right-category"><span>Hình thức bìa :</span>Bìa Mềm</p>

        </div>
    </div>
  )
}

export default ProductDisplay1