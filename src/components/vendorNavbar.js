import { useNavigate } from "react-router-dom";

const Vendornavbar = () => {
    const navigate = useNavigate();
    const connectHandler = () => {
        localStorage.removeItem("user");
        navigate("/login");
    }
    return (
        <nav>
            <div className='nav__brand'>
                <a href='/listProduct' style={{ "textDecoration": "none" }}><h1>Blockcart</h1></a>
            </div>
            <input type='text' className='nav__search'></input>
            <button type="button" className='nav__connect' onClick={connectHandler}> Logout </button>
            <ul className='nav__links'>
                <li><a href="/listProduct">Your Products</a></li>
                <li><a href="/addProduct">Add Product</a></li>
                <li><a href="/updateStock">Update Stock</a></li>
                <li><a href="/allOrders">All Orders</a></li>
            </ul>
        </nav>
    );
}

export default Vendornavbar;