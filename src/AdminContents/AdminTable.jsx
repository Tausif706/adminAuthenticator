

import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';

const AdminTable = () => {
  
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(`http://localhost:4000/getusers/${page}`);
      setUsers(response.data.users);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDone = async (userId) => {
    try {
      await axios.put(`http://localhost:4000/adminVerified/${userId}`);
      // You may want to update the local state or trigger a re-fetch of the user data
      console.log(`Admin verification updated successfully for user ${userId}`);
      fetchUsers(currentPage)
    } catch (error) {
      console.error('Error updating adminVerification:', error);
    }
  };
  const handleDelete = async(userId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/deleteUser/${userId}`);
      console.log(response.data.message); // Log the server response
      fetchUsers(currentPage)
      // Add logic to handle success (e.g., show a success message)
  } catch (error) {
      console.error('Error deleting user:', error);
      // Add logic to handle error (e.g., show an error message)
  }
    // Implement the 'Delete' action
    console.log(`Delete clicked for user ${userId}`);
  };

  return (
    <div className='mt-20 mx-6'>
      <Table responsive striped bordered hover className='table-auto'>
        {/* ... your table headers */}

        <thead  className=" text-white ">
           <tr className="text-center ">
             <td className="py-2 bg-black text-white">User_ID</td>
             <td className="py-2 bg-black text-white">Name</td>
             <td className="py-2 bg-black text-white">Photo</td>
             <td className="py-2 bg-black text-white">Actions</td>
           </tr>
         </thead>
                 
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b hover:bg-gray-100 text-center">
              {/* ... your table columns */}
                <td className="py-3">{user.userId}</td>
                <td className="py-3">{user.name}</td>
                <td className="py-3">
                  <img src={`http://localhost:4000/${user.photo}`} alt={`User ${user.userId}`} className="w-10 h-10 rounded-full mx-auto" />
                </td>
              <td className="py-3">
              {!user.adminVerification && (
                  <Button variant="success" onClick={() => handleDone(user.userId)} className="mr-2">
                    Done
                  </Button>
                )}
                <Button variant="danger" onClick={() => handleDelete(user._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="flex justify-end">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ArrowRight className="-ml-2 rotate-180" size={16} />
                Previous
              </button>
              <div className="mx-4">
                Page {currentPage} of {totalPages}
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next <ArrowRight className="ml-2" size={16} />
                
              </button>
            </div>
    </div>
  );
};

export default AdminTable;
