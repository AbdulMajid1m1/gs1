import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../../../utils/config';

const AdminTwoFactorAuthPopup = ({ isVisible, setVisibility }) => {
    let adminId=4;
    const [randomNumber, setRandomNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const { t } = useTranslation();
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const newSocket = io(backendUrl, { path: '/admin-socket/' }); // Ensure the path is correct for admin sockets

        setSocket(newSocket);

        return () => newSocket.disconnect();
    }, []);

    useEffect(() => {
        if (socket && isVisible) {
            socket.on('connect', () => {
                console.log('Connected to server as admin');
                socket.emit('registerAdmin', adminId); // Use the admin-specific registration event
            });

            socket.on('randomNumberForAdmin', (numbers) => {
                setRandomNumber(numbers); // Directly using numbers assuming it's a single value for simplicity
            });

            socket.on('authSuccess', ({ message, adminData, getCredentialsToken }) => {
                toast.success(`${t('Admin Login Successfully')}`);
                // Assuming you handle admin session setup here
                navigate('/admin/dashboard');
                setVisibility(false);
            });

            socket.on('authError', ({ message }) => {
                toast.error(message || `${t('Authentication failed! Try again')}`);
            });
        }
    }, [socket, adminId, isVisible, setVisibility, t, navigate]);

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
            socket.emit('sendRandomNumberToAdmin', { adminId, numbers: [Math.floor(Math.random() * 100).toString()] });
            setTimer(60); // Reset the timer
        }
    };

    return isVisible ? (
        <div className="popup-overlay">
            <div className="popup-container">
                <div className="popup-form">
                    <form>
                        <div className="text-center mt-4 mb-2">
                            <p>{t('Click "GENERATE" to create a new Random number.')}</p>
                        </div>
                        <div className="flex justify-center items-center h-14 w-14 rounded-full m-auto">
                            <h2>{randomNumber}</h2>
                        </div>
                        <div className="w-full flex justify-center mb-4 mt-4">
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={!buttonDisabled || loading}
                                endIcon={loading ? <CircularProgress size={24} /> : <SendIcon />}
                                onClick={generateRandomNumber}
                            >
                                {t('GENERATE AGAIN')}
                            </Button>
                        </div>
                        <div className="text-center">
                            <p>
                                {t('Number will regenerate in')} {timer} {t('seconds')}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ) : null;
};

export default AdminTwoFactorAuthPopup;
