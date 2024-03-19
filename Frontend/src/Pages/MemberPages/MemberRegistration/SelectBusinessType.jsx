import React, { useState } from 'react'
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import newRequest from '../../../utils/userRequest'
import { toast } from 'react-toastify'
import { DotLoader } from 'react-spinners'
import DropDownSelection from '../../UserPages/DropDownSelection/DropDownSelection'
import { useTranslation } from 'react-i18next';
import { Autocomplete, TextField } from '@mui/material'


const SelectBusinessType = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    // Static options for the Autocomplete component
    const options = [
        { label: `${t('Organization')}`, value: 'organization' },
        { label: `${t('Individual/Family Business')}`, value: 'individual/family business' },

    ];

    // State to hold the selected option, defaulting to 'Organization'
    const [entityType, setEntityType] = useState(options[0]);
    // Function to handle option selection
    const handleOptionChange = (event, newValue) => {
        setEntityType(newValue);
    };

    // Function to handle clicking on the "Continue" button
    const handleContinue = () => {
      sessionStorage.setItem('selectedBusinessType', JSON.stringify(entityType));
      navigate('/member-registration');
    };

    
  return (
    <div>
      <div className="sticky top-0 z-50 bg-white">
        <Header />
      </div>

      <div>
        <DropDownSelection />
      </div>

      <div className="flex justify-center items-center mt-5 mb-10">
        <div className="sm:h-[460px] h-72 w-[85%] border-l border-r border-b border-primary rounded-md shadow-xl">
          <div className="h-5 w-full bg-primary rounded-t-md"></div>
          {/* show this in center */}
          <div className="flex justify-center items-center h-[80%]">
            <div className="w-full sm:w-[40%] sm:px-0 px-4">
              <h2
                className={`text-2xl text-secondary font-semibold  py-5 -mt-5 ${
                  i18n.language === "ar" ? "text-end" : "text-start"
                }`}
              >
                {t("Member Registration")}
              </h2>
              <div className="flex flex-col gap-1">
                <label
                  className={`text-secondary font-bold ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                  htmlFor="entityType"
                >
                  {t("Business Type")}
                  <span className="text-red-600">*</span>
                </label>
                <Autocomplete
                  id="entityType"
                  options={options}
                  value={entityType}
                  getOptionLabel={(option) => option.label}
                  onChange={handleOptionChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="bg-gray-50 border border-gray-300 text-black text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                      placeholder={t("Select Business Type")}
                      InputProps={{
                        ...params.InputProps,
                        className: "text-black",
                        dir: i18n.language === "ar" ? "rtl" : "ltr", 
                      }}
                      InputLabelProps={{
                        ...params.InputLabelProps,
                        style: { color: "black" , textAlign: i18n.language === "ar" ? "end" : "left",},
                        
                      }}
                    />
                  )}
                />
                <button
                  // type='submit'
                  onClick={handleContinue}
                  className="bg-secondary text-white font-medium w-full sm:h-12 h-10 sm:text-base text-sm rounded-sm mt-5 hover:bg-primary"
                >
                  {t("Continue")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default SelectBusinessType