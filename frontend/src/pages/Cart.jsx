import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function Cart() {
    const [books, setProducts] = useState([]);
    const token = Cookies.get('token');
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3000/api/v1/carts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setProducts(response.data.data.books);
            } catch (error) {
                console.error('Error fetching cart products:', error);
            }
        };

        fetchCartProducts();
    }, []);

    useEffect(() => {
        // Calculate total quantity and total price
        let quantity = 0;
        let price = 0;
        books.forEach(item => {
            quantity += item.quantity;
            price += item.quantity * item.book.new_price;
        });
        setTotalQuantity(quantity);
        setTotalPrice(price);
    }, [books]);

    const formatPrice = (price) => {
        return parseFloat(price).toLocaleString('vi-VN');
    };

    const handleRemoveCartItem = async (bookId) => {
        try {
            await axios.post('http://127.0.0.1:3000/api/v1/carts/remove', {
                bookId: bookId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            // Refresh cart products after removing item
            const response = await axios.get('http://127.0.0.1:3000/api/v1/carts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setProducts(response.data.data.books);
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

    const handleUpdateCartItem = async (bookId, quantity) => {
        try {
            await axios.post('http://127.0.0.1:3000/api/v1/carts/update', {
                bookId: bookId,
                quantity: quantity,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            // Refresh cart products after updating quantity
            const response = await axios.get('http://127.0.0.1:3000/api/v1/carts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setProducts(response.data.data.books);
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    };
    const handleCheckout = async () => {
        try {
            await axios.post('http://127.0.0.1:3000/api/v1/orders/checkout',{}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    };
    const handleQuantityChange = async (bookId, quantity) => {
        await handleUpdateCartItem(bookId, quantity);
    };

    return (
        <div className="container-fluid p-3" style={{ marginTop: '102px', backgroundColor: '#f0f0f0' }}>
            <div className="container">
                <h5><a href="/">Trang chủ</a> / Giỏ hàng</h5>
            </div>
            {books.length === 0 ? (
                <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Giỏ hàng bạn đang trống vui lòng thêm sản phẩm vào giỏ hàng !</h2>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <h2 style={{ textAlign: 'center' }}>THÔNG TIN GIỎ HÀNG</h2>
                        <table style={{ margin: 'auto', textAlign: 'center', border: '1px solid black', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ fontWeight: 'bold', border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', padding: '5px' }}> Tên Sản Phẩm </td>
                                    <td style={{ border: '1px solid black', padding: '5px' }}> Ảnh bìa </td>
                                    <td style={{ border: '1px solid black', padding: '5px' }}> Số lượng </td>
                                    <td style={{ border: '1px solid black', padding: '5px' }}> Đơn giá </td>
                                    <td style={{ border: '1px solid black', padding: '5px' }}> Thành tiền </td>
                                    <td style={{ border: '1px solid black', padding: '5px' }} width="50px"></td>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map(item => (
                                    <tr key={item.book._id} style={{ border: '1px solid black' }}>
                                        <td style={{ border: '1px solid black', padding: '5px' }}> {item.book.name} </td>
                                        <td style={{ border: '1px solid black', padding: '5px' }}><img src={`http://127.0.0.1:3000/uploads/${item.book.image}`} style={{ width: '100px', height: 'auto' }} alt={item.name} /> </td>
                                        <td style={{ border: '1px solid black', padding: '5px' }}>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item.book._id, e.target.value)}
                                                min="1"
                                            />
                                        </td>
                                        <td style={{ border: '1px solid black', padding: '5px' }}> {formatPrice(item.book.new_price)} VNĐ </td>
                                        <td style={{ border: '1px solid black', padding: '5px' }}> {formatPrice(item.quantity * item.book.new_price)} VNĐ </td>
                                        <td style={{ border: '1px solid black', padding: '5px' }}> <button onClick={() => handleRemoveCartItem(item.book._id)}>Xóa</button> </td>
                                    </tr>
                                ))}
                                <tr style={{ fontweight: 'bold', color: 'red' }}>
                                    <td colSpan="1" style={{ border: '1px solid black', padding: '5px' }}>Tổng giá trị đơn hàng</td>
                                    <td colSpan="2" style={{ border: '1px solid black', padding: '5px' }}> Số lượng sản phẩm: {totalQuantity} </td>
                                    <td colSpan="2" style={{ border: '1px solid black', padding: '5px' }}> Tổng tiền: {formatPrice(totalPrice)} VNĐ</td>
                                    <td colSpan="2" style={{ border: '1px solid black', padding: '5px' }}> <button onClick={() => handleCheckout()}>Đặt hàng</button> </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
