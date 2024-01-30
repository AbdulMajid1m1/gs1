import React, { useState } from 'react'
import { I18nextProvider, useTranslation } from "react-i18next";
import AdminDashboardRightHeader from '../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader'
import { Autocomplete, TextField } from '@mui/material';

const AddRoles = () => {
  const { t, i18n } = useTranslation();
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [industryTypes, setIndustryTypes] = useState([
    'Admin',
    'member',
    'User',
    'Migrations',
  ]);

  const handleIndustryTypeChange = (event, value) => {
    setSelectedIndustries(value);
    console.log(value);
    setSelectAll(false); // Uncheck "Select All" when individual options are selected/deselected
  };

  // State variables
  const [selectAll, setSelectAll] = useState(false);
  // Function to handle the change of the "Select All" checkbox
  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;

    // If "Select All" is checked, set all options as selected; otherwise, clear selections
    setSelectedIndustries(isChecked ? industryTypes : []);
    setSelectAll(isChecked);
  };


  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        <div>
          <AdminDashboardRightHeader title={`${t('Add Role')}`} />
        </div>

        <div className="flex flex-col justify-center items-center p-4">
          <div className="h-auto w-full p-5 bg-white">
            <div className="">
              <div className={`w-full font-body p-6 shadow-xl rounded-md text-black bg-[#C3E2DC] text-xl mb:2 md:mb-5 ${i18n.language === 'ar' ? 'text-end' : 'text-start'}`}>
                <div className="flex justify-start flex-col gap-2 text-xs sm:text-sm">
                  <p className="font-semibold"> {t('Complete Data')}</p>
                  <p>
                    {t('This number is registered to company')}: :{" "}
                    {/* <span className="font-semibold">{memberData?.company_name_eng}</span> */}
                    <span className="font-semibold">Hasnain, Majid</span>
                  </p>
                </div>
              </div>
            </div>

            {/* <form onSubmit={handleFormSubmit}> */}
            <form>
              <div className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:mt-0 mt-4">
                <div className="sm:w-[40%] h-20 w-full font-body sm:text-base text-sm flex flex-col gap-1">
                  <label htmlFor="fields1" className="text-secondary font-semibold">  {t('Role Name')}</label>
                  <input
                    type="text"
                    id="fields1"
                    className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                    placeholder={'Role Name'}
                  />
                </div>

                <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                  <label className='text-secondary font-semibold' htmlFor='SelectRoles'>   {t('Select Roles')}</label>
                  <Autocomplete

                    multiple
                    id='SelectRoles'
                    options={industryTypes}
                    getOptionLabel={(option) => option}
                    value={selectedIndustries}
                    onChange={handleIndustryTypeChange}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField


                        autoComplete="off"
                        {...params}
                        label='Select Roles'
                        placeholder='Select Roles'
                        variant='outlined'
                      />
                    )}
                    required
                  />
                  <div className=''>
                    <label>
                      <input
                        type='checkbox'
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                      />
                      {t('Select All')}
                    </label>
                  </div>
                </div>

              </div>
              {/*Add Button  */}
              <div className={`flex mt-10 ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}>
                <button
                  type="submit"
                  className="bg-secondary px-8 py-2 text-white font-semibold text-sm rounded-sm p-2 mt-2 hover:bg-primary transition duration-200"
                >
                  {t('Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddRoles