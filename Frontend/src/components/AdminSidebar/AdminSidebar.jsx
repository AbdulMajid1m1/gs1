import { useEffect, useRef, useState } from "react";
import "./AdminSidebar.css";
import { useNavigate } from "react-router-dom";
import internal from '../../Images/internal.png'
import isoicon from '../../Images/isoicon.png'
import gs1logowhite from '../../Images/gs1logowhite.png'
import profile from '../../Images/profile.png'
import backarrow from '../../Images/backarrow.png';
import identify from '../../Images/identify.png';
import capture from '../../Images/capture.png';
import share from '../../Images/share.png';
import others from '../../Images/others.png';
import adminIcon from '../../Images/adminIcon.png';
import registeredMembers from '../../Images/registeredMembers.png';
import brands from '../../Images/brands.png';
import products from '../../Images/products.png';
import memberproducts from '../../Images/memberproducts.png';
import verifiedbygs1 from '../../Images/verified.png';
import notifications from '../../Images/notify.png';
import settingIcon from '../../Images/settingIcon.png'
import frontend from '../../Images/frontend.png'
import report from '../../Images/report.png'
import migration from '../../Images/migration.png'
import inactive from '../../Images/inactive.png'
import helpdesk from '../../Images/helpdesk.png'
import staffHelpDesk from '../../Images/staffHelpDesk.png'
import gcp from '../../Images/gcp.png'
import documentIcon from '../../Images/document.png'
import gcptype from '../../Images/gcptype.png'
import productpackaging from '../../Images/productpackaging.png'
import verifiedbyGs1 from '../../Images/verifiedbyGs1.png'
import gdsnproduct from '../../Images/gdsnproduct.png'
import masterdata from '../../Images/masterdata.png'
import membersexpiry from '../../Images/membersexpiry.png'
import admingtin from '../../Images/admingtin.jpeg'
import admingln from '../../Images/admingln.jpeg'
import adminsscc from '../../Images/adminsscc.jpeg'
import registeredmembersicon from '../../Images/registeredmembersicon.jpeg'
import payslip from '../../Images/payslip.png';
import productscategory from '../../Images/productscategory.png';
import otherproductscategory from '../../Images/otherproductscategory.png';
import additionalproducts from '../../Images/additionalproducts.png';
import logout from '../../Images/logout.png'
import UserGuide from "../../Images/User guide.jpg"
import ManageSections from "../../Images/Manage section.png"
import pageicon from "../../Images/page.png"
import BlogCategories from "../../Images/Blog Categories.png"
import FaqCategories from "../../Images/Faq.png"
import articles from "../../Images/articles.jpg"
import Eventicon from "../../Images/Event.png"
import Serviceicon from "../../Images/Service.jpg"
import Sildersicon from "../../Images/Sildericon.png"
import Categoriesicon from "../../Images/Categories.jpg"
import MegaMenuicon from "../../Images/Mega Menu.jpg"
import Catalogicon from "../../Images/Catalgoicon.jpg"
import footericon from "../../Images/Footericon.png"
import rejected from "../../Images/rejected.png"
import inactiveMembers from "../../Images/inactiveMembers.png"
import kpiReport from "../../Images/kpiReport.png"
import memberActivity from "../../Images/memberActivity.png"
import adminActivity from "../../Images/adminActivity.png"
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../../i18n";
import LanguageSwitcher from "../../switer";

const AdminSideBar = () =>
{
  const {t , i18n } = useTranslation();
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
  const [showFifthData, setShowFifthData] = useState(false);
  const [showSixthData, setShowSixthData] = useState(false);
  const [showFrontEndData, setshowFrontEndData] = useState(false);
  const [Catalogsubmenu, setCatalogsubmenu] = useState(false);
  const [reportSubMenu, setReportSubMenu] = useState(false);
  const navigate = useNavigate();


  // const handleItemClick = (path) => {
  //   setSelectedItem(path);
  //   navigate(path);
  // };
  const handleItemClick = (path, event) =>
  {
    setSelectedItem(path);

    // Check if the "Ctrl" key (or "Command" key on Mac) is pressed
    const isNewTab = event.ctrlKey || event.metaKey;

    if (isNewTab) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
  };
  // const handleItemClick = (path) => {
  //   setSelectedItem(path);
  //   window.open(path, '_blank');
  // };

  const handleItemClickGs1website = (path) =>
  {
    setSelectedItem(path);
    window.open(path, '_blank');
  };



  const handleContextMenu = (event, path) =>
  {
    event.preventDefault();
    const clickX = event.clientX;
    const clickY = event.clientY;
    setContextMenuPosition({ x: clickX, y: clickY });
    setSelectedPath(path);
    setShowContextMenu(true);
  };

  const handleContextMenuOptionClick = (option) =>
  {
    if (option === 'openNewTab') {
      window.open(selectedPath, '_blank');
    }
    setShowContextMenu(false);
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const handleLogoClick = () =>
  {
    setSelectedItem(null);
    navigate('/admin/dashboard') // Navigate to the "track" component
  };


  return (
    <div>
      <div className={`h-10 mb-6 bg-[#1E3B8B] ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        <div className={`flex justify-between items-center ${i18n.language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
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
            className={`flex justify-center items-center cursor-pointer -mt-1 px-4 ${i18n.language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`flex justify-end items-center px-0 ${i18n.language === 'ar' ? 'flex-row-reverse ml-4' : 'flex-row mr-4'}`}>
              <span>
                <I18nextProvider i18n={i18n}>
                  <LanguageSwitcher />
                </I18nextProvider>
              </span>
              <span className="w-100">
                <p className={`text-white font-sans hover:text-primary ${i18n.language === 'ar' ? ' sm-mr-10 ml-5' : 'mr-5 sm-ml-5'}`}
                  onClick={() => handleItemClickGs1website('/')}
                  onContextMenu={(event) =>
                    handleContextMenu(event, '/')
                  }
                >{t('GS1 Website')}</p>
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
              onClick={() => navigate("/update-vendor")}
              src={
                // currentUser?.user?.image
                //   ? imagePath + currentUser?.user?.image
                //   : memberprofile
                profile
              }
              className="h-7 w-7 bg-white rounded-full"
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

          {/* <div
            className={`main-images-container ${selectedItem === '/admin/dashboard' ? 'selected-item' : ''}`}
            onClick={() => handleItemClick('/admin/dashboard')}
            onContextMenu={(event) =>
              handleContextMenu(event, '/admin/dashboard')
            }

          >
            <img
              src={dashboard}
              className="main-inside-image bg-white rounded-full"
              alt=""
            />
            <p className="sidebar-text">Daoard</p>
          </div> */}

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
                {/* <div 
                  className={`main-images-container ${selectedItem === '/admin/registered-members' ? 'selected-item' : ''}`}
                    onClick={() => handleItemClick('/admin/registered-members')}
                      onContextMenu={(event) =>
                         handleContextMenu(event, '/admin/registered-members')
                  }
                  > */}
              <div
                className={`main-images-container ${selectedItem === '/admin/registered-members' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/registered-members', event)}
                onContextMenu={(event) => handleContextMenu(event, '/admin/registered-members')}
              >
                {/* <div
                      className={`main-images-container ${selectedItem === '/admin/registered-members' ? 'selected-item' : ''}`}
                      onClick={() => handleItemClick('/admin/registered-members')}
                      onContextMenu={(event) => handleContextMenu(event, '/admin/registered-members')}
                    > */}
                <img
                  src={registeredmembersicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Members')}</p>
              </div>

              <div
                // className={`main-images-container ${selectedItem === '/admin/brands' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/brands')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/brands')
                // }
                className={`main-images-container ${selectedItem === '/admin/brands' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/brands', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/brands')
                }
              >
                <img
                  src={brands}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Brands')}</p>
              </div>

              <div
                // className={`main-images-container ${selectedItem === '/admin/gtin' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/gtin')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/gtin')
                // }
                className={`main-images-container ${selectedItem === '/admin/gtin' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/gtin', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/gtin')
                }
              >
                <img
                  src={admingtin}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('GTIN (Barcode)')}</p>
              </div>

              <div
                // className={`main-images-container ${selectedItem === '/admin/gln' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/gln')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/gln')
                // }
                className={`main-images-container ${selectedItem === '/admin/gln' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/gln', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/gln')
                }
              >
                <img
                  src={admingln}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('GLN (Location)')}</p>
              </div>

              <div
                // className={`main-images-container ${selectedItem === '/admin/sscc' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/sscc')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/sscc')
                // }
                className={`main-images-container ${selectedItem === '/admin/sscc' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/sscc', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/sscc')
                }
              >
                <img
                  src={adminsscc}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('SSCC')}</p>
              </div>

              <div
                // className={`main-images-container ${selectedItem === '/admin/foreign-gtin' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/foreign-gtin')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/foreign-gtin')
                // }
                className={`main-images-container ${selectedItem === '/admin/foreign-gtin' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/foreign-gtin', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/foreign-gtin')
                }
              >
                <img
                  src={products}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Foreign GTIN')}</p>
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
                // className={`main-images-container ${selectedItem === '/admin/migration' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/migration')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/migration')
                // }
                className={`main-images-container ${selectedItem === '/admin/member-expiry-page' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/member-expiry-page', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/member-expiry-page')
                }
              >
                <img
                  src={membersexpiry}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Members Expiry')}</p>
              </div>


              <div
                // className={`main-images-container ${selectedItem === '/admin/migration' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/migration')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/migration')
                // }
                className={`main-images-container ${selectedItem === '/admin/migration' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/migration', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/migration')
                }
              >
                <img
                  src={migration}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Migration')}</p>
              </div>

                {/* <div 
                  // className={`main-images-container ${selectedItem === '/admin/help-desk' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/help-desk')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/help-desk')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/help-desk' ? 'selected-item' : ''}`}
                    onClick={(event) => handleItemClick('/admin/help-desk', event)}
                      onContextMenu={(event) =>
                         handleContextMenu(event, '/admin/help-desk')
                  }
                  >
                  <img
                    src={inactive}
                    className="main-inside-image bg-white rounded-full"
                    alt=""
                  />
                  <p className="sidebar-text">Old InActive Members</p>
                </div> */}


              <div
                // className={`main-images-container ${selectedItem === '/admin/member-products' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/member-products')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/member-products')
                // }
                className={`main-images-container ${selectedItem === '/admin/payment-slips' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/payment-slips', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/payment-slips')
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
                // className={`main-images-container ${selectedItem === '/admin/notfications' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/notfications')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/notfications')
                // }
                className={`main-images-container ${selectedItem === '/admin/notfications' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/notfications', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/notfications')
                }
              >
                <img
                  src={notifications}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Notifications')}</p>
              </div>


              <div
                // className={`main-images-container ${selectedItem === '/admin/notfications' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/notfications')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/notfications')
                // }
                className={`main-images-container ${selectedItem === '/admin/rejected' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/rejected', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/rejected')
                }
              >
                <img
                  src={rejected}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Rejected')}</p>
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
                // className={`main-images-container ${selectedItem === '/admin/gcp-license' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/gcp-license')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/gcp-license')
                // }
                className={`main-images-container ${selectedItem === '/admin/gcp-license' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/gcp-license', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/gcp-license')
                }
              >
                <img
                  src={gcp}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('GCP Licenses')}</p>
              </div>

              <div
                // className={`main-images-container ${selectedItem === '/admin/verified-by-gs1' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/verified-by-gs1')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/verified-by-gs1')
                // }
                className={`main-images-container ${selectedItem === '/admin/verified-by-gs1' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/verified-by-gs1', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/verified-by-gs1')
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
                // className={`main-images-container ${selectedItem === '/admin/gs1-registries' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/gs1-registries')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/gs1-registries')
                // }
                className={`main-images-container ${selectedItem === '/admin/gs1-registries' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/gs1-registries', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/gs1-registries')
                }
              >
                <img
                  src={gdsnproduct}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('GS1 Registries')}</p>
              </div>

            </div>
          )}


          <div
            className={`main-images-container ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
            onClick={() => setShowFourthData(!showFourthData)}
          >
            <img
              src={others}
              className="main-inside-image bg-white rounded-full"
              alt=""
            />
            <p className="sidebar-text">{t('OTHERS')}</p>
            {showFourthData ? (
              <i className='fas fa-solid fa-chevron-up text-white'></i>
            ) : (
              <i className='fas fa-solid fa-chevron-down text-white'></i>
            )}
          </div>

          {showFourthData && (
            <div
              className="ml-3 md:ml-3 lg:ml-3 xl:ml-3 2xl:ml-3 3xl:ml-3"
              onClick={toggleSidebar}
            >
              <div
                // className={`main-images-container ${selectedItem === '/admin/old-inactive-members' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/old-inactive-members')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/old-inactive-members')
                // }
                className={`main-images-container ${selectedItem === '/admin/products-category' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/products-category', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/products-category')
                }
              >
                <img
                  src={productscategory}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Products Category')}</p>
              </div>

              <div
                // className={`main-images-container ${selectedItem === '/admin/old-inactive-members' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/old-inactive-members')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/old-inactive-members')
                // }
                className={`main-images-container ${selectedItem === '/admin/others-products-category' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/others-products-category', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/others-products-category')
                }
              >
                <img
                  src={otherproductscategory}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Other Products Category')}</p>
              </div>


              <div
                // className={`main-images-container ${selectedItem === '/admin/old-inactive-members' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/old-inactive-members')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/old-inactive-members')
                // }
                className={`main-images-container ${selectedItem === '/admin/addtional-products' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/addtional-products', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/addtional-products')
                }
              >
                <img
                  src={additionalproducts}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Additional Products')}</p>
              </div>


              <div
                // className={`main-images-container ${selectedItem === '/admin/old-inactive-members' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/old-inactive-members')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/old-inactive-members')
                // }
                className={`main-images-container ${selectedItem === '/admin/old-inactive-members' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/old-inactive-members', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/old-inactive-members')
                }
              >
                <img
                  src={inactiveMembers}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Old InActive Members')}</p>
              </div>
              
              <div
                // className={`main-images-container ${selectedItem === '/admin/old-inactive-members' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/old-inactive-members')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/old-inactive-members')
                // }
                className={`main-images-container ${selectedItem === '/admin/help-desk' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/help-desk', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/help-desk')
                }
              >
                <img
                  src={helpdesk}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('HelpDesk')}</p>
              </div>

              <div
                // className={`main-images-container ${selectedItem === '/admin/staff-help-desk' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/staff-help-desk')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/staff-help-desk')
                // }
                className={`main-images-container ${selectedItem === '/admin/staff-help-desk' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/staff-help-desk', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/staff-help-desk')
                }
              >
                <img
                  src={staffHelpDesk}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Staff HelpDesk')}</p>
              </div>

            </div>
          )}


          <div
            className={`main-images-container ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
            onClick={() => setShowFifthData(!showFifthData)}
          >
            <img
              src={adminIcon}
              className="main-inside-image bg-white rounded-full"
              alt=""
            />
            <p className="sidebar-text">{t('ADMIN')}</p>
            {showFifthData ? (
              <i className='fas fa-solid fa-chevron-up text-white'></i>
            ) : (
              <i className='fas fa-solid fa-chevron-down text-white'></i>
            )}
          </div>

          {showFifthData && (
            <div
              className="ml-3 md:ml-3 lg:ml-3 xl:ml-3 2xl:ml-3 3xl:ml-3"
              onClick={toggleSidebar}
            >
              <div
                // className={`main-images-container ${selectedItem === '/admin/front-end' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/front-end')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/front-end')
                // }
                className={`main-images-container ${selectedItem === '/admin/front-end' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/front-end', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/front-end')
                }
              >
                <img
                  src={frontend}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Frontend')}</p>
              </div>

              <div
                // className={`main-images-container ${selectedItem === '/admin/settings' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/settings')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/settings')
                // }
                className={`main-images-container ${selectedItem === '/admin/settings' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/settings', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/settings')
                }
              >
                <img
                  src={settingIcon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Settings')}</p>
              </div>

                {/* <div 
                  // className={`main-images-container ${selectedItem === '/admin/master-data' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/master-data')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/master-data')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/master-data' ? 'selected-item' : ''}`}
                    onClick={(event) => handleItemClick('/admin/master-data', event)}
                      onContextMenu={(event) =>
                         handleContextMenu(event, '/admin/master-data')
                  }
                  >
                  <img
                    src={verifiedbygs1}
                    className="main-inside-image bg-white rounded-full"
                    alt=""
                  />
                  <p className="sidebar-text">Master Data</p>
                </div> */}

              <div
              // <div
                className={`main-images-container ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={() => setReportSubMenu(!reportSubMenu)}
              >
                <img
                  src={report}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Reports')}</p>
                {showFourthData ? (
                  <i className='fas fa-solid fa-chevron-up text-white'></i>
                ) : (
                  <i className='fas fa-solid fa-chevron-down text-white'></i>
                )}
              </div>
              
              {reportSubMenu && (
                <div
                  className="ml-3 md:ml-3 lg:ml-3 xl:ml-3 2xl:ml-3 3xl:ml-3"
                  onClick={toggleSidebar}
                >
                  <div
                    // className={`main-images-container ${selectedItem === '/admin/front-end' ? 'selected-item' : ''}`}
                    //   onClick={() => handleItemClick('/admin/front-end')}
                    //     onContextMenu={(event) =>
                    //        handleContextMenu(event, '/admin/front-end')
                    // }
                    className={`main-images-container ${selectedItem === '/admin/kpi-report' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'} pl-6`}
                    onClick={(event) => handleItemClick('/admin/kpi-report', event)}
                    onContextMenu={(event) =>
                      handleContextMenu(event, '/admin/kpi-report')
                    }
                  >
                    <img
                      src={kpiReport}
                      className="main-inside-image bg-white rounded-full"
                      alt=""
                    />
                    <p className="sidebar-text">{t('KPI Report')}</p>
                  </div>

                  <div
                    // className={`main-images-container ${selectedItem === '/admin/settings' ? 'selected-item' : ''}`}
                    //   onClick={() => handleItemClick('/admin/settings')}
                    //     onContextMenu={(event) =>
                    //        handleContextMenu(event, '/admin/settings')
                    // }
                    className={`main-images-container ${selectedItem === '/admin/member-activity-report' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'} pl-6`}
                    onClick={(event) => handleItemClick('/admin/member-activity-report', event)}
                    onContextMenu={(event) =>
                      handleContextMenu(event, '/admin/member-activity-report')
                    }
                  >
                    <img
                      src={memberActivity}
                      className="main-inside-image bg-white rounded-full"
                      alt=""
                    />
                    <p className="sidebar-text">{t('Member Activity')}</p>
                  </div>

                  <div
                    // className={`main-images-container ${selectedItem === '/admin/settings' ? 'selected-item' : ''}`}
                    //   onClick={() => handleItemClick('/admin/settings')}
                    //     onContextMenu={(event) =>
                    //        handleContextMenu(event, '/admin/settings')
                    // }
                    className={`main-images-container ${selectedItem === '/admin/admin-activity-report' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'} pl-6`}
                    onClick={(event) => handleItemClick('/admin/admin-activity-report', event)}
                    onContextMenu={(event) =>
                      handleContextMenu(event, '/admin/admin-activity-report')
                    }
                  >
                    <img
                      src={adminActivity}
                      className="main-inside-image bg-white rounded-full"
                      alt=""
                    />
                    <p className="sidebar-text">{t('Admin Activity')}</p>
                  </div>

                </div>
              )}


            </div>
          )}


          {/* Master Data */}
          <div
            className={`main-images-container ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
            onClick={() => setShowSixthData(!showSixthData)}
          >
            <img
              src={masterdata}
              className="main-inside-image bg-white rounded-full"
              alt=""
            />
            <p className="sidebar-text">{t('Master Data')}</p>
            {showSixthData ? (
              <i className='fas fa-solid fa-chevron-up text-white'></i>
            ) : (
              <i className='fas fa-solid fa-chevron-down text-white'></i>
            )}
          </div>

          {showSixthData && (
            <div
              className="ml-3 md:ml-3 lg:ml-3 xl:ml-3 2xl:ml-3 3xl:ml-3"
              onClick={toggleSidebar}
            >
              <div
                // className={`main-images-container ${selectedItem === '/admin/units' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/units')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/units')
                // }
                className={`main-images-container ${selectedItem === '/admin/units' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/units', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/units')
                }
              >
                <img
                  src={frontend}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Units')}</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/Documents' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/Documents')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/Documents')
                // }
                className={`main-images-container ${selectedItem === '/admin/Documents' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/Documents', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/Documents')
                }
              >
                <img
                  src={documentIcon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Documents')}</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/ProductPackaging' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/ProductPackaging')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/ProductPackaging')
                // }
                className={`main-images-container ${selectedItem === '/admin/ProductPackaging' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/ProductPackaging', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/ProductPackaging')
                }
              >
                <img
                  src={productpackaging}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Product Packaging')}</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/Other_products' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/Other_products')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/Other_products')
                // }
                className={`main-images-container ${selectedItem === '/admin/Other_products' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/Other_products', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/Other_products')
                }
              >
                <img
                  src={frontend}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Other Products')}</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/Gcp_type' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/Gcp_type')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/Gcp_type')
                // }
                className={`main-images-container ${selectedItem === '/admin/Gcp_type' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/Gcp_type', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/Gcp_type')
                }
              >
                <img
                  src={gcptype}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Gcp Type')}</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/CountryofSales' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/CountryofSales')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/CountryofSales')
                // }
                className={`main-images-container ${selectedItem === '/admin/CountryofSales' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/CountryofSales', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/CountryofSales')
                }
              >
                <img
                  src={frontend}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Country Of Sales')}</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/Hscode' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/Hscode')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/Hscode')
                // }
                className={`main-images-container ${selectedItem === '/admin/Hscode' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/Hscode', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/Hscode')
                }
              >
                <img
                  src={frontend}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Hs Code')}</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/UNSPCS' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/UNSPCS')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/UNSPCS')
                // }
                className={`main-images-container ${selectedItem === '/admin/UNSPCS' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/UNSPCS', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/UNSPCS')
                }
              >
                <img
                  src={frontend}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('UNSPCS')}</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/Cities' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/Cities')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/Cities')
                // }
                className={`main-images-container ${selectedItem === '/admin/Cities' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/Cities', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/Cities')
                }
              >
                <img
                  src={frontend}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Cities')}</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/State' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/State')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/State')
                // }
                className={`main-images-container ${selectedItem === '/admin/State' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/State', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/State')
                }
              >
                <img
                  src={frontend}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('State')}</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/Country' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/Country')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/Country')
                // }
                className={`main-images-container ${selectedItem === '/admin/Country' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/Country', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/Country')
                }
              >
                <img
                  src={frontend}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Country')}</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/crnumber' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/crnumber')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/crnumber')
                // }
                className={`main-images-container ${selectedItem === '/admin/crnumber' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/crnumber', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/crnumber')
                }
              >
                <img
                  src={frontend}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Cr Number')}</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/documenttype' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/documenttype')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/documenttype')
                // }
                className={`main-images-container ${selectedItem === '/admin/documenttype' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/documenttype', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/documenttype')
                }
              >
                <img
                  src={frontend}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Document Type')}</p>
              </div>
            </div>
          )}

          {/* Front End */}
          <div
            className={`main-images-container ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
            onClick={() => setshowFrontEndData(!showFrontEndData)}
          >
            <img
              src={frontend}
              className="main-inside-image bg-white rounded-full"
              alt=""
            />
            <p className="sidebar-text">{t('Front End')} </p>
            {showFrontEndData ? (
              <i className='fas fa-solid fa-chevron-up text-white'></i>
            ) : (
              <i className='fas fa-solid fa-chevron-down text-white'></i>
            )}
          </div>

          {showFrontEndData && (
            <div
              className="ml-3 md:ml-3 lg:ml-3 xl:ml-3 2xl:ml-3 3xl:ml-3"
              onClick={toggleSidebar}
            >
              <div
                className={`main-images-container ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={() => setCatalogsubmenu(!Catalogsubmenu)}
              >
                <img
                  src={Catalogicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Catalog')}</p>
                {Catalogsubmenu ? (
                  <i className='fas fa-solid fa-chevron-up text-white'></i>
                ) : (
                  <i className='fas fa-solid fa-chevron-down text-white'></i>
                )}

              </div>
              {Catalogsubmenu && (
                <div>
                  <div
                    className={`main-images-container ${selectedItem === '/admin/megamenu' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                    onClick={(event) => handleItemClick('/admin/megamenu', event)}
                    onContextMenu={(event) =>
                      handleContextMenu(event, '/admin/megamenu')
                    }
                  >
                    <img
                      src={MegaMenuicon}
                      className="main-inside-image bg-white rounded-full m-2"
                      alt=""
                    />
                    <p className="sidebar-text">{t('Mega Menu')}</p>
                  </div>
                  <div
                    className={`main-images-container ${selectedItem === '/admin/categories' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                    onClick={(event) => handleItemClick('/admin/categories', event)}
                    onContextMenu={(event) =>
                      handleContextMenu(event, '/admin/categories')
                    }
                  >
                    <img
                      src={Categoriesicon}
                      className="main-inside-image bg-white rounded-full m-2"
                      alt=""
                    />
                    <p className="sidebar-text">{t('Categories')}</p>
                  </div>
                  <div
                    className={`main-images-container ${selectedItem === '/admin/footer_menu' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                    onClick={(event) => handleItemClick('/admin/footer_menu', event)}
                    onContextMenu={(event) =>
                      handleContextMenu(event, '/admin/footer_menu')
                    }
                  >
                    <img
                      src={footericon}
                      className="main-inside-image bg-white rounded-full m-2"
                      alt=""
                    />
                    <p className="sidebar-text">{t('Footer Menu')}</p>
                  </div>
                  <div
                    className={`main-images-container ${selectedItem === '/admin/Sliders' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                    onClick={(event) => handleItemClick('/admin/Sliders', event)}
                    onContextMenu={(event) =>
                      handleContextMenu(event, '/admin/Sliders')
                    }
                  >
                    <img
                      src={Sildersicon}
                      className="main-inside-image bg-white rounded-full m-2"
                      alt=""
                    />
                    <p className="sidebar-text">{t('Silders')}</p>
                  </div>
                  <div
                    className={`main-images-container ${selectedItem === '/admin/Featured_services' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                    onClick={(event) => handleItemClick('/admin/Featured_services', event)}
                    onContextMenu={(event) =>
                      handleContextMenu(event, '/admin/Featured_services')
                    }
                  >
                    <img
                      src={Serviceicon}
                      className="main-inside-image bg-white rounded-full m-2"
                      alt=""
                    />
                    <p className="sidebar-text">{t('Service')}</p>
                  </div>
                  <div
                    className={`main-images-container ${selectedItem === '/admin/events' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                    onClick={(event) => handleItemClick('/admin/events', event)}
                    onContextMenu={(event) =>
                      handleContextMenu(event, '/admin/events')
                    }
                  >
                    <img
                      src={Eventicon}
                      className="main-inside-image bg-white rounded-full m-2"
                      alt=""
                    />
                    <p className="sidebar-text">{t('Event')}</p>
                  </div>
                  <div
                    className={`main-images-container ${selectedItem === '/admin/articles' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                    onClick={(event) => handleItemClick('/admin/articles', event)}
                    onContextMenu={(event) =>
                      handleContextMenu(event, '/admin/articles')
                    }
                  >
                    <img
                      src={articles}
                      className="main-inside-image bg-white rounded-full m-2"
                      alt=""
                    />
                    <p className="sidebar-text">{t('Articles')}</p>
                  </div>
                </div>
              )}

              <div
                className={`main-images-container ${selectedItem === '/admin/Pages' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/Pages', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/Pages')
                }
              >
                <img
                  src={pageicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Pages')}</p>
              </div>
              <div
                className={`main-images-container ${selectedItem === '/admin/partners' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/partners', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/partners')
                }
              >
                <img
                  src={verifiedbyGs1}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('GS1 Partners')}</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/Other_products' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/Other_products')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/Other_products')
                // }
                className={`main-images-container ${selectedItem === '/admin/Blog_categories' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/Blog_categories', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/Blog_categories')
                }
              >
                <img
                  src={BlogCategories}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Blog Category')}</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/Gcp_type' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/Gcp_type')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/Gcp_type')
                // }
                className={`main-images-container ${selectedItem === '/admin/Faq_categories' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/Faq_categories', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/Faq_categories')
                }
              >
                <img
                  src={FaqCategories}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Faq Categories')}</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/CountryofSales' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/CountryofSales')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/CountryofSales')
                // }
                className={`main-images-container ${selectedItem === '/admin/CountryofSales' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/CountryofSales', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/CountryofSales')
                }
              >
                <img
                  src={ManageSections}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Manage Sections')}</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/Hscode' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/Hscode')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/Hscode')
                // }
                className={`main-images-container ${selectedItem === '/admin/Manage_team' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/Manage_team', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/Manage_team')
                }
              >
                <img
                  src={staffHelpDesk}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Team Sections')}</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/UNSPCS' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/UNSPCS')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/UNSPCS')
                // }
                className={`main-images-container ${selectedItem === '/admin/Board_members' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/Board_members', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/Board_members')
                }
              >
                <img
                  src={registeredmembersicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('Board Members')}</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/Cities' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/Cities')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/Cities')
                // }
                className={`main-images-container ${selectedItem === '/admin/User_guide' ? 'selected-item' : ''} ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                onClick={(event) => handleItemClick('/admin/User_guide', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/User_guide')
                }
              >
                <img
                  src={UserGuide}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">{t('User Guide')}</p>
              </div>
            </div>
          )}


          <div
            className={`main-images-container ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
            onClick={() => navigate('/admin-login')}
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

export default AdminSideBar;