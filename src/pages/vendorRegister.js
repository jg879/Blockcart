import React, { useEffect, useState } from 'react';
import './pagesCss/Login.css';
import email_icon from '../assets/email.jpg';
import password_icon from '../assets/password.jpg';
import { useNavigate } from 'react-router-dom';

import db from '../firebase.js'
import { get, ref, update } from 'firebase/database'


export const VendorRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [error, setError] = useState('');
    let user = '';
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password != cpassword) {
            setError('Passwords do not match. Please try again.');
        }
        else {
            const Ref = ref(db, "vendors");
            let vendors = [];
            await get(Ref).then((snapshot) => {
                if (snapshot.exists()) {
                    vendors = snapshot.val();
                }
            }).catch((error) => {
                console.log(error);
            })

            let flag = 0;
            for(var i in vendors){
                if(i == email){
                    setError('Username already exists. Please try again.');
                    flag = 1;
                    break;
                }
            }
            if(flag == 0){
                var vendorObject = {}
                vendorObject[email] = password
                update(Ref, vendorObject);
                navigate("/login");
            }

        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                {error && <div className="alert alert-warning" role="alert" style={{ "marginTop": "1rem" }}>
                    {error}
                </div>}
                <div className="header">
                    <div className="text">Vendor Register</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <img src={email_icon} alt="" />
                        <input
                            type="text"
                            name="Email"
                            placeholder="Id"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input
                            type="password"
                            name="Password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input
                            type="password"
                            name="Password"
                            placeholder="Confirm Password"
                            onChange={(e) => setCPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className='Register'>
                    <p className='alreadyUser'>Already a Vendor? </p>
                    <a href='/login' className='RegisterIcon'>Login</a>
                </div>
                <div className="submit-container">
                    <button className='submit' type='submit'>Submit</button>
                </div>
            </div>
        </form>
    );
};

export default VendorRegister;
