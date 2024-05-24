import React, { useEffect, useState } from 'react';
import './pagesCss/Login.css';
import user_icon from '../assets/person.jpg';
import email_icon from '../assets/email.jpg';
import password_icon from '../assets/password.jpg';
import { useNavigate } from 'react-router-dom';

import db from '../firebase.js'
import { get, ref } from 'firebase/database'


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [action, setAction] = useState('Login');
  const [error, setError] = useState('');
  let user = '';
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const Ref = ref(db, "vendors");
    let vendors = [];
    await get(Ref).then((snapshot) => {
      if (snapshot.exists()) {
        vendors = snapshot.val();
      }
    }).catch((error) => {
      console.log(error);
    })

    for (var i in vendors) {
      if (email == i && password == vendors[i]) {
        user = email;
        localStorage.setItem('user', user);
        navigate('/listProduct');
      }
      else {
        setError('Invalid email or password. Please try again.');
      }
    }

    const Ref2 = ref(db, "user");
    let users = [];
    await get(Ref2).then((snapshot) => {
      if (snapshot.exists()) {
        users = snapshot.val();
      }
    }).catch((error) => {
      console.log(error);
    })
    for (var i in users) {
      if (email == i && users[i].password == password) {
        user = email;
        localStorage.setItem('user', user);
        navigate('/');
      }
      else {
        setError('Invalid email or password. Please try again.');
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
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === 'Login' ? null : (
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                name="Name"
                placeholder="Name"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

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
        </div>
        <div className='Register'>
          <a href='/userRegister' className='RegisterIcon'>Register as User</a>
          <a href='/vendorRegister' className='RegisterIcon'>Register as Vendor</a>

        </div>
        <div className="submit-container">
          <button className='submit' type='submit'>Submit</button>
        </div>
      </div>
    </form>
  );
};

export default Login;
