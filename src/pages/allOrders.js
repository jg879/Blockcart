import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import Vendornavbar from '../components/vendorNavbar.js'
import './pagesCss/productStatus.css';

import db from '../firebase.js'
import { get, ref, set } from 'firebase/database'

const AllOrders = () => {
    const navigate = useNavigate();

    const [login, setLogin] = useState(null);
    const user = localStorage.getItem('user');

    const [orders, setOrders] = useState([]);
    const [orderStatus, setOrderStatus] = useState(null);


    const getRecords = async () => {
        const Ref = ref(db, "user");
        const ItemRef = ref(db, "items");
        let allItems = [];

        await get(ItemRef).then((snapshot) => {
            allItems = snapshot.val();
        });
        let users = [];
        let records = [];
        await get(Ref).then((snapshot) => {
            if (snapshot.val() != null) {
                users = snapshot.val();
            }

        }).catch((error) => {
            console.log(error);
        })
        for (var i in users) {
            for (var j in users[i].orders) {
                if(allItems[users[i].orders[j].pid].vendorID == user){
                    let singleRecord = {};
                    singleRecord["uid"] = i;
                    singleRecord["date"] = users[i].orders[j].date;
                    singleRecord["pname"] = allItems[users[i].orders[j].pid].name;
                    singleRecord["status"] = users[i].orders[j].status;
                    singleRecord["oid"] = users[i].orders[j].oid;
                    singleRecord["request"] = users[i].orders[j].request;
                    singleRecord["returnstatus"] = users[i].orders[j].returnstatus;
                    records.push(singleRecord);
                }
            }
        }
        records = records.reverse();
        setOrders(records);
    }
    const handleSubmit = async (index) => {
        const Ref = ref(db, "user/" + orders[index].uid + "/orders/" + orders[index].oid + "/status");
        await set(Ref, orders[index].status);
        alert("Status Updated Successfully");
    };
    const handleReturn = async (index) => {
        const Ref = ref(db, "user/" + orders[index].uid + "/orders/" + orders[index].oid + "/returnstatus");
        await set(Ref, "Approved");
        alert("Return Approved Successfully");
        window.location.reload();
    };

    const handleChangeStatus = (index, event) => {
        const { value } = event.target;
        setOrders(prevOrders => {
            const updatedOrders = [...prevOrders];
            updatedOrders[index].status = value;
            return updatedOrders;
        });
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
        getRecords();
    }, []);

    return (
        <>
            {login && (
                <>
                    <Vendornavbar></Vendornavbar>
                    <div className='status-container'>
                        <h3 className='prodName' style={{marginBottom: "10px"}}><b>All Orders</b></h3>
                        <table className='status-table'>
                            <thead>
                                <tr>
                                    <th>Serial No.</th>
                                    <th>User ID</th>
                                    <th>Product</th>
                                    <th>Date of Purchase</th>
                                    <th>Status</th>
                                    <th>Submit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={order.id}>
                                        <td>{index + 1}</td>
                                        <td>{order.uid}</td>
                                        <td>{order.pname}</td>
                                        <td>{order.date}</td>
                                        {order.request == "Return" ? (
                                            <>
                                            <td>Request for Return</td>
                                            {order.returnstatus == "Approved" ? (
                                                <>
                                                    <td>Approved</td>
                                                </>
                                            ):(
                                                <>
                                                    <td><button onClick={() => handleReturn(index)}>Approve</button></td>
                                                </>
                                            )}
                                            </>
                                        ) : (
                                            <>
                                                <td>
                                                    <select value={order.status} onChange={e => { handleChangeStatus(index, e); setOrderStatus(e.target.value) }}>
                                                        <option value="Confirmed">Confirmed</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Out for Delivery">Out for Delivery</option>
                                                        <option value="Delivered">Delivered</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <button onClick={() => handleSubmit(index)}>Submit</button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </>
    );
};

export default AllOrders;
