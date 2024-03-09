import React, { useEffect, useState } from 'react'
import "./Dashboard.css"
// import userRequest from '../../utils/userRequest'
import DashboardTable from '../../../components/AdminDashboardTable/DashboardTable'
import { memberForRenevalColumn, newlyRegisteredMembersColumn, pendingApprovalColumn, registerdMemberColumn, subscribedGtinColumn } from '../../../utils/datatablesource'
import categorybarcode from '../../../Images/categorybarcode.png'
import rangebarcode from '../../../Images/rangebarcode.png'
import barcodeIssued from '../../../Images/barcodeIssued.png'
import barcoderemain from '../../../Images/barcoderemain.png'
import newRequest from '../../../utils/userRequest'
import AdminDashboardRightHeader from '../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader'
import { I18nextProvider, useTranslation } from "react-i18next";
import CircularProgress from '@mui/material/CircularProgress';
import LanguageSwitcher from "../../../switer";
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom'
const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const [newRegisteredMembers, setNewRegisteredMembers] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [allRegisteredMembers, setAllRegisteredMembers] = useState([]);
  const [memberReneval, setMemberReneval] = useState([]);
  const [allCardData, setAllCardData] = useState([]);
  const [newRegisteredMembersLoader, setNewRegisteredMembersLoader] = useState(false);
  const [pendingApprovalsLoader, setPendingApprovalsLoader] = useState(false);
  const [allRegisteredMembersLoader, setAllRegisteredMembersLoader] = useState(false);
  const [memberRenevalLoader, setMemberRenevalLoader] = useState(false);
  const [loading, setLoading] = useState(true);


  const getAllNewlyRegisteredMembers = async () => {

    const adminData = JSON.parse(sessionStorage.getItem('adminData'));
    setNewRegisteredMembersLoader(true);
    try {

      const response = await newRequest.get("/users/new")

      console.log(response.data)

      let data = response.data.map((item) => {
        const isSuperAdmin = adminData?.is_super_admin === 1;
        const isAdminAssigned = item.assign_to === adminData?.id;
        const isStatusActive = item.status === 'active';

        const isButtonDisabled = !isSuperAdmin && !isAdminAssigned;
        const buttonClass = isButtonDisabled
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-secondary hover:text-red-500 cursor-pointer';
        return {
          ...item,
          profile: (
            isButtonDisabled ? (
              <span className={buttonClass} style={{ width: '30px', height: '30px' }}>
                <PersonIcon />
              </span>
            ) : (
              <Link
                className={buttonClass}
                to={`/admin/registered-members/view-registered-member/${item.id}`}
                style={{ width: '30px', height: '30px' }}
              >
                <PersonIcon />
              </Link>
            )
          ),
        };
      });

      setNewRegisteredMembers(data);


      setNewRegisteredMembersLoader(false);

    }
    catch (error) {
      console.log(error);
      setNewRegisteredMembersLoader(false);

    }
  };
  const getAllPendingApprovals = async () => {
    setPendingApprovalsLoader(true);

    try {
      const adminData = JSON.parse(sessionStorage.getItem('adminData'));
      const response = await newRequest.get("/users?status=inactive");

      const data = response.data.map((item) => {
        const isSuperAdmin = adminData?.is_super_admin === 1;
        const isAdminAssigned = item.assign_to === adminData?.id;

        const isButtonDisabled = !isSuperAdmin && !isAdminAssigned;
        const buttonClass = isButtonDisabled
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-secondary hover:text-red-500 cursor-pointer';

        return {
          ...item,
          profile: (
            isButtonDisabled ? (
              <span className={buttonClass} style={{ width: '30px', height: '30px' }}>
                <PersonIcon />
              </span>
            ) : (
              <Link
                className={buttonClass}
                to={`/admin/registered-members/view-registered-member/${item.id}`}
                style={{ width: '30px', height: '30px' }}
              >
                <PersonIcon />
              </Link>
            )
          ),
        };
      });

      setPendingApprovals(data);
      setPendingApprovalsLoader(false);
    } catch (error) {
      console.error(error);
      setPendingApprovalsLoader(false);
    }
  };

  const getAllRegisteredMembers = async () => {
    setAllRegisteredMembersLoader(true);

    try {
      const adminData = JSON.parse(sessionStorage.getItem('adminData'));
      const response = await newRequest.get("/users?status=active");

      const data = response.data.map((item) => {
        const isSuperAdmin = adminData?.is_super_admin === 1;
        const isAdminAssigned = item.assign_to === adminData?.id;

        const isButtonDisabled = !isSuperAdmin && !isAdminAssigned;
        const buttonClass = isButtonDisabled
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-secondary hover:text-red-500 cursor-pointer';

        return {
          ...item,
          profile: (
            isButtonDisabled ? (
              <span className={buttonClass} style={{ width: '30px', height: '30px' }}>
                <PersonIcon />
              </span>
            ) : (
              <Link
                className={buttonClass}
                to={`/admin/registered-members/view-registered-member/${item.id}`}
                style={{ width: '30px', height: '30px' }}
              >
                <PersonIcon />
              </Link>
            )
          ),
        };
      });

      setAllRegisteredMembers(data);
      setAllRegisteredMembersLoader(false);
    } catch (error) {
      console.error(error);
      setAllRegisteredMembersLoader(false);
    }
  };

  const getNewTransferOrder = async () => {
    setMemberRenevalLoader(true);

    try {
      const adminData = JSON.parse(sessionStorage.getItem('adminData'));
      const response = await newRequest.get("/users/getByGcpExpiry");

      const data = response.data.map((item) => {
        const isSuperAdmin = adminData?.is_super_admin === 1;
        const isAdminAssigned = item.assign_to === adminData?.id;

        const isButtonDisabled = !isSuperAdmin && !isAdminAssigned;
        const buttonClass = isButtonDisabled
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-secondary hover:text-red-500 cursor-pointer';

        return {
          ...item,
          profile: (
            isButtonDisabled ? (
              <span className={buttonClass} style={{ width: '30px', height: '30px' }}>
                <PersonIcon />
              </span>
            ) : (
              <Link
                className={buttonClass}
                to={`/admin/registered-members/view-registered-member/${item.id}`}
                style={{ width: '30px', height: '30px' }}
              >
                <PersonIcon />
              </Link>
            )
          ),
        };
      });

      setMemberReneval(data);
      setMemberRenevalLoader(false);
    } catch (error) {
      console.error(error);
      setMemberRenevalLoader(false);
    }
  };


  const getAllCardsData = async () => {
    try {

      newRequest.get("/users/adminStatsCounts")
        .then(response => {
          console.log(response.data)
          setAllCardData(response.data)
          setLoading(false);
        })
        .catch(error => {


          console.error(error);
          setLoading(false);
        });

    }
    catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCardsData();
    getAllNewlyRegisteredMembers();
    getAllPendingApprovals();
    getAllRegisteredMembers();
    getNewTransferOrder();
  }, [])
  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black dark:text-white">

          <div className="h-full mb-10 bg-gradient-to-r from-[#C3E2DC]">
            <div className='bg-[#C3E2DC]'>
              <AdminDashboardRightHeader title={t('Dashboard')} />
            </div>

            {/* <!-- Statistics Cards --> */}
            <div>
              {/* {gtinSubscriptions?.map((item, index) => ( */}
              {/* <div key={index} className='grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 p-4 -mt-2'> */}
              <div className='grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 p-4 bg-gradient-to-r from-[#C3E2DC] mt-5'>
                <div className='h-auto w-full bg-[#345ECC] rounded-lg'>
                  <div>
                    <div className='flex justify-between items-center px-3 py-3'>
                      <img src={categorybarcode} alt="" className='h-16 w-16 object-contain' />
                      {/* <p className='font-sans font-semibold text-3xl text-white -mt-4'>{totalRange}</p> */}
                      {loading ? (
                          <CircularProgress style={{ color: '#ffffff' }} />
                        ) : (
                      <p className='font-sans font-semibold text-3xl text-white -mt-4'>{allCardData?.activeUsersCount}</p>
                      )}
                    </div>
                    <div className='w-full text-end -mt-1 px-2'>
                      <p className='font-sans font-normal text-sm text-gray-200'>{t('Active Members')}</p>
                    </div>
                  </div>
                </div>
                <div className='h-auto w-full bg-[#F73F3F] rounded-lg'>
                  <div>
                    <div className='flex justify-between items-center px-3 py-3'>
                      <img src={rangebarcode} alt="" className='h-16 w-16 object-contain' />
                      {/* <p className='font-sans font-semibold text-2xl text-white -mt-4'>1 to {totalRange -  1}</p> */}
                      {loading ? (
                          <CircularProgress style={{ color: '#ffffff' }} />
                        ) : (
                          <p className='font-sans font-semibold text-3xl text-white -mt-4'>{allCardData?.inactiveUsersCount}</p>
                      )}
                    </div>  
                    <div className='w-full text-end -mt-1 px-2'>
                      <p className='font-sans font-normal text-md text-gray-200'>{t('In Active Members')}</p>
                    </div>
                  </div>
                </div>
                <div className='h-auto w-full bg-[#1CC085] rounded-md'>
                  <div>
                    <div className='flex justify-between items-center px-3 py-3'>
                      <img src={barcoderemain} alt="" className='h-16 w-16 object-contain' />
                      {/* <p className='font-sans font-semibold text-3xl text-white -mt-4'>{gtinBarcodeIssued}</p> */}
                      {loading ? (
                          <CircularProgress style={{ color: '#ffffff' }} />
                        ) : (
                      <p className='font-sans font-semibold text-3xl text-white -mt-4'>{allCardData?.usersCount}</p>
                      )}
                    </div>
                    <div className='w-full text-end -mt-1 px-2'>
                      <p className='font-sans font-normal text-md text-gray-200'>{t('Total Members')}</p>
                    </div>
                  </div>
                </div>
                <div className='h-auto w-full bg-[#01A6BC] rounded-md'>
                  <div>
                    <div className='flex justify-between items-center px-3 py-3'>
                      <img src={barcodeIssued} alt="" className='h-16 w-16 object-contain' />
                      {/* <p className='font-sans font-semibold text-3xl text-white -mt-4'>{gtinBarcodeRemaining}</p> */}
                      {loading ? (
                          <CircularProgress style={{ color: '#ffffff' }} />
                        ) : (
                      <p className='font-sans font-semibold text-3xl text-white -mt-4'>{allCardData?.productsCount}</p>
                      )}
                    </div>
                    <div className='w-full text-end -mt-1 px-2'>
                      <p className='font-sans font-normal text-md text-gray-200'>{t('Products')}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* ))} */}
            </div>


            {/* <!-- ./Statistics Cards --> */}

            <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4 bg-gradient-to-r from-[#C3E2DC]">
              {/* <!-- Social Traffic --> */}
              <div className="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 w-full shadow-lg rounded">
                <DashboardTable data={newRegisteredMembers} loading={newRegisteredMembersLoader} secondaryColor="secondary" columnsName={newlyRegisteredMembersColumn(t)} title={t('Newly Registered Members')} UniqueId="assetPrintingId" />
              </div>

              {/* <!-- Social Traffic2 --> */}
              <div className="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50  w-full shadow-lg rounded">
                <DashboardTable data={pendingApprovals} loading={pendingApprovalsLoader} secondaryColor="secondary" columnsName={pendingApprovalColumn(t)} title={t('Pending Approvals')} UniqueId="assetPrintingId" />
              </div>

              {/* <!-- Social Traffic2 --> */}
              <div className="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 w-full shadow-lg rounded">
                <DashboardTable data={allRegisteredMembers} loading={allRegisteredMembersLoader} secondaryColor="secondary" columnsName={registerdMemberColumn(t)} title={t('Registered Members')} UniqueId="assetPrintingId" />
              </div>

              {/* <!-- Social Traffic2 --> */}
              <div className="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 w-full shadow-lg rounded">
                <DashboardTable data={memberReneval} loading={memberRenevalLoader} secondaryColor="secondary" columnsName={memberForRenevalColumn(t)} title={t('Members for Renewal')} UniqueId="assetPrintingId" />
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>

    // </div>
  )
}

export default Dashboard