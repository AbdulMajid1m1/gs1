
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../../../utils/config';
import newRequest from '../../../utils/userRequest';

const TwoFactorAuthPopupForAdmin = ({ isVisible, setVisibility, adminId = "1" }) => {
    const [randomNumber, setRandomNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const { t } = useTranslation();
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const newSocket = io(backendUrl); // Connect to the server

        setSocket(newSocket);

        return () => {
            newSocket.disconnect(); // Disconnect when component unmounts
        };
    }, [backendUrl]);

    useEffect(() => {
        if (socket && isVisible) {
            socket.on('connect', () => {
                console.log('Connected to server');
                socket.emit('registerAdmin', adminId); // Register admin ID with the server
            });
            setTimeout(() => {

                generateRandomNumber(); // Generate random number when the component becomes visible
            }, 1000)
            socket.on('randomNumberForAdmin', (numbers) => {
                const randomNumber = numbers.toString(); // Adjust based on how numbers are sent
                setRandomNumber(randomNumber); // Update the random number when received from the server
            });

            socket.on('authSuccess', async ({ message, adminData, getCredentialsToken }) => {
              
                try {

                    const response = await newRequest.post("/admin/setAdminCredentials", {
                        token: getCredentialsToken
                    })
                    console.log(response.data)
                    toast.success(`${t('Admin Login Successfully')}`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    
                    setVisibility(false);
                 
                    navigate('/admin/dashboard');
                } catch (e) {
                    console.log(e)
                    toast.error(error?.response?.data?.error || 'something went wrong')
                }


            });


            socket.on('authError', ({ message }) => {
                toast.error(message || 'Authentication failed! Try again');
            });
        }
    }, [socket, adminId, setVisibility, isVisible, navigate]);

    useEffect(() => {
        if (isVisible) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer > 0 ? prevTimer - 1 : 0);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isVisible]);
    const generateRandomNumber = () => {
        if (socket) {
            const randomNum = Math.floor(Math.random() * 100).toString().padStart(2, '0');
            setRandomNumber(randomNum);
            socket.emit('sendRandomNumberToAdmin', { adminId, numbers: randomNum });
            setTimer(60);
            setButtonDisabled(false);
        }
    };


    // This function simulates a placeholder action, adjust as necessary
    const handleAction = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Placeholder success action, replace with actual logic as needed
        setTimeout(() => {
            setLoading(false);
            setVisibility(false); // Close the popup
        }, 2000);
    };

    return (
        <div>
            {isVisible && (
                <div className="popup-overlay">
                    <div className="popup-container h-auto sm:w-[40%] w-full">
                        <div className="popup-form w-full">
                            <form className="w-full" onSubmit={handleAction}>
                                <div className="text-center mt-4 mb-2">
                                    <p className="text-lg sm:text-xl text-gray-600">
                                        {t('Click "GENERATE" to create a new random number.')}
                                    </p>
                                </div>
                                <div className="flex justify-center items-center h-14 w-14 bg-orange-400 rounded-full m-auto">
                                    <h2 className="text-white text-4xl">{randomNumber}</h2>
                                </div>
                                <div className="w-full flex justify-center mb-4 mt-4">
                                    <Button
                                        variant="contained"
                                        disabled={loading || timer > 0}
                                        endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                                        onClick={generateRandomNumber}
                                    >
                                        {loading ? t('Loading...') : t('GENERATE AGAIN')}
                                    </Button>
                                </div>
                                <div className="text-center">
                                    <p className="text-secondary">
                                        {t('Number will regenerate in')} {timer} {t('seconds')}
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TwoFactorAuthPopupForAdmin;
