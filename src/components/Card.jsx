import React, {useState, useEffect, useRef} from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart()
  let options = props.options;
  let priceOptions = Object.keys(options ? options[0] : {});
  let foodItems = props.foodItems;
  
  const [qty, setQty] =useState("");
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

  let finalPrice = size ? qty * parseInt(options[0][size]) : 0;  

  return (
    <div className="card">
      <img src={foodItems.img} className="card-img-top" style={{height:"250px", objectFit: "cover"}} alt="..." />
      <div className="card-body">
        <div className="d-flex justify-content-left"><span className="card-title fs-5 fw-bold fst-italic">{props.foodItems.name}</span></div>
        <p className="card-text">{foodItems.description}</p>
        <div className="card-container flex w=100">
          <div className="flex align-items-center gap-3">
            <span className="fs-6 " style={{"color":"#e58f00"}}><b>Quantity:</b></span>
            <div className="text-white d-flex flex-wrap">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i + 1} className="form-check me-3">
                  <input
                    className="form-check-input custom-checkbox"
                    type="checkbox"
                    name="quantity"
                    value={i + 1}
                    id={`qty${i + 1}`}
                    checked={parseInt(qty) === i + 1}
                    onChange={(e) => setQty(e.target.checked ? e.target.value : null)}
                  />
                  <label className="form-check-label" htmlFor={`qty${i + 1}`}>
                    {i + 1}
                  </label>
                </div>
              ))}
            </div>

          </div>

          <div className="flex align-items-center gap-3 mt-3">
            <span className="fs-6" style={{ color: "#e58f00" }}><b>Size:</b></span>
            
            <div className="d-flex flex-wrap gap-3">
              {priceOptions.map((data) => (
                <div key={data} className="form-check">
                  <input
                    className="form-check-input custom-checkbox"
                    type="checkbox"
                    id={`size-${data}`}
                    name="size"
                    value={data}
                    checked={size === data}
                    onChange={(e) =>
                      setSize(e.target.checked ? e.target.value : "")
                    }
                  />
                  <label className="form-check-label text-white" htmlFor={`size-${data}`}>
                    {data}
                  </label>
                </div>
              ))}
            </div>
          </div>


          <div className="d-flex justify-content-center h-100 w-100 fs-6 mt-3" >Total Price: <span className=" fw-bold ms-2" style={{"color":"#e58f00"}}> ₹{finalPrice}/- </span></div>
        </div>

        <hr />
        <div className="d-flex justify-content-center"><button className="btn mx-1 fw-bold" onClick={handleAddToCart}>Add to Cart</button></div>
        
      </div>
    </div>
  );
}
