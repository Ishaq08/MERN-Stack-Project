import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductManagement = () => {
  // Mock list of products (based on screenshots)
  const [products, setProducts] = useState([
    {
      _id: '123123',
      name: 'Shirt',
      price: 110,
      sku: '123123213',
    }, //
   
  ]);

  // Handler for deleting a product
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete the Product?')) {
      //
      console.log(`Delete Product with id: ${id}`); //

      // **TODO:** Implement API call to delete the product here

      // Simulate state update
      setProducts(products.filter((product) => product._id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2> {/* */}
      {/* Product List Table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        {' '}
        {/* */}
        <table className="min-w-full text-left text-gray-500">
          {' '}
          {/* */}
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            {' '}
            {/* */}
            <tr>
              <th className="py-3 px-4">Name</th> {/* */}
              <th className="py-3 px-4">Price</th> {/* */}
              <th className="py-3 px-4">SKU</th> {/* */}
              <th className="py-3 px-4">Actions</th> {/* */}
            </tr>
          </thead>
          <tbody>
            {/* Conditional Rendering for products */}
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  {' '}
                  {/* */}
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>{' '}
                  {/* */}
                  <td className="p-4">${product.price}</td> {/* */}
                  <td className="p-4">{product.sku}</td> {/* */}
                  <td className="p-4">
                    {/* Edit Link */}
                    <Link
                      to={`/admin/products/${product._id}/edit`} //
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2" //
                    >
                      Edit
                    </Link>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(product._id)} //
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" //
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              // Case when no products are found
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  {' '}
                  {/* */}
                  No Products found. {/* */}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
