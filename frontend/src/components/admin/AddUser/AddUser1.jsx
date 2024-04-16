import React, { useState,useEffect } from 'react'
import axios from 'axios'
import BackButton from '../../Support/BackButton'
import './AddUser.css'

const AddUser = () => {
  const [userDetails,setUserDetails] = useState({
        username:"",
        email:"",
        password:"",
        role:""
    })
    const changeHandler = (e) =>{
        setUserDetails({...userDetails, [e.target.name]:e.target.value})
    } 
    const Add_User = async()=>{
        try {
        const response = await axios.post("http://localhost:3000/api/v1/users/", { username: userDetails.username,
                                                                                   password: userDetails.password,
                                                                                   email: userDetails.email,
                                                                                   role: userDetails.role });
        
        if (response.data.success) {
            alert("thêm tài khoản thành công");
        } else {
            alert("Thất bại");
        }
        } catch (error) {
            console.log(error);
            alert("Thất bại");
        }
    }
  return (
    <div className="p-4">
        <BackButton destination='/admin/Listuser'/>
        <h1 className='text-3xl my-4'>Thêm tài khoản</h1>
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Tên đăng nhập</p>
                <input value={userDetails.username} onChange={changeHandler} type="text" name='username' placeholder='Type here'/>
            </div>
            <div className="addproduct-itemfield">
                <p>Email</p>
                <input value={userDetails.email} onChange={changeHandler} type="text" name='email' placeholder='Type here'/>
            </div>
            <div className="addproduct-itemfield">
                <p>Mật khẩu</p>
                <input value={userDetails.password} onChange={changeHandler} type="password" name='password' placeholder='Type here'/>
            </div>
            <div className="addproduct-itemfield">
                <p>Chức vụ</p>
                <select value={userDetails.role} onChange={changeHandler} name="role" className='add-product-selector'>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
            </div>
            <button onClick={()=>{Add_User()}} className='addproduct-btn'>ADD</button>
            </div>
        </div>
    </div>
  )
}

export default AddUser