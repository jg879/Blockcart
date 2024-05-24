import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import './pagesCss/myOrders.css'
import Navigation from '../components/Navigation';
import OrderCard from '../components/orderCard.js';

import db from '../firebase.js'
import { get, ref, set } from 'firebase/database'

const MyOrders = () => {

    const navigate = useNavigate();

    const [account, setAccount] = useState(null)
    const [ordersdata, setOrdersdata] = useState(null);

    const [login, setLogin] = useState(null);

    const user = localStorage.getItem("user");

    const checkLogin = async () => {
        let users = [];
        let orders = [];
        let items = [];
        const Ref = ref(db, "user");
        await get(Ref).then((snapshot) => {
            if (snapshot.exists()) {
                users = snapshot.val();
            }
        }).catch((error) => {
            console.log(error);
        })
        let flag = 0;
        for (var i in users) {
            if (user == i) {
                flag = 1;
                orders = users[i].orders;
                let tempOrderData = [];
                for(var j in orders){
                    let orderObject = {};
                    let pid = orders[j].pid;

                    let itemRef = ref(db, "items/" + pid);
                    let itemData = [];
                    await get(itemRef).then((snapshot) => {
                        if (snapshot.exists()) {
                            itemData = snapshot.val();
                        }
                    }).catch((error) => {
                        console.log(error);
                    })

                    orderObject["title"] = itemData.name;
                    orderObject["image"] = itemData.image;
                    orderObject["date"] = orders[j].date;
                    orderObject["quantity"] = orders[j].quantity;
                    var price = parseFloat(itemData.price, 10) * parseInt(orders[j].quantity);
                    orderObject["price"] = price.toString();
                    orderObject["status"] = orders[j].status;
                    orderObject["oid"] = j;
                    orderObject["request"] = orders[j].request;
                    orderObject["returnstatus"] = orders[j].returnstatus;

                    tempOrderData.push(orderObject);
                }
                tempOrderData.reverse();
                setOrdersdata(tempOrderData);
            }
        }
        if (flag == 0) {
            navigate("/login");
        }
        setLogin(1);
    }

    const handleReturn = async (index) => {
        const Ref = ref(db, "user/" + user + "/orders/" + ordersdata[index].oid + "/request");
        await set(Ref, "Return");
        alert("Applied for Return");
        window.location.reload();
      };

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <>
            {login && (
                <>
                <Navigation account={account} setAccount={setAccount}></Navigation>
                {ordersdata.length != 0 && (<h5 className="card-title" style={{ "marginLeft": "200px", "marginTop":"20px" }}>My Orders</h5>)}
                <div className="containerOrders mt-7">
                    <div className="row">
                        {ordersdata && (<><OrderCard orders={ordersdata} handleReturn={handleReturn}/></>)}
                        {ordersdata.length == 0 && (<><h1 style={{"position": "relative", "right": "436px", "minWidth": "200px"}}>NO ORDERS</h1></>)}
                    </div>
                </div>
                </>
            )}
        </>
    );

}

export default MyOrders;