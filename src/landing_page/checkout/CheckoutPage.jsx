import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { items, cartItemCount, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const orderData = {
        customer: formData,
        items: items.map(item => ({ ...item, price: Number(item.price) })),
        total: cartTotal,
        orderId: `ORD-${Date.now()}`,
        orderDate: new Date().toISOString()
      };

      setPlacedOrder(orderData);
      setOrderPlaced(true);
      clearCart();

      setTimeout(() => {
        navigate('/');
      }, 5000);

    } catch (error) {
      console.error('Order failed:', error);
      alert('Order failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Calculate totals
  const subtotal = cartTotal;
  const tax = subtotal * 0.18;
  const shipping = 0;
  const total = subtotal + tax + shipping;

  if (cartItemCount === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to checkout!</p>
          <Link to="/product">
            <motion.button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                           whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Continue Shopping
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (orderPlaced && placedOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-4">Thank you for your order, {placedOrder.customer.firstName}!</p>

          <div className="text-left mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Order Summary:</h3>
            {placedOrder.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm mb-1">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t mt-2 pt-2 flex justify-between font-bold">
              <span>Total:</span>
              <span>₹{placedOrder.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="text-sm text-gray-500">Redirecting to home page...</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-15">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Shipping Information</h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {['firstName','lastName','email','phone'].map(field => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{field.charAt(0).toUpperCase()+field.slice(1)} *</label>
                        <input type={field==='email'?'email':field==='phone'?'tel':'text'} name={field} value={formData[field]} onChange={handleInputChange}
                               className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors[field]?'border-red-500':'border-gray-300'}`}
                               placeholder={`Enter ${field}`} />
                        {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Shipping Address</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                      <textarea name="address" value={formData.address} onChange={handleInputChange} rows="3"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.address?'border-red-500':'border-gray-300'}`}
                                placeholder="Enter your full address"/>
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      {['city','state','pincode'].map(field => (
                        <div key={field}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">{field.charAt(0).toUpperCase()+field.slice(1)} *</label>
                          <input type="text" name={field} value={formData[field]} onChange={handleInputChange}
                                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors[field]?'border-red-500':'border-gray-300'}`}
                                 placeholder={`Enter ${field}`}/>
                          {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Method</h3>
                  <div className="space-y-3">
                    {['cod','online'].map(method => (
                      <label key={method} className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="paymentMethod" value={method} checked={formData.paymentMethod===method} onChange={handleInputChange}
                               className="text-red-600 focus:ring-red-500"/>
                        <span className="text-gray-700">{method==='cod'?'Cash on Delivery (COD)':'Online Payment (Coming Soon)'}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-3 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-contain rounded-lg bg-gray-50"/>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-800 truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600"><span>Subtotal ({cartItemCount} items)</span><span>₹{subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-600"><span>Shipping</span><span className="text-green-600">Free</span></div>
                <div className="flex justify-between text-gray-600"><span>Tax (18%)</span><span>₹{tax.toFixed(2)}</span></div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-800"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
              </div>

              {/* Place Order Button */}
              <button onClick={handleSubmit} disabled={isProcessing}
                      className={`w-full py-3 rounded-lg font-semibold transition ${isProcessing?'bg-gray-400 cursor-not-allowed':'bg-red-600 hover:bg-red-700'} text-white`}>
                {isProcessing ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Processing...</span> : 'Place Order'}
              </button>

              {/* Back to Cart */}
              <Link to="/cart" className="block mt-3">
                <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">Back to Cart</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
