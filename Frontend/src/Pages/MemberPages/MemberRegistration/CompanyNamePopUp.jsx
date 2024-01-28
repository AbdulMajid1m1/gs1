import React, { useEffect, useState } from 'react'
import popupimage from '../../../Images/popupimage.png'

const CompanyNamePopUp = ({ isVisible, setVisibility }) => {
    const closePopUp = () => {
        setVisibility(false)
    }

    return (
        <div>
            {/* create the post api popup */}
            {isVisible && (
                <div className="popup-overlay">
                    <div className="popup-container h-auto sm:w-[40%] w-full">
                        <div className="popup-form w-full ">
                            <div className="flex justify-end w-full">
                                <button
                                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                    onClick={closePopUp}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <form className='w-full'>
                                <div className="mt-3 h-56">
                                    <img src={popupimage} className='h-56 w-full object-cover' alt="popupimage" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CompanyNamePopUp