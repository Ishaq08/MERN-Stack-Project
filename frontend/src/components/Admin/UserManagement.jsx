import React, { useState } from 'react';

const UserManagement = () => {
  // Mock list of users with necessary fields
  const [users, setUsers] = useState([
    {
      _id: 'u1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
    },
    {
      _id: 'u2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'customer',
    },
    {
      _id: 'u3',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'customer',
    },
  ]);

  // State for the new user form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer', // Default role
  });

  // Handler for all input changes in the form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler for submitting the new user form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);

    // **TODO:** Implement API call to create new user here.
    // For now, we'll simulate adding the user to the local state
    const newUser = {
      ...formData,
      _id: Date.now().toString(), // Mock ID
    };
    setUsers([...users, newUser]);

    // Reset the form after submission
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'customer',
    });
  }; //

  // Handler for changing a user's role from the table dropdown
  const handleRoleChange = (userId, newRole) => {
    console.log(
      `Role change initiated: User ID: ${userId}, New Role: ${newRole}`
    );

    // **TODO:** Implement API call to update the user's role here

    // Simulate state update
    setUsers(
      users.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user
      )
    );
  }; //

  // Handler for deleting a user
  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      console.log(`Deleting user with ID: ${userId}`);

      // **TODO:** Implement API call to delete the user here

      // Simulate state update
      setUsers(users.filter((user) => user._id !== userId));
    }
  }; //

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      {/* Add New User Form Section */}
      <div className="p-6 bg-white shadow-md rounded-lg mb-8">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>{' '}
          {/* */}
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>{' '}
          {/* */}
          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>{' '}
          {/* */}
          {/* Role Select Field */}
          <div className="mb-6">
            <label htmlFor="role" className="block text-gray-700">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>{' '}
          {/* */}
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
          >
            Add User
          </button>{' '}
          {/* */}
        </form>
      </div>
      {/* User List Management Table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  {/* Role Change Dropdown */}
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>{' '}
                  {/* */}
                </td>
                <td className="p-4">
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>{' '}
                  {/* */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{' '}
      {/* */}
    </div>
  );
};

export default UserManagement;
