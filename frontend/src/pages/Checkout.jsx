import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '', street: '', city: '', postalCode: '', country: ''
  });

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const saveOrder = async (paymentId) => {
    const orderItems = cartItems.map((item) => ({
      productID: item.productId,
      quantity: item.qty,
      price: item.price,
    }));
    const orderAddress = {
      fullName: address.fullName,
      addressLine1: address.street,
      city: address.city,
      postalCode: address.postalCode,
      state: address.country,
    };
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify({
        items: orderItems,
        totalAmount: totalPrice,
        address: orderAddress,
        paymentId
      })
    });
    return res;
  };

  const handlePayment = async () => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Failed to load Razorpay SDK. Check your connection.');
      return;
    }

    try {
      const orderRes = await fetch('/api/payments/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice })
      });
      const order = await orderRes.json();

      if (!orderRes.ok || !order.id) {
        alert(order.message || 'Failed to create payment order');
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Musicos',
        description: 'Order Payment',
        order_id: order.id,
        handler: (response) => {
          fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
          })
            .then((verifyRes) => {
              if (!verifyRes.ok) throw new Error('Payment verification failed');
              return saveOrder(response.razorpay_order_id);
            })
            .then((saveRes) => {
              if (saveRes.ok) {
                dispatch(clearCart());
                alert('Payment successful! Order placed.');
                navigate('/ordersuccess');
              } else {
                return saveRes.json().then((data) => {
                  dispatch(clearCart());
                  if (saveRes.status === 401) {
                    alert('Session expired. Please log in again.');
                    navigate('/login');
                  } else {
                    alert('Payment received but order saving failed: ' + (data.message || 'Unknown error') + '. Contact support.');
                    navigate('/ordersuccess');
                  }
                });
              }
            })
            .catch((err) => {
              console.error(err);
              dispatch(clearCart());
              alert('Payment was made but something went wrong. Contact support.');
              navigate('/ordersuccess');
            });
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || ''
        },
        theme: { color: '#10b981' },
        modal: {
          ondismiss: () => {
            alert('Payment cancelled.');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first");
      navigate('/login');
      return;
    }
    handlePayment();
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="shipping-form">
          <h3>Shipping Address</h3>
          <input type="text" placeholder="Full Name" required value={address.fullName} onChange={(e) => setAddress({...address, fullName: e.target.value})} />
          <input type="text" placeholder="Street" required value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} />
          <input type="text" placeholder="City" required value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} />
          <input type="text" placeholder="Postal Code" required value={address.postalCode} onChange={(e) => setAddress({...address, postalCode: e.target.value})} />
          <input type="text" placeholder="Country" required value={address.country} onChange={(e) => setAddress({...address, country: e.target.value})} />
          <div className="checkout-summary">
            <h4>Total to Pay: ₹{totalPrice.toFixed(2)}</h4>
            <button type="submit" className="btn">Pay Now</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
