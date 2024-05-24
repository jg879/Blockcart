import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './UpdateStock.css'; 
export const UpdateStock = () => {
  const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [stock, setStock] = useState('');
    const [additionalDetails, setAdditionalDetails] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        setProductId('');
        setProductName('');
        setStock('');
        setAdditionalDetails('');
    };

    return (
        <div className="update-stock-container">
            <h2>Update Stock</h2>
            <hr />
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
                    <Form.Control type="number" value={stock} onChange={(e) => setStock(e.target.value)} required className="form-control" />
                </Form.Group>
                <Form.Group controlId="additionalDetails" className="form-group">
                    <Form.Label className="form-label">Additional Details:</Form.Label>
                    <Form.Control as="textarea" rows={3} value={additionalDetails} onChange={(e) => setAdditionalDetails(e.target.value)} className="form-control" />
                </Form.Group>
                <Button variant="primary" type="submit" className="submit-button">Update Stock</Button>
            </Form>
        </div>
    );
}
