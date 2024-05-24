import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { ethers } from 'ethers';

// Components
import Navigation from '../components/Navigation'
import Section from '../components/Section'


import db from '../firebase.js'
import { get, ref } from 'firebase/database'

const Home = () => {
  const navigate = useNavigate();

  const [account, setAccount] = useState(null)
  const [electronics, setElectronics] = useState(null)
  const [clothing, setClothing] = useState(null)
  const [toys, setToys] = useState(null)

  const [login, setLogin] = useState(null);

  const user = localStorage.getItem('user')

  const BlockChainData = async () => {

    let AllItems = [];

    const Ref = ref(db, "items");
    await get(Ref).then((snapshot) => {
      if (snapshot.exists()) {
        AllItems = snapshot.val();
      }
    }).catch((error) => {
      console.log(error);
    })

    let items = []
    for (var i in AllItems) {
      items.push(AllItems[i]);
    }

    const electronics = items.filter((item) => item.category === 'electronics')
    const clothing = items.filter((item) => item.category === 'clothing')
    const toys = items.filter((item) => item.category === 'toys')
    setElectronics(electronics)
    setClothing(clothing)
    setToys(toys)
  }

  const checkLogin = async () => {
    let users = [];
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
      }
    }
    if (flag == 0) {
      navigate("/login");
    }
    setLogin(1);
  }

  useEffect(() => {
    checkLogin();
    BlockChainData();
  }, [])

  return (
    <>
      {login && (
        <>
          <Navigation account={account} setAccount={setAccount}></Navigation>
          {
            <>
              <h2>Welcome to Blockcart</h2>
              {electronics && clothing && toys && (
                <>
                  <Section title={"Clothing & Jewelry"} items={clothing} />
                  <Section title={"Electronics & Gadgets"} items={electronics} />
                  <Section title={"Toys & Gaming"} items={toys} />
                </>
              )}

            </>
          }
        </>
      )}
    </>
  );
}

export default Home;