import { useState, useEffect } from 'react'
// Components
import Navigation from '../components/Navigation.js'
import '../style.css'


const CheckProduct = () => {
  const [account, setAccount] = useState(null)

  return (
    <div>
      <Navigation account={account} setAccount={setAccount}></Navigation>
      <h2 class="add">Welcome to Product Checker</h2>
      <div class="container">
        <div class="matrix">
          <table width="100%">
            <tr width="100%">
              <td width="15%" align="center">
                <label for="manufacturerID">Product Category</label>
              </td>
              <td width="30%">
                <select name="" id="" class="form-control">
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="toys">Toys</option>
                </select>
              </td>
            </tr>

            <tr width="100%">
              <td width="15%" align="center">
                <label for="productSN">Product SN:</label>
              </td>
              <td width="30%">
                <input class="form-control" id="productSN" name="productSN" type="text" />
              </td>
            </tr>


            <tr width="100%">
              <td width="15%" align="center">
                <label for="productPrice">Upload QRCode</label>
              </td>
              <td width="30%">
                <input class="form-control" id="qrCode" name="qrCode" type="file" />
              </td>
            </tr>
          </table>
        </div>
        <div class="clear">&nbsp;</div>
        <div align="center">
          <button type="submit" class="btn btn-warning btn-register" id="register" onclick="fetchQR()">Check Product</button>
        </div>
        <br></br>
      </div>
    </div>
  );
}

export default CheckProduct;