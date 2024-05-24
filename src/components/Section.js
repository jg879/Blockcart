import { useNavigate } from 'react-router-dom';

// Components
import Rating from './Rating'

const Section = ({ title, items}) => {
    let navigate = useNavigate();
    const routeChange = (path) =>{
        navigate(path)
    }
    return (
        <div className='cards__section'>
            <h3 id={title}>{title}</h3>

            <hr />

            <div className='cards'>
                {items.map((item, index) => (
                    <div className='card' key={index} onClick={() => routeChange('/productPage/' + item.id)}>
                        <div className='card__image'>
                            <img src={item.image} alt="Item" />
                        </div>
                        <div className='card__info'>
                            <h4>{item.name}</h4>
                            <Rating value={item.rating} />
                            <p>{item.price} ETH</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Section;