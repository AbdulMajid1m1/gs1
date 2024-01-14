import React, { useEffect, useState } from 'react'
import DashboardRightHeader from '../../../components/DashboardRightHeader/DashboardRightHeader'
import { Autocomplete, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../../utils/userRequest';
import { toast } from 'react-toastify';
import { DotLoader } from 'react-spinners'


const BankSlip = () => {
    const [document, setDocument] = useState(null);
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const memberDataString = sessionStorage.getItem('memberData');
    const memberData = JSON.parse(memberDataString);
    console.log(memberData);
    const [transactionList, setTransactionId] = useState([]);
    const [translationID, setTranslationID] = useState(memberData?.transaction_id || '');
    const navigate = useNavigate();
    const getAllTransactionId = async () => {
        try {
            const response = await newRequest.get(`/memberDocuments/pendingInvoices?user_id=${memberData?.id}`);
            console.log(response.data);
            setTransactionId(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllTransactionId();
    }, [])



    const [selectedTranslationID, setSelectedTranslationID] = useState('');
    const handleTranslationID = (event, value) => {
        console.log(value);
        setSelectedTranslationID(value);
    }

    const handleFileChange = (e) => {
        // setDocument(e.target.files[0]);
        // setError('');
        const file = e.target.files[0];
        if (file) {
            if (file.size <= 500 * 1024) {
                setDocument(file);
                setError(''); // Clear any previous error message
            } else {
                setError('File size should be 500KB or less');
                e.target.value = null;
            }
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(translationID, document, description);

        // if (memberData?.payment_status === 0 && !selectedTranslationID) {
        //     setError('Please select a TranslationID.');
        // } else if (memberData?.payment_status === 0 && !document) {
        //     setError('Please upload a document.');
        // } else {
        //     setError('');

        //     // Perform the upload or submission logic here
        //     console.log('Document uploaded:', document);

        //     setIsLoading(true);
        // }

        // Create a FormData object
        const formData = new FormData();
        formData.append('type', 'bank_slip');
        formData.append('transaction_id', selectedTranslationID?.transaction_id || '');
        formData.append('user_id', memberData?.id || ''); // Replace with the actual user ID
        formData.append('doc_type', 'member_document');
        formData.append('document', document);

        formData.append('uploaded_by', memberData.email);


        try {
            const response = await newRequest.post('/memberDocuments', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success(response?.data?.message || 'Bank Slip Upload Successfully.', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });


            console.log(response.data);
            setTranslationID('');
            setDocument('');
            setDescription('');
            navigate(-1);
            setIsLoading(false);


        }
        catch (error) {
            setIsLoading(false);
            toast.error(error?.response?.data?.error || 'Error', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });


            console.log(error);
        }


    };




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
                                        Transaction ID<span className="text-red-600"> (TransactionID is Invoice#)</span>
                                    </label>
                                    {/* <input
                            id="translate"
                            type="text"
                            placeholder="Trasnlation ID"
                            onChange={(e) => setTranslationID(e.target.value)}
                            className="border-1 w-full rounded-sm p-2 mb-3"
                        /> */}

                                    {/* {memberData.payment_status === 0 && ( */}
                                    {/* {memberData?.payment_status === 0 && memberData.status !== 1 && ( */}
                                    <Autocomplete
                                        id="tranactionIds"
                                        // options={[translationID]}
                                        options={transactionList}
                                        value={selectedTranslationID}
                                        getOptionLabel={(option) => option?.transaction_id || ''}
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
                                    {/* )} */}
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
                                            // onChange={(e) => setDocument(e.target.files[0])}
                                            onChange={handleFileChange}
                                            placeholder="37000"
                                            className="border-1 w-full text-secondary border-[#f1efef] rounded-sm p-2 mb-3"
                                        />
                                        {error && <p className="text-red-600">{error}</p>}
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