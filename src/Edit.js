import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Edit() {
    
    const{id}=useParams();
    const[data,setData] =useState([])
    const navigate =useNavigate()
    useEffect(()=>{
        axios.get('http://localhost:3000/products/'+id)
        .then(res=>setData(res.data))
        .catch(err =>console.log(err))
    },[id])

    function handleSubmit(event){
        event.preventDefault()
        axios.put('http://localhost:3000/products/'+id,data)
        .then(res =>{
            alert("Data updated Successfully")
            navigate('/')

        })
    }

  return (
    <div>
         <div className='d-flex w-100 h-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-light p-5'>
            <form onSubmit={handleSubmit}>
              <h1>Update Users</h1>
           <div>
             <label htmlFor='name'>ID:</label>
             <input type='text' value={data.id} disabled name='id' className='form-control' onChange={e =>setData({...data, productName: e.target.value})}/>
           </div>
           <div>
             <label htmlFor='productName'>productName</label>
             <input type='text' name='productName' value={data.productName} className='form-control' onChange={e =>setData({...data, productName: e.target.value})}/>
           </div>
           <div>
             <label htmlFor='price'>price</label>
             <input type='text' name='price'value={data.price} className='form-control' onChange={e =>setData({...data, price: e.target.value})}/>
           </div>
           <div>
             <label htmlFor='oldPrice'>oldPrice</label>
             <input type='text' name='oldPrice'  value={data.oldPrice} className='form-control' onChange={e =>setData({...data, oldPrice: e.target.value})}/>
           </div>
           {/* <div>
             <label htmlFor='category'>category</label>
             <input type='text' name='category' value={data.category} className='form-control'onChange={e =>setData({...data, productName: e.target.value})} />
           </div> */}
           <div>
             <label htmlFor='description'>	description</label>
             <input type='text' name='description' value={data.description} className='form-control'onChange={e =>setData({...data, description: e.target.value})} />
           </div><br />
           <button className='btn btn-info'>Update</button>
           </form>
        </div>
    </div>
    </div>
  )
}

export default Edit