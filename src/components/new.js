import { ethers } from 'ethers'

// Components
import Rating from './Rating'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import db from '../firebase.js'
import { get, ref, update } from 'firebase/database'

const New = ({ item, provider, account, blockcart, user }) => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null)
  const [hasBought, setHasBought] = useState(null)

  const fetchDetails = async () => {
    const events = await blockcart.queryFilter("Buy")
    const orders = events.filter(
      (event) => event.args.buyer === account && event.args.itemId.toString() === item.id.toString()
    )
    if (orders.length === 0) return

    const order = await blockcart.orders(account, orders[0].args.orderId)
    setOrder(order)
  }

  const buyHandler = async () => {
    const signer = await provider.getSigner()
    let transaction = await blockcart.connect(signer).buy(item.id, { value: item.cost })
    await transaction.wait()
    setHasBought(true)
    const prevBal = await provider.getBalance(blockcart.address)
    console.log(`Prev Balance: ${prevBal}\n`)
    let t2 = await blockcart.connect(signer).withdraw()
    await t2.wait()
    const afterBal = await provider.getBalance(blockcart.address)
    console.log(`After Balance: ${afterBal}\n`)
    await loadOrders();
    navigate("/orders");
  }

  const loadOrders = async () => {
    let orders = [];

    const Ref = ref(db, "user/" + user + "/orders");
    await get(Ref).then((snapshot) => {
      if (snapshot.exists()) {
        orders = snapshot.val();
      }
    }).catch((error) => {
      console.log(error);
    })
    var lastId = 10001;
    for (var i in orders) {
      lastId = i;
    }
    lastId = parseInt(lastId, 10) + 1;
    var newId = lastId.toString();
    let newOrder = {};

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    if(month >= 1 || month <= 9){
      month = "0" + month;
    }
    if(date >= 1 || date <= 9){
      date = "0" + date;
    }
    let tdate = year + "-" + month + "-" + date;
    newOrder[newId] = {
      "date" : tdate,
      "oid" : parseInt(newId, 10),
      "pid" : parseInt(item.id.toString(), 10),
      "quantity" : 1,
      "status": "Confirmed"
    };
    await update(Ref, newOrder);
  }


  useEffect(() => {
    fetchDetails();
  }, [hasBought])

  return (
    // <><h1>hello</h1></>
    // <div className="productabc">
      <div className="product__details">
        <div className="product__image">
          <img src={item.image} alt="Product" />
        </div>
        <div className="product__overview">
          <h1>{item.name}</h1>

          <Rating value={item.rating} />

          <hr />

          <p>{item.address}</p>

          <h2>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h2>

          <hr />

          <h2>Overview</h2>

          <p>
            {item.description}

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima rem, iusto,
            consectetur inventore quod soluta quos qui assumenda aperiam, eveniet doloribus
            commodi error modi eaque! Iure repudiandae temporibus ex? Optio!
          </p>
        </div>

        <div className="product__order">
          <h1>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h1>

          <p>
            FREE delivery <br />
            <strong>
              {new Date(Date.now() + 345600000).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </strong>
          </p>

          {item.stock > 0 ? (
            <>
              <p>In Stock.</p>
              <button className='product__buy' onClick={buyHandler}>
                Buy Now
              </button>
            </>
          ) : (
            <p>Out of Stock.</p>
          )}


          {order && (
            <div className='product__bought'>
              Item bought on <br />
              <strong>
                {new Date(Number(order.time.toString() + '000')).toLocaleDateString(
                  undefined,
                  {
                    weekday: 'long',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                  })}
              </strong>
            </div>
          )}


        </div>
      </div>
    // </div >
  );
}

export default New;