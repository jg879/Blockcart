const hre = require("hardhat")

const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");

var firebaseConfig = {
  //Your Firebase Account
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const { ref, update, get } = require("firebase/database")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  const [deployer] = await ethers.getSigners();

  const Blockcart = await hre.ethers.getContractFactory("Blockcart")
  const blockcart = await Blockcart.deploy()
  await blockcart.deployed()

  console.log(`Deployed at: ${blockcart.address}\n`)


  let fetchedData = {};


  const formRef = ref(db, "formData")
  await get(formRef).then((snapshot) => {
    if(snapshot.exists()){
      fetchedData = snapshot.val();
    }
  }).catch((error) => {
    console.log(error);
  })


  const transaction = await blockcart.connect(deployer).list(
    fetchedData.id,
    fetchedData.name,
    fetchedData.category,
    fetchedData.image,
    tokens(fetchedData.price),
    fetchedData.rating,
    fetchedData.stock,
    fetchedData.description
  )
  await transaction.wait()
  let data = {};
  data[fetchedData.id] = {
    "id": fetchedData.id,
    "name": fetchedData.name,
    "category": fetchedData.category,
    "image": fetchedData.image,
    "price": fetchedData.price,
    "contract": blockcart.address,
    "rating": fetchedData.rating,
    "stock": fetchedData.stock,
    "vendorID": fetchedData.vendorID,
    "description": fetchedData.description
  }

  const Ref = ref(db, "items");
  await update(Ref, data);

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
