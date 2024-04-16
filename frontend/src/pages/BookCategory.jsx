import React,{useContext,useEffect,useState} from 'react'
import './CSS/BookCategory.css'
// import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../components/Assets/dropdown_icon.png'
import Item from '../components/Item/Item1'
import axios from 'axios'

const BookCategory = (props) => {
  // const {all_product} = useContext(ShopContext);
  
  const [books, setBooks] = useState([]);
    useEffect(() => {
      axios
      .get("http://127.0.0.1:3000/api/v1/books/")
      .then((response) => {
          setBooks(response.data.data);
          console.log(response.data.data);
      })
      .catch((error) => {
          console.log(error);
      })
  },[]);
  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt ="" />
        </div>
      </div>
       <div className="shopcategory-products">
          {books.map((item,i) => {
            if(props.category === item.category.name){
              return <Item key={i} id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            }
            else{
              return null;
            }
          })}
        </div>
        <div className="shopcategory-loadmore"> 
          Explore More
        </div>
    </div>
  )
}

export default BookCategory