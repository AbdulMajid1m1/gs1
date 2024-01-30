import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';

const MemberGenerateCertificatePopup = ({ isVisible, setVisibility, userId, fetchMemberDocumentsData }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { t, i18n } = useTranslation();
    // get the sesstion data

    const handleGenerateCertificate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {

            // psot api {{v2gs1Local}}/memberDocuments/regenerateGcpCertificate wiht userId in body
            const response = await newRequest.post(`/memberDocuments/regenerateGcpCertificate`, {
                userId: userId
            });
            console.log(response.data);
            toast.success( `${t('Certificate generated successfully')}`, {
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
            fetchMemberDocumentsData()
        } catch (err) {
            console.log(err);
            setLoading(false);
            toast.error(err?.response?.data?.error || `${t('Something went wrong!')}` , {
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
            {/* create the post api popup */}
            {isVisible && (
                <div className="popup-overlay">
                    <div className="popup-container h-auto sm:w-[40%] w-full">
                        <div className="popup-form w-full">
                            <form className='w-full' onSubmit={handleGenerateCertificate}>


                                <div className="text-center mt-4 mb-2">
                                    <p className="text-lg sm:text-xl text-gray-600">
                                        {t(`Click 'GENERATE' to create new certificate for the member and send it to the member via email.`)}
                                    </p>
                                </div>

                                <div className="w-60% flex flex-col sm:flex-row justify-center items-center gap-8 mt-5">
                                    <button
                                        type="button"
                                        className="px-5 py-2 w-[40%] sm:w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                                        onClick={() => setVisibility(false)}
                                    >
                                        {t('Close')}
                                    </button>
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                                        type="submit"
                                        // disabled={loading}
                                        className="w-[40%] sm:w-[30%] ml-2"
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
    )
}

export default MemberGenerateCertificatePopup