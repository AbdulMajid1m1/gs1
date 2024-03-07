import React, { useEffect, useState } from 'react'

const MemberGpcPopUp = ({ isVisible, setVisibility }) => {
    const classifications = [
        "10000590-Food/Beverage/Tobacco Variety Packs",
        "10000025-Milk (Perishable)",
        "10000191-Dairy Based Drinks - Ready to Drink (Perishable)",
        "10005959-Dates",
        "51120000-Health Enhancement",
        "10000424-Laundry Detergents",
        "10007584-Building Construction & Related Services",
        "78000000-Electrical Supplies",
        "51160000-Pharmaceutical Drugs",
        "10001760-Arts/Crafts Variety Packs",
        "10000068-Baking/Cooking Mixes (Perishable)",
        "51170000-Veterinary Healthcare",
        "10006412-Veterinary Medical Devices"
    ];

    const closePopUp = () => {
        setVisibility(false)
    }

    return (
        <div>
            {/* create the post api popup */}
            {isVisible && (
                <div className="popup-overlay z-50">
                    <div className="popup-container h-auto sm:w-[40%] w-full">
                        <div className="popup-form w-full">
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
                                <div className="mb-2">
                                    <p className="text-lg sm:text-xl font-semibold">
                                        Example Of Products Classifications
                                    </p>
                                </div>
                                <hr />
                                {classifications.map((classification, index) => (
                                    <div className="mt-3" key={index}>
                                        <p className="text-sm font-semibold">
                                            {classification}
                                        </p>
                                    </div>
                                ))}
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MemberGpcPopUp