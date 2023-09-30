import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Add() {
    const [inputData,setInputdata] = useState({id:'',productName:'',price:'', oldprice:'', category:'', description:''})
    
    const navigat =useNavigate();

    function handleSubmit(event){
        event.preventDefault()

        axios.post('http://localhost:3000/products',inputData)
        .then(res =>{
            alert("Data Added Auccessfully");
            navigat('/');
        }).catch(err => console.log(err));
    }



  return (
    <div className='d-flex w-100 h-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-light p-5'>
            <form onSubmit={handleSubmit}>
           {/* <div>
             <label htmlFor='id'>id</label>
             <input type='text' name='id' className='form-control' onChange={e=>setInputdata({...inputData, name:e.target.value})}/>
           </div> */}
           <div>
             <label htmlFor='productName'>productName</label>
             <input type='text' name='productName' className='form-control' onChange={e=>setInputdata({...inputData, productName:e.target.value})}/>
           </div>
           <div>
             <label htmlFor='price'>price</label>
             <input type='text' name='price' className='form-control' onChange={e=>setInputdata({...inputData, price:e.target.value})}/>
           </div>
           <div>
             <label htmlFor='oldPrice'>oldPrice</label>
             <input type='text' name='oldPrice' className='form-control' onChange={e=>setInputdata({...inputData, oldPrice:e.target.value})}/>
           </div>
           <div>
             <label htmlFor='category'>category</label>
             <input type='text' name='category' className='form-control' onChange={e=>setInputdata({...inputData, category:e.target.value})}/>
           </div>
           <div>
             <label htmlFor='	description'>	description</label>
             <input type='text' name='	description' className='form-control' onChange={e=>setInputdata({...inputData, description:e.target.value})}/>
           </div><br />
           <button className='btn btn-info'>Submit</button>
           </form>
        </div>
    </div>
  )
}

export default Add;