import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import category_icon from '../../Assets/category.svg'
import list_product_icon from '../../Assets/Product_list_icon.svg'
import author_icon from '../../Assets/author.svg'
import user_icon from '../../Assets/user.svg'
import bill_icon from '../../Assets/bill.svg'

const Slidebar1 = () => {
  return (
    <div className='sidebar'>
        <Link to={'/admin/listproduct'} style={{textDecoration:"none"}}>
          <div className='sidebar-item'>
            <img src={list_product_icon} alt=""/>
            <p>Book List</p>
          </div>
        </Link>
        <Link to={'/admin/listcategory'} style={{textDecoration:"none"}}>
          <div className='sidebar-item'>
            <img src={category_icon} alt="" style={{width:"34px"}}/>
            <p>Category List</p>
          </div>
        </Link>
        <Link to={'/admin/listauthor'} style={{textDecoration:"none"}}>
          <div className='sidebar-item'>
            <img src={author_icon} alt="" style={{width:"34px"}}/>
            <p>Author List</p>
          </div>
        </Link>
        <Link to={'/admin/listuser'} style={{textDecoration:"none"}}>
          <div className='sidebar-item'>
            <img src={user_icon} alt="" style={{width:"34px"}}/>
            <p>User List</p>
          </div>
        </Link>
        <Link to={'/admin/listbill'} style={{textDecoration:"none"}}>
          <div className='sidebar-item'>
            <img src={bill_icon} alt="" style={{width:"34px"}}/>
            <p>Bill List</p>
          </div>
        </Link>
    </div>
  )
}

export default Slidebar1