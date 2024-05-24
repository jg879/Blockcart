
import HomePage from './pages/home'
import ProductPage from './pages/productPage'
import AddProduct from './pages/addProduct'
import Login from './pages/login'
import UserRegister from './pages/userRegister.js'
import VendorRegister from './pages/vendorRegister.js'
import ListProducts from './pages/listProduct';
import UpdateStock from './pages/updateStock';
import MyOrders from './pages/myOrders';
import ProductStatus from './pages/productStatus.js';
import AllOrders from './pages/allOrders.js'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>}></Route>
          <Route path="/productPage/:id" element={<ProductPage/>}></Route>
          <Route path="/addProduct" element={<AddProduct/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/userRegister" element={<UserRegister/>}></Route>
          <Route path="/vendorRegister" element={<VendorRegister/>}></Route>
          <Route path="/listProduct" element={<ListProducts/>}></Route>
          <Route path="/updateStock" element={<UpdateStock/>}></Route>
          <Route path="/orders" element={<MyOrders/>}></Route>
          <Route path="/productStatus/:id" element={<ProductStatus/>}></Route>
          <Route path="/allOrders" element={<AllOrders/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;


//0x3305989A7AfC5E96Ee0A37E7957E2b64c7bDe6BB