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
import { QRCodeSVG } from "qrcode.react";

const TwoFactorAuthPopup = ({ isVisible, setIsvisible }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('MemberUserId');
    let duration = 30;
    const [randomNumber, setRandomNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(duration);
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
            setTimer(duration);

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
            setTimer(duration);
        }
    }, [socket, userId, isVisible]);

    // Timer countdown
    useEffect(() => {
        if (!isVisible) return;

        const intervalId = setInterval(() => {
            setTimer(prevTimer => {
                // Decrease timer by 1 every second
                const newTimer = prevTimer > 0 ? prevTimer - 1 : 0;

                // When timer reaches 0, regenerate random number and reset timer
                if (newTimer === 0) {
                    const randomNum = Math.floor(Math.random() * 100).toString().padStart(2, '0');
                    socket.emit('sendRandomNumber', { userId, numbers: randomNum });
                    setRandomNumber(randomNum);
                    return duration; // Reset timer
                }

                return newTimer; // Update timer
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isVisible, duration, socket, userId, setRandomNumber]);



    return isVisible && (
        <div className="popup-overlay">
            <div className="popup-container h-auto sm:w-[50%] w-full">
                <div className="popup-form w-full">
                    <Button
                        style={{ position: 'absolute', top: '10px', right: '10px' }}
                        onClick={() => setIsvisible(false)}
                    >
                        <CloseIcon />
                    </Button>
                    
                    <div className='flex flex-col md:flex-row justify-center items-center'>
                      <div className='flex flex-col justify-center items-center gap-3 mt-6'>
                        <QRCodeSVG value={"https://play.google.com/store/apps/details?id=com.gs1memberauthenticator86"} width="105" height="90" />
                        <button className="rounded-full bg-secondary font-body px-4 py-1 text-xs text-white transition duration-200 hover:bg-primary">
                            <i className="fab fa-android ml-1"></i>  for andriod
                        </button>
                        <p className='text-sm text-center text-red-600 font-medium'> {t('Install GS1 Authenticator')}</p>
                      </div>

                    <div>    
                        <div className="text-center mt-4 mb-2">
                            <p className="text-lg sm:text-xl text-secondary font-medium">{t("Tap the Number from your GS1 Authenticator App")}</p>
                        </div>
                        <div className="flex justify-center items-center h-14 w-14 bg-orange-400 rounded-full m-auto">
                            <h2 className="text-white text-4xl">{randomNumber}</h2>
                        </div>
                        <div className="text-center">
                            <p className="text-secondary">{t('Number will regenerate in')} {timer} {t('seconds')}</p>
                        </div>
                    </div>

                    <div className='flex flex-col justify-center items-center gap-3 mt-6'>
                      <QRCodeSVG value={"https://apps.apple.com/app/id6479194548"} width="105" height="90" />
                      <button className="rounded-full bg-secondary font-body px-4 py-1 text-xs text-white transition duration-200 hover:bg-primary">
                        <i className="fab fa-apple ml-1"></i> for IOS
                      </button>
                      <p className='text-sm text-center text-red-600 font-medium'>{t("Install GS1 Authenticator")}</p>
                    </div>

                  </div>
                </div>
            </div>
        </div>
    );
};

export default TwoFactorAuthPopup;
