const OrderCard = ({ orders, handleReturn }) => {
    return (
        <>
            <div className="col-md-12-orders">
                {orders.map((order, index) => (
                    <div className="card-orders">
                        <div className="card-body">
                            <div className="card-text-main">
                                <div className="col-md-3-orders">
                                    <img src={order.image} className="order-img" alt="Product Image"></img>
                                </div>
                                <div>
                                    <div className="row">
                                        <div className="col-md-3-orders">
                                            <h6 className="card-subtitle mb-2 text-muted">{order.title}</h6>
                                        </div>
                                        <div className="col-md-2-orders">
                                            <p className="card-text"><b>Quantity:</b><br></br>{order.quantity}</p>
                                        </div>
                                        <div className="col-md-2-orders">
                                            <p className="card-text"><b>Price:</b><br></br> {order.price} ETH</p>
                                        </div>
                                        <div className="col-md-2-orders">
                                            <p className="card-text" style={{ "paddingLeft": "13px" }}><b>Purchased on:</b><br></br>{order.date}</p>
                                        </div>
                                        {order.request == "Return" ? (
                                            <>
                                                {order.returnstatus == "Approved" ? (
                                                    <div className="col-md-2-orders">
                                                        <p className="card-text" style={{ "paddingLeft": "13px" }}><b>Status:</b><br></br>Return Approved</p>
                                                    </div>
                                                ) : (
                                                    <div className="col-md-2-orders">
                                                        <p className="card-text" style={{ "paddingLeft": "13px" }}><b>Status:</b><br></br>Return Applied</p>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="col-md-2-orders">
                                                <p className="card-text" style={{ "paddingLeft": "13px" }}><b>Status:</b><br></br>{order.status}</p>
                                            </div>
                                        )}
                                    </div>
                                    {order.status == "Delivered" && order.request != "Return" && (
                                        <>
                                            <div className="row" style={{ position: "relative", top: "45px", left: "700px" }}>
                                                <div className="col-md-2-orders">
                                                    <button className="returnBtn" onClick={() => handleReturn(index)}>Return</button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default OrderCard;