import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon for the close button
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';
import { backendUrl } from '../../../utils/config';
import { useNavigate } from 'react-router-dom';

const TwoFactorAuthPopupForAdmin = ({ isVisible, toggleVisibility, adminData }) => {

    const adminId = adminData?.id; // admin id from adminData for socket connection
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [randomNumber, setRandomNumber] = useState('');
    let duration = 30;
    const [timer, setTimer] = useState(duration)
    const [socket, setSocket] = useState(null);
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
            toggleVisibility(false);
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
            setTimer(duration);
        };

        generateRandomNumber();
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, [isVisible, adminId, navigate]);

    useEffect(() => {
        let intervalId;
        if (isVisible && socket) { // Ensure socket is not null
            intervalId = setInterval(() => {
                setTimer(prevTimer => {
                    const newTimer = prevTimer > 0 ? prevTimer - 1 : 0;
                    if (newTimer === 0) {
                        // Before emitting, check if the socket is not null
                        if (socket) {
                            const randomNum = Math.floor(Math.random() * 100).toString().padStart(2, '0');
                            socket.emit('sendRandomNumberToAdmin', { adminId, numbers: randomNum });
                            setRandomNumber(randomNum);
                        }
                        return duration; // Reset timer
                    }
                    return newTimer; // Update timer
                });
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isVisible, socket, duration, adminId]); // Add socket to the dependency array



    return (
        <div className="popup-overlay">
            <div className="popup-container h-auto sm:w-[40%] w-full">
                <div className="popup-form w-full">
                    <Button
                        style={{ position: 'absolute', top: '10px', right: '10px' }}
                        onClick={() => {
                            console.log('Close button clicked');
                            toggleVisibility(false);
                        }}
                    >
                        <CloseIcon />
                    </Button>
                    <div className="text-center mt-4 mb-2">
                        <p className="text-lg sm:text-xl text-gray-600">{t("Select the number you see on your mobile")}</p>
                    </div>
                    <div className="flex justify-center items-center h-14 w-14 bg-orange-400 rounded-full m-auto">
                        <h2 className="text-white text-4xl">{randomNumber}</h2>
                    </div>

                    <div className="text-center">
                        <p className="text-secondary">{t('Number will regenerate in')} {timer} {t('seconds')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TwoFactorAuthPopupForAdmin;
