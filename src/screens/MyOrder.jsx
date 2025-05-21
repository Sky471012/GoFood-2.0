import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/myOrderData`, {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            console.log("Response:", response);
            await setorderData(response)
        })

    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div className='mt-4'>
            <div>
                <Navbar />
            </div>

            <div className="container">
                <div className="row">
                {orderData && orderData.order_data ? (
                    <>
                    <div className='text-center mb-4'>
                      <h1>Orders you made till now</h1>
                    </div>
                    {orderData.order_data.slice(0).reverse().map((order, index) => {
                      const orderDate = order[0]?.Order_date || "Invalid Date";
                      const items = order.slice(1); // all except the first element
        
                      return (
                        <div key={index} className="mb-4">
                          <h5 className="text-center">{orderDate}</h5>
                          <hr />
                          <div className="row">
                            {items.length > 0 ? (
                              items.map((item, itemIndex) => (
                                <div className="col-12 col-md-6 col-lg-3" key={itemIndex}>
                                  <div
                                    className="card mt-3 custom-hover-shadow"
                                    style={{ width: "16rem", maxHeight: "360px" }}
                                  >
                                    <img
                                      src={item.img}
                                      className="card-img-top"
                                      alt={item.name}
                                      style={{ height: "120px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                      <div className="d-flex justify-content-center mb-1">
                                        <h5 className="card-title fs-5 fw-bold text-white fst-italic">
                                          {item.name}
                                        </h5>
                                      </div>
                                      <div className="container flex justify-content-center w=100">
                                        <span className="d-flex ms-1 h-100 w-100 fs-6">
                                          Quntity : <span className='fw-bold ms-1'>{item.qty}</span>
                                        </span>
                                        <span className="d-flex ms-1 h-100 w-100 fs-6">
                                          Size : <span className='fw-bold ms-1'>{item.size}</span>
                                        </span>
                                        <span className="d-flex ms-1 h-100 w-100 fs-6">
                                          Total Price : <span className='fw-bold ms-1'>₹{item.price}/-</span>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-danger">Invalid item data</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                <div className='d-flex align-items-center justify-content-center fw-bold fs-2' style={{height:"425px"}}>No orders till now!</div>
                )}

                </div>
            </div>


            <Footer />
        </div>
    )
}
// {"orderData":{"_id":"63024fd2be92d0469bd9e31a","email":"mohanDas@gmail.com","order_data":[[[{"id":"62ff20fbaed6a15f800125e9","name":"Chicken Fried Rice","qty":"4","size":"half","price":520},{"id":"62ff20fbaed6a15f800125ea","name":"Veg Fried Rice","qty":"4","size":"half","price":440}],"2022-08-21T15:31:30.239Z"],[[{"id":"62ff20fbaed6a15f800125f4","name":"Mix Veg Pizza","qty":"4","size":"medium","price":800},{"id":"62ff20fbaed6a15f800125f3","name":"Chicken Doub;e Cheeze Pizza","qty":"4","size":"regular","price":480}],"2022-08-21T15:32:38.861Z"]],"__v":0}}