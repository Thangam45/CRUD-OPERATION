import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';

const categoryNames = {
  Vegetables: 'Vegetables',
  'Fruits & Nuts': 'Fruits & Nuts',
  'Dairy & creams': 'Dairy & Creams',
  'Packages Food': 'Packages Food',
  Staples: 'Staples',
};

function App() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const navigate =useNavigate()
  const [newProduct, setNewProduct] = useState({
    productName: '',
    price: 0,
    oldPrice: 0,
    category: 'Vegetables',
    isActive: false,
    description: '',
  });

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then(res => {
        setColumns(Object.keys(res.data[0]));
        setRecords(res.data);
      })
  }, [])

  return (
    <div className="container mt 5">
      <div className='text-end'><Link to="/create"  className='btn btn-primary'>Add +</Link></div>
      <table className="table">
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i} className="custom-header">{c}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {records.map((d, i) => (
            <tr key={i} className="custom-row">
              <td>{d.id}</td>
              <td>{d.productName}</td>
              <td>{d.price}</td>
              <td>{d.oldPrice}</td>
              <td>
              <select
  value={newProduct.categoryNames}
  onChange={(e) => setNewProduct({ ...newProduct, categoryNames: e.target.value })}>
  <option value="Vegetables">Vegetables</option>
  <option value="Fruits & Nuts">Fruits & Nuts</option>
  <option value="Dairy & Creams">Dairy & Creams</option>
  <option value="Packages Food">Packages Food</option>
  <option value="Staples">Staples</option>
             </select>
            </td>
            
              <td>{d.description}</td>
             
             
              <td>
                <Link to={`/update/${d.id}`} className='btn btn-sm btn-success'>Update</Link>
                <button onClick={e=> handleSubmit(d.id)} to="/Delete" className='btn btn-sm ms-1 btn-danger'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  function handleSubmit(id){
     const conf= window.confirm("Do You Want Delete")
     if(conf)
     {
      axios.delete('http://localhost:3000/products/'+id)
      .then(res =>{
        alert("Record has Deleted")
        navigate('/')
      }).catch(err => console.log(err));
     }
  }
}


export default App;
