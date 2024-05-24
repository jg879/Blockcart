import { ethers } from 'ethers'

// Components
import Rating from './Rating'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import db from '../firebase.js'
import { get, ref, update, set } from 'firebase/database'

const Product = ({ item, provider, account, blockcart, user }) => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null)
  const [hasBought, setHasBought] = useState(null)
  const [currentstock, setCurrentStock] = useState(0);

  const fetchDetails = async () => {
    const events = await blockcart.queryFilter("Buy")
    const orders = events.filter(
      (event) => event.args.buyer === account && event.args.itemId.toString() === item.id.toString()
    )
    const StockRef = ref(db, "items/" + item.id + "/stock");
    let prevStock = 1;
    await get(StockRef).then((snapshot) => {
      prevStock = parseInt(snapshot.val(), 10);
    })
    setCurrentStock(prevStock);
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
    if (month >= 1 || month <= 9) {
      month = "0" + month;
    }
    if (date >= 1 || date <= 9) {
      date = "0" + date;
    }
    let tdate = year + "-" + month + "-" + date;
    newOrder[newId] = {
      "date": tdate,
      "oid": parseInt(newId, 10),
      "pid": parseInt(item.id.toString(), 10),
      "quantity": 1,
      "status": "Confirmed"
    };

    const StockRef = ref(db, "items/" + item.id + "/stock");
    let prevStock = 1;
    await get(StockRef).then((snapshot) => {
      prevStock = parseInt(snapshot.val(), 10);
    })
    prevStock--;
    prevStock = prevStock.toString();
    await set(StockRef, prevStock)

    await update(Ref, newOrder);

  }


  useEffect(() => {
    fetchDetails();
  },[hasBought]) 

  return (
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

        {currentstock > 0 ? (
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
  );
}

export default Product;