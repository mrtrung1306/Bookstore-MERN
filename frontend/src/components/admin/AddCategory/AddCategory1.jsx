import React, { useState,useEffect } from 'react'
import'./AddCategory.css'
import upload_area from '../../Assets/upload_area.svg'
import axios from 'axios'
import BackButton from '../../Support/BackButton'

const AddCategory1 = () => {
    const [categoryDetails,setCategoryDetails] = useState({
        name:"",
    })
    const changeHandler = (e) =>{
        setCategoryDetails({...categoryDetails, [e.target.name]:e.target.value})
    } 
    const Add_Category = async()=>{
        try {
        const response = await axios.post("http://localhost:3000/api/v1/categories/", { name: categoryDetails.name });
        
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
        <h1 className='text-3xl my-4'>Add Category</h1>
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Tên thể loại</p>
                <input value={categoryDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here'/>
            </div>
            <button onClick={()=>{Add_Category()}} className='addproduct-btn'>ADD</button>
            </div>
        </div>
    </div>
  )
}

export default AddCategory1