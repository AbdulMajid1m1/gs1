import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';

const TwoFactorAuthPopup = ({ isVisible, setVisibility, userId, fetchMemberDocumentsData }) => {
    const [numbers, setNumbers] = useState([]);
    const [selectedNumber, setSelectedNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (isVisible) {
            // Generate random numbers
            const randomNumbers = [];
            for (let i = 0; i < 4; i++) {
                randomNumbers.push(Math.floor(Math.random() * 100));
            }
            setNumbers(randomNumbers);
        }
    }, [isVisible]);

    const handleGenerateCertificate = async (e) => {
        e.preventDefault();
        if (!selectedNumber) {
            toast.error(`${t('Please select a number to proceed')}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        setLoading(true);
        try {
            const response = await newRequest.post(`/memberDocuments/regenerateGcpCertificate`, {
                userId: userId
            });
            toast.success(`${t('Certificate generated successfully')}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setLoading(false);
            setVisibility(false);
            fetchMemberDocumentsData();
        } catch (err) {
            console.log(err);
            setLoading(false);
            toast.error(err?.response?.data?.error || `${t('Something went wrong!')}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <div>
            {isVisible && (
                <div className="popup-overlay">
                    <div className="popup-container h-auto sm:w-[40%] w-full">
                        <div className="popup-form w-full">
                            <form className='w-full' onSubmit={handleGenerateCertificate}>
                                <div className="text-center mt-4 mb-2">
                                    <p className="text-lg sm:text-xl text-gray-600">
                                        {t(`Click 'GENERATE' to create a new certificate for the member and send it to the member via email.`)}
                                    </p>
                                </div>
                                <div className="flex flex-col items-center mt-5 space-y-4">
                                    {numbers.map((number, index) => (
                                        <button
                                            key={index}
                                            className={`bg-primary text-white px-4 py-2 rounded-md`}
                                            onClick={() => setSelectedNumber(number)}
                                        >
                                            {number}
                                        </button>
                                    ))}
                                </div>
                                <div className="w-full flex justify-center mt-5">
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                                        type="submit"
                                        disabled={loading}
                                        endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                                    >
                                        {t('GENERATE')}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TwoFactorAuthPopup;
