import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from '../components/Navigation'
import Product from '../components/Product'
import BlockcartABI from '../abis/Blockcart.json'

import db from '../firebase.js'
import { get, ref } from 'firebase/database'
import { useParams, useNavigate } from 'react-router-dom'

const ProductPage = () => {
    let IdFromURL = useParams();
    const navigate = useNavigate();

    const [account, setAccount] = useState(null)
    const [provider, setProvider] = useState(null)
    const [blockcart, setBlockcart] = useState(null)
    const [ThisItem, setThisItem] = useState(null)

    const [login, setLogin] = useState(null);

    const user = localStorage.getItem('user')


    const BlockChainData = async () => {

        const ItemId = IdFromURL.id;
        let ContractAddress;

        const Ref = ref(db, "items/" + ItemId);
        await get(Ref).then((snapshot) => {
            if (snapshot.exists()) {
                ContractAddress = snapshot.val().contract;
            }
        }).catch((error) => {
            console.log(error);
        })

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(provider)
        const network = await provider.getNetwork()

        const blockcart = new ethers.Contract(ContractAddress, BlockcartABI, provider)
        // 0x3305989A7AfC5E96Ee0A37E7957E2b64c7bDe6BB
        setBlockcart(blockcart)
        const ThisItem = await blockcart.items(parseInt(ItemId, 10))
        setThisItem(ThisItem);
        // console.log(ThisItem);
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
                <div>
                    <Navigation account={account} setAccount={setAccount}></Navigation>
                    {ThisItem && (<Product item={ThisItem} provider={provider} account={account} blockcart={blockcart} user={user}></Product>)}

                </div>
            )}
        </>
    );
}

export default ProductPage;