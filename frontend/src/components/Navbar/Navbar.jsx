import React, { useState,useEffect } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
const Navbar = () => {
    const[menu,setMenu] = useState("shop")
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [role, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [products, setProducts] = useState([]);
    const token = Cookies.get('token');
    useEffect(() => {
        // Kiểm tra xem có token đã lưu trong localStorage hay không
        const token = Cookies.get('token');
        setIsLoggedIn(!!token);
        if (token) {
            axios.get('http://127.0.0.1:3000/api/v1/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    setUserInfo(response.data.data);
                    setUser(response.data.data.role[0]);
                })
                .catch(error => {
                    console.error('Lỗi khi lấy thông tin người đăng nhập:', error);
                });
        }
    }, []);
    
    const handleLogout = () => {
        const token = Cookies.get('token');
        if (token) {
            axios.post('http://localhost:3000/api/v1/auth/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                Cookies.remove('token');
                setIsLoggedIn(false);
                setUserInfo(null);
            })
            .catch(error => {
                console.error('Lỗi khi đăng xuất:', error);
            });
        }
    };
    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                if (token) {
                    const response = await axios.get('http://127.0.0.1:3000/api/v1/carts', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    setProducts(response.data.data.books);
                }
            } catch (error) {
                console.error('Error fetching cart products:', error);
            }
        };

        fetchCartProducts();
    }, []);

    return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>TIỆM SÁCH</p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{setMenu("shop")}}><Link  to ='/' >TRANG CHỦ</Link>{menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Vanhoc")}}><Link  to ='/Vanhoc'>Văn học</Link>{menu==="Vanhoc"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Kinhte")}}><Link  to ='/Kinhte'>Kinh tế</Link>{menu==="Kinhte"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("thieunhi")}}><Link  to ='/thieunhi'>Sách thiếu nhi</Link>{menu==="thieunhi"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            {/* Hiển thị tên người dùng và dropdown khi đã đăng nhập */}
            {isLoggedIn && (
                <div className="nav-dropdown" onClick={() => setShowDropdown(!showDropdown)}>
                    <span>{userInfo && userInfo.username}</span>
                    {showDropdown && (
                        <ul className="nav-dropdown-content">
                            {role === 'ADMIN' && (
                                <li>
                                <Link to='/admin'><span>Admin</span></Link>    
                                </li>
                            )}
                            <li onClick={handleLogout}>Logout</li>
                        </ul>
                    )}
                </div>
            )}
            {/* Hiển thị nút Login khi chưa đăng nhập */}
            {!isLoggedIn && (
                <Link to='/LoginSignup'><button>Login</button></Link>
            )}
            <Link to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{products.length}</div>
        </div>
    </div>
  )
}

export default Navbar