import React, { useState } from 'react';
import './Navbar.css';
import navlogo from '../../Assets/nav-logo.svg';
import navProfile from '../../Assets/nav-profile.svg';
import Cookies from 'js-cookie'
import axios from 'axios';
const Navbar1 = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
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
                setUserInfo(null);
                window.location.href = '/'
            })
            .catch(error => {
                console.error('Lỗi khi đăng xuất:', error);
            });
        }
    };
  return (
    <div className='navbar'>
      <img src={navlogo} alt="" className="nav-logo"/>
      <div className="nav-profile">
        <img src={navProfile} alt="" onClick={toggleDropdown}/>
        {showDropdown && (
          <div className="dropdown-list">
            {/* Dropdown content goes here */}
            <ul>
              <li onClick={handleLogout}>Đăng xuất</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar1;