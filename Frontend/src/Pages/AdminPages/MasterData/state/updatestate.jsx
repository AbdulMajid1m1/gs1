import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { Autocomplete, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
const Updatestate = ({ isVisible, setVisibility, refreshBrandData }) => {
  const { t, i18n } = useTranslation();
  // get this session data
  const updateBrandData = JSON.parse(sessionStorage.getItem("updateBrandData"));
  console.log(updateBrandData)
  const [name, setname] = useState(updateBrandData?.name || '');
  const [name_ar, setname_ar] = useState(updateBrandData?.name_ar || "");
  const [country_id, setcountry_id] = useState(updateBrandData?.country_id || 0);
  const [loading, setLoading] = useState(false);
  const [docuements, setDocuments] = React.useState([])
  const [selectedDocuments, setSelectedDocuments] = useState(updateBrandData?.state_name || 0);

  const handleCloseUpdatePopup = () => {
    setVisibility(false);
  };


  useEffect(() => {
    const getDocuments = async () => {
      try {
        const response = await newRequest.get('/address/getAllCountriesName');
        console.log(response.data);
        setDocuments(response.data);
      } catch (error) {
        console.log(error);
      }
    };



    getDocuments();

  }, []);
  const handleSelectedDocuments = (event, value) => {
    console.log(value?.id);
    setSelectedDocuments(value);
  };

  const handleUpdateBrand = async () => {
    // console.log(brandUserId);
    setLoading(true);

    try {
      const response = await newRequest.put(`/address/updateStates/${updateBrandData?.id}`, {
        name: name,
        country_id: Number(selectedDocuments?.id),
        name_ar: name_ar,
      });

      toast.success(response?.data?.message || `${t('State')} ${t('has been')} ${t('Updated Successfully')}.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      console.log(response.data);
      refreshBrandData();
      handleCloseUpdatePopup();

    } catch (error) {
      toast.error(error?.response?.data?.message || `${t('Something went wrong')}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      console.log(error);
    }
    finally {
      setLoading(false);
    }




  };


  return (
    <div>
      {isVisible && (
        <div className="popup-overlay">
          <div className="popup-container h-auto sm:w-[45%] w-full">
            <div className="popup-form w-full">
              <form className='w-full'>
                <h2 className='text-secondary font-sans font-semibold text-2xl'>{t('Update')} {t('State')}</h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">{t('State')} {t('Name [English]')}</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      //   readOnly
                      placeholder={`${t('Enter')} ${t('state name')}`}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label htmlFor="field1" className="text-secondary">{t('State')} {t('Name Arabic')}</label>
                  <input
                    type="text"
                    id="name"
                    value={name_ar}
                    onChange={(e) => setname_ar(e.target.value)}
                    placeholder={`${t('Enter')} ${t('State')} ${t('Name Arabic')}`}
                    className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                  />
                </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">{t('Select Country')}</label>
                    <Autocomplete
                      id="field1"
                      options={docuements}
                      value={selectedDocuments}
                      getOptionLabel={(option) => option?.name_en || ""}
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
                          placeholder={`${t('Select Country')}`}
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
                </div>


                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <button
                    type="button"
                    className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseUpdatePopup}
                  >
                    {t('Close')}
                  </button>
                  {/* <button
                                type="button"
                                onClick={handleUpdateBrand}
                                className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                              >
                                Update Brand
                              </button> */}
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                    onClick={handleUpdateBrand}
                    disabled={loading}
                    className="w-[70%] ml-2"
                    endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                  >
                    {t('Update')} {t('State')}
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

export default Updatestate