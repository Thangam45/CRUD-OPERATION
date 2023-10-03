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
  const [, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();  
  const [rowCategories, setRowCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/products').then((res) => {
      setColumns(Object.keys(res.data[0]));
      setRecords(res.data); 
      setRowCategories(new Array(res.data.length).fill(''));
    });
  }, []);

  return (
    <div className="container mt-5">
      <div className='text-end '><Link to="/create"  className='btn btn-primary top-3' >Add New Products +</Link></div>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>ProductName</th>
            <th>Price</th>
            <th>OldPrice</th>
            <th>category</th>
            <th>Description</th>
            <th>Action</th>
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
                  value={rowCategories[i]}
                  onChange={(e) => handleCategoryChange(i, e.target.value)}>
                  {Object.values(categoryNames).map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </td>
              <td>{d.description}</td>          
              <td>
                <Link to={`/update/${d.id}`} className='btn btn-sm btn-success'>Update</Link>
                <button onClick={() => handleSubmit(d.id)} to="/Delete" className='btn btn-sm ms-1 btn-danger'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function handleCategoryChange(index, category) {
    const updatedCategories = [...rowCategories];
    updatedCategories[index] = category;
    setRowCategories(updatedCategories);
  }

  

  function handleSubmit(id) {
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
