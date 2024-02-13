import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthContext'
import { backendUrl } from '../../../utils/config';
const AdminTwoFactorAuthPopup = ({ isVisible, setVisibility }) => {
    const [randomNumber, setRandomNumber] = useState('');
    const [timer, setTimer] = useState(60);
    const [buttonDisabled, setButtonDisabled] = useState(true); // Initially, button should be disabled
    const { t } = useTranslation();
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate();
    const { adminData, setAdminData, permissions, setPermissions,
        login, fetchPermissions } = useContext(AuthContext);
    let adminId = adminData?.id;
    console.log(adminId)
    useEffect(() => {
        if (!socket) {
            const newSocket = io(backendUrl);
            setSocket(newSocket);

            newSocket.on('connect', () => {
                console.log('Connected to server');
                // let adminId = 4; //TODO: Replace with the admin ID from the database

                newSocket.emit('registerAdmin', adminId);
            });

            newSocket.on('randomNumberForAdmin', (numbers) => {
                setRandomNumber(numbers);
                setButtonDisabled(false); // Enable button when number is received
            });

            newSocket.on('authSuccess', async ({ message, adminId, getCredentialsToken }) => {
                toast.success(message, {
                    position: "top-right",
                    autoClose: 2000,
                });

                // sessionStorage.setItem('adminData', JSON.stringify(adminData));
                try {

                    const response = await newRequest.post("/admin/setAdminCredentials", {
                        token: getCredentialsToken
                    })
                    console.log(response.data)
                    // sessionStorage.setItem('memberData', JSON.stringify(response?.data?.memberData));
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
                    navigate('/admin/dashboard');
                } catch (e) {
                    console.log(e)
                    toast.error(error?.response?.data?.error || 'something went wrong')
                }

                setVisibility(false);
            });

            newSocket.on('authError', ({ message }) => {
                toast.error(message || "something went wrong!", {
                    position: "top-right",
                    autoClose: 2000,
                });
            });

            return () => newSocket.disconnect();
        }
    }, [socket, adminId, navigate, setVisibility, t]);

    useEffect(() => {
        let interval;
        if (isVisible) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer > 0 ? prevTimer - 1 : 0);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isVisible]);

    const generateRandomNumber = () => {
        if (socket) {
            socket.emit('sendRandomNumberToAdmin', { adminId: adminId, numbers: [Math.floor(Math.random() * 100).toString()] });
            setTimer(60); // Reset timer
        }
    };

    return (
        isVisible && (
            <div className="popup-overlay">
                <div className="popup-container h-auto sm:w-[40%] w-full bg-white rounded-lg shadow-lg">
                    <div className="popup-header p-5 border-b border-gray-200">
                        <h2 className="text-2xl font-semibold">{t('Admin Two-Factor Authentication')}</h2>
                    </div>
                    <div className="popup-body p-5">
                        <div className="flex flex-col items-center justify-center">
                            <p className="mb-4 text-lg">{t('Your authentication number is')}</p>
                            <div className="flex justify-center items-center h-14 w-14 bg-blue-500 rounded-full m-auto mb-4">
                                <span className="text-2xl text-white font-bold">{randomNumber}</span>
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={buttonDisabled}
                                onClick={generateRandomNumber}
                                endIcon={<SendIcon />}
                            >
                                {t('Generate New Number')}
                            </Button>
                            <p className="mt-4">
                                {t('Number will regenerate in')} {timer} {t('seconds')}
                            </p>
                        </div>
                    </div>
                    <div className="popup-footer p-5 border-t border-gray-200 flex justify-end">
                        <Button onClick={() => setVisibility(false)} color="secondary">
                            {t('Close')}
                        </Button>
                    </div>
                </div>
            </div>
        )
    );
};

export default AdminTwoFactorAuthPopup;
