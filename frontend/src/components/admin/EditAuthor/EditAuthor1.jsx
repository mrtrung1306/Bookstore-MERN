import BackButton from "../../Support/BackButton";
import axios from "axios";
import React, { useState,useEffect } from 'react'
import upload_area from '../../Assets/upload_area.svg'
import { useParams } from 'react-router-dom';
import './EditAuthor.css'

const EditAuthor1 = () => {
  const [name, setName] = useState('');
  const[year, setYear] = useState('');
  const {id} = useParams();
  useEffect(() => {
      axios
      .get(`http://localhost:3000/api/v1/authors/${id}`)
      .then((response) => {
          setName(response.data.data[0].name);
          setYear(response.data.data[0].year);
      })
      .catch((error) => {
          console.log(error);
      })
  },[]);
  const Edit_Author = async()=>{
      try {
      const response = await axios.put(`http://127.0.0.1:3000/api/v1/authors/${id}`, { name: name,year:year  });
      
      if (response.data.success) {
          alert("Sửa thông tin tác giả thành công");
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
      <BackButton destination='/admin/Listauthor' />
        <h1 className='text-3xl my-4'>Sửa thông tin tác giả</h1>
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <div className="book-container my-4">
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Tên tác giả</label>
                    <input type='text' value={name}  onChange={(e) => setName(e.target.value)} name="name" className='border-2 border-gray-500 px-4 py-2 w-full'/>
                </div>
            </div>
            <div className="book-container my-4">
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Năm sinh tác giả</label>
                    <input type='text' value={year}  onChange={(e) => setYear(e.target.value)} name="name" className='border-2 border-gray-500 px-4 py-2 w-full'/>
                </div>
            </div>
        <button className='p-2 bg-sky-300 m-8' onClick={()=>{Edit_Author()}}>
          Save
        </button>
      </div>
    </div>
  )
  
}

export default EditAuthor1