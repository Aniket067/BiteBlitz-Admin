import React, { useEffect, useState } from 'react'
import './Order.css'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { assets } from '../../../../frontend/src/assets/assets';
const Order = ({ url }) => {

  const [order, setOrder] = useState([]);
  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list")
    if (response.data.success) {
      setOrder(response.data.data)
      console.log(response.data.data)

    }
    else {
      toast.error("Error fetching orders.")
    }
  }
  useEffect(() => {
    fetchAllOrders()
  }, [])
  return (
    <div className='order-add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {order.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {/* check */}
                {order.items.map((item, index) => {
                  if (index == order.items.length - 1) {
                    return item.name + " X " + item.quantity

                  }
                  else {
                    return item.name + " X " + item.quantity + " , "
                  }
                })}
                {/* fetching Daata of order and detsils */}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">

                <p >{order.address.street + ","}</p>
                <p >{order.address.city + "," + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p className='order-item-address'>
                {order.address.phone}
              </p>

            </div>
            <p>Items:{order.items.length}</p>
            <p>₹{order.amount}</p>
            <select>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order