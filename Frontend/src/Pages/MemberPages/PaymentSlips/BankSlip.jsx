import React, { useState } from 'react'
import DashboardRightHeader from '../../../components/DashboardRightHeader/DashboardRightHeader'
import { Autocomplete, TextField } from '@mui/material';

const BankSlip = () => {
    const [translationID, setTranslationID] = useState([]);
    const [selectedTranslationID, setSelectedTranslationID] = useState('');


    const handleTranslationID = (event, value) => {
        setSelectedTranslationID(value);
    }

  return (
    <div>
        <div className="p-0 h-full sm:ml-72">
            <div>
                <DashboardRightHeader 
                    title={'Bank Slip'}
                />
            </div>

            <div className='flex justify-center items-center'>
              <div className="h-auto w-[97%] px-0 pt-4">
                <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

                    {/* Back Button */}
                    <div className='flex justify-start sm:justify-start items-center flex-wrap gap-2 py-7 px-3'>
                        <button
                          onClick={() => navigate('/member/bank-slip')}
                            className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                              <i className="fas fa-arrow-left mr-1"></i>Back
                        </button>
                    </div>


                    <div className="w-full font-sans sm:text-base text-sm flex flex-col gap-2 px-4">
                        <label htmlFor="translate">
                            TranslationID<span className="text-red-600"> (TransactionID is Invoice#)</span>
                        </label>
                        
                        <Autocomplete
                            id="translate"
                            options={translationID}
                            value={selectedTranslationID}
                            getOptionLabel={(option) => option}
                            onChange={handleTranslationID}
                            onInputChange={(event, value) => {
                            if (!value) {
                            // perform operation when input is cleared
                                console.log("Input cleared");
                            }
                            }}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                InputProps={{
                                ...params.InputProps,
                                className: "text-white",
                                }}
                                InputLabelProps={{
                                ...params.InputLabelProps,
                                style: { color: "white" },
                                }}
                                className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5"
                                placeholder="-select-"
                            // required
                            />
                            )}
                            classes={{
                            endAdornment: "text-white",
                            }}
                            sx={{
                            "& .MuiAutocomplete-endAdornment": {
                                color: "white",
                            },
                            }}
                        />
                   </div>

                   
                   <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-10 px-4">
                    <div className="w-full font-body sm:text-base text-sm text-secondary">
                        <label htmlFor="upload">
                            Upload Document<span className="text-red-600">*</span>
                        </label>
                        <input
                            // id="upload"
                            // disabled
                            type="file"
                            placeholder="37000"
                            className="border-1 w-full text-secondary border-[#f1efef] rounded-sm p-2 mb-3"
                        />
                    </div>

                    <div className="w-full font-sans text-secondary sm:text-base text-sm">
                        <label htmlFor="desc">
                            Description [Optional]
                        </label>
                        <textarea
                            id="desc"
                            type="text"
                            className="border-1 w-full rounded-sm p-2 mb-3"
                        />
                    </div>
                  </div>


                  <div className='mt-5 px-4'>
                    <button
                        className="rounded-full bg-secondary font-body px-5 py-2 text-sm mb-3 text-white transition duration-200 hover:bg-secondary active:bg-blue-700">
                            <i className="fas fa-cloud-upload-alt mr-2"></i>Upload
                    </button>
                  </div>

                </div>
              </div>
            </div>

        </div>
    </div>
  )
}

export default BankSlip