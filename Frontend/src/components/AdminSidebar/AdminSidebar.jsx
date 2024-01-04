import  { useEffect, useRef, useState } from "react";
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
import logout from '../../Images/logout.png'

const AdminSideBar = () => {
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
  const navigate = useNavigate();


  // const handleItemClick = (path) => {
  //   setSelectedItem(path);
  //   navigate(path);
  // };
  const handleItemClick = (path, event) => {
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
    navigate('/admin/dashboard') // Navigate to the "track" component
  };


  return (
    <div>
      <div className="h-10 sm:ml-72 mb-6 bg-[#1E3B8B] ">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-white rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
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
            <p className="sm:text-2xl text-sm sm:py-0 py-2 sm:px-0 px-3 text-white font-medium">
              GS1-V2
            </p>
          </div>

          <div
            className="flex justify-center items-center cursor-pointer mt-1 px-4"
          >
           <div className='flex justify-end items-center px-0 mr-4'>
                <span>
                  <p className="text-white font-sans mr-5 hover:text-primary" 
                    onClick={() => handleItemClickGs1website('/admin/dashboard')}
                    onContextMenu={(event) =>
                      handleContextMenu(event, '/admin/dashboard')
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
        className={`fixed top-0 left-0 z-40 w-64 sm:w-72 h-screen transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
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
              className="main-images-container"
              onClick={() => setShowFirstData(!showFirstData)}
            >
              <img
                src={identify}
                className="main-inside-image bg-white rounded-full"
                alt=""
              />
              <p className="sidebar-text">IDENTIFY</p>
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
                      className={`main-images-container ${selectedItem === '/admin/registered-members' ? 'selected-item' : ''}`}
                      onClick={(event) => handleItemClick('/admin/registered-members', event)}
                      onContextMenu={(event) => handleContextMenu(event, '/admin/registered-members')}
                    >
                    {/* <div
                      className={`main-images-container ${selectedItem === '/admin/registered-members' ? 'selected-item' : ''}`}
                      onClick={() => handleItemClick('/admin/registered-members')}
                      onContextMenu={(event) => handleContextMenu(event, '/admin/registered-members')}
                    > */}
                  <img
                    src={registeredMembers}
                    className="main-inside-image bg-white rounded-full"
                    alt=""
                  />
                  <p className="sidebar-text">Members</p>
                </div>

                <div 
                  // className={`main-images-container ${selectedItem === '/admin/brands' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/brands')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/brands')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/brands' ? 'selected-item' : ''}`}
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
                  <p className="sidebar-text">Brands</p>
                </div>

                <div 
                  // className={`main-images-container ${selectedItem === '/admin/gtin' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/gtin')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/gtin')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/gtin' ? 'selected-item' : ''}`}
                    onClick={(event) => handleItemClick('/admin/gtin', event)}
                      onContextMenu={(event) =>
                         handleContextMenu(event, '/admin/gtin')
                  }
                  >
                  <img
                    src={products}
                    className="main-inside-image bg-white rounded-full"
                    alt=""
                  />
                  <p className="sidebar-text">GTIN</p>
                </div>

                <div 
                  // className={`main-images-container ${selectedItem === '/admin/gln' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/gln')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/gln')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/gln' ? 'selected-item' : ''}`}
                    onClick={(event) => handleItemClick('/admin/gln', event)}
                      onContextMenu={(event) =>
                         handleContextMenu(event, '/admin/gln')
                  }
                  >
                  <img
                    src={products}
                    className="main-inside-image bg-white rounded-full"
                    alt=""
                  />
                  <p className="sidebar-text">GLN</p>
                </div>

                <div 
                  // className={`main-images-container ${selectedItem === '/admin/sscc' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/sscc')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/sscc')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/sscc' ? 'selected-item' : ''}`}
                    onClick={(event) => handleItemClick('/admin/sscc', event)}
                      onContextMenu={(event) =>
                         handleContextMenu(event, '/admin/sscc')
                  }
                  >
                  <img
                    src={products}
                    className="main-inside-image bg-white rounded-full"
                    alt=""
                  />
                  <p className="sidebar-text">SSCC</p>
                </div>

                <div 
                  // className={`main-images-container ${selectedItem === '/admin/foreign-gtin' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/foreign-gtin')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/foreign-gtin')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/foreign-gtin' ? 'selected-item' : ''}`}
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
                  <p className="sidebar-text">Foreign GTIN</p>
                </div>

              </div>
              )}


          <div
            className={`main-images-container`}
            onClick={() => setShowSecondData(!showSecondData)}
          >
            <img
              src={capture}
              className="main-inside-image bg-white rounded-full"
              alt=""
            />
            <p className="sidebar-text">CAPTURE</p>
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
                  // className={`main-images-container ${selectedItem === '/admin/member-products' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/member-products')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/member-products')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/member-products' ? 'selected-item' : ''}`}
                    onClick={(event) => handleItemClick('/admin/member-products', event)}
                      onContextMenu={(event) =>
                         handleContextMenu(event, '/admin/member-products')
                  }
                  >
                  <img
                    src={memberproducts}
                    className="main-inside-image bg-white rounded-full"
                    alt=""
                  />
                  <p className="sidebar-text">Member Products</p>
                </div>

                <div 
                  // className={`main-images-container ${selectedItem === '/admin/notfications' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/notfications')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/notfications')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/notfications' ? 'selected-item' : ''}`}
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
                  <p className="sidebar-text">Notifications</p>
                </div>

              </div>
              )}



          <div
            className={`main-images-container`}
            onClick={() => setShowThirdData(!showThirdData)}
          >
            <img
              src={share}
              className="main-inside-image bg-white rounded-full"
              alt=""
            />
            <p className="sidebar-text">SHARE</p>
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
                  className={`main-images-container ${selectedItem === '/admin/gcp-license' ? 'selected-item' : ''}`}
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
                  <p className="sidebar-text">GCP Licenses</p>
                </div>

                <div 
                  // className={`main-images-container ${selectedItem === '/admin/verified-by-gs1' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/verified-by-gs1')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/verified-by-gs1')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/verified-by-gs1' ? 'selected-item' : ''}`}
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
                  <p className="sidebar-text">Verified by GS1</p>
                </div>

                <div 
                  // className={`main-images-container ${selectedItem === '/admin/gs1-registries' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/gs1-registries')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/gs1-registries')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/gs1-registries' ? 'selected-item' : ''}`}
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
                  <p className="sidebar-text">GS1 Registries</p>
                </div>

              </div>
              )}


          <div
            className={`main-images-container`}
            onClick={() => setShowFourthData(!showFourthData)}
          >
            <img
              src={others}
              className="main-inside-image bg-white rounded-full"
              alt=""
            />
            <p className="sidebar-text">OTHERS</p>
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
                  // className={`main-images-container ${selectedItem === '/admin/migration' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/migration')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/migration')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/migration' ? 'selected-item' : ''}`}
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
                  <p className="sidebar-text">Migration</p>
                </div>

                <div 
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
                </div>

                <div 
                  // className={`main-images-container ${selectedItem === '/admin/old-inactive-members' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/old-inactive-members')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/old-inactive-members')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/old-inactive-members' ? 'selected-item' : ''}`}
                    onClick={(event) => handleItemClick('/admin/old-inactive-members', event)}
                      onContextMenu={(event) =>
                         handleContextMenu(event, '/admin/old-inactive-members')
                  }
                  >
                  <img
                    src={helpdesk}
                    className="main-inside-image bg-white rounded-full"
                    alt=""
                  />
                  <p className="sidebar-text">HelpDesk</p>
                </div>

                <div 
                  // className={`main-images-container ${selectedItem === '/admin/staff-help-desk' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/staff-help-desk')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/staff-help-desk')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/staff-help-desk' ? 'selected-item' : ''}`}
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
                  <p className="sidebar-text">Staff HelpDesk</p>
                </div>

              </div>
              )}


          <div
            className={`main-images-container`}
            onClick={() => setShowFifthData(!showFifthData)}
          >
            <img
              src={adminIcon}
              className="main-inside-image bg-white rounded-full"
              alt=""
            />
            <p className="sidebar-text">ADMIN</p>
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
                  className={`main-images-container ${selectedItem === '/admin/front-end' ? 'selected-item' : ''}`}
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
                  <p className="sidebar-text">Frontend</p>
                </div>

                <div 
                  // className={`main-images-container ${selectedItem === '/admin/settings' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/settings')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/settings')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/settings' ? 'selected-item' : ''}`}
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
                  <p className="sidebar-text">Settings</p>
                </div>

                <div 
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
                </div>

                <div 
                  // className={`main-images-container ${selectedItem === '/admin/reports' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/reports')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/reports')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/reports' ? 'selected-item' : ''}`}
                    onClick={(event) => handleItemClick('/admin/reports', event)}
                      onContextMenu={(event) =>
                         handleContextMenu(event, '/admin/reports')
                  }
                  >
                  <img
                    src={report}
                    className="main-inside-image bg-white rounded-full"
                    alt=""
                  />
                  <p className="sidebar-text">Reports</p>
                </div>

              </div>
              )}


                {/* Master Data */}
                <div 
                   className={`main-images-container`}
                   onClick={() => setShowSixthData(!showSixthData)}
                  >
                  <img
                    src={masterdata}
                    className="main-inside-image bg-white rounded-full"
                    alt=""
                  />
                  <p className="sidebar-text">Master Data</p>
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
                  className={`main-images-container ${selectedItem === '/admin/units' ? 'selected-item' : ''}`}
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
                  <p className="sidebar-text">Units</p>
                </div>
                <div 
                  // className={`main-images-container ${selectedItem === '/admin/Documents' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/Documents')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/Documents')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/Documents' ? 'selected-item' : ''}`}
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
                  <p className="sidebar-text">Documents</p>
              </div>
                <div 
                  // className={`main-images-container ${selectedItem === '/admin/ProductPackaging' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/ProductPackaging')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/ProductPackaging')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/ProductPackaging' ? 'selected-item' : ''}`}
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
                  <p className="sidebar-text">Product Packaging</p>
              </div>
              <div 
                  // className={`main-images-container ${selectedItem === '/admin/Other_products' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/Other_products')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/Other_products')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/Other_products' ? 'selected-item' : ''}`}
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
                  <p className="sidebar-text">Other Products</p>
              </div>
               <div 
                  // className={`main-images-container ${selectedItem === '/admin/Gcp_type' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/Gcp_type')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/Gcp_type')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/Gcp_type' ? 'selected-item' : ''}`}
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
                  <p className="sidebar-text">Gcp Type</p>
              </div>
              <div 
                  // className={`main-images-container ${selectedItem === '/admin/CountryofSales' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/CountryofSales')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/CountryofSales')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/CountryofSales' ? 'selected-item' : ''}`}
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
                  <p className="sidebar-text">Country Of Sales</p>
              </div>
               <div 
                  // className={`main-images-container ${selectedItem === '/admin/Hscode' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/Hscode')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/Hscode')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/Hscode' ? 'selected-item' : ''}`}
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
                  <p className="sidebar-text">Hs Code</p>
              </div>
               <div 
                  // className={`main-images-container ${selectedItem === '/admin/UNSPCS' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/UNSPCS')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/UNSPCS')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/UNSPCS' ? 'selected-item' : ''}`}
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
                  <p className="sidebar-text">UNSPCS</p>
              </div>
               <div 
                  // className={`main-images-container ${selectedItem === '/admin/Cities' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/Cities')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/Cities')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/Cities' ? 'selected-item' : ''}`}
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
                  <p className="sidebar-text">Cities</p>
              </div>
              <div 
                  // className={`main-images-container ${selectedItem === '/admin/State' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/State')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/State')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/State' ? 'selected-item' : ''}`}
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
                  <p className="sidebar-text">State</p>
              </div>
              <div 
                  // className={`main-images-container ${selectedItem === '/admin/Country' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/Country')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/Country')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/Country' ? 'selected-item' : ''}`}
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
                  <p className="sidebar-text">Country</p>
              </div>
              <div 
                  // className={`main-images-container ${selectedItem === '/admin/crnumber' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/crnumber')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/crnumber')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/crnumber' ? 'selected-item' : ''}`}
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
                  <p className="sidebar-text">Cr Number</p>
              </div>
              <div 
                  // className={`main-images-container ${selectedItem === '/admin/documenttype' ? 'selected-item' : ''}`}
                  //   onClick={() => handleItemClick('/admin/documenttype')}
                  //     onContextMenu={(event) =>
                  //        handleContextMenu(event, '/admin/documenttype')
                  // }
                  className={`main-images-container ${selectedItem === '/admin/documenttype' ? 'selected-item' : ''}`}
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
                  <p className="sidebar-text">Document Type</p>
              </div>
              </div>
              )}

          {/* Front End */}
          <div
            className={`main-images-container`}
            onClick={() => setshowFrontEndData(!showFrontEndData)}
          >
            <img
              src={masterdata}
              className="main-inside-image bg-white rounded-full"
              alt=""
            />
            <p className="sidebar-text">Front End </p>
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
                className={`main-images-container`}
                onClick={() => setCatalogsubmenu(!Catalogsubmenu)}
              >
                <div
                  className="main-inside-image"
                />
                <p className="sidebar-text">Catalog</p>
                
              </div>
              {Catalogsubmenu && (
                <div>
              <div
                className={`main-images-containersub ${selectedItem === '/admin/megamenu' ? 'selected-item' : ''}`}
                onClick={(event) => handleItemClick('/admin/megamenu', event)}
                onContextMenu={(event) =>
                  handleContextMenu(event, '/admin/megamenu')
                }
              >
                    <p className="sidebarsub-text">Mega Menu</p>
              </div>
                  <div
                    className={`main-images-containersub ${selectedItem === '/admin/categories' ? 'selected-item' : ''}`}
                    onClick={(event) => handleItemClick('/admin/categories', event)}
                    onContextMenu={(event) =>
                      handleContextMenu(event, '/admin/categories')
                    }
                  >
                    
                    <p className="sidebarsub-text">Categories</p>
                  </div>
                  <div
                    className={`main-images-containersub ${selectedItem === '/admin/footer_menu' ? 'selected-item' : ''}`}
                    onClick={(event) => handleItemClick('/admin/footer_menu', event)}
                    onContextMenu={(event) =>
                      handleContextMenu(event, '/admin/footer_menu')
                    }
                  >
                    <p className="sidebarsub-text">Footer Menu</p>
                  </div>
              </div>
              )}
              
              <div
                className={`main-images-container ${selectedItem === '/admin/Documents' ? 'selected-item' : ''}`}
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
                <p className="sidebar-text">Documents</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/ProductPackaging' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/ProductPackaging')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/ProductPackaging')
                // }
                className={`main-images-container ${selectedItem === '/admin/ProductPackaging' ? 'selected-item' : ''}`}
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
                <p className="sidebar-text">Product Packaging</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/Other_products' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/Other_products')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/Other_products')
                // }
                className={`main-images-container ${selectedItem === '/admin/Other_products' ? 'selected-item' : ''}`}
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
                <p className="sidebar-text">Other Products</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/Gcp_type' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/Gcp_type')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/Gcp_type')
                // }
                className={`main-images-container ${selectedItem === '/admin/Gcp_type' ? 'selected-item' : ''}`}
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
                <p className="sidebar-text">Gcp Type</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/CountryofSales' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/CountryofSales')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/CountryofSales')
                // }
                className={`main-images-container ${selectedItem === '/admin/CountryofSales' ? 'selected-item' : ''}`}
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
                <p className="sidebar-text">Country Of Sales</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/Hscode' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/Hscode')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/Hscode')
                // }
                className={`main-images-container ${selectedItem === '/admin/Hscode' ? 'selected-item' : ''}`}
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
                <p className="sidebar-text">Hs Code</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/UNSPCS' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/UNSPCS')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/UNSPCS')
                // }
                className={`main-images-container ${selectedItem === '/admin/UNSPCS' ? 'selected-item' : ''}`}
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
                <p className="sidebar-text">UNSPCS</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/Cities' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/Cities')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/Cities')
                // }
                className={`main-images-container ${selectedItem === '/admin/Cities' ? 'selected-item' : ''}`}
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
                <p className="sidebar-text">Cities</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/State' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/State')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/State')
                // }
                className={`main-images-container ${selectedItem === '/admin/State' ? 'selected-item' : ''}`}
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
                <p className="sidebar-text">State</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/Country' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/Country')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/Country')
                // }
                className={`main-images-container ${selectedItem === '/admin/Country' ? 'selected-item' : ''}`}
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
                <p className="sidebar-text">Country</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/crnumber' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/crnumber')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/crnumber')
                // }
                className={`main-images-container ${selectedItem === '/admin/crnumber' ? 'selected-item' : ''}`}
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
                <p className="sidebar-text">Cr Number</p>
              </div>
              <div
                // className={`main-images-container ${selectedItem === '/admin/documenttype' ? 'selected-item' : ''}`}
                //   onClick={() => handleItemClick('/admin/documenttype')}
                //     onContextMenu={(event) =>
                //        handleContextMenu(event, '/admin/documenttype')
                // }
                className={`main-images-container ${selectedItem === '/admin/documenttype' ? 'selected-item' : ''}`}
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
                <p className="sidebar-text">Document Type</p>
              </div>
            </div>
          )}

          
          <div
            className={`main-images-container`}
            onClick={() => navigate('/admin-login')}
          >
            <img
              src={logout}
              className="main-inside-image bg-white rounded-full"
              alt=""
            />
            <p className="sidebar-text">Log-out</p>
          </div>


          {/* Implement Any Icon above the Hide Icons */}
          <div className="main-images-container-hide">
            <img src={internal} className="main-inside-image" alt="" />
            <p className="sidebar-text">Hide</p>
          </div>
        </div>

          {/* This two icons  */}
          <div>
            <div className="flex justify-between w-[95%] px-2 absolute bottom-0 bg-[#1E3B8B]">
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
              Open in New Tab
            </div>
            <div
              className='context-menu-option'
              onClick={() => handleContextMenuOptionClick('someOption')}
            >
              Close
            </div>
            {/* ...other context menu options... */}
          </div>
        )}

      </aside>
    </div>
  );
};

export default AdminSideBar;
