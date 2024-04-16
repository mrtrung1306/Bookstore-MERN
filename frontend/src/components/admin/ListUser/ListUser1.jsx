import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';
import './ListUser.css'

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
      setLoading(true);
      axios
      .get("http://localhost:3000/api/v1/users/")
      .then((response) => {
          setUsers(response.data.data);
          setLoading(false);
      })
      .catch((error) => {
          console.log(error);
          setLoading(false);
      })
  },[]);
  return (
    <div className="p-4">
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Users List</h1>
        <Link to='/admin/adduser'>
          <MdOutlineAddBox className='text-sky-800 text-4xl'/>
        </Link>
      </div>
        {loading ? (
          <>...Loading</>
        ) :(
          <table className='w-full border-separate border-spacing-2'>
            <thead>
              <tr>
                <th className='border border-x-slate-600 rounded-md'>No</th>
                <th className='border border-x-slate-600 rounded-md'>Tên đăng nhập</th>
                <th className='border border-x-slate-600 rounded-md'>Email</th>
                <th className='border border-x-slate-600 rounded-md'>Mật khẩu</th>
                <th className='border border-x-slate-600 rounded-md'>Chức vụ</th>
                <th className='border border-x-slate-600 rounded-md '>Chức năng</th> 
              </tr>
            </thead>
            <tbody>
              {users.map((user,index) =>(
                <tr key={user._id} className='h-8'>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {index + 1}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {user.username}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {user.email}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {user.password}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {user.role}
                  </td>
                  
                  <td className='border border-slate-700 rounded-md text-center'>
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/books/details/${user._id}`}>
                        <BsInfoCircle className='text-2xl text-green-800'/>
                      </Link>
                      <Link to={`/admin/edituser/${user._id}`}>
                        <AiOutlineEdit className='text-2xl text-yellow-600'/>
                      </Link>
                      <Link to={`/admin/deleteuser/${user._id}`}>
                        <MdOutlineDelete className='text-2xl text-red-600'/>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  )
}

export default ListUser