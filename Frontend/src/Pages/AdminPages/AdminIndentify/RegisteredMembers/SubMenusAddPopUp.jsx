import React, { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import PhoneInput from 'react-phone-input-2';
import { useTranslation } from 'react-i18next';


const SubMenusAddPopUp = ({ isVisible, setVisibility, refreshSubMenus, userData }) => {
  // get the sesstion data
  const gs1MemberData = userData
  console.log(gs1MemberData)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [memberType, setMemberType] = useState('');
  const [password, setPassword] = useState('');
  const [memberStatus, setMemberStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleCloseSubMenusPopup = () => {
    setVisibility(false);
  };


  const handleAddSubMenus = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(gs1MemberData?.memberID);
      const response = await newRequest.post('/users/subuser', {
        "user_type": memberType,
        "password": password,
        "parent_memberID": gs1MemberData?.memberID?.toString(),
        "fname": firstName,
        "lname": lastName,
        "email": emailAddress,
        "mobile": mobileNumber,
        "cr_number": gs1MemberData?.cr_number,
        "cr_activity": gs1MemberData?.cr_activity,
      });

      toast.success(response?.data?.message || `${t('Sub Member Added Successfully')}`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      setLoading(false);

      console.log(response.data);
      refreshSubMenus();
      handleCloseSubMenusPopup();


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


      setLoading(false);
      console.log(error);
    }


  };


  return (
    <div>
      {/* create the post api popup */}
      {isVisible && (
        <div className="popup-overlay">
          <div className="popup-container h-auto sm:w-[45%] w-full">
            <div className="popup-form w-full">
              <form className='w-full' onSubmit={handleAddSubMenus}>
                <h2 className='text-secondary font-sans font-semibold text-2xl'>{t('Add Sub Member')}</h2>

                <div className="flex justify-center items-center sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field1" className="text-secondary">{t('First Name')}<span className='text-red-500'>*</span></label>
                    <input
                      type="text"
                      id="field1"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      placeholder={`${t('First Name')}`}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field2" className="text-secondary">{t('Last Name')} <span className='text-red-500'>*</span></label>
                    <input
                      type="text"
                      id="field2"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      placeholder={`${t('Last Name')}`}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>
                </div>

                <div className="flex justify-center items-center sm:gap-3 gap-3 mt-1">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field3" className="text-secondary"> {t('Email')} <span className='text-red-500'>*</span></label>
                    <input
                      type="text"
                      id="field3"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      required
                      placeholder={`${t('Email')}`}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field4" className="text-secondary">{t('Mobile (must omit 0)')} <span className='text-red-500'>*</span></label>
                    {/* <input
                                   type="number"
                                   id="field4"
                                        value={mobileNumber}
                                        onChange={(e) => setMobileNumber(e.target.value)}
                                   placeholder="Last Name"
                                   className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                 /> */}
                    <div className='border-1 border-t border-r border-b border-l w-full rounded-sm border-[#8E9CAB] mb-3'>
                      <PhoneInput
                        id="field4"
                        international
                        country={'sa'}
                        defaultCountry={'sa'}
                        value={mobileNumber}
                        onChange={setMobileNumber}
                        // onChange={(e) => setCompanyLandLine(e)}
                        inputProps={{
                          id: 'mobile',
                          placeholder: 'Mobile Number',
                        }}

                        inputStyle={{
                          width: '100%',
                          borderRadius: '0px',
                          border: 'none',
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center sm:gap-3 gap-3 mt-1">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field5" className="text-secondary">{t('Member Type')}</label>
                    <select
                      type="text"
                      id="field5"
                      value={memberType}
                      onChange={(e) => setMemberType(e.target.value)}
                      placeholder={`${t('Member Type')}`}
                      required
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    >
                      <option value="">-Select MemberType-</option>
                      <option value="operator">Operator</option>
                      <option value="moderator">Moderator</option>
                    </select>
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field6" className="text-secondary"> {t('Password')}</label>
                    <input
                      type="text"
                      id="field6"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={`${t('Password')}`}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>
                </div>

                <div className="flex justify-center items-center sm:gap-3 gap-3 mt-1">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field7" className="text-secondary">{t('Member Status')}</label>
                    <select
                      type="text"
                      id="field7"
                      value={memberStatus}
                      onChange={(e) => setMemberStatus(e.target.value)}
                      placeholder={`${t('Member Status')}`}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    >
                      <option value="">-{t('Status')}-</option>
                      <option value="active">{t('Active')}</option>
                      <option value="inactive">{t('Inactive')}</option>
                    </select>
                  </div>
                </div>

                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <button
                    type="button"
                    className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseSubMenusPopup}
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
                    type="submit"
                    disabled={loading}
                    className="w-[70%] ml-2"
                    endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                  >
                    {t('Submit')}
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

export default SubMenusAddPopUp