import React from 'react'
import visitFrontend from "../../../../Images/visitFrontend.png"
import profileICon from "../../../../Images/profileICon.png"
import { TextField } from '@mui/material'

const Gs1MembersView = () => {
  return (
    <div>
      <div className="p-1 h-full sm:ml-72">
        <div className='h-32 w-full flex justify-end items-start p-3 bg-primary -mt-5 sm:gap-7 gap-4'>
                <div className='flex justify-center items-center mt-1 cursor-pointer'>
                    <img src={visitFrontend} 
                        alt='logo'
                        style={{ filter: 'invert(1)' }}
                            className='h-5 w-5 text-white mr-4' />
                    <p className='text-white font-sans font-normal text-sm'>Vist Frontend</p>
                </div>

                <div className='flex justify-center items-center'>
                    <img src={profileICon} alt='logo' className='h-8 w-8 text-white mr-5' />
                </div>
            </div>
            
                <div className='flex justify-center items-center'>
                    <div className="h-20 w-[97%] bg-white shadow-xl rounded-md -mt-10 flex justify-start items-center px-10">
                        <p className="sm:text-2xl text-secondary text-sm font-sans font-semibold">GS1 Member Details</p>
                    </div>
                </div>


                <div className='flex justify-center items-center bg-[#DAF2EE]'>
                  <div className="h-auto w-[97%] px-0 pt-4">
                    <div className="h-auto w-full p-6 bg-white shadow-xl rounded-md">

                     <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                            <TextField 
                              id="companyNameEnglish" 
                                label="Company Name English"
                                  variant="outlined" 
                            />
                        </div>

                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                          <TextField 
                              id="companyNameArabic" 
                                label="Company Name Arabic"
                                  variant="outlined" 
                            />
                        </div>

                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                          <TextField 
                              id="Country" 
                                label="Country"
                                  variant="outlined" 
                            />
                        </div>
                    </div>


                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-4">
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                            <TextField 
                              id="CountryShortName" 
                                label="Country Short Name"
                                  variant="outlined" 
                            />
                        </div>

                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                          <TextField 
                              id="State" 
                                label="State"
                                  variant="outlined" 
                            />
                        </div>

                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                          <TextField 
                              id="City" 
                                label="City"
                                  variant="outlined" 
                            />
                        </div>
                    </div>


                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-4">
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                            <TextField 
                              id="ZipCode" 
                                label="Zip Code"
                                  variant="outlined" 
                            />
                        </div>

                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                          <TextField 
                              id="mobile" 
                                label="Mobile No (omit zero)"
                                  variant="outlined" 
                            />
                        </div>

                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                          <TextField 
                              id="Email" 
                                label="Email"
                                  variant="outlined" 
                            />
                        </div>
                    </div>


                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-4">
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                            <TextField 
                              id="upgradationDiscount" 
                                label="Upgradation Discount"
                                  variant="outlined" 
                            />
                        </div>

                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                          <TextField 
                              id="renewalDiscount" 
                                label="Reneval Discount"
                                  variant="outlined" 
                            />
                        </div>
                      </div>


                      <div className='h-auto w-full mt-8 px-1'>
                        <div className='flex justify-between'>
                            <p className='text-blue-500 font-sans font-semibold'>GS1 Member Details</p>
                            <button className='bg-blue-500  font-sans font-normal text-sm px-4 py-1 text-white rounded-full hover:bg-blue-600'>Change Membership</button>
                        </div>

                        <div className='flex justify-between mt-8'>
                            <div className='w-full flex flex-col gap-1 '>
                                <p className='font-sans font-semibold text-sm text-gray-500'>Cr Number</p>
                                <p className='text-gray-500'>No</p>
                            </div>

                            <div className='w-full flex flex-col gap-1 '>
                                <p className='font-sans font-semibold text-sm text-gray-500'>Cr Activity</p>
                                <p className='text-gray-500'>No</p>
                            </div>
                        </div>

                        <div className='flex justify-between mt-8'>
                            <div className='w-full flex flex-col gap-1 '>
                                <p className='font-sans font-semibold text-sm text-gray-500'>CR Documents</p>
                                <p className='text-gray-500'>MIM License</p>
                            </div>

                            <div className='w-full flex flex-col gap-1 '>
                                <p className='font-sans font-semibold text-sm text-gray-500'>CR Document Number</p>
                                <p className='text-gray-500'>2312</p>
                            </div>
                        </div>

                        <div className='flex justify-between mt-8'>
                            <div className='w-full flex flex-col gap-1 '>
                                <p className='font-sans font-semibold text-sm text-gray-500'>Company Name English</p>
                                <p className='text-gray-500'>CreativeM</p>
                            </div>

                            <div className='w-full flex flex-col gap-1 '>
                                <p className='font-sans font-semibold text-sm text-gray-500'>Company Name Arabic</p>
                                <p className='text-gray-500'>CreativeM</p>
                            </div>
                        </div>

                        <div className='flex justify-between mt-8'>
                            <div className='w-full flex flex-col gap-1 '>
                                <p className='font-sans font-semibold text-sm text-gray-500'>Company GCP</p>
                                <p className='text-gray-500'>Not Assigned</p>
                            </div>

                            <div className='w-full flex flex-col gap-1 '>
                                <p className='font-sans font-semibold text-sm text-gray-500'>Contact Person</p>
                                <p className='text-gray-500'>ABDUL MAJID</p>
                            </div>
                        </div>

                        <div className='flex justify-between mt-8'>
                            <div className='w-full flex flex-col gap-1 '>
                                <p className='font-sans font-semibold text-sm text-gray-500'>Mobile No (omit zero)</p>
                                <p className='text-gray-500'>339809338</p>
                            </div>

                            <div className='w-full flex flex-col gap-1 '>
                                <p className='font-sans font-semibold text-sm text-gray-500'>Member ID</p>
                                <p className='text-gray-500'>3998</p>
                            </div>
                        </div>

                        <div className='flex justify-between mt-8'>
                            <div className='w-full flex flex-col gap-1 '>
                                <p className='font-sans font-semibold text-sm text-gray-500'>Company Landline</p>
                                <p className='text-gray-500'>213</p>
                            </div>

                            <div className='w-full flex flex-col gap-1 '>
                                <p className='font-sans font-semibold text-sm text-gray-500'>Membership Type</p>
                                <p className='text-gray-500'>NON_MED_CATEGORY</p>
                            </div>
                        </div>

                        <div className='flex justify-between mt-6'>
                            <div className='w-full flex flex-col gap-1 '>
                                <p className='font-sans font-semibold text-sm text-gray-500'>GTIN</p>
                                <p className='text-gray-500'>Category B - ( 100 Barcodes )</p>
                            </div>
                        </div>

                      </div>
                    </div>
                 </div>
               </div>
        </div>
    </div>
  )
}

export default Gs1MembersView