import React, { useEffect, useRef, useState } from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import dashboard from '../../Images/dashboard.png'
import internal from '../../Images/internal.png'
import isoicon from '../../Images/isoicon.png'
import gs1logowhite from '../../Images/gs1logowhite.png'
import profile from '../../Images/profile.png'
import backarrow from '../../Images/backarrow.png';
import barcodescanner from '../../Images/barcodescanner.png';
import identify from '../../Images/identify.png';
import ngln from '../../Images/ngln.png';
import nsscc from '../../Images/nsscc.png';
import members from '../../Images/members.png';
import profileIcon from '../../Images/profileIcon.png';
import payslip from '../../Images/payslip.png';
import capture from '../../Images/capture.png';
import transactionhistory from '../../Images/transactionhistory.png';
import share from '../../Images/share.png';
import verifiedbyGs1 from '../../Images/verifiedbyGs1.png';
import helpdesk1 from '../../Images/helpdesk1.png';
import logout from '../../Images/logout.png';
import foreigngtin from '../../Images/foreigngtin.png';
import newRequest from "../../utils/userRequest";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../../i18n";
import LanguageSwitcher from "../../switer";

const SideBar = () => {
  const { t, i18n } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedPath, setSelectedPath] = useState('');
  
  
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleOutsideClick);
    
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  
  
  
  
  const [showFirstData, setShowFirstData] = useState(false);
  const [showSecondData, setShowSecondData] = useState(false);
  const [showThirdData, setShowThirdData] = useState(false);
  const [showFourthData, setShowFourthData] = useState(false);
  const [apiResponse, setApiResponse] = useState([]);
  const memberDataString = sessionStorage.getItem('memberData');
  const memberData = JSON.parse(memberDataString);
  console.log(memberData);
  const navigate = useNavigate();


  const handleItemClick = (path) => {
    setSelectedItem(path);
    navigate(path);
  };

  const handleItemClickGs1website = (path) => {
    setSelectedItem(path);
    window.open(path, '_blank');
  };
  

  const handleContextMenu = (event, path) => {
    event.preventDefault();
    const clickX = event.clientX;
    const clickY = event.clientY;
    setContextMenuPosition({ x: clickX, y: clickY });
    setSelectedPath(path);
    setShowContextMenu(true);
  };

  const handleContextMenuOptionClick = (option) => {
    if (option === 'openNewTab') {
      window.open(selectedPath, '_blank');
    }
    setShowContextMenu(false);
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const handleLogoClick = () => {
    setSelectedItem(null);
    navigate('/member/dashboard') // Navigate to the "track" component
  };


  const fetchData = async () => {
    try {
      const response = await newRequest.get(`/gtinProducts/getUserSubscribedProductsNames?userId=${memberData?.id}`);
      setApiResponse(response.data);
      console.log(response.data)
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      <div className={`h-10 mb-6 bg-[#1E3B8B] ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        <div className={`flex justify-between items-center ${i18n.language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`} >
          <div className="flex items-center">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-white rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={toggleSidebar}
            >
              <span className="sr-only">{t('Open sidebar')}</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <p className="sm:text-2xl text-sm -mt-2 sm:py-0 py-2 sm:px-0 px-3 text-white font-medium">
              GS1-V2
            </p>
          </div>

          <div
            className={`flex justify-end items-center px-0 -mt-1  ${i18n.language === 'ar' ? 'flex-row-reverse ml-4' : 'flex-row mr-4'}`}
          >
            <span>
              <I18nextProvider i18n={i18n}>
                <LanguageSwitcher />
              </I18nextProvider>
            </span>
           <div className='flex justify-end items-center px-0 mr-4'>
                <span>
                  <p className="text-white font-sans mr-5 hover:text-primary" 
                     onClick={() => handleItemClickGs1website('/member/dashboard')}
                     onContextMenu={(event) =>
                       handleContextMenu(event, '/member/dashboard')
                     }
                  >GS1 Website</p>
                </span>
                  <span onClick={() => navigate(-1)} className='cursor-pointer'
                  >
                  <img src={backarrow}
                    className='h-8 w-8 text-secondary mr-3'
                    style={{ filter: 'invert(1)' }}
                    alt=''
                  />
                </span>
              </div>
            <img
              // onClick={() => navigate("/member/member-profile")}
              src={
                // currentUser?.user?.image
                //   ? imagePath + currentUser?.user?.image
                //   : memberprofile
                profile
                }
              className="h-7 w-7 bg-white rounded-full transition transform hover:scale-125"
              alt=""
            />

          </div>
        </div>
      </div>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 z-40 w-64 sm:w-72 h-screen transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0 ${i18n.language === 'ar' ? 'right-0' : 'left-0'}`}
        aria-label="Sidebar"
        ref={sidebarRef}
      >
        <div className="h-full px-3 py-2 overflow-y-auto bg-[#1E3B8B]">
          <div
            className="flex justify-center items-center mb-3 cursor-pointer"
            // onClick={() => navigate("/track")}
            onClick={handleLogoClick}
          >
            <img
              src={gs1logowhite}
              className="h-auto w-44 rounded-md "
              alt=""
            />
          </div>
          <hr />

          <div
            className={`main-images-container ${selectedItem === '/member/dashboard' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
            onClick={() => handleItemClick('/member/dashboard')}
            onContextMenu={(event) =>
              handleContextMenu(event, '/member/dashboard')
            }

          >
            <img
              src={dashboard}
              className="main-inside-image bg-white rounded-full"
              alt=""
            />
            <p className="sidebar-text"> {t('Dashboard')}</p>
          </div>

          <div
            className={`main-images-container ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
              onClick={() => setShowFirstData(!showFirstData)}
            >
              <img
                src={identify}
                className="main-inside-image bg-white rounded-full"
                alt=""
              />
              <p className="sidebar-text">{t('IDENTIFY')}</p>
              {showFirstData ? (
                <i className='fas fa-solid fa-chevron-up text-white'></i>
              ) : (
                <i className='fas fa-solid fa-chevron-down text-white'></i>
              )}
            </div>

            {showFirstData && (
              <div
                className="ml-3 md:ml-3 lg:ml-3 xl:ml-3 2xl:ml-3 3xl:ml-3"
                onClick={toggleSidebar}
              >
                {/* {apiResponse.length === 0 && ( */}
                <div
                className={`main-images-container ${selectedItem === '/member/gtin' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                  onClick={() => handleItemClick('/member/gtin')}
                  onContextMenu={(event) =>
                    handleContextMenu(event, '/member/gtin')
                  }
                >
                  <img
                    src={barcodescanner}
                    className="main-inside-sidebar bg-white rounded-full"
                    alt=""
                  />
                  <p className="sidebar-text">{t('GTIN (Barcode)')}</p>
                </div>
                 {/* )} */}
              {apiResponse.length > 0 && (
               <>
                {/* {apiResponse.includes('GLN (10 Location)') || apiResponse.includes('GLN (20 Locations)') || apiResponse.includes('GLN (30 Locations)') && ( */}
                {(apiResponse.includes('GLN (10 Location)') || apiResponse.includes('GLN (20 Locations)') || apiResponse.includes('GLN (30 Locations)')) && (
                <div
                      className={`main-images-container ${selectedItem === '/member/gln' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                  onClick={() => handleItemClick('/member/gln')}
                  onContextMenu={(event) =>
                    handleContextMenu(event, '/member/gln')
                  }
                >
                  <img
                    src={ngln}
                    className="main-inside-sidebar bg-white rounded-full"
                    alt=""
                  />
                  <p className="sidebar-text">{t('GLN (Location)')}</p>
                </div>
                 )}

              {apiResponse.includes('SSCC') && (
                <div
                      className={`main-images-container ${selectedItem === '/member/sscc' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                  onClick={() => handleItemClick('/member/sscc')}
                  onContextMenu={(event) =>
                    handleContextMenu(event, '/member/sscc')
                  }
                >
                  <img
                    src={nsscc}
                    className="main-inside-sidebar bg-white rounded-full"
                    alt=""
                  />
                  <p className="sidebar-text">{t('SSCC')}</p>
                </div>
                )}


              {apiResponse.includes('Foreign GTIN (for Imported products)') && (
                <div
                      className={`main-images-container ${selectedItem === '/member/udi' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                  onClick={() => handleItemClick('/member/udi')}
                  onContextMenu={(event) =>
                    handleContextMenu(event, '/member/udi')
                  }
                >
                  <img
                    src={foreigngtin}
                    className="main-inside-sidebar bg-white rounded-full"
                    alt=""
                  />
                  <p className="sidebar-text">{t('Foreign GTIN')}</p>
                </div>
                )}


                {apiResponse.includes('UDI') && (
                <div
                      className={`main-images-container ${selectedItem === '/member/udi' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                  onClick={() => handleItemClick('/member/udi')}
                  onContextMenu={(event) =>
                    handleContextMenu(event, '/member/udi')
                  }
                >
                  <img
                    src={nsscc}
                    className="main-inside-sidebar bg-white rounded-full"
                    alt=""
                  />
                  <p className="sidebar-text"> {t('UDI')}</p>
                </div>
                )}
                 </>
                )}

                <div 
                className={`main-images-container ${selectedItem === '/member/member-brands' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                    onClick={() => handleItemClick('/member/member-brands')}
                      onContextMenu={(event) =>
                         handleContextMenu(event, '/member/member-brands')
                  }
                  >
                  <img
                    src={payslip}
                    className="main-inside-image bg-white rounded-full"
                    alt=""
                  />
                <p className="sidebar-text">{t('Brands')}</p>
                </div>
              </div>
            )}


            <div
            className={`main-images-container ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
              onClick={() => setShowSecondData(!showSecondData)}
            >
            <img
              src={capture}
              className="main-inside-image bg-white rounded-full"
              alt=""
            />
            <p className="sidebar-text">{t('CAPTURE')}</p>
            {showSecondData ? (
                <i className='fas fa-solid fa-chevron-up text-white'></i>
              ) : (
                <i className='fas fa-solid fa-chevron-down text-white'></i>
              )}
          </div>

          {showSecondData && (
              <div
                className="ml-3 md:ml-3 lg:ml-3 xl:ml-3 2xl:ml-3 3xl:ml-3"
                onClick={toggleSidebar}
              >
                <div 
                className={`main-images-container ${selectedItem === '/member/payment-slips' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                    onClick={() => handleItemClick('/member/payment-slips')}
                      onContextMenu={(event) =>
                         handleContextMenu(event, '/member/payment-slips')
                  }
                  >
                  <img
                    src={payslip}
                    className="main-inside-image bg-white rounded-full"
                    alt=""
                  />
                <p className="sidebar-text">{t('Payment Slips')}</p>
                </div>

                <div 
                className={`main-images-container ${selectedItem === '/member/transaction-history' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                    onClick={() => handleItemClick('/member/transaction-history')}
                      onContextMenu={(event) =>
                         handleContextMenu(event, '/member/transaction-history')
                  }
                  >
                  <img
                    src={transactionhistory}
                    className="main-inside-image bg-white rounded-full"
                    alt=""
                  />
                <p className="sidebar-text">{t('Transaction History')}</p>
                </div>
               

              </div>
              )}


            <div
            className={`main-images-container ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
              onClick={() => setShowThirdData(!showThirdData)}
            >
            <img
              src={share}
              className="main-inside-image bg-white rounded-full"
              alt=""
            />
            <p className="sidebar-text">{t('SHARE')}</p>
            {showThirdData ? (
                <i className='fas fa-solid fa-chevron-up text-white'></i>
              ) : (
                <i className='fas fa-solid fa-chevron-down text-white'></i>
              )}
          </div>

          {showThirdData && (
              <div
                className="ml-3 md:ml-3 lg:ml-3 xl:ml-3 2xl:ml-3 3xl:ml-3"
                onClick={toggleSidebar}
              >
                <div 
                className={`main-images-container ${selectedItem === '/member' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                    onClick={() => handleItemClick('/member')}
                      onContextMenu={(event) =>
                         handleContextMenu(event, '/member')
                  }
                  >
                  <img
                    src={verifiedbyGs1}
                    className="main-inside-image bg-white rounded-full"
                    alt=""
                  />
                  <p className="sidebar-text">{t('Verified by GS1')}</p>
                </div>

                <div 
                className={`main-images-container ${selectedItem === '/member/' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                    onClick={() => handleItemClick('/member/')}
                      onContextMenu={(event) =>
                         handleContextMenu(event, '/member/')
                  }
                  >
                  <img
                    src={transactionhistory}
                    className="main-inside-image bg-white rounded-full"
                    alt=""
                  />
                <p className="sidebar-text">{t('GS1 Digital Link')}</p>
                </div>
               

              </div>
              )}



          {/* className={`main-images-container ${selectedItem === '/member/member-profile' ? 'selected-item' : ''}`}
            onClick={() => handleItemClick('/member/member-profile')}
            onContextMenu={(event) =>
              handleContextMenu(event, '/member/member-profile')
            } */}


          {/* <div
            className="main-images-container"
            onClick={() => setShowFourthData(!showFourthData)}   
          >
            <img
              src={profileIcon}
              className="main-inside-image bg-white rounded-full"
              alt=""
            />
            <p className="sidebar-text">Profile</p>
            {showFourthData ? (
                <i className='fas fa-solid fa-chevron-up text-white'></i>
              ) : (
                <i className='fas fa-solid fa-chevron-down text-white'></i>
              )}
          </div> */}


          {/* {showFourthData && (
              <div
                className="ml-3 md:ml-3 lg:ml-3 xl:ml-3 2xl:ml-3 3xl:ml-3"
                onClick={toggleSidebar}
              > */}
                <div 
                  className={`main-images-container ${selectedItem === '/member/member-profile' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                    onClick={() => handleItemClick('/member/member-profile')}
                      onContextMenu={(event) =>
                         handleContextMenu(event, '/member/member-profile')
                  }
                  >
                  <img
                    src={profileIcon}
                    className="main-inside-image bg-white rounded-full"
                    alt=""
                  />
                  <p className="sidebar-text"> {t('My Profile')}</p>
                </div>

                {/* <div 
                  className={`main-images-container ${selectedItem === '/member/member-data' ? 'selected-item' : ''}`}
                    onClick={() => handleItemClick('/member/member-data')}
                      onContextMenu={(event) =>
                         handleContextMenu(event, '/member/member-data')
                  }
                  >
                  <img
                    src={profileIcon}
                    className="main-inside-image bg-white rounded-full"
                    alt=""
                  />
                  <p className="sidebar-text">Documents</p>
                </div>


                <div 
                  className={`main-images-container ${selectedItem === '/member/member-crnumber' ? 'selected-item' : ''}`}
                    onClick={() => handleItemClick('/member/member-crnumber')}
                      onContextMenu={(event) =>
                         handleContextMenu(event, '/member/member-crnumber')
                  }
                  >
                  <img
                    src={profileIcon}
                    className="main-inside-image bg-white rounded-full"
                    alt=""
                  />
                  <p className="sidebar-text">Cr Number</p>
                </div> */}
               
               

              {/* </div>
              )} */}



          <div
            className={`main-images-container ${selectedItem === '/member/member-helpdesk' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
            onClick={() => handleItemClick('/member/member-helpdesk')}
            onContextMenu={(event) =>
              handleContextMenu(event, '/member/member-helpdesk')
            }

          >
            <img
              src={helpdesk1}
              className="main-inside-image bg-white rounded-full"
              alt=""
            />
            <p className="sidebar-text">{t('Help Desk')}</p>
          </div>


          <div
            className={`main-images-container ${selectedItem === '/member/subscribed-gtin' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
            onClick={() => handleItemClick('/member/subscribed-gtin')}
            onContextMenu={(event) =>
              handleContextMenu(event, '/member/subscribed-gtin')
            }

          >
            <img
              src={gs1logowhite}
              className="main-inside-image bg-white rounded-full"
              alt=""
            />
            {/* <p className="sidebar-text">Subscribed GTIN</p> */}
            <p className="sidebar-text"> {t('My GS1')}</p>
          </div>

          <div
            className={`main-images-container ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
            onClick={() => navigate('/')}
          >
            <img
              src={logout}
              className="main-inside-image bg-white rounded-full"
              alt=""
            />
            <p className="sidebar-text">{t('Log-out')}</p>
          </div>


          {/* Implement Any Icon above the Hide Icons */}
          <div className="main-images-container-hide">
            <img src={internal} className="main-inside-image" alt="" />
            <p className="sidebar-text">{t('Hide')}</p>
          </div>
        </div>

          {/* This two icons  */}
          <div>
            <div className={`flex justify-between w-[95%] px-2 absolute bottom-0 bg-[#1E3B8B] ${i18n.language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="main-images-container">
                <img src={isoicon} className="main-inside-image-gs1logo" alt="" />
              </div>

              <div className="main-images-container">
                <a href="https://www.gs1.org.sa" target="_blank" rel="noopener noreferrer">
                  <img src={gs1logowhite} className="main-inside-image-gs1logo" alt="" />
                </a>
              </div>
            </div>
          </div>


        {/* Context Menu */}
        {showContextMenu && (
          <div
            className='context-menu'
            style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
          >
            <div
              className='context-menu-option'
              onClick={() => handleContextMenuOptionClick('openNewTab')}
            >
              {t('Open in New Tab')}
            </div>
            <div
              className='context-menu-option'
              onClick={() => handleContextMenuOptionClick('someOption')}
            >
              {t('Close')}
            </div>
            {/* ...other context menu options... */}
          </div>
        )}

      </aside>
    </div>
  );
};

export default SideBar;
