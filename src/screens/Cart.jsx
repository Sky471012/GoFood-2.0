import React from 'react'
import { useDispatchCart, useCart } from "../components/ContextReducer";
import Delete from '@mui/icons-material/Delete';


export default function Cart() {

    let dispatch = useDispatchCart();
    let data = useCart();
    if(data.length === 0){
        return(
            <div className="m-5 d-flex justify-content-center fs-3">
                The Cart is empty.
            </div>
        )
    }

    const handleCheckout = async() => {
      let userEmail = localStorage.getItem("userEmail");

      if (!userEmail) {
        alert("User email not found. Please log in again.");
        return;
      }
      
      let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orderData`,{
        method: 'POST',
        headers: {
          'content-Type':'application/json'
        },
        body:JSON.stringify({
          order_data:data,
          email:userEmail,
          order_date:new Date().toDateString()
        })
      }
      );
      if(response.status===200){
        dispatch({type:"DROP"})
      }
    }
    
    let totalPrice = data.reduce((total, food) => total + food.price, 0)

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive-sm table-responsive-md'>
        <table className='table table-hover '>
          <thead className='fs-5'>
            <tr>
              <th className='text-success' scope='col ' >#</th>
              <th className='text-success' scope='col' >Name</th>
              <th className='text-success' scope='col' >Quantity</th>
              <th className='text-success' scope='col' >Option</th>
              <th className='text-success' scope='col' >Amount</th>
              <th className='text-success' scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row' className='text-white' >{index + 1}</th>
                <td className='text-white' >{food.name}</td>
                <td className='text-white' >{food.qty}</td>
                <td className='text-white' >{food.size}</td>
                <td className='text-white' >{food.price}</td>
                <td className='text-white' ><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className='check-out-div d-flex justify-content-between align-items-center'>
          <h1 className="fs-2 m-3">Total Price: ₹ {totalPrice}/-</h1>
          <button className='btn bg-success fw-bold m-3' onClick={handleCheckout}>Check Out</button>
        </div>
      </div>
    </div>
  )
}
