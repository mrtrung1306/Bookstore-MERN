import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';
import Cookies from 'js-cookie'

const ListBill1 = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = Cookies.get('token');
    useEffect(() => {
        setLoading(true);
        axios
        .get("http://localhost:3000/api/v1/orders/",{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((response) => {
            setOrders(response.data.data);
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
        <h1 className='text-3xl my-8'>Bill List</h1>
        <Link to='/admin/addcategory'>
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
                <th className='border border-x-slate-600 rounded-md'>Tên sản phẩm</th>
                <th className='border border-x-slate-600 rounded-md '>tên khách hàng</th> 
                <th className='border border-x-slate-600 rounded-md '>trạng thái</th> 
                <th className='border border-x-slate-600 rounded-md '>chức năng</th> 
              </tr>
            </thead>
            <tbody>
              {orders.map((order,index) =>(
                <tr key={order._id} className='h-8'>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {index + 1}
                  </td>
                   <td className='border border-slate-700 rounded-md text-center'>
                    {order.items[0].book.name}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {order.user.username}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {order.status}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/books/details/${order._id}`}>
                        <BsInfoCircle className='text-2xl text-green-800'/>
                      </Link>
                      <Link to={`/admin/editbill/${order._id}`}>
                        <AiOutlineEdit className='text-2xl text-yellow-600'/>
                      </Link>
                      <Link to={`/admin/deletebill/${order._id}`}>
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

export default ListBill1