import React, {useState, useEffect, useRef} from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart()
  let options = props.options;
  let priceOptions = Object.keys(options ? options[0] : {});
  let foodItems = props.foodItems;
  
  const priceRef = useRef();
  const [qty, setQty] =useState(1);
  const [size, setSize] =useState("");

  const handleAddToCart = async () => {
    // Check if this food item already exists in cart
    let foodIndex = -1;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === foodItems._id && data[i].size === size) {
        foodIndex = i;
        break;
      }
    }
  
    // If item exists with same size, update quantity
    if (foodIndex !== -1) {
      await dispatch({ 
        type: "UPDATE", 
        id: foodItems._id, 
        price: finalPrice, 
        qty: qty
      });
    } else {
      // Item doesn't exist in cart or has different size, add as new
      await dispatch({
        type: "ADD", 
        id: foodItems._id, 
        name: foodItems.name, 
        price: finalPrice, 
        qty: qty, 
        size: size,
        img: foodItems.img
      });
    }
  }

  let finalPrice = qty*parseInt(options[0][size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  }, [])

  return (
    <div className="card m-3 custom-hover-shadow" style={{ width: "270px" }}>
      <img src={foodItems.img} className="card-img-top" style={{height:"250px", objectFit: "cover"}} alt="..." />
      <div className="card-body">
        <div className="d-flex justify-content-center mb-3"><span className="card-title fs-5 fw-bold text-white fst-italic">{props.foodItems.name}</span></div>
        {/* <p className="card-text">{foodItems.description}</p> */}
        <div className="container flex justify-content-center w=100">
          <div className="d-flex align-items-center gap-3">
            <span className="fs-6 ">Quantity:</span>
            <select className="m-2 h-100 bg-success rounded fw-bold" onChange={(e)=> setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}> {i + 1} </option>
                );
              })}
            </select>
          </div>

          <div className="d-flex align-items-center gap-3">
            <span className="fs-6 ">Size:</span>
            <select className="m-2 bg-success rounded fw-bold" ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
              {priceOptions.map((data)=>{
                return <option key={data} value={data}>{data}</option>
              })}
            </select>
          </div>

          <div className="d-flex justify-content-center h-100 w-100 fs-6 mt-3">Total Price: <span className=" fw-bold ms-2"> ₹{finalPrice}/- </span></div>
        </div>

        <hr />
        <div className="d-flex justify-content-center"><button className="btn bg-success mx-1 fw-bold text-white" onClick={handleAddToCart}>Add To cart</button></div>
        
      </div>
    </div>
  );
}
