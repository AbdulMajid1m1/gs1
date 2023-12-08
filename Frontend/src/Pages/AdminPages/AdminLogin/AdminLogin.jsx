import React, { useEffect, useState } from 'react'
import gs1logoWhite from '../../../Images/gs1logoWhite.png'

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    // Trigger the animation after the component is mounted
    setShowImage(true);
  }, []);

  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
          
          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="flex flex-col gap-6 items-start">
                <img src={gs1logoWhite} className='h-16 w-auto px-4 object-contain' alt='' />
                <h2 className="text-2xl font-medium font-sans px-5">Welcome To <span className='font-sans font-bold'>GS1 Saudia Arabia</span></h2>
              </div>
              <div className="mt-3 px-5">
                {/* <form onSubmit={handleSubmit}> */}
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                    <input required type="text" id="email" placeholder="example@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}

                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                    </div>
                    <input
                      required
                        value={password}
                          onChange={(e) => setPassword(e.target.value)}
                            type="password" 
                              id="password"
                               placeholder="Your Password"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                    />
                  </div>
                  <div className="mt-6">
                    <button
                      type='submit'
                         className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-secondary rounded-md hover:bg-primary focus:outline-none focus:bg-primary focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Login
                    </button>
                    {error && (
                      <div
                        className="mt-4 text-sm text-center text-red-500"
                      >
                        <div
                          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        >
                          {error}
                        </div>
                      </div>
                    )}
                  </div>
                {/* </form> */}
                {/* <p className="mt-6 text-sm text-center text-gray-400"></p> */}
                <a href="#" className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a>

              </div>
            </div>
          </div>
          <div className={`hidden lg:block lg:w-2/3 transform transition-transform duration-1000 ease-in-out ${showImage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-100%]'}`}
               style={{ backgroundImage: 'url(https://gs1ksa.org/backend/images/login/613f2a06120da1631529478.jpg)' }}>
            <div className="flex items-center h-full px-14 bg-gray-900 bg-opacity-10">
              <div>
                <h2 className="text-6xl pt-40 font-semibold font-sans text-white">Good Morning</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLogin