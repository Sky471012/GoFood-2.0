import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

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
      
      {/* Carousel-starts */}
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit: "contain !important"}}>
            <div className="carousel-inner ">
                <div className="carousel-caption" style={{zIndex:"10"}}>
                    <div className="d-flex justify-content-center">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                    </div>
                </div>
                <div className="carousel-item active">
                    <img src="/burger.jpg" className="d-block w-100" style={{filter: "brightness(50%)", height:"100%", objectFit: "cover"}} alt="Burger" />
                </div>
                <div className="carousel-item">
                    <img src="/pizza.jpg" className="d-block w-100" style={{filter: "brightness(50%)", height:"100%", objectFit: "cover"}} alt="Pizza" />
                </div>
                <div className="carousel-item">
                    <img src="/momos.jpg" className="d-block w-100" style={{filter: "brightness(50%)", height:"100%", objectFit: "cover"}} alt="Momos" />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
      {/* Carousel-ends */}


      {/* Cards-starts */}
      <div className="container">
      {
        foodCat.length > 0 ? (
          foodCat.map((data) => {
            return (
              <div key={data._id} className='row mb-3'>
                <div className='fs-3 m-3 fw-bold'>
                  {data.CategoryName}
                </div>
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
                    <div>No food item</div>
                  )
                }
              </div>
            );
          })
        ) : (
          <div>No Food Category</div>
        )
      }

      
      
      </div>
      {/* Cards-ends */}

      <Footer/>
    </div>
  )
}
