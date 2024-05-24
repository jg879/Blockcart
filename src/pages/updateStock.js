import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './pagesCss/UpdateStock.css';
import Vendornavbar from '../components/vendorNavbar.js';
import { useNavigate } from "react-router-dom"

import db from '../firebase.js'
import { get, ref, set } from 'firebase/database'

const UpdateStock = () => {
    const navigate = useNavigate();
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [stock, setStock] = useState('');
    const user = localStorage.getItem('user');
    const [login, setLogin] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let id = productId;
        console.log(id);
        const Ref = ref(db, "items/" + id + "/stock");
        let prevStock = 0;
        await get(Ref).then((snapshot) => {
            prevStock = parseInt(snapshot.val(), 10);
        })
        prevStock += parseInt(stock, 10);
        await set(Ref, prevStock.toString());
        navigate("/listProduct")
    };

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
                <div className="update-stock-container">
                    <h2 style={{ "marginBottom": "10px" }}>Update Stock</h2>
                    <hr style={{ "marginBottom": "20px" }} />
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="productId" className="form-group">
                            <Form.Label className="form-label">Product ID:</Form.Label>
                            <Form.Control type="text" value={productId} onChange={(e) => setProductId(e.target.value)} required className="form-control" />
                        </Form.Group>
                        <Form.Group controlId="productName" className="form-group">
                            <Form.Label className="form-label">Product Name:</Form.Label>
                            <Form.Control type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required className="form-control" />
                        </Form.Group>
                        <Form.Group controlId="stock" className="form-group">
                            <Form.Label className="form-label">Stock:</Form.Label>
                            <Form.Control type="number" value={stock} onChange={(e) => setStock(e.target.value)} required className="form-control" placeholder='Enter quantity you want to add'/>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="submit-button">Update Stock</Button>
                    </Form>
                </div>
            </>
            )}
        </>
    );
}

export default UpdateStock;
