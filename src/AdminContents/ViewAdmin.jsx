import React, { useState ,useEffect} from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom';
import AdminTable from './AdminTable';
import axios from 'axios'

export function ViewAdmin() {

  const navigate = useNavigate(); // Update the import

  const handleViewButtonClick = () => {
    // Navigate to the AdminLogin component
    navigate('/admin-table');
  };



  // const users = [
  //   { id: 1, name: 'John Doe', photo: '../logo192.png' },
  //   { id: 1, name: 'John Doe', photo: 'path-to-john-doe-photo.jpg' },
  //   { id: 1, name: 'John Doe', photo: 'path-to-john-doe-photo.jpg' },
  //   // Add more user data as needed
  // ];

  const handleDone = (userId) => {
    // Implement the 'Done' action
    console.log(`Done clicked for user ${userId}`);
  };

  const handleDelete = (userId) => {
    // Implement the 'Delete' action
    console.log(`Delete clicked for user ${userId}`);
  };


  const [userId, setuserId] = useState('');
    const [password, setpassword] = useState('');


    const handleApi = () => {
        const url = 'http://localhost:4000/signup';
        const data = { userId, password };
        // const navigate = useNavigate();
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert(res.data.message);
                }
                if(res.data.success) {
                  
                }
                fetchUsers(currentPage)
            })
            .catch((err) => {
                alert('SERVER ERR')
            })
    }
  
  const { numberOfBoxes } = useParams();
  // Generate an array of numbers from 1 to numberOfBoxes
  const boxNumbers = Array.from({ length: numberOfBoxes }, (_, index) => index + 1);


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



  return (
    <>
    <section className='h-min'>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen lg:py-7 lg:px-6">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-2">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Create User</h2>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    User Id{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="UserId"
                      onChange={(e) => {
                        setuserId(e.target.value)
                      }}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="" className="text-base font-medium text-gray-900">
                      {' '}
                      Password{' '}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => {
                        setpassword(e.target.value)
                      }}
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleApi}
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Create <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
            
          </div>
          
        </div>

        {/* <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-2">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl w-full flex items-center font-bold leading-tight text-black sm:text-4xl">View User</h2>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                {boxNumbers.map((boxNumber) => (
                  <div key={boxNumber} className="relative">
                    <label htmlFor="" className="text-base font-medium text-gray-900">
                      {' '}
                      User Id{' '}
                    </label>
                    <div className="mt-2 relative">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      disabled="true"
                        placeholder={`UserId ${boxNumber}`}
                    ></input>
                      
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                        {boxNumber}
                      </span>
                    </div>
                  </div>
                ))}
                 <div className="flex justify-end">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                        onClick={handleViewButtonClick}
                    >
                        View <ArrowRight className="ml-2" size={16} />
                    </button>
                </div>
              </div>
            </form>
          </div>
        </div> */}
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-2">
      <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
          View User
        </h2>
        
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
          onClick={handleViewButtonClick}
        >
          View <ArrowRight className="ml-2" size={16} />
        </button>
      </div>

            
        <form action="#" method="POST" className="mt-8">
          <div className="space-y-5">
            {users.map((user) => (
              <div key={user.userId} className="relative">
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  User Id
                </label>
                <div className="mt-2 relative">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    disabled
                    placeholder={`UserId ${user.userId}`}
                  ></input>

                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {user.userId}
                  </span>
                </div>
              </div>
            ))}
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
        </form>
      </div>
    </div>
      </div>
    </section>

    
    </>
  )
}
