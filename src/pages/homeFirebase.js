import { useState, useEffect } from 'react'

// Components
import Navigation from '../components/Navigation.js'
import Section2 from '../components/Section2.js';

// firebase
import db from '../firebase.js'
import { get, ref, set } from 'firebase/database'

const Home = () => {
    const [account, setAccount] = useState(null)
  const [items, setItems] = useState([]);
  
  useEffect(()=>{
      const Ref = ref(db, "items");
      get(Ref).then((snapshot) =>{
          if(snapshot.exists()){
              const datas = Object.entries(snapshot.val()).map(([id, data]) => ({
                  id,
                  ...data
              }));
              setItems(datas);
              
          }
      }).catch((error) => {
          console.log(error);
      })
  }, []);

  const electronics = items.filter((item) => item.category === 'electronics')
  const clothing = items.filter((item) => item.category === 'clothing')
  const toys = items.filter((item) => item.category === 'toys')

  return (
    <div>
      <Navigation account={account} setAccount={setAccount}></Navigation>
      <h2>Welcome to Blockcart</h2>
      {electronics && clothing && toys &&(
      <>
      <Section2 title={"Clothing & Jewellery"} items={clothing}></Section2>
      <Section2 title={"Electronics & Gadgets"} items={electronics}></Section2>
      <Section2 title={"Toys & Gaming"} items={toys}></Section2>
      </>
      )}
    </div>
  );
}

export default Home;