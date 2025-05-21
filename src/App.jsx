import './App.css'
import Home from './screens/Home'
import Login from './screens/Login';
import Signup from './screens/Signup';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-dark-5/dist/css/bootstrap-night.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { CartProvider } from "./components/ContextReducer";
import MyOrder from './screens/MyOrder';

function App() {

  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route exact path='/login' element={<Login/>} />
            <Route exact path='/signup' element={<Signup/>} />
            <Route exact path='/myOrder' element={<MyOrder/>} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
