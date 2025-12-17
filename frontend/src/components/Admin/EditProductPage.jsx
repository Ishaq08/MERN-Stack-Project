import React, { useState } from 'react';
// import { useParams } from 'react-router-dom'; // Used to get product ID for editing

const EditProductPage = () => {
  // const { productId } = useParams();

  // Initial state for all product data fields
  const [productData, setProductData] = useState({
    name: '',
    description: '', //
    price: 0, //
    countInStock: 0, //
    sku: '', //
    category: '',
    brand: '',
    sizes: [], //
    colors: [], //
    collections: '',
    material: '',
    gender: '',
    images: [
      { url: 'https://picsum.photos/150?random=1' },
      { url: 'https://picsum.photos/150?random=2' },
    ], //
  });

  // Handler for basic text/number/select inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }; //

  // Handler for array inputs (Sizes, Colors) which are comma-separated strings
  const handleArrayChange = (e, fieldName) => {
    const valueArray = e.target.value
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0); // Ensure empty strings are filtered out

    setProductData((prevData) => ({
      ...prevData,
      [fieldName]: valueArray,
    }));
  }; //

  // Handler for image file upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Upload successful:', data);
        // Update productData with the new image URL
        setProductData((prevData) => ({
          ...prevData,
          images: [...prevData.images, { url: data.imageUrl }],
        }));
      } else {
        console.error('Upload failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving Product Data:', productData);
    // **TODO:** API call to save or update product data
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      {' '}
      {/* */}
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2> {/* */}
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-6">
          <label htmlFor="name" className="block font-semibold mb-2">
            Product Name
          </label>{' '}
          {/* */}
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          {/* /* Description * / */}
          <label htmlFor="description" className="block font-semibold mb-2">
            Description
          </label>{' '}
          {/* */}
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />{' '}
          {/* */}
        </div>

        {/* Price */}
        <div className="mb-6">
          {/* /* Price * / */}
          <label htmlFor="price" className="block font-semibold mb-2">
            Price
          </label>{' '}
          {/* */}
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />{' '}
          {/* */}
        </div>

        {/* Count in Stock */}
        <div className="mb-6">
          {/* /* Count in stock * / */}
          <label htmlFor="countInStock" className="block font-semibold mb-2">
            Count in Stock
          </label>{' '}
          {/* */}
          <input
            type="number"
            id="countInStock"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />{' '}
          {/* */}
        </div>

        {/* SKU */}
        <div className="mb-6">
          {/* /* SKU * / */}
          <label htmlFor="sku" className="block font-semibold mb-2">
            SKU
          </label>{' '}
          {/* */}
          <input
            type="text"
            id="sku"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />{' '}
          {/* */}
        </div>

        {/* Sizes (Comma-separated) */}
        <div className="mb-6">
          {/* /* Sizes * / */}
          <label htmlFor="sizes" className="block font-semibold mb-2">
            Sizes (comma-separated)
          </label>{' '}
          {/* */}
          <input
            type="text"
            id="sizes"
            name="sizes"
            value={productData.sizes.join(', ')}
            onChange={(e) => handleArrayChange(e, 'sizes')}
            className="w-full border border-gray-300 rounded-md p-2"
          />{' '}
          {/* */}
        </div>

        {/* Colors (Comma-separated) */}
        <div className="mb-6">
          {/* /* Colors * / */}
          <label htmlFor="colors" className="block font-semibold mb-2">
            Colors (comma-separated)
          </label>{' '}
          {/* */}
          <input
            type="text"
            id="colors"
            name="colors"
            value={productData.colors.join(', ')}
            onChange={(e) => handleArrayChange(e, 'colors')}
            className="w-full border border-gray-300 rounded-md p-2"
          />{' '}
          {/* */}
        </div>

        {/* Category, Brand, Collection, Material, Gender (Placeholders for other fields) */}
        {/* ... similar input fields can be added here for category, brand, etc. ... */}

        {/* Image Upload Input */}
        <div className="mb-6">
          {/* /* Image Upload * / */}
          <label htmlFor="imageUpload" className="block font-semibold mb-2">
            Upload Image
          </label>{' '}
          {/* */}
          <input
            type="file"
            id="imageUpload"
            name="image"
            onChange={handleImageUpload}
            className=" p-2 border rounded"
          />{' '}
          {/* */}
        </div>

        {/* Display Current Images (Simplified) */}
        <div className="mb-6 flex space-x-4">
          {productData.images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={`Product ${index + 1}`}
              className="w-24 h-24 object-cover border rounded-md"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className=" w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
