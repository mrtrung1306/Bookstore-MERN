import React, { useState,useEffect } from 'react'
import './AddAuthor.css'
import upload_area from '../../Assets/upload_area.svg'
import axios from 'axios'
import BackButton from '../../Support/BackButton'

const AddAuthor1 = () => {
  const [authorDetails,setAuthorDetails] = useState({
        name:"",
        year:""
    })
    const changeHandler = (e) =>{
        setAuthorDetails({...authorDetails, [e.target.name]:e.target.value})
    } 
    const Add_Author = async()=>{
        try {
        const response = await axios.post("http://localhost:3000/api/v1/authors/", { name: authorDetails.name,year: authorDetails.year});
        
        if (response.data.success) {
            alert("thêm thể loại sách thành công");
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
        <BackButton destination='/admin/Listcategory'/>
        <h1 className='text-3xl my-4'>Add Author</h1>
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Tên tác giả</p>
                <input value={authorDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here'/>
            </div>
             <div className="addproduct-itemfield">
                <p>Năm sinh tác giả</p>
                <input value={authorDetails.year} onChange={changeHandler} type="text" name='year' placeholder='Type here'/>
            </div>
            <button onClick={()=>{Add_Author()}} className='addproduct-btn'>ADD</button>
            </div>
        </div>
    </div>
  )
}

export default AddAuthor1