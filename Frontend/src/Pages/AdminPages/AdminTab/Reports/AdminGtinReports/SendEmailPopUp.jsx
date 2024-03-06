import React, { useEffect, useState } from 'react'
import { Autocomplete, Button, CircularProgress, TextField, debounce } from '@mui/material';
import newRequest from '../../../../../utils/userRequest';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const SendEmailPopUp = ({ isVisible, setVisibility, assignUser, fetchData }) => {
    const { t, i18n } = useTranslation();
    const [loading, setIsLoading] = useState(false);
    const [subject, setSubject] = useState('');
    const [bccOptional, setBccOptional] = useState('');
    const [message, setMessage] = useState('');

    // Now you can retrieve the data and parse it when needed
    const storedData = sessionStorage.getItem('adminData');
    const adminData = JSON.parse(storedData);
    console.log(adminData);
    // console.log(assignUser);

    const closePopUp = () => {
        setVisibility(false)
    }


    const handleAssignToData = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await newRequest.post('/gtinHelperReports/sendEmailToGtinReporter', {
              "replyToEmail": adminData?.email,
              "subject": subject,
              "toEmail": assignUser?.reporter_email,
              "body": message
            });

            console.log(res?.data);
            toast.success(res?.data?.message ||`${t("Email Sent Successfully!")}`);
            setIsLoading(false);
            closePopUp();
            fetchData();

        } catch (err) {
            setIsLoading(false);
            console.log(err);
            toast.error(err?.response?.data?.error || 'Error in data');
        }
    }



    return (
        <div>
            {/* create the post api popup */}
            {isVisible && (
                <div className="popup-overlay z-50">
                    <div className="popup-container h-auto sm:w-[40%] w-full">
                        <div className="popup-form w-full">
                          <div className="flex justify-between w-full">
                             <h2 className='text-gray-500 font-body font-medium text-xl'> {t('Send Mail to Brand Owner')}</h2>
                                <button
                                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                    onClick={closePopUp}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <form onSubmit={handleAssignToData} className='w-full'>
                                <div className='mt-3'>
                                  <label htmlFor='subject' className="font-body text-sm text-secondary"> {t('Subject')}</label>
                                    <input
                                        id='subject'
                                        type='text'
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="w-full mt-1 border border-gray-300 rounded outline-none px-3 py-2"
                                        placeholder={`${t('Subject')}`}
                                        required
                                    />
                                </div>

                                <div className='mt-3'>
                                  <label htmlFor='bcc' className="font-body text-sm text-secondary">Bcc <span className='text-red-500'> {t('[Optional]')}</span></label>
                                    <input
                                        id='bcc'
                                        type='text'
                                        value={bccOptional}
                                        onChange={(e) => setBccOptional(e.target.value)}
                                        className="w-full mt-1 border border-gray-300 rounded outline-none px-3 py-2"
                                        placeholder='Bcc'
                                        // required
                                    />
                                </div>
                             
                                <div className='mt-3'>
                                    <label htmlFor='message' className="font-body text-sm text-secondary"> {t('Message')}</label>
                                    <textarea
                                        id='message'
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full h-28 mt-1 border border-gray-300 rounded outline-none px-3 py-2"
                                        placeholder={`${t('Enter your message here...')}`}
                                        required
                                    ></textarea>
                                </div>

                                <div className="flex justify-end mt-6 gap-2">
                                    <button
                                    className="px-6 py-1 font-medium text-white rounded bg-primary hover:bg-secondary focus:outline-none"
                                    type="button"
                                    onClick={closePopUp}
                                >
                                     {t('Cancel')}
                                </button>
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-3"
                                        endIcon={loading ? <CircularProgress size={24} color="inherit" /> : null}
                                    >
                                         {t('Send Mail')}
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

export default SendEmailPopUp