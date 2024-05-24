import { useNavigate} from "react-router-dom"
const Vendorcard = ({items}) => {
    const navigate = useNavigate();
    return (
        <div className='cards'>
            {items.map((item) => (
                <div className='card' key={item.id} onClick={() => {
                    navigate("/productStatus/" + item.id);                    
                }}>
                    <div className='card__image'>
                        <img src={item.image} alt="Item" />
                    </div>
                    <div className='card__info'>
                        <p style={{"fontSize":"18px"}}>{item.name}</p>
                        <p style={{"marginBottom":"5px"}}>{item.price} ETH</p>
                        <div>
                            <p>Quantity: {item.stock}</p>
                        </div>
                        <div>
                            <p>PID: {item.id}</p>
                        </div>
                        <div id="contractAddress" style={{"display": "none"}}>
                            <p>{item.contract}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Vendorcard;