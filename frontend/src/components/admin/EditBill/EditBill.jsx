import React from 'react'

const EditBill = () => {
  return (
    <div className='p-4'>
      <BackButton destination='/admin/Listauthor' />
        <h1 className='text-3xl my-4'>Sửa thông tin đơn hàng</h1>
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <div className="addproduct-itemfield">
                <p className='text-xl mr-4 text-gray-500'>Thể loại</p>
                <select value={category}  onChange={(e) => setcategory(e.target.value)} name="category" className='add-product-selector'>
                    <option key={i} value={item._id}>{item.name}</option>
                </select>
            </div>
        <button className='p-2 bg-sky-300 m-8' onClick={()=>{Edit_Author()}}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBill