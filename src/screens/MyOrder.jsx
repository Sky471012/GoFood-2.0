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
        <div>

          <Navbar />


          <div className="container myorder-container">
              <div className="row">
              {orderData && orderData.order_data ? (
                  <>
                  <div className='text-center mb-2'>
                    <h1 className='fw-bold' style={{color: "white"}}>Orders you made till now</h1>
                  </div>
                  {orderData.order_data.slice(0).reverse().map((order, index) => {
                    const orderDate = order[0]?.Order_date || "Invalid Date";
                    const items = order.slice(1); // all except the first element
      
                    return (
                      <div key={index} className="mb-4">
                        <h5 className="mt-5 m-3 fw-bold" style={{color: "#e58f00"}}>{orderDate}</h5>
                        <hr />
                        <div className="row">
                          {items.length > 0 ? (
                            items.map((item, itemIndex) => (
                              <div className="col-12 col-md-6 col-lg-3" key={itemIndex}>
                                <div className="card ">
                                  <img src={item.img} className="card-img-top" alt={item.name} style={{ height: "120px", objectFit: "cover" }}/>
                                  <div className="card-body">
                                    <div className="d-flex justify-content-left">
                                      <h5 className="card-title fs-5 fw-bold fst-italic">
                                        {item.name}
                                      </h5>
                                    </div>
                                    <div className="card-container flex w=100">
                                      <span className="d-flex ms-1 fs-6">
                                        Quntity : <span className='fw-bold ms-1'>{item.qty}</span>
                                      </span>
                                      <span className="d-flex ms-1 fs-6">
                                        Size : <span className='fw-bold ms-1'>{item.size}</span>
                                      </span>
                                      <span className="d-flex ms-1 fs-6" style={{color: "#e58f00"}}>
                                        Total Price : <span className='fw-bold ms-1'>₹{item.price}/-</span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <h2 className="text-danger">Invalid item data</h2>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
              <h2 className='m-5 text-center' style={{height:"70vh"}}>No orders till now!</h2>
              )}

            </div>
          </div>


          <Footer />
        </div>
    )
}