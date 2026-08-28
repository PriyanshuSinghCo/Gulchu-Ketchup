import React, { useState } from 'react';
import { useCart, parsePrice } from '../../context/CartContext';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  sendToWhatsApp,
  formatOrderWhatsAppMessage,
} from '../../utils/whatsapp';

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
      const subtotal = cartTotal;
      const tax = subtotal * 0.18;
      const shipping = 0;
      const total = subtotal + tax + shipping;
      const orderId = `ORD-${Date.now()}`;

      const orderItems = items.map(item => ({ ...item, price: parsePrice(item.price) }));

      const orderData = {
        customer: formData,
        items: orderItems,
        total,
        orderId,
        orderDate: new Date().toISOString()
      };

      const waMessage = formatOrderWhatsAppMessage({
        orderId,
        customer: formData,
        items: orderItems,
        subtotal,
        tax,
        shipping,
        total,
      });

      sendToWhatsApp(waMessage);

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
      <div className="flex w-full min-h-[70vh] items-center justify-center bg-[#faf7f2] px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md text-center">
          <div className="mb-4 text-5xl" aria-hidden>🛒</div>
          <h2 className="hero-headline text-2xl text-[#1a1210] sm:text-3xl">Your cart is empty</h2>
          <p className="hero-copy mt-2 text-[#1a1210]/65">Add some products to checkout!</p>
          <Link
            to="/product"
            className="hero-copy mt-6 inline-flex min-h-12 items-center justify-center bg-[#c62828] px-6 py-3 text-sm font-bold text-white hover:bg-[#9b1c1c]"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  if (orderPlaced && placedOrder) {
    return (
      <div className="flex w-full min-h-[70vh] items-center justify-center bg-[#faf7f2] px-4 py-12">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md border border-[#1a1210]/10 bg-white p-6 text-center sm:p-8">
          <div className="mb-4 text-5xl" aria-hidden>✅</div>
          <h2 className="hero-headline text-2xl text-[#1a1210]">Order Placed Successfully!</h2>
          <p className="hero-copy mt-2 text-[#1a1210]/65">Thank you for your order, {placedOrder.customer.firstName}!</p>

          <div className="mb-4 mt-5 text-left">
            <h3 className="hero-copy mb-2 font-bold text-[#1a1210]">Order Summary:</h3>
            {placedOrder.items.map((item, index) => (
              <div key={index} className="hero-copy mb-1 flex justify-between text-sm text-[#1a1210]/70">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="hero-copy mt-2 flex justify-between border-t border-[#1a1210]/10 pt-2 font-bold text-[#1a1210]">
              <span>Total:</span>
              <span>₹{placedOrder.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="hero-copy text-sm text-[#1a1210]/50">Redirecting to home page...</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full min-w-0 bg-[#faf7f2] py-8 md:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-center sm:mb-8">
          <h1 className="hero-headline text-2xl text-[#1a1210] sm:text-3xl md:text-4xl">Checkout</h1>
          <p className="hero-copy mt-1 text-sm text-[#1a1210]/60 sm:text-base">Complete your order</p>
        </motion.div>

        <div className="grid w-full gap-5 lg:grid-cols-3 lg:gap-8">
          {/* Checkout Form */}
          <div className="w-full min-w-0 lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        className="w-full overflow-hidden border border-[#1a1210]/10 bg-white">
              <div className="border-b border-[#1a1210]/8 px-4 py-4 sm:px-6">
                <h2 className="hero-copy text-lg font-bold text-[#1a1210] sm:text-xl">Shipping Information</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 p-4 sm:p-6">
                {/* Personal Information */}
                <div>
                  <h3 className="hero-copy mb-3 text-base font-bold text-[#1a1210]">Personal Information</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {['firstName','lastName','email','phone'].map(field => (
                      <div key={field} className="min-w-0">
                        <label className="hero-copy mb-2 block text-sm font-medium text-[#1a1210]/70">{field.charAt(0).toUpperCase()+field.slice(1)} *</label>
                        <input type={field==='email'?'email':field==='phone'?'tel':'text'} name={field} value={formData[field]} onChange={handleInputChange}
                               className={`hero-copy w-full border px-3 py-3 text-sm outline-none focus:border-[#c62828] ${errors[field]?'border-red-500':'border-[#1a1210]/15'} bg-[#faf7f2]`}
                               placeholder={`Enter ${field}`} />
                        {errors[field] && <p className="mt-1 text-sm text-red-500">{errors[field]}</p>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="hero-copy mb-3 text-base font-bold text-[#1a1210]">Shipping Address</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="hero-copy mb-2 block text-sm font-medium text-[#1a1210]/70">Address *</label>
                      <textarea name="address" value={formData.address} onChange={handleInputChange} rows="3"
                                className={`hero-copy w-full border px-3 py-3 text-sm outline-none focus:border-[#c62828] ${errors.address?'border-red-500':'border-[#1a1210]/15'} bg-[#faf7f2]`}
                                placeholder="Enter your full address"/>
                      {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      {['city','state','pincode'].map(field => (
                        <div key={field} className="min-w-0">
                          <label className="hero-copy mb-2 block text-sm font-medium text-[#1a1210]/70">{field.charAt(0).toUpperCase()+field.slice(1)} *</label>
                          <input type="text" name={field} value={formData[field]} onChange={handleInputChange}
                                 className={`hero-copy w-full border px-3 py-3 text-sm outline-none focus:border-[#c62828] ${errors[field]?'border-red-500':'border-[#1a1210]/15'} bg-[#faf7f2]`}
                                 placeholder={`Enter ${field}`}/>
                          {errors[field] && <p className="mt-1 text-sm text-red-500">{errors[field]}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="hero-copy mb-3 text-base font-bold text-[#1a1210]">Payment Method</h3>
                  <div className="space-y-3">
                    {['cod','online'].map(method => (
                      <label key={method} className="flex min-h-11 cursor-pointer items-center gap-3">
                        <input type="radio" name="paymentMethod" value={method} checked={formData.paymentMethod===method} onChange={handleInputChange}
                               className="text-[#c62828] focus:ring-[#c62828]"/>
                        <span className="hero-copy text-sm text-[#1a1210]">{method==='cod'?'Cash on Delivery (COD)':'Online Payment (Coming Soon)'}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full min-w-0 lg:col-span-1">
            <div className="w-full border border-[#1a1210]/10 bg-white p-4 sm:p-6 lg:sticky lg:top-24">
              <h2 className="hero-copy text-lg font-bold text-[#1a1210] sm:text-xl">Order Summary</h2>

              <div className="mb-5 mt-4 space-y-3">
                {items.map(item => (
                  <div key={item.id} className="flex min-w-0 items-center gap-3">
                    <img src={item.image} alt={item.name} className="h-12 w-12 shrink-0 object-contain bg-[#f3eee8]"/>
                    <div className="min-w-0 flex-1">
                      <h4 className="hero-copy truncate text-sm font-bold text-[#1a1210]">{item.name}</h4>
                      <p className="hero-copy text-xs text-[#1a1210]/55">Qty: {item.quantity}</p>
                    </div>
                    <p className="hero-copy shrink-0 text-sm font-bold text-[#1a1210]">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="mb-5 space-y-3 border-t border-[#1a1210]/10 pt-4">
                <div className="hero-copy flex justify-between text-sm text-[#1a1210]/70"><span>Subtotal ({cartItemCount} items)</span><span>₹{subtotal.toFixed(2)}</span></div>
                <div className="hero-copy flex justify-between text-sm text-[#1a1210]/70"><span>Shipping</span><span className="font-semibold text-green-700">Free</span></div>
                <div className="hero-copy flex justify-between text-sm text-[#1a1210]/70"><span>Tax (18%)</span><span>₹{tax.toFixed(2)}</span></div>
                <div className="hero-copy flex justify-between border-t border-[#1a1210]/10 pt-3 text-lg font-bold text-[#1a1210]"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
              </div>

              <button type="button" onClick={handleSubmit} disabled={isProcessing}
                      className={`hero-copy flex min-h-12 w-full items-center justify-center text-sm font-bold text-white transition ${isProcessing?'cursor-not-allowed bg-gray-400':'bg-[#c62828] hover:bg-[#9b1c1c]'}`}>
                {isProcessing ? <span className="flex items-center justify-center gap-2"><svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Opening WhatsApp...</span> : 'Place Order on WhatsApp'}
              </button>

              <Link to="/cart" className="hero-copy mt-3 flex min-h-12 w-full items-center justify-center border border-[#1a1210]/15 bg-[#f3eee8] text-sm font-bold text-[#1a1210] hover:border-[#c62828]">
                Back to Cart
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
