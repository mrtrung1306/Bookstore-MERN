import React from 'react'
import './Admin.css'
import Slidebar from '../../components/admin/Sidebar/Sidebar1'
import {Routes,Route} from 'react-router-dom'
import AddProduct from '../../components/admin/AddProduct/AddProduct1'
import ListProduct from '../../components/admin/ListProduct/ListProduct1'
import EditProduct from '../../components/admin/EditProduct/EditProduct1'
import DeleteProduct from '../../components/admin/DeleteProduct/DeleteProduct1'

import AddCategory from '../../components/admin/AddCategory/AddCategory1'
import ListCategory from '../../components/admin/ListCategory/ListCategory1'
import EditCategory from '../../components/admin/EditCategory/EditCategory1'
import DeleteCategory from '../../components/admin/DeleteCategory/DeleteCategory1'

import AddAuthor from '../../components/admin/AddAuthor/AddAuthor1'
import ListAuthor from '../../components/admin/ListAuthor/ListAuthor1'
import EditAuthor from '../../components/admin/EditAuthor/EditAuthor1'
import DeleteAuthor from '../../components/admin/DeleteAuthor/DeleteAuthor1'

import AddUser from '../../components/admin/AddUser/AddUser1'
import ListUser from '../../components/admin/ListUser/ListUser1'
import EditUser from '../../components/admin/EditUser/EditUser1'
import DeleteUser from '../../components/admin/DeleteUser/DeleteUser1'

import ListBill from '../../components/admin/ListBill/ListBill1'
const Admin = () => {
  return (
    <div className='admin'>
      <Slidebar/>
      <Routes>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/editproduct/:id' element={<EditProduct/>}/>
        <Route path='/deleteproduct/:id' element={<DeleteProduct/>}/>
        <Route path='/listproduct' element={<ListProduct/>}/>

        <Route path='/addcategory' element={<AddCategory/>}/>
        <Route path='/editcategory/:id' element={<EditCategory/>}/>
        <Route path='/deletecategory/:id' element={<DeleteCategory/>}/>
        <Route path='/listcategory' element={<ListCategory/>}/>

        <Route path='/addauthor' element={<AddAuthor/>}/>
        <Route path='/editauthor/:id' element={<EditAuthor/>}/>
        <Route path='/deleteauthor/:id' element={<DeleteAuthor/>}/>
        <Route path='/listauthor' element={<ListAuthor/>}/>

        <Route path='/adduser' element={<AddUser/>}/>
        <Route path='/edituser/:id' element={<EditUser/>}/>
        <Route path='/deleteuser/:id' element={<DeleteUser/>}/>
        <Route path='/listuser' element={<ListUser/>}/>

        <Route path='/listbill' element={<ListBill/>}/>
      </Routes>
    </div>
  )
}

export default Admin