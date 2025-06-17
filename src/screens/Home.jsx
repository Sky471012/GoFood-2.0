import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Hero from '../components/Hero';

export default function Home() {

  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async ()=>{
    let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/foodData`,{
      method : "POST",
      headers : {
        'Content-Type' : 'application/json'
      }
    });

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(()=>{
    loadData();
  }, [])

  return (
    <div>
      <Navbar/>
      <Hero/>
      
      <div className="search-box d-flex justify-content-center mt-5">
        <div className="search">
          <i className="bi bi-search ms-1"></i>
          <input className="form-control ms-1" type="search" placeholder="Search here......." aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
        </div>
      </div>


      {/* Cards-starts */}
      <div className="container flex">
      {
        foodCat.length > 0 ? (
          foodCat.map((data) => {
            return (
              <div key={data._id} className='row mb-3 mt-3 align-items-center'>
                <h1 className='mt-5 fw-bold' style={{color: "#e58f00"}}>
                  {data.CategoryName}
                </h1>
                <hr />
                {
                  foodItem.length > 0 ? (
                    foodItem
                      .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                      .map((filterItems) => (
                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                            <Card foodItems={filterItems} 
                                  options={filterItems.options}
                            />
                        </div>
                      ))
                  ) : (
                    <h2 className='m-5 text-center'> No food item!</h2>
                  )
                }
              </div>
            );
          })
        ) : (
          <h2 className='m-5 text-center'>No Food Category!</h2>
        )
      }

      
      
      </div>
      {/* Cards-ends */}

      <Footer/>
    </div>
  )
}
