import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserDesc = () => {
  const [postImage, setPostImage] = useState('');
  const [name, setName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isViewing, setViewing] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPostImage(file);
  };

  let userId = localStorage.getItem('userId');

  const [uploadedData, setUploadedData] = useState([]);

  useEffect(() => {
    // Fetch uploaded data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getuploadeddata/${userId}`);
        setUploadedData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isViewing, userId]);

  const handleViewClick = () => {
    setViewing((prevValue) => !prevValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('photo', postImage);

      // Send the form data to the backend
      const response = await axios.post(`http://localhost:4000/uploadUser/${userId}`, formData);
      console.log(response.data);
      toast.success("data input Successfully")
      // Redirect or perform other actions after a successful upload
    } catch (error) {
      console.error('Error uploading data:', error);
      toast.error("data is INCORRECT")
      // Handle error (e.g., display an error message to the user)
    }
  };

  const handleCloseView = () => {
    setViewing(false);
  };

  return (
    <>
      <button
        className="fixed top-4 right-4 z-50 inline-flex items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold text-white hover:bg-black/80"
        onClick={handleViewClick}
      >
        {isViewing && (
          <>
            <ArrowLeft className="mr-1" size={16} /> Close
          </>
        )}
        {!isViewing && (
          <>
            View <ArrowRight className="ml-1" size={16} />
          </>
        )}
      </button>
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col items-center justify-center h-screen ${isViewing ? 'opacity-70 disabled' : ''} `}
      >
        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="text-base font-medium text-gray-900">
              {' '}
              Name{' '}
            </label>
            <div className="mt-2">
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Name"
                required='true'
              />
            </div>
          </div>
          <div>
            <label htmlFor="photo" className="text-base font-medium text-gray-900">
              {' '}
              Photo{' '}
            </label>
            <div className="mt-2">
              <div
                onClick={() => document.getElementById('photo').click()}
                className="relative h-40 w-40 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
              >
                {selectedFile ? (
                  <img
                    className="h-full w-full object-cover"
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                    <span className="text-4xl">+</span>
                  </div>
                )}
              </div>
              <input
                label="Image"
                id="photo"
                onChange={handleFileChange}
                className="hidden"
                required='true'
                type="file"
                accept=".jpeg, .png , .jpg*"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 transition-transform hover:translate-x-2"
            >
              Upload <ArrowRight className="ml-2 hover:translate-x-2" size={16} />
            </button>
          </div>
        </div>
      </form>
      {isViewing && (
        <div className={`fixed top-0 right-0 h-screen w-1/3 bg-white border-l border-gray-300 transform transition-transform ease-in-out duration-300 ${isViewing ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-end p-4">
            <button
              onClick={handleCloseView}
              className="text-gray-500 hover:text-black focus:outline-none"
            >
              <ArrowRight size={32} />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center h-screen">
            {/* Display the fetched data */}
            {uploadedData.length > 0 ? (
              <ul>
                {uploadedData.map((item) => (
                  <li key={item._id}>
                    <p>Name: {item.name}</p>
                    <img
                      src={`http://localhost:4000/${item.photo}`}
                      alt="Uploaded"
                      height={'120px'}
                      width={'120px'}
                    />
                    <p>Verified: {item.adminVerification ? 'True' : 'False'}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No uploaded data available.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserDesc;
