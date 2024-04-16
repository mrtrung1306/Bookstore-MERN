import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';
import './ListCategory.css'

const ListCategory1 = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios
        .get("http://localhost:3000/api/v1/categories/")
        .then((response) => {
            setCategories(response.data.data);
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
        <h1 className='text-3xl my-8'>Categories List</h1>
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
                <th className='border border-x-slate-600 rounded-md'>Tên thể loại</th>
                <th className='border border-x-slate-600 rounded-md '>Chức năng</th> 
              </tr>
            </thead>
            <tbody>
              {categories.map((category,index) =>(
                <tr key={category._id} className='h-8'>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {index + 1}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {category.name}
                  </td>
                  
                  <td className='border border-slate-700 rounded-md text-center'>
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/books/details/${category._id}`}>
                        <BsInfoCircle className='text-2xl text-green-800'/>
                      </Link>
                      <Link to={`/admin/editcategory/${category._id}`}>
                        <AiOutlineEdit className='text-2xl text-yellow-600'/>
                      </Link>
                      <Link to={`/admin/deletecategory/${category._id}`}>
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

export default ListCategory1