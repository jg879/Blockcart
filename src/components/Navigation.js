import { ethers } from 'ethers';
import { useNavigate } from "react-router-dom";

const Navigation = ({ account, setAccount}) => {
    const navigate = useNavigate();
    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account);
    }
    const logOut = () => {
        localStorage.removeItem("user");
        navigate("/login");
    }
    return (
        <nav>
            <div className='nav__brand'>
                <a href='/' style={{ "textDecoration": "none" }}><h1>Blockcart</h1></a>
            </div>
            <input type='text' className='nav__search'></input>
            <div className='buttonanduser'>

                {account ? (
                    <button
                        type="button"
                        className='nav__connect'
                    >
                        {account.slice(0, 6) + '...' + account.slice(38, 42)}
                    </button>
                ) : (
                    <button
                        type="button"
                        className='nav__connect'
                        onClick={connectHandler}
                    >
                        Connect
                    </button>
                )}
                <button type="button" className="nav__connect" onClick={logOut}>Logout</button>
            </div>

            <ul className='nav__links'>
                <li><a href="#Clothing & Jewelry">Clothing & Jewelry</a></li>
                <li><a href="#Electronics & Gadgets">Electronics & Gadgets</a></li>
                <li><a href="#Toys & Gaming">Toys & Gaming</a></li>
                <li><a href="/orders">My Orders</a></li>
            </ul>
        </nav>
    );
}

export default Navigation;