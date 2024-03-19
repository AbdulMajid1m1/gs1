import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import { Autocomplete, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
const AddCity = ({ isVisible, setVisibility, refreshBrandData }) => {
  const [name, setName] = useState("");
  const [name_ar, setname_ar] = useState("");
  const [docuements, setDocuments] = React.useState([])
  const [selectedDocuments, setSelectedDocuments] = useState("");
  const [SelectedCountryId, setSelectedCountryId] = useState("");

  const handleCloseCreatePopup = () => {
    setVisibility(false);
  };
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const getDocuments = async () => {
      try {
        const response = await newRequest.get('/address/getAllStatesName');
        // console.log(response.data);
        setDocuments(response.data);
      } catch (error) {
        // console.log(error);
      }
    };



    getDocuments();

  }, []);
  const handleSelectedDocuments = (event, value) => {
    // console.log(value?.id);
    setSelectedCountryId(value?.id)
    setSelectedDocuments(value);
  };
  const handleAddCompany = async () => {
    //  integrate the post api in try catch blcck
    try {
      const response = await newRequest.post("/address/createCities/", {
        name: name,
        state_id: SelectedCountryId,
        name_ar: name_ar,
      });

      toast.success(`${t('Cities')} ${name} ${t('has been added successfully')}.`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });


      // console.log(response.data);
      refreshBrandData();
      handleCloseCreatePopup();


    } catch (error) {
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


      // console.log(error);
    }


  };


  return (
    <div>
      {/* create the post api popup */}
      {isVisible && (
        <div className="popup-overlay">
          <div className="popup-container h-auto sm:w-[45%] w-full">
            <div className="popup-form w-full">
              <form className='w-full'>
                <h2 className={`text-secondary font-sans font-semibold text-2xl ${i18n.language === "ar" ? "text-end" : "text-start"
                                    }`}>{t('Add')} {t('city')}</h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                      }`}>{t('City')} {t('Name [English]')}</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={`${t('Enter')} ${t('City')} ${t('Name [English]')}`}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                      }`}>{t('city')} {t('Name Arabic')}</label>
                    <input
                      type="text"
                      id="name"
                      value={name_ar}
                      onChange={(e) => setname_ar(e.target.value)}
                      placeholder={`${t('Enter')} ${t('City')} ${t('Name Arabic')}`}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                      }`}>{t('Select State')}</label>

                    <Autocomplete
                      id="field1"
                      options={docuements}
                      value={selectedDocuments}
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={handleSelectedDocuments}
                      onInputChange={(event, value) => {
                        if (!value) {
                          // perform operation when input is cleared
                          // console.log("Input cleared");
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          autoComplete="off"
                          {...params}
                          InputProps={{
                            ...params.InputProps,
                            className: "text-white",
                             dir: i18n.language === "ar" ? "rtl" : "ltr",
                          }}
                          InputLabelProps={{
                            ...params.InputLabelProps,
                            style: { color: "white" },
                          }}
                          className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"

                          placeholder={`${t('Select State')}`}
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
                    onClick={handleCloseCreatePopup}
                  >
                    {t('Close')}
                  </button>
                  <button
                    type="button"
                    onClick={handleAddCompany}
                    className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                  >
                    {t('Add')} {t('city')}
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

export default AddCity