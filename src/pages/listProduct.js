import React from 'react';
import { useState, useEffect } from 'react'
import Vendornavbar from '../components/vendorNavbar.js';
import Vendorcard from '../components/vendorCard.js'
import { useNavigate} from "react-router-dom"

import db from '../firebase.js'
import { get, ref} from 'firebase/database'

const ListProducts = () => {
    const [items, setItems] = useState(null)
    const user = localStorage.getItem('user')
    const navigate = useNavigate();
    const [login, setLogin] = useState(null);
    const getDatabase = async () => {
        let AllItems = [];

        const Ref = ref(db, "items");

        await get(Ref).then((snapshot) => {
            if (snapshot.val() != null) {
                AllItems = snapshot.val();
            }

        }).catch((error) => {
            console.log(error);
        })

        let Items = [];
        for (var i in AllItems) {
            if(AllItems[i].vendorID == user){
                Items.push(AllItems[i]);
            }
        }
        setItems(Items);
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
        getDatabase();
        console.log(items);
    }, []);

    if(items == null){
        return (<>
        {login && (<>
            <Vendornavbar></Vendornavbar>
            <h1 style={{ marginLeft: "630px", marginTop: "10px" }}>No Products Yet</h1>
            </>
        )}
        </>)
    }

    return (
        <>
            {login && (
                <>
                <Vendornavbar></Vendornavbar>
                {items.length == 0 && (<h1 style={{ marginLeft: "630px", marginTop: "10px" }}>No Products Yet</h1>)}
                
                {items.length != 0 && (
                    <>
                    <h1 style={{ marginLeft: "190px" }}>Product List</h1>
                    <div className='cards__section'>
                        <hr />
                    <Vendorcard items={items}></Vendorcard>
                    </div>
                    </>
                )}
                </>
            )}
        </>
    );
};

export default ListProducts;