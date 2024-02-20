import React, { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";

const TermsAndCondition = ({ isVisible, setVisibility, handleClose, handleAccept }) => {

    // const closePopUp = () => {
    //     setVisibility(false)
    // }
    const { t} = useTranslation();

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
                                    onClick={handleClose}
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
                                    <p className="text-lg sm:text-3xl font-body text-secondary text-center font-normal">
                                          {t('Terms & Conditions')}
                                    </p>
                                </div>
                                <hr />

                                <div className='mt-3 max-h-64 overflow-y-auto'>
                                    <p className='text-secondary font-body'>The following Terms and Conditions apply to all members of the Saudi Bar Coding Center GS1 Saudi Arabia</p>

                                    <p className='text-secondary font-body mt-6'>1. Definitions: The following terms, wherever mentioned in these Terms and Conditions, shall have the meanings indicated opposite each of them:</p>

                                    <ul className='list-disc text-secondary font-body  ml-8 mt-3'>
                                        <li>1.1 "Kingdom" means the Kingdom of Saudi Arabia.</li>
                                        <li>1.2 "Center" means the Saudi Bar-Coding Center.</li>
                                        <li>1.3 "Terms and Conditions" means the terms and conditions for granting a License and joining the Center’s membership.</li>
                                        <li>1.4 "Member" means any company, institution, office, association, body, or any legal entity, or individual, who registered as a subscriber in the Center and paid the registration fees and the annual subscription fees.</li>
                                        <li>1.5 "Members" means all the Center’s subscribers, and they constitute the Center’s General Assembly.</li>
                                        <li>1.6 "Articles of Association and Internal Regulations" The Center's Articles of Association and Internal Regulations.</li>
                                        <li>1.7 "Application Form" means the Center's membership Application Form that organizations and/or companies submit to join the Center's membership.</li>
                                        <li>1.8 "Membership Fees" means the joining fees and/or annual service licensing fees set forth at the time of application.</li>
                                        <li>1.9 "Service Fees" means the fees for the issuance and use of the bar-coding system identifiers provided for at the time of submission of the Application, or as amended pursuant to Condition</li>
                                        <li>1.10 "Additional Charges" means the amount that the Center may charge based on the special conditions of any particular business sector, and/or the provision of additional services requested by any official government authority. This charge may be a one-time or annual amount.</li>
                                        <li>1.11 "Brand Owner" means the legal owner/possessor of the name, term, design, symbol or other feature identifying a product or service being sold. The trademark owner need not be the manufacturer of the product or service but is always the ultimate legal guardian of the trademark.</li>
                                        <li>1.12 "Business Day" means any day of the week except Friday or Saturday or an official holiday in the Kingdom.</li>
                                        <li>1.13 "Start Date" means the date of acceptance of the membership Application Form and activation of the membership.</li>
                                        <li>1.14 "Electronic Form" means the form that is submitted after it has been filled out, including via the website.</li>
                                    </ul>
                                </div>
                                <hr className='mt-2'/>

                                <div className="flex justify-end gap-3 mt-4">
                                    <button
                                        className="bg-[#c82333] hover:bg-red-700 text-white px-3 py-1.5 rounded mr-2"
                                        onClick={handleAccept}
                                    >
                                          {t('Accept')}
                                    </button>
                                    <button
                                        className="bg-[#ffc107] hover:bg-[#e0a800] px-3 py-1.5 rounded"
                                        onClick={handleClose}
                                    >
                                         {t('Cancel')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TermsAndCondition