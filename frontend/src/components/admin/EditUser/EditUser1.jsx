import BackButton from "../../Support/BackButton";
import axios from "axios";
import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './EditUser.css'

const EditUser1 = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const {id} = useParams();
    useEffect(() => {
        axios
        .get(`http://localhost:3000/api/v1/users/${id}`)
        .then((response) => {
            setUsername(response.data.data[0].username);
            setEmail(response.data.data[0].email);
            setPassword(response.data.data[0].password);
            setRole(response.data.data[0].role);
        })
        .catch((error) => {
            console.log(error);
        })
    },[]);
    const Edit_Category = async()=>{
        try {
        const response = await axios.put(`http://127.0.0.1:3000/api/v1/users/${id}`, { email: email,
                                                                                            password: password,
                                                                                            role: role });
        
        if (response.data.success) {
            alert("Sửa thông tin thành công");
        } else {
            alert("Thất bại");
        }
        } catch (error) {
            console.log(error);
            alert("Thất bại");
        }
    };
    return (
    <div className='p-4'>
      <BackButton destination='/admin/Listuser' />
        <h1 className='text-3xl my-4'>Sửa thông tin tài khoản</h1>
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <div className="book-container my-4">
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Tên đăng nhập</label>
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} name="username" className='border-2 border-gray-500 px-4 py-2 w-full'/>
                </div>
            </div>
            <div className="book-container my-4">
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Email</label>
                    <input type='text' value={email}  onChange={(e) => setEmail(e.target.value)} name="email" className='border-2 border-gray-500 px-4 py-2 w-full'/>
                </div>
            </div>
            <div className="book-container my-4">
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Mật khẩu</label>
                    <input type='password' value={password}  onChange={(e) => setPassword(e.target.value)} name="password" className='border-2 border-gray-500 px-4 py-2 w-full'/>
                </div>
            </div>
             <div className="addproduct-itemfield">
                <p>Chức vụ</p>
                <select value={role} onChange={(e) => setRole(e.target.value)} name="role" className='add-product-selector'>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
            </div>
        <button className='p-2 bg-sky-300 m-8' onClick={()=>{Edit_Category()}}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditUser1