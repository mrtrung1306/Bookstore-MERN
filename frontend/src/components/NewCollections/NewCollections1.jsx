import React,{useEffect,useState} from 'react'
import './NewCollections.css'
// import new_collection from '../Assets/new_collections'
import Item from '../Item/Item1'
import axios from 'axios'

const NewCollections1 = () => {
  const [books, setBooks] = useState([]);
    useEffect(() => {
        axios
        .get("http://127.0.0.1:3000/api/v1/books/")
        .then((response) => {
            const randomBooks = response.data.data.sort(() => 0.5 - Math.random()).slice(0, 5);
            setBooks(randomBooks);
        })
        .catch((error) => {
            console.log(error);
        })
    },[]);
  return (
    <div className='new-collections'>
        <h1>SÁCH MỚI</h1>
        <hr />
        <div className="collections">
            {books.map((item,i) =>{
                return <Item key={i} id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default NewCollections1