import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';
import { backendUrl } from '../../../../utils/config';
import newRequest from '../../../../utils/userRequest';
import { useNavigate } from 'react-router-dom'

const TwoFactorAuthPopup = ({ isVisible, setVisibility, userId }) => {
    console.log(userId)
    const [randomNumber, setRandomNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const { t, i18n } = useTranslation();
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const newSocket = io(backendUrl); // Connect to the server

        setSocket(newSocket);

        return () => {
            newSocket.disconnect(); // Disconnect when component unmounts
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('connect', () => {
                console.log('Connected to server');
                let userId = 3 // Replace with the user ID from the database
                socket.emit('register', userId); // Register user ID with the server
                setTimeout(() => {

                    generateRandomNumber(); // Generate random number when the component becomes visible
                }, 1000)
            });

            socket.on('randomNumber', (numbers) => {
                const randomNumber = numbers.find(number => number.isCorrect).number;
                setRandomNumber(randomNumber); // Update the random number when received from the server
            });

            socket.on('authSuccess', async ({ message, memberData, getCredentialsToken }) => {
                console.log("authSuccess")

                try {

                    const response = await newRequest.post("/users/setMemberCredentials", {
                        token: getCredentialsToken
                    })
                    console.log(response.data)
                    sessionStorage.setItem('memberData', JSON.stringify(response?.data?.memberData));
                    toast.success(`${t('Member Login Successfully')}`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    navigate('/member/dashboard');

                } catch (e) {
                    console.log(e)
                    toast.error(error?.response?.data?.error || 'something went wrong')
                }
                setVisibility(false);
            });

            socket.on('authError', ({ message }) => {
                // Handle authentication failure with the exact message received from the server
                toast.error(message || 'Authentication failed! Try again');
                // generateRandomNumber(); // Regenerate random number
            });


        }
    }, [socket, userId, setVisibility]);

    useEffect(() => {
        if (isVisible) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer > 0) {
                        return prevTimer - 1;
                    } else {
                        setButtonDisabled(true);
                        return prevTimer;
                    }
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isVisible]);

    const generateRandomNumber = () => {
        if (socket) {
            const randomNum = Math.floor(Math.random() * 100).toString().padStart(2, '0');
            setRandomNumber(randomNum);
            socket.emit('sendRandomNumber', { userId: 3, numbers: randomNum });
            setTimer(60);
            setButtonDisabled(false);
        }
    };

    const handleGenerateCertificate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {

            setTimeout(() => {
                toast.success(`${t('Certificate generated successfully')}`, {
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
                setVisibility(false);
            }, 2000);
        } catch (err) {
            console.log(err);
            setLoading(false);
            toast.error(err?.response?.data?.error || `${t('Something went wrong!')}`, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    };

    return (
        <div>
            {isVisible && (
                <div className="popup-overlay">
                    <div className="popup-container h-auto sm:w-[40%] w-full">
                        <div className="popup-form w-full">
                            <form className="w-full" onSubmit={handleGenerateCertificate}>
                                <div className="text-center mt-4 mb-2">
                                    <p className="text-lg sm:text-xl text-gray-600">
                                        {t(`Click 'GENERATE' to create new Random number.`)}
                                    </p>
                                </div>
                                <div className="flex justify-center items-center h-14 w-14 bg-orange-400 rounded-full m-auto">
                                    <h2 className="text-white text-4xl">{randomNumber}</h2>
                                </div>
                                <div className="w-full flex justify-center mb-4 mt-4">
                                    <Button
                                        variant="contained"
                                        style={{
                                            backgroundColor: buttonDisabled ? '#021F69' : 'lightgray', color: '#ffffff',
                                            cursor: buttonDisabled ? "pointer" : "not-allowed"
                                        }}
                                        type="submit"
                                        disabled={loading || !buttonDisabled}
                                        endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                                        onClick={generateRandomNumber}
                                    >
                                        {t('GENERATE AGAIN')}
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

export default TwoFactorAuthPopup;
