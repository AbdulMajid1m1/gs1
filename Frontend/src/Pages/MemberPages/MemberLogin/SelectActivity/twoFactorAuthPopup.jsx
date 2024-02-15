import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon for the close button
import { backendUrl } from '../../../../utils/config';
import newRequest from '../../../../utils/userRequest';
import { useNavigate } from 'react-router-dom';

const TwoFactorAuthPopup = ({ isVisible, setIsvisible }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('MemberUserId');

    const [randomNumber, setRandomNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(2);
    const [socket, setSocket] = useState(null);

    // Initialize and manage socket connection
    useEffect(() => {
        if (!isVisible) return;

        const newSocket = io(backendUrl, {
            path: '/socket.io',
            transports: ['websocket'],
        });

        newSocket.on('connect', () => {
            console.log('Connected to server');
            newSocket.emit('register', { userId, clientType: 'web' });
        });

        newSocket.on('randomNumber', (number) => {
            setRandomNumber(number);
        });

        newSocket.on('authSuccess', async (data) => {
            try {
                const response = await newRequest.post("/users/setMemberCredentials", {
                    token: data.getCredentialsToken,
                });
                sessionStorage.setItem('memberData', JSON.stringify(response.data.memberData));
                toast.success(t('Member Login Successfully'));
                navigate('/member/dashboard');
                setIsvisible(false);
            } catch (error) {
                console.error(error);
                toast.error(t('Something went wrong!'));
            }
        });

        newSocket.on('authError', ({ message }) => {
            toast.error(message || t('Authentication failed! Try again'));
            // regenerate random number
            const randomNum = Math.floor(Math.random() * 100).toString().padStart(2, '0');
            newSocket.emit('sendRandomNumber', { userId, numbers: randomNum });
            setRandomNumber(randomNum);
            setTimer(2);

        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [isVisible, t, navigate, setIsvisible, userId]);

    // Generate random number
    useEffect(() => {
        if (socket && isVisible) {
            const randomNum = Math.floor(Math.random() * 100).toString().padStart(2, '0');
            socket.emit('sendRandomNumber', { userId, numbers: randomNum });
            setRandomNumber(randomNum);
            setTimer(2);
        }
    }, [socket, userId, isVisible]);

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
                    <Button
                        style={{ position: 'absolute', top: '10px', right: '10px' }}
                        onClick={() => setIsvisible(false)}
                    >
                        <CloseIcon />
                    </Button>
                    <div className="text-center mt-4 mb-2">
                        <p className="text-lg sm:text-xl text-gray-20">{t("Click 'GENERATE' to create new Random number.")}</p>
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
                                // Call the function to generate a new random number
                                setTimeout(() => {
                                    setLoading(false);
                                    const randomNum = Math.floor(Math.random() * 100).toString().padStart(2, '0');
                                    socket.emit('sendRandomNumber', { userId, numbers: randomNum });
                                    setRandomNumber(randomNum);
                                    setTimer(2);
                                }, 500); // Simulate network request time
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
    );
};

export default TwoFactorAuthPopup;
