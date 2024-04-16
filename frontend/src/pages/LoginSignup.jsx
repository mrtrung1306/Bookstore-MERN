import React,{useContext,useEffect,useState} from 'react'
import './CSS/LoginSignup.css'
import axios from 'axios'
import Cookies from 'js-cookie';

const LoginSignup = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState("Login");
  const handleLogin = async (e) => {
    console.log("a");
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/v1/auth/login', {
          username,
          password
      });
      console.log(response.data);
      if (response.data.success) {
          Cookies.set('token', response.data.data, { expires: 7 });
          alert('Đăng nhập thành công!');
          window.location.href = '/'
      } else {
          alert('Đăng nhập thất bại!');
      }
      } catch (error) {
          console.error('Đăng nhập thất bại:', error);
          alert('Đăng nhập thất bại!');
      }
    };
    const handleRegister = async (e) => {
        console.log("b");
        try {
          const response = await axios.post('http://127.0.0.1:3000/api/v1/auth/register', {
              username,
              password,
              email
          });
          if (response.data.success) {
              alert("Đăng ký thành công! Vui lòng đăng nhập");
              window.location.href = '/Login'
          } else {
              alert('Đăng Ký thất bại!');
          }
        } catch (error) {
          console.error('Đăng Ký thất bại:', error);
          alert('Đăng Ký thất bại!');
        }
    };
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container" >
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up" ? <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>: <></> }
          <input type="text" placeholder='Your Name' value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit" onClick={()=>{state==="Login" ? handleLogin():handleRegister()}}>Continue</button>
        {state==="Sign Up" ? <p className='loginsignup-login'>Already have an account?<span onClick={()=>setState("Login")}> Login here</span></p> 
        : <p className='loginsignup-login'>Create an account?<span onClick={()=>setState("Sign Up")}> Click here</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  ) 
}

export default LoginSignup