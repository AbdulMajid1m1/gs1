import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { Autocomplete, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

const AddMemberDocuments = ({ isVisible, setVisibility, refreshBrandData, fetchMemberbankSlipData, refreshHistoryData, userData }) => {
  // const [selectDocument, setSelectDocument] = useState("");
  const [docuements, setDocuments] = React.useState([])
  const [selectedDocuments, setSelectedDocuments] = useState("");
  const [transactionId, setTransactionId] = useState([]);
  const [selectedTransactionId, setSelectedTransactionId] = useState("")
  const [uploadDocument, setUploadDocument] = useState("");
  const [isBankSlip, setIsBankSlip] = useState(true);
  const [error, setError] = useState('');
  // get the sesstion data
  // const gs1MemberData = JSON.parse(sessionStorage.getItem("gs1memberRecord"));
  // console.log(gs1MemberData)
  const gs1MemberData = userData;
  
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);


  const handleCloseMemberPopup = () => {
    setVisibility(false);
  };


  const handleRadioChange = (event) => {
    setIsBankSlip(event.target.value === 'bankSlip');
  };


  useEffect(() => {
    const getDocuments = async () => {
      try {
        const response = await newRequest.get('/getAlldocumentTypename');
        console.log(response.data);
        setDocuments(response.data);
      } catch (error) {
        console.log(error);
      }
    };


    const getAllTransactionId = async () => {
      try {
        const response = await newRequest.get(`/memberDocuments/pendingInvoices?user_id=${gs1MemberData?.id}`);

        console.log(response.data);
        setTransactionId(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getDocuments();
    getAllTransactionId();
  }, []);



  // Handle country selection
  const handleSelectedDocuments = (event, value) => {
    console.log(value?.file_name);
    setSelectedDocuments(value);
  };

  const handleSelectedTransactionId = (event, value) => {
    console.log(value?.transaction_id);
    setSelectedTransactionId(value);
  };

  //  console.log("file name", selectedDocuments?.file_name)

  // const handleDocUpload = (event) => {
  //   setUploadDocument(event.target.files[0]);
  // };
  const handleFileChange = (e) => {
    // setError('');
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 500 * 1024) {
        setUploadDocument(file);
        setError(''); // Clear any previous error message
      } else {
        setError('File size should be 500KB or less');
        e.target.value = null;
      }
    }
  };


  const handleAddMemberDocuments = async () => {

    // Check if required fields are empty
    if (!selectedDocuments) {
      toast.error(`${t('Select Docuemts')}`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }
    else if (!transactionId) {
      toast.error(`{${t('Enter')} ${t('Transaction Id')} ${t('Name')}}`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }
    else if (!uploadDocument) {
      toast.error(` ${t('Upload Documents')}`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    setLoading(true);

    // Create a FormData object
    const formData = new FormData();
    formData.append('type', selectedDocuments?.file_name || '');
    formData.append('transaction_id', selectedTransactionId?.transaction_id || '');
    formData.append('user_id', gs1MemberData?.id || ''); // Replace with the actual user ID
    formData.append('doc_type', 'member_document');
    formData.append('document', uploadDocument);
    formData.append('uploaded_by', gs1MemberData?.email || '');


    try {
      const response = await newRequest.post('/memberDocuments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(response?.data?.message || `${t('Documents Added Successfully')}`, {
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
      setLoading(false);
      fetchMemberbankSlipData();
      refreshBrandData();
      refreshHistoryData();
      handleCloseMemberPopup();


    }
    catch (error) {
      setLoading(false);
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
      {/* create the post api popup */}
      {isVisible && (
        <div className="popup-overlay z-50">
          <div className="popup-container h-auto sm:w-[45%] w-full">
            <div className="popup-form w-full">
              <form className='w-full'>
                <h2 className='text-secondary font-sans font-semibold text-2xl'> {t('Add')} {t('Member Documents')} </h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">{t('Select Documents')}</label>
                    <Autocomplete
                      id="field1"
                      options={docuements}
                      value={selectedDocuments}
                      getOptionLabel={(option) => option?.file_name || ""}
                      onChange={handleSelectedDocuments}
                      onInputChange={(event, value) => {
                        if (!value) {
                          // perform operation when input is cleared
                          console.log("Input cleared");
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          autoComplete="off"
                          {...params}
                          InputProps={{
                            ...params.InputProps,
                            className: "text-white",
                          }}
                          InputLabelProps={{
                            ...params.InputLabelProps,
                            style: { color: "white" },
                          }}
                          className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                          placeholder={`${t('Select Document')}`}
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


                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label className="text-secondary">{t('Document Type')}</label>
                    <div className="flex w-full justify-center gap-4">
                      <label>
                        <input
                          type="radio"
                          name="documentType"
                          value="bankSlip"
                          checked={isBankSlip}
                          onChange={handleRadioChange}
                        />
                        <span className='ml-2'>{t('Is Bank Slip')}</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="documentType"
                          value="notBankSlip"
                          checked={!isBankSlip}
                          onChange={handleRadioChange}
                        />
                        <span className='ml-2'>{t('Is Not Bank Slip')}</span>
                      </label>
                    </div>
                  </div>

                  {isBankSlip && (
                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                      <label htmlFor="field2" className="text-secondary">{t('Transaction Id')}</label>
                      <Autocomplete
                        id="field2"
                        options={transactionId}
                        value={selectedTransactionId}
                        getOptionLabel={(option) => option?.transaction_id || ""}
                        onChange={handleSelectedTransactionId}
                        onInputChange={(event, value) => {
                          if (!value) {
                            // perform operation when input is cleared
                            console.log("Input cleared");
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            autoComplete="off"
                            {...params}
                            InputProps={{
                              ...params.InputProps,
                              className: "text-white",
                            }}
                            InputLabelProps={{
                              ...params.InputLabelProps,
                              style: { color: "white" },
                            }}
                            className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            placeholder={`${t('Select Transaction Id')}`}
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
                  )}

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field3" className="text-secondary"> {t('Upload Documents')}</label>
                    <input
                      type="file"
                      id="field3"
                      onChange={handleFileChange}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                    {error && <p className="text-red-500">{error}</p>}
                  </div>
                </div>

                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <button
                    type="button"
                    className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseMemberPopup}
                  >
                    {t('Close')}
                  </button>
                  {/* <button
                                 type="button"
                                 onClick={handleAddCompany}
                                 className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                               >
                                 Add Brand
                               </button> */}
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                    onClick={handleAddMemberDocuments}
                    disabled={loading}
                    className="w-[70%] ml-2"
                    endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                  >
                    {t('Upload Documents')}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default AddMemberDocuments