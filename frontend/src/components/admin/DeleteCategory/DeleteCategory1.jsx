import React, { useState } from 'react';
import BackButton from '../../Support/BackButton'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteCategory1 = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const handleDeleteBook = () => {
    setLoading(true);
    axios
        .delete(`http://localhost:3000/api/v1/categories/${id}`)
        .then(() => {
        setLoading(false);
        enqueueSnackbar('Xóa thể loại sách thành công', { variant: 'success' });
        navigate('/admin/Listcategory');
        })
        .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Lỗi', { variant: 'error' });
        console.log(error);
        });
    };
    return (
    <div className='p-4'>
        <BackButton destination='/admin/Listcategory'/>
        <h1 className='text-3xl my-4'>Xóa thể loại sách</h1>
        {loading ? (
          <>...Loading</>
        ) :(
        <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
            <h3 className='text-2xl'>Có chắc bạn muốn xóa thể loại sách này không?</h3>

            <button
            className='p-4 bg-red-600 text-white m-8 w-full'
            onClick={handleDeleteBook}
            >
            Vâng,tôi muốn xóa nó!
            </button>
        </div>
        )}
    </div>
  )
}

export default DeleteCategory1