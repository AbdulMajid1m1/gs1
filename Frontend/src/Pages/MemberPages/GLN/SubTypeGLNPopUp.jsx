import React, { useState } from 'react';
import glnCorporate from "../../../Images/glnCorporate.png";
import glnDistribution from "../../../Images/glnDistribution.png";
import glnFactory from "../../../Images/glnFactory.png";
import glnGroceryStore from "../../../Images/glnGroceryStore.png";
import glndockdoor from "../../../Images/glndockdoor.png";
import glnBank from "../../../Images/glnBank.png";
import glnMobileBlood from "../../../Images/glnMobileBlood.png";
import glnColdStore from "../../../Images/glnColdStore.png";
import glnport from "../../../Images/glnport.png";
import glnbarn from "../../../Images/glnbarn.png";
import glnShelf from "../../../Images/glnShelf.png";
import glnClinic from "../../../Images/glnClinic.png";

const SubTypeGLNPopUp = ({ isVisible, setVisibility, onSelectImage }) => {
  const handleImageClick = (imageName) => {
    onSelectImage(imageName); // Pass the selected image name to the parent component
    setVisibility(false); // Close the popup
  };

  const closePopUp = () => {
    setVisibility(false);
  };

  return (
    <div>
      {isVisible && (
        <div className="popup-overlay z-50">
          <div className="popup-container h-auto sm:w-[50%] w-full">
            <div className="popup-form w-full">
              <div className="flex justify-between w-full mb-3">
                <h2 className='text-xl text-secondary'>Physical Location</h2>
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
              <div className='w-full'>
                <div className='grid sm:grid-cols-4 grid-cols-2 gap-2 p-2 bg-slate-100'>
                 {/* first row */}
                  <div className='transition-all hover:scale-90 cursor-pointer' onClick={() => handleImageClick('Corporate Headquaters')}>
                    <img src={glnCorporate} className='h-28 w-full object-contain' alt='' />
                  </div>

                  <div className='transition-all hover:scale-90 cursor-pointer' onClick={() => handleImageClick('Distribution centre')}>
                    <img src={glnDistribution} className='h-28 w-full object-contain' alt='' />
                  </div>

                  <div className='transition-all hover:scale-90 cursor-pointer' onClick={() => handleImageClick('Factory')}>
                    <img src={glnFactory} className='h-28 w-full object-contain' alt='' />
                  </div>

                  <div className='transition-all hover:scale-90 cursor-pointer' onClick={() => handleImageClick('Grocery store')}>
                    <img src={glnGroceryStore} className='h-28 w-full object-contain' alt='' />
                  </div>

                  
                  {/* second row */}
                  <div className='transition-all hover:scale-90 cursor-pointer' onClick={() => handleImageClick('Dock door')}>
                    <img src={glndockdoor} className='h-28 w-full object-contain' alt='' />
                  </div>

                  <div className='transition-all hover:scale-90 cursor-pointer' onClick={() => handleImageClick('Bank')}>
                    <img src={glnBank} className='h-28 w-full object-contain' alt='' />
                  </div>

                  <div className='transition-all hover:scale-90 cursor-pointer' onClick={() => handleImageClick('Mobile blood donation van')}>
                    <img src={glnMobileBlood} className='h-28 w-full object-contain' alt='' />
                  </div>

                  <div className='transition-all hover:scale-90 cursor-pointer' onClick={() => handleImageClick('Cold storage within a warehouse')}>
                    <img src={glnColdStore} className='h-28 w-full object-contain' alt='' />
                  </div>


                  {/* third row */}
                  <div className='transition-all hover:scale-90 cursor-pointer' onClick={() => handleImageClick('Port')}>
                    <img src={glnport} className='h-28 w-full object-contain' alt='' />
                  </div>

                  <div className='transition-all hover:scale-90 cursor-pointer' onClick={() => handleImageClick('Barn')}>
                    <img src={glnbarn} className='h-28 w-full object-contain' alt='' />
                  </div>

                  <div className='transition-all hover:scale-90 cursor-pointer' onClick={() => handleImageClick('Shelf')}>
                    <img src={glnShelf} className='h-28 w-full object-contain' alt='' />
                  </div>

                  <div className='transition-all hover:scale-90 cursor-pointer' onClick={() => handleImageClick('Clinic')}>
                    <img src={glnClinic} className='h-28 w-full object-contain' alt='' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubTypeGLNPopUp;
