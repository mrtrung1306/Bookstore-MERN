import BackButton from "../../Support/BackButton";
import axios from "axios";
import React, { useState,useEffect } from 'react'
import upload_area from '../../Assets/upload_area.svg'
import { useParams } from 'react-router-dom';


const EditProduct1 = () => {
    const [Author, setAuthor] = useState([]);
    const [Category, setCategory] = useState([]);
    const [name, setName] = useState('');
    const [old_price, setOldprice] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [author, setauthor] = useState('');
    const [category, setcategory] = useState('');
    const [new_price, setNewprice] = useState('');
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
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
    useEffect(() => {
        setLoading(true);
        axios
        .get(`http://localhost:3000/api/v1/books/${id}`)
        .then((response) => {
            // setBooks(response.data.data);
            setName(response.data.data[0].name);
            setOldprice(response.data.data[0].old_price)
            setNewprice(response.data.data[0].new_price)
            setDescription(response.data.data[0].description);
            setauthor(response.data.data[0].author._id)
            setcategory(response.data.data[0].category._id)
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        })
    },[]);
    const imageHandler = (e) =>{
        setImage(e.target.files[0]);
        // setImage({ image, image: e.target.files[0].image });
    }

    const Edit_Product = async()=>{
        const formData = new FormData();
        formData.append('name', name);
        formData.append('old_price', old_price);
        formData.append('new_price', new_price);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('author', author);
        formData.append('image', image.name);
        console.log(formData);
        try {
        const response = await axios.put(`http://127.0.0.1:3000/api/v1/books/${id}`, formData);
        
        if (response.data.success) {
            alert("Sửa sách thành công");
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
      <BackButton destination='/admin/Listproduct' />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <div className="book-container my-4">
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Tên sách</label>
                <input type='text' value={name}  onChange={(e) => setName(e.target.value)} name="name" className='border-2 border-gray-500 px-4 py-2 w-full'/>
            </div>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Giá</label>
                <input type='text' value={old_price}  onChange={(e) => setOldprice(e.target.value)} name="old_price" className='border-2 border-gray-500 px-4 py-2  w-full '/>
            </div>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Giá ưu đãi</label>
                <input type='text' value={new_price}  onChange={(e) => setNewprice(e.target.value)} name="new_price" className='border-2 border-gray-500 px-4 py-2  w-full '/>
            </div>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Mô tả</label>
                <input type='text' value={description}  onChange={(e) => setDescription(e.target.value)} name="description" className='border-2 border-gray-500 px-4 py-2 w-full'/>
            </div>
            <div className="addproduct-itemfield">
                <p className='text-xl mr-4 text-gray-500'>Tác giả</p>
                <select value={author}  onChange={(e) => setauthor(e.target.value)} name="author" className='add-product-selector'>
                {Category.map((item, i) => (
                    <option key={i} value={item._id}>{item.name}</option>
                ))}
                </select>
            </div>
            <div className="addproduct-itemfield">
                <p className='text-xl mr-4 text-gray-500'>Thể loại</p>
                <select value={category}  onChange={(e) => setcategory(e.target.value)} name="category" className='add-product-selector'>
                {Author.map((item, i) => (
                    <option key={i} value={item._id}>{item.name}</option>
                ))}
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor='file-input'>
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt=""/>
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' accept="image/*" hidden/>
            </div>
            </div>
        <button className='p-2 bg-sky-300 m-8' onClick={()=>{Edit_Product()}}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditProduct1