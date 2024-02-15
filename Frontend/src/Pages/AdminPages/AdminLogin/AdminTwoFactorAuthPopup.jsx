import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon for the close button
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';
import { backendUrl } from '../../../utils/config';
import { AuthContext } from '../../../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const TwoFactorAuthPopupForAdmin = ({ isVisible, setVisibility }) => {
    const { adminData } = useContext(AuthContext);
    const adminId = adminData?.id;
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [randomNumber, setRandomNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(8);

    useEffect(() => {
        if (!isVisible || !adminId) return;

        const newSocket = io(backendUrl, {
            path: '/socket.io',
            transports: ['websocket'],
        });

        newSocket.on('connect', () => {
            newSocket.emit('registerAdmin', { adminId });
        });

        newSocket.on('randomNumberForAdmin', (number) => {
            setRandomNumber(number);
        });

        newSocket.on('authSuccess', () => {
            toast.success(t('Admin Login Successfully'));
            setVisibility(false);
            navigate('/admin/dashboard');
        });

        newSocket.on('authError', ({ message }) => {
            toast.error(message || t('Authentication failed! Try again'));
            // regenerate random number
            generateRandomNumber();
        });

        const generateRandomNumber = () => {
            const randomNum = Math.floor(Math.random() * 100).toString().padStart(2, '0');
            newSocket.emit('sendRandomNumberToAdmin', { adminId, numbers: randomNum });
            setRandomNumber(randomNum);
            setTimer(8);
        };

        generateRandomNumber();

        return () => {
            newSocket.disconnect();
        };
    }, [isVisible, adminId, t, navigate, setVisibility]);

    useEffect(() => {
        let intervalId;
        if (isVisible) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isVisible]);

    return isVisible ? (
        <div className="popup-overlay">
            <div className="popup-container h-auto sm:w-[40%] w-full">
                <div className="popup-form w-full">
                    <Button
                        style={{ position: 'absolute', top: '10px', right: '10px' }}
                        onClick={() => {
                            console.log('Close button clicked');
                            setVisibility(false);
                        }}
                    >
                        <CloseIcon />
                    </Button>
                    <div className="text-center mt-4 mb-2">
                        <p className="text-lg sm:text-xl text-gray-600">{t("Click 'GENERATE' to create a new Random number.")}</p>
                    </div>
                    <div className="flex justify-center items-center h-14 w-14 bg-orange-400 rounded-full m-auto">
                        <h2 className="text-white text-4xl">{randomNumber}</h2>
                    </div>
                    <div className="w-full flex justify-center mb-4 mt-4">
                        <Button
                            variant="contained"
                            style={{ backgroundColor: timer > 0 ? '#ccc' : '#021f69', color: '#ffffff', cursor: timer > 0 ? 'not-allowed' : 'pointer' }}
                            disabled={loading || timer > 0}
                            endIcon={loading ? <CircularProgress size={24} /> : <SendIcon />}
                            onClick={() => {
                                setLoading(true);
                                // Simulate async operation
                                generateRandomNumber();
                                setTimeout(() => {
                                    setLoading(false);
                                    // Optionally, generate a new random number here
                                }, 500);
                            }}
                        >
                            {t('GENERATE AGAIN')}
                        </Button>
                    </div>
                    <div className="text-center">
                        <p className="text-secondary">{t('Number will regenerate in')} {timer} {t('seconds')}</p>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default TwoFactorAuthPopupForAdmin;
