import React, { useState,useEffect } from 'react'
import'./AddProduct.css'
import upload_area from '../../Assets/upload_area.svg'
import axios from 'axios'
import BackButton from '../../Support/BackButton'
const AddProduct1 = () => {

    const [Author, setAuthor] = useState([]);
    const [Category, setCategory] = useState([]);
    useEffect(() => {
        axios
        .get("http://127.0.0.1:3000/api/v1/authors/")
        .then((response) => {
            setAuthor(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },[]);
     useEffect(() => {
        axios
        .get("http://127.0.0.1:3000/api/v1/categories/")
        .then((response) => {
            setCategory(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },[]);
    const[image,setImage] = useState(false);

    const imageHandler = (e) =>{
        setImage(e.target.files[0]);
        setProductDetails({ ...productDetails, image: e.target.files[0].image });
    }
    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        description:"",
        category:"women",
        author:"abc",
        new_price:"",
        old_price:""
    })
    const changeHandler = (e) =>{
        setProductDetails({...productDetails, [e.target.name]:e.target.value})
    } 

    const Add_Product = async()=>{
        const formData = new FormData();
        formData.append('name', productDetails.name);
        formData.append('old_price', productDetails.old_price);
        formData.append('new_price', productDetails.new_price);
        formData.append('description', productDetails.description);
        formData.append('category', productDetails.category);
        formData.append('author', productDetails.author);
        formData.append('image', image);
        console.log(formData);    
        await fetch('http://localhost:3000/api/v1/books',{
            method:'POST',
            body: formData,
        }).then((resp)=>resp.json()).then((data)=>{
            data.success?alert("Thêm sách thành công"):alert("Thất bại")
        })
        
    }
    return (
    <div className="p-4">
        <BackButton destination='/admin/Listproduct'/>
        <h1 className='text-3xl my-4'>Add Book</h1>
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Tên sách</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here'/>
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Giá</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder=''/>
                </div>
                <div className="addproduct-itemfield">
                    <p>Giá ưu đãi</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder=''/>
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Mô tả</p>
                <input value={productDetails.description} onChange={changeHandler} type="text" name='description' placeholder='Type here'/>
            </div>
            <div className="addproduct-itemfield">
                <p>Thể loại sách</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    {Category.map((item, i) => (
                        <option key={i} value={item._id}>{item.name}</option>
                    ))}
                </select>
            </div>
            <div className="addproduct-itemfield">
                <p>Tác giả</p>
                <select value={productDetails.author} onChange={changeHandler} name="author" className='add-product-selector'>
                    {Author.map((item, i) => (
                        <option key={i} value={item._id}>{item.name}</option>
                    ))}
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor='file-input'>
                    <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt=""/>
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>  
            </div>
            <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
            </div>
        </div>
    </div>
  )
}

export default AddProduct1