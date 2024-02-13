import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Button, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';
import { backendUrl } from '../../../../utils/config';
import newRequest from '../../../../utils/userRequest';
import { useNavigate } from 'react-router-dom';

const TwoFactorAuthPopup = ({ isVisible, setVisibility }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('MemberUserId');

    const [randomNumber, setRandomNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [socket, setSocket] = useState(null);

    // Initialize socket connection
    useEffect(() => {
        if (!isVisible) return;

        const newSocket = io(backendUrl, {
            path: '/socket.io', // Update this if your server requires a specific socket path
            transports: ['websocket'], // Use WebSocket transport to avoid issues in some environments
        });
        setSocket(newSocket);

        return () => newSocket.disconnect();
    }, [isVisible]);

    // Socket event listeners
    useEffect(() => {
        if (!socket || !isVisible) return;

        socket.on('connect', () => {
            console.log('Connected to server');
            socket.emit('register', userId);
            generateRandomNumber();
        });

        socket.on('randomNumber', (numbers) => {
            const number = numbers.find(number => number.isCorrect).number;
            setRandomNumber(number);
        });

        socket.on('authSuccess', async (data) => {
            try {
                const response = await newRequest.post("/users/setMemberCredentials", {
                    token: data.getCredentialsToken,
                });
                sessionStorage.setItem('memberData', JSON.stringify(response.data.memberData));
                toast.success(t('Member Login Successfully'));
                navigate('/member/dashboard');
            } catch (error) {
                console.error(error);
                toast.error(t('Something went wrong!'));
            } finally {
                setVisibility(false);
            }
        });

        socket.on('authError', ({ message }) => {
            toast.error(message || t('Authentication failed! Try again'));
        });

    }, [socket, userId, isVisible, navigate, setVisibility, t]);

    // Generate random number
    const generateRandomNumber = useCallback(() => {
        if (!socket) return;
        const randomNum = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        socket.emit('sendRandomNumber', { userId, numbers: randomNum });
        setRandomNumber(randomNum);
        setTimer(60);
    }, [socket, userId]);

    // Timer countdown
    useEffect(() => {
        if (!isVisible) return;
        const intervalId = setInterval(() => {
            setTimer(prevTimer => prevTimer > 0 ? prevTimer - 1 : 0);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isVisible]);

    return isVisible && (
        <div className="popup-overlay">
            <div className="popup-container h-auto sm:w-[40%] w-full">
                <div className="popup-form w-full">
                    <div className="text-center mt-4 mb-2">
                        <p className="text-lg sm:text-xl text-gray-600">{t("Click 'GENERATE' to create new Random number.")}</p>
                    </div>
                    <div className="flex justify-center items-center h-14 w-14 bg-orange-400 rounded-full m-auto">
                        <h2 className="text-white text-4xl">{randomNumber}</h2>
                    </div>
                    <div className="w-full flex justify-center mb-4 mt-4">
                        <Button
                            variant="contained"
                            style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                            disabled={loading || timer > 0}
                            endIcon={loading ? <CircularProgress size={24} /> : <SendIcon />}
                            onClick={generateRandomNumber}
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
    );
};

export default TwoFactorAuthPopup;
