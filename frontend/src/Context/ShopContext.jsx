import React,{createContext,useEffect,useState} from 'react'
// import all_product from "../components/Assets/all_product"
import axios from 'axios'

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  // const contextValue = {all_product}
  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      axios
      .get("http://127.0.0.1:3000/api/v1/books/")
      .then((response) => {
          setBooks(response.data.data);
          setLoading(false);
          console.log(response.data.data); 
      })
      .catch((error) => {
          console.log(error);
          setLoading(false);
      })
  },[]);
  

  if (loading) {
    return <div>Loading...</div>; // Hiển thị một thông báo hoặc spinner trong quá trình tải dữ liệu
  }
  const contextValue = {books}




  return (
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;
