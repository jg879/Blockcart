import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import './pagesCss/AddProduct.css'
import './pagesCss/Login.css'
import { useNavigate} from "react-router-dom"

// Components
import Vendornavbar from '../components/vendorNavbar.js'

import db from '../firebase.js'
import { get, ref, set } from 'firebase/database'


const AddProduct = () => {

    const navigate = useNavigate();
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [rating, setRating] = useState(1)
    const [stock, setStock] = useState(0)
    const [description, setDescription] = useState('')
    const [login, setLogin] = useState(null);

    const user = localStorage.getItem('user')

    const handleSubmit = async (event) => {

        event.preventDefault();

        const idRef = ref(db, "formData/id");

        let id;
        await get(idRef).then((snapshot) => {
            if (snapshot.val() != null) {
                id = snapshot.val() + 1;
            }
            else{
                id = 1;
            }
        }).catch((error) =>{
            console.log(error);
            id = 1;
        })


        const data = {
            "id": id,
            "name": name,
            "category": category,
            "image": image,
            "price": price,
            "rating": 5,
            "stock": stock,
            "vendorID": user,
            "description": description
        }
        const Ref = ref(db, "formData");
        await set(Ref, data);
        navigate("/listProduct");
    }

    const checkLogin = async () => {
        let vendors = [];
        const Ref = ref(db, "vendors");
        await get(Ref).then((snapshot) => {
            if (snapshot.exists()) {
                vendors = snapshot.val();
            }
        }).catch((error) => {
            console.log(error);
        })
        let flag = 0;
        for (var i in vendors) {
            if (user == i) {
                flag = 1;
            }
        }
        if (flag == 0) {
            navigate("/login");
        }
        setLogin(1);
    }

    useEffect(() => {
        checkLogin();
    });

    return (
        <>
            {login && (
                <>
                <Vendornavbar></Vendornavbar>
                {/* <form>
                    <label>Category:
                        <input type="text" onChange={(e) => {
                            setCategory(e.target.value)
                        }}/>
                    </label>
                    <label>Image:
                        <input type="text" onChange={(e) => {
                            setImage(e.target.value)
                        }}/>
                    </label>
                    <label>Name:
                        <input type="text" onChange={(e) => {
                            setName(e.target.value)
                        }}/>
                    </label>
                    <label>Price:
                        <input type="text" onChange={(e) => {
                            setPrice(e.target.value)
                        }}/>
                    </label>
                    <label>Rating:
                        <input type="number" onChange={(e) => {
                            setRating(e.target.value)
                        }}/>
                    </label>
                    <label>Stock:
                        <input type="number" onChange={(e) => {
                            setStock(e.target.value)
                        }}/>
                    </label>
                </form>
                <button onClick={handleSubmit}>Submit</button> */}

                <div className="container">
                    <h2>Add Product</h2>
                    <hr style={{"marginBottom": "30px"}}></hr>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name" className="form-group">
                            <Form.Label className="form-label">Product Name:</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required className="form-control" />
                        </Form.Group>
                        <Form.Group controlId="category" className="form-group">
                            <Form.Label className="form-label">Category:</Form.Label>
                            <Form.Control type="text" value={category} onChange={(e) => setCategory(e.target.value)} required className="form-control" />
                        </Form.Group>
                        <Form.Group controlId="price" className="form-group">
                            <Form.Label className="form-label">Price:</Form.Label>
                            <Form.Control type="text" value={price} onChange={(e) => setPrice(e.target.value)} required className="form-control" />
                        </Form.Group>
                        <Form.Group controlId="stock" className="form-group">
                            <Form.Label className="form-label">Quantity:</Form.Label>
                            <Form.Control type="number" value={stock} onChange={(e) => setStock(e.target.value)} required className="form-control" />
                        </Form.Group>
                        {/* <Form.Group controlId="id" className="form-group">
                            <Form.Label className="form-label">ID:</Form.Label>
                            <Form.Control type="text" value={id} onChange={(e) => setId(e.target.value)} required className="form-control" />
                        </Form.Group> */}
                        <Form.Group controlId="image" className="form-group">
                            <Form.Label className="form-label">Image:</Form.Label>
                            <Form.Control type="text" value={image} onChange={(e) => setImage(e.target.value)} required className="form-control" />
                        </Form.Group>
                        <Form.Group controlId="image" className="form-group">
                            <Form.Label className="form-label">Description:</Form.Label>
                            <Form.Control type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} required className="form-control" />
                        </Form.Group>
                        <Button variant="primary" className="submit-button" type='submit'>Add Product</Button>
                    </Form>
                </div>
                </>

            )}
        </>
    );
}

export default AddProduct;