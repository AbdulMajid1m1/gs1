import React, { useEffect, useState } from 'react'
import crnumber from '../../../Images/crnumbershaded.gif'
import './CompanyNamePopUp.css'
const CrNumberPopUp = ({ isVisible, setVisibility, language }) => {
    const closePopUp = () => {
        setVisibility(false)
    }

    return (
        <div>
            {/* create the post api popup */}
            {isVisible && (
                <div className="popup-overlay-company z-50">
                    <div className="popup-container-company h-auto sm:w-[35%] w-[60%]">
                        <div className="popup-form-company w-full">
                            <div className="flex justify-end w-full -mt-4">
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
                                <div className="mt-3 h-full">
                                    <img src={crnumber} className='h-full w-full' alt="popupimage" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CrNumberPopUp