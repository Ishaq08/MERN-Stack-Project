import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

//import PayPalButton from './PayPalButton'; // Assuming PayPalButton.jsx is in the same directory

// Sample cart data (from previous context)

const cart = {
  products: [
    {
      name: 'Stylish Jacket',
      size: 'M',

      color: 'Black',

      price: 120, // Use number for calculations

      image: 'https://picsum.photos/150?random=1',
    },

    {
      name: 'Casual Sneakers',

      size: '42',

      color: 'White',

      price: 75, // Use number for calculations

      image: 'https://picsum.photos/150?random=2',
    },
  ],

  totalPrice: 195, // Use number for calculations
};

const CheckoutPaypal = () => {
  const navigate = useNavigate();

  // State for checkout ID (used to conditionally display the PayPal button)

  const [checkoutId, setCheckoutId] = useState(null);

  // Shipping address state

  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',

    lastName: '',

    address: '',

    city: '',

    postalCode: '',

    country: '',

    phone: '',
  });

  // 1. Generic handler for updating shipping address fields

  const handleShippingChange = (e) => {
    const { name, value } = e.target;

    setShippingAddress((prevAddress) => ({
      ...prevAddress,

      [name]: value,
    }));
  };

  // 2. Handler when the user submits the Shipping Form

  const handleCreateCheckout = (e) => {
    e.preventDefault();

    setCheckoutId(123);
  };

  // 3. Handler for successful PayPal payment

  const handlePaymentSuccess = (details) => {
    console.log('Payment Successful!', details);

    // After success, navigate to the order confirmation page

    navigate('/order-confirmation');
  };

  // 4. Handler for PayPal errors

  const handlePaymentError = (err) => {
    console.error('Payment failed:', err);

    alert('Payment failed. Try again.');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section: Checkout Form */}

      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>

        <form onSubmit={handleCreateCheckout}>
          {/* Contact Details (Email) - Reconstructed from previous step */}

          <h3 className="text-lg mb-4">Contact Details</h3>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>

            <input
              type="email"
              value="user@example.com"
              className="w-full p-2 border rounded"
              readOnly // Assuming this is pre-filled/read-only
            />
          </div>

          {/* Delivery/Shipping Address Form (Reconstructed from previous step) */}

          <h3 className="text-lg mb-4">Delivery</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700">First Name</label>

              <input
                type="text"
                name="firstName"
                value={shippingAddress.firstName}
                onChange={handleShippingChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Last Name</label>

              <input
                type="text"
                name="lastName"
                value={shippingAddress.lastName}
                onChange={handleShippingChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>

            <input
              type="text"
              name="address"
              value={shippingAddress.address}
              onChange={handleShippingChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700">City</label>

              <input
                type="text"
                name="city"
                value={shippingAddress.city}
                onChange={handleShippingChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Postal Code</label>

              <input
                type="text"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleShippingChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Country</label>

            <input
              type="text"
              name="country"
              value={shippingAddress.country}
              onChange={handleShippingChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>

            <input
              type="tel"
              name="phone"
              value={shippingAddress.phone}
              onChange={handleShippingChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Payment Section (Conditional rendering based on checkoutId) */}

          <div className="mt-6">
            {/* If checkoutId is set, show PayPal button. Otherwise, show "Continue to Payment" button */}

            {checkoutId ? (
              <div>
                <h3 className="text-lg mb-4">Pay with Paypal</h3>

                <PayPalButton
                  amount={100}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                Continue to Payment
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Right Section: Order Summary (lines 195-231) */}

      <div className="bg-gray-50 rounded-lg p-6 h-fit sticky top-10">
        <h3 className="text-lg mb-4">Order Summary</h3>

        {/* Product List */}

        <div className="border-t py-4 mb-4">
          {cart.products.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-2 border-b"
            >
              {/* Product Details Left */}

              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4"
                />

                <div>
                  <h3 className="text-md">{product.name}</h3>

                  <p className="text-gray-500 text-sm">Size: {product.size}</p>

                  <p className="text-gray-500 text-sm">
                    Color: {product.color}
                  </p>
                </div>
              </div>

              {/* Product Price Right */}

              <p className="text-xl">${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* Subtotal */}

        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>

          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>

        {/* Shipping */}

        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>

          <p>Free</p>
        </div>

        {/* Total */}

        <div className="flex justify-between items-center text-lg border-t mt-4 pt-4">
          <p className="font-bold">Total</p>

          <p className="font-bold">${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPaypal; // PayPalButton.jsx
