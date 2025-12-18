import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract order from state
  const order = location.state?.order;

  // Redirect if someone tries to access this page directly without an order
  useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You For Your Order!
      </h1>

      <div className="p-6 rounded-lg border">
        <div className="flex justify-between mb-10">
          <div>
            <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
            <p className="text-gray-600">Order Date: {order.orderDate}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold">Estimated Delivery:</h2>
            <p className="text-gray-600">5-7 Business Days</p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4 border-b pb-2">Order Summary</h3>
        {order.product.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 py-4 border-b"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-grow">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">
                Color: {item.color}, Size: {item.size}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">Qty: {item.quantity || 1}</p>
              <p className="font-bold">
                ${(item.price * (item.quantity || 1)).toLocaleString()}
              </p>
            </div>
          </div>
        ))}

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold text-lg">Shipping Address</h3>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.country}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">Total Paid: ${order.totalPrice}</p>
            <p className="text-sm text-gray-500">
              Method: {order.paymentMethod}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
