import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import BookCategory from './pages/BookCategory';
import Book from './pages/Book';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import HomePage from './pages/HomePage';
import Footer1 from './components/Footer/Footer1';
import men_banner from './components/Assets/vanhoc.webp';
import women_banner from './components/Assets/kinhte.jpg';
import kid_banner from './components/Assets/thieunhi.jpg';
import AdminPanel from './AdminPanel';
import Cookies from 'js-cookie';
import axios from 'axios';

const App = () => {
  const [userInfo, setUser] = useState(null);
  const isAdmin = userInfo && userInfo.includes('USER');
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      axios.get('http://127.0.0.1:3000/api/v1/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          setUser(response.data.data.role[0]);
        })
        .catch(error => {
          console.error('Lỗi khi lấy thông tin người đăng nhập:', error);
        });
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePageLayout />} />
        <Route path='/Vanhoc' element={<BookCategoryLayout banner={men_banner} category="Văn học" />} />
        <Route path='/Kinhte' element={<BookCategoryLayout banner={women_banner} category="Kinh tế" />} />
        <Route path='/thieunhi' element={<BookCategoryLayout banner={kid_banner} category="Sách thiếu nhi" />} />
        <Route path="product" element={<BookLayout />}>
          <Route path=':productId' element={<BookLayout />} />
        </Route>
        <Route path='/cart' element={<CartLayout />} />
        <Route path='/LoginSignup' element={<LoginSignupLayout />} />
        {isAdmin && (
          <Route path="/admin/*" element={<AdminPanelLayout />} />
        )}
      </Routes>
    </>
  )
}

const HomePageLayout = () => (
  <>
    <Navbar />
    <HomePage category="homepage" />
    <Footer1 />
  </>
);

const BookCategoryLayout = ({ banner, category }) => (
  <>
    <Navbar />
    <BookCategory banner={banner} category={category} />
    <Footer1 />
  </>
);

const BookLayout = () => (
  <>
    <Navbar />
    <Book />
    <Footer1 />
  </>
);

const CartLayout = () => (
  <>
    <Navbar />
    <Cart />
    <Footer1 />
  </>
);

const LoginSignupLayout = () => (
  <>
    <Navbar />
    <LoginSignup />
    <Footer1 />
  </>
);

const AdminPanelLayout = () => (
  <>
    <AdminPanel />
  </>
);
export default App;
