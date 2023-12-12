import React, { useState } from 'react'
import DashboardRightHeader from '../../../components/DashboardRightHeader/DashboardRightHeader'
import { Autocomplete, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../../utils/userRequest';
import { toast } from 'react-toastify';
import { DotLoader } from 'react-spinners'


const BankSlip = () => {
    const [translationID, setTranslationID] = useState([]);
    const [document, setDocument] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const memberDataString = sessionStorage.getItem('memberData');
    const memberData = JSON.parse(memberDataString);
    // console.log(memberData);
    const navigate = useNavigate();
    
    // const [selectedTranslationID, setSelectedTranslationID] = useState('');
    // const handleTranslationID = (event, value) => {
    //     setSelectedTranslationID(value);
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(translationID, document, description);
        setIsLoading(true);

        const formData = new FormData();
        formData.append('transaction_id', translationID);
        formData.append('details', description);
        formData.append('status', 'pending');
        formData.append('user_id', memberData?.user_id);
        formData.append('bankSlip', document);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        newRequest.post('/bankslip', formData, config)
        .then(res => {
            console.log(res.data);
            setIsLoading(false);

            toast.success('Bank Slip Upload Successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });

            setTranslationID('');
            setDocument('');
            setDescription('');
            navigate(-1);

        })
        .catch(err => {
            console.log(err);
            setIsLoading(false);
            toast.error(err?.response?.data?.error || 'Error', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        })


        
    }


  return (
    <div>
        {isLoading &&

            <div className='loading-spinner-background'
                style={{
                    zIndex: 9999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed'


                }}
            >
                <DotLoader
                    size={45}
                    color={"#FF693A"}
                    // height={4}
                    loading={isLoading}
                />
            </div>
            }

        <div className="p-0 h-full sm:ml-72">
            <div>
                <DashboardRightHeader 
                    title={'Upload Bank Slip'}
                />
            </div>

            <div className='flex justify-center items-center'>
              <div className="h-auto w-[97%] px-0 pt-4">
                <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

                    {/* Back Button */}
                    <div className='flex justify-start sm:justify-start items-center flex-wrap gap-2 py-7 px-3'>
                        <button
                          onClick={() => navigate(-1)}
                            className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                              <i className="fas fa-arrow-left mr-1"></i>Back
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                    <div className="w-full font-sans sm:text-base text-sm flex flex-col gap-2 px-4">
                        <label htmlFor="translate">
                            TranslationID<span className="text-red-600"> (TransactionID is Invoice#)</span>
                        </label>
                        <input
                            id="translate"
                            type="text"
                            placeholder="Trasnlation ID"
                            onChange={(e) => setTranslationID(e.target.value)}
                            className="border-1 w-full rounded-sm p-2 mb-3"
                        />
                        
                        {/* <Autocomplete
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
                        /> */}
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
                            onChange={(e) => setDocument(e.target.files[0])}
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
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
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
                </form>

                </div>
              </div>
            </div>

        </div>
    </div>
  )
}

export default BankSlip