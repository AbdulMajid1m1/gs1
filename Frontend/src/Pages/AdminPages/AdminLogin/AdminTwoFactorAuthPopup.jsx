import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon for the close button
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';
import { backendUrl } from '../../../utils/config';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../../utils/userRequest';
import { QRCodeSVG } from "qrcode.react";

const TwoFactorAuthPopupForAdmin = ({ isVisible, toggleVisibility, adminData }) => {
    const [number, setNumber] = useState(''); // Number input state
    const adminId = adminData?.id; // admin id from adminData for socket connection
    const navigate = useNavigate();
    const [randomNumber, setRandomNumber] = useState('');
    let duration = 30;
    const [timer, setTimer] = useState(duration)
    const [socket, setSocket] = useState(null);
    const { t } = useTranslation();
    useEffect(() => {
        if (!isVisible || !adminId) return;

        const newSocket = io(backendUrl, {
            path: '/socket.io',
            transports: ['polling'],
        });

        newSocket.on('connect', () => {
            newSocket.emit('registerAdmin', { adminId });
        });

        newSocket.on('randomNumberForAdmin', (number) => {
            setRandomNumber(number);
        });

        newSocket.on('authSuccess', async (data) => {

            try {
                const response = await newRequest.post("/admin/setAdminCredentials", {
                    token: data.getCredentialsToken,
                });
                toast.success(t('Admin Login Successfully'));
                toggleVisibility(false);
                navigate('/admin/dashboard');

            } catch (error) {
                console.error(error);
                toast.error(t('Something went wrong!'));
            }


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
            <div className="popup-container h-auto sm:w-[50%] w-full">
                <div className="popup-form w-full">
                    <Button
                        style={{ position: 'absolute', top: '10px', right: '10px' }}
                        onClick={() => {
                            // console.log('Close button clicked');
                            toggleVisibility(false);
                        }}
                    >
                        <CloseIcon />
                    </Button>

                    <div className='flex flex-col md:flex-row justify-center items-center'>
                        <div className='flex flex-col justify-center items-center gap-3 mt-6'>
                            <QRCodeSVG value={"https://play.google.com/store/apps/details?id=com.adminauthenticator86"} width="105" height="90" />
                            <button className="rounded-full bg-secondary font-body px-4 py-1 text-xs text-white transition duration-200 hover:bg-primary">
                                <i className="fab fa-android ml-1"></i>  for andriod
                            </button>
                            <p className='text-sm text-center text-red-600 font-medium'>Install GS1 Authenticator</p>
                        </div>

                        <div>
                            <div className="text-center mt-4 mb-2">
                                <p className="text-lg sm:text-xl text-secondary font-medium">Tap the Number from your GS1 Authenticator App</p>
                            </div>
                            <div className="flex justify-center items-center h-14 w-14 bg-orange-400 rounded-full m-auto">
                                <h2 className="text-white text-4xl">{randomNumber}</h2>
                            </div>

                            <div className="text-center">
                                <p className="text-secondary">{t('Number will regenerate in')} {timer} {t('seconds')}</p>
                            </div>
                        </div>

                        <div className='flex flex-col justify-center items-center gap-3 mt-6'>
                            <QRCodeSVG value={"https://play.google.com/store/apps/details?id=com.adminauthenticator86"} width="105" height="90" />
                            <button className="rounded-full bg-secondary font-body px-4 py-1 text-xs text-white transition duration-200 hover:bg-primary">
                                <i className="fab fa-apple ml-1"></i> for IOS
                            </button>
                            <p className='text-sm text-center text-red-600 font-medium'>Install GS1 Authenticator</p>
                        </div>

                        <input type="number"
                            onChange={(e) => {
                                setNumber(e.target.value);
                            }
                            }
                        />

                        <button onClick={() => {
                            // emit socket event
                            if (socket) {

                                socket.emit('verifyAdminNumber', { adminId, selectedNumber: number });
                                // setRandomNumber(randomNum);
                                setTimer(duration);
                            }
                        }
                        } >{t('send Number')}



                        </button>

                    </div>
                </div>
            </div>
        </div >
    )
};

export default TwoFactorAuthPopupForAdmin;
