import React,{useContext,useEffect,useState} from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadscrum1 from '../components/Breadscrum/Breadscrum1';
import axios from 'axios'
import ProductDisplay1 from '../components/ProductDisplay/ProductDisplay1';
import DescriptionBox1 from '../components/DescriptionBox/DescriptionBox1';
import RelatedProducts1 from '../components/RelatedProducts/RelatedProducts1';


const Book = () => {
  const {books} = useContext(ShopContext);
  // const [books, setBooks] = useState([]);
  // const [loading, setLoading] = useState(true);
  const {productId} = useParams();
 
  // useEffect(() => {
  //     axios
  //     .get("http://127.0.0.1:3000/api/v1/books/")
  //     .then((response) => {
  //         setBooks(response.data.data);
  //         setLoading(false);
  //         console.log(response.data.data); 
  //     })
  //     .catch((error) => {
  //         console.log(error);
  //         setLoading(false);
  //     })
  // },[]);
  // if (loading) {
  //   return <div>Loading...</div>; // Hiển thị một thông báo hoặc spinner trong quá trình tải dữ liệu
  // }
  const product = books.find((e) => e._id === productId);
  return (
    <div>
      <Breadscrum1 product={product}/>
      <ProductDisplay1 product={product}/>
      <DescriptionBox1 product={product}/>
      <RelatedProducts1 product={product}/>
    </div>
  )
}

export default Book
