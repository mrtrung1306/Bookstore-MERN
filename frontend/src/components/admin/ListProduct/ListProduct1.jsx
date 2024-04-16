import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';
import './ListProduct.css'

const ListProduct1 = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const formatPrice = (price) => {
        return parseFloat(price).toLocaleString('vi-VN');
    };
    useEffect(() => {
        setLoading(true);
        axios
        .get("http://localhost:3000/api/v1/books/")
        .then((response) => {
            setBooks(response.data.data);
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
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/admin/addproduct'>
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
              <th className='border border-x-slate-600 rounded-md'>Tên sách</th>
              <th className='border border-x-slate-600 rounded-md'>Giá</th>
              <th className='border border-x-slate-600 rounded-md'>Giá ưu đãi</th>
              <th className='border border-x-slate-600 rounded-md max-md:hidden'>Tác giả</th> 
              <th className='border border-x-slate-600 rounded-md max-md:hidden'>Thể loại</th> 
              <th className='border border-x-slate-600 rounded-md max-md:hidden'>Hình ảnh</th> 
              <th className='border border-x-slate-600 rounded-md '>Chức năng</th> 
              </tr>
            </thead>
            <tbody>
              {books.map((book,index) =>(
                <tr key={book._id} className='h-8'>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {index + 1}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {book.name}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center max-md:hidde'>
                    {formatPrice(book.old_price)}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center max-md:hidde'>
                    {formatPrice(book.new_price)}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center max-md:hidde'>
                    {book.author.name}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center max-md:hidde'>
                    {book.category.name}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center max-md:hidde' style={{ width:'25%'}} >
                    <img src={`http://localhost:3000/uploads/${book.image}`}  />
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/books/details/${book._id}`}>
                        <BsInfoCircle className='text-2xl text-green-800'/>
                      </Link>
                      <Link to={`/admin/editproduct/${book._id}`}>
                        <AiOutlineEdit className='text-2xl text-yellow-600'/>
                      </Link>
                      <Link to={`/admin/deleteproduct/${book._id}`}>
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
export default ListProduct1