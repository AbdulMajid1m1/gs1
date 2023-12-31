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

const Dashboard = () => {
  const [newRegisteredMembers, setNewRegisteredMembers] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [allRegisteredMembers, setAllRegisteredMembers] = useState([]);
  const [memberReneval, setMemberReneval] = useState([]);
  const [allCardData, setAllCardData] = useState([]);
  const [newRegisteredMembersLoader, setNewRegisteredMembersLoader] = useState(false);
  const [pendingApprovalsLoader, setPendingApprovalsLoader] = useState(false);
  const [allRegisteredMembersLoader, setAllRegisteredMembersLoader] = useState(false);
  const [memberRenevalLoader, setMemberRenevalLoader] = useState(false);


    const getAllNewlyRegisteredMembers = async () => {
      setNewRegisteredMembersLoader(true);
      try {

        const response = await newRequest.get("/users/new")

        console.log(response.data)
        setNewRegisteredMembers(response.data)
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

        newRequest.get("/users?status=inactive")
          .then(response => {
            console.log(response.data)
            setPendingApprovals(response.data)
            setPendingApprovalsLoader(false);
          })
          .catch(error => {


            console.error(error);
            setPendingApprovalsLoader(false);
          });

      }
      catch (error) {
        console.log(error);

      }
    };

    const getAllRegisteredMembers = async () => {
      setAllRegisteredMembersLoader(true);
      try {

        newRequest.get("/users?status=active")
          .then(response => {
            console.log( " Registed", response.data)
            setAllRegisteredMembers(response.data)
            setAllRegisteredMembersLoader(false);
          })
          .catch(error => {

        
            console.error(error);
            setAllRegisteredMembersLoader(false);
          });

      }
      catch (error) {
        console.log(error);

      }
    };

    const getNewTransferOrder = async () => {
      setMemberRenevalLoader(true);
      try {

        newRequest.get("/users/getByGcpExpiry")
          .then(response => {
            console.log("MemberReneval", response.data)
            setMemberReneval(response.data)
            setMemberRenevalLoader(false);
          })
          .catch(error => {

       
            console.error(error);
            setMemberRenevalLoader(false);
          });

      }
      catch (error) {
        console.log(error);

      }
    };

    
    const getAllCardsData = async () => {
      try {

        newRequest.get("/users/adminStatsCounts")
          .then(response => {
            console.log(response.data)
            setAllCardData(response.data)
          })
          .catch(error => {

       
            console.error(error);
          });

      }
      catch (error) {
        console.log(error);

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
      <div className="p-0 h-full sm:ml-72">
       <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black dark:text-white">

        <div className="h-full mb-10 bg-gradient-to-r from-[#C3E2DC]">
          <div className='bg-[#C3E2DC]'>
           <AdminDashboardRightHeader title={"Dashboard"}/>
          </div>

          {/* <!-- Statistics Cards --> */}
            <div>
            {/* {gtinSubscriptions?.map((item, index) => ( */}
            {/* <div key={index} className='grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 p-4 -mt-2'> */}
             <div className='grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 p-4 bg-gradient-to-r from-[#C3E2DC] mt-5'>
               <div className='h-auto w-full bg-[#345ECC] rounded-lg'>
                  <div>
                    <div className='flex justify-between items-center px-3 py-3'>
                      <img src={categorybarcode} alt="" className='h-16 w-16 object-contain'/>
                      {/* <p className='font-sans font-semibold text-3xl text-white -mt-4'>{totalRange}</p> */}
                      <p className='font-sans font-semibold text-3xl text-white -mt-4'>{allCardData?.activeUsersCount}</p>
                    </div>
                    <div className='w-full text-end -mt-1 px-2'>
                      <p className='font-sans font-normal text-sm text-gray-200'>Active Members</p>
                    </div>
                  </div> 
              </div>          
              <div className='h-auto w-full bg-[#F73F3F] rounded-lg'>
                  <div>
                    <div className='flex justify-between items-center px-3 py-3'>
                      <img src={rangebarcode} alt="" className='h-16 w-16 object-contain'/>
                      {/* <p className='font-sans font-semibold text-2xl text-white -mt-4'>1 to {totalRange -  1}</p> */}
                      <p className='font-sans font-semibold text-3xl text-white -mt-4'>{allCardData?.inactiveUsersCount}</p>
                    </div>
                    <div className='w-full text-end -mt-1 px-2'>
                      <p className='font-sans font-normal text-md text-gray-200'>In Active Members</p>
                    </div>
                  </div>
              </div>
              <div className='h-auto w-full bg-[#1CC085] rounded-md'>
                  <div>
                    <div className='flex justify-between items-center px-3 py-3'>
                      <img src={barcoderemain} alt="" className='h-16 w-16 object-contain'/>
                      {/* <p className='font-sans font-semibold text-3xl text-white -mt-4'>{gtinBarcodeIssued}</p> */}
                      <p className='font-sans font-semibold text-3xl text-white -mt-4'>{allCardData?.usersCount}</p>
                    </div>
                    <div className='w-full text-end -mt-1 px-2'>
                      <p className='font-sans font-normal text-md text-gray-200'>Total Members</p>
                    </div>
                  </div>
              </div>
              <div className='h-auto w-full bg-[#01A6BC] rounded-md'>
                  <div>
                    <div className='flex justify-between items-center px-3 py-3'>
                      <img src={barcodeIssued} alt="" className='h-16 w-16 object-contain'/>
                      {/* <p className='font-sans font-semibold text-3xl text-white -mt-4'>{gtinBarcodeRemaining}</p> */}
                      <p className='font-sans font-semibold text-3xl text-white -mt-4'>{allCardData?.productsCount}</p>
                    </div>
                    <div className='w-full text-end -mt-1 px-2'>
                      <p className='font-sans font-normal text-md text-gray-200'>Products</p>
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
              <DashboardTable data={newRegisteredMembers} loading={newRegisteredMembersLoader} secondaryColor="secondary" columnsName={newlyRegisteredMembersColumn} title={"Newly Registered Members"} UniqueId="assetPrintingId" />
            </div>

            {/* <!-- Social Traffic2 --> */}
            <div className="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50  w-full shadow-lg rounded">
              <DashboardTable data={pendingApprovals} loading={pendingApprovalsLoader} secondaryColor="secondary" columnsName={pendingApprovalColumn} title={"Pending Approvals"} UniqueId="assetPrintingId" />
            </div>

            {/* <!-- Social Traffic2 --> */}
            <div className="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 w-full shadow-lg rounded">
              <DashboardTable data={allRegisteredMembers} loading={allRegisteredMembersLoader} secondaryColor="secondary" columnsName={registerdMemberColumn} title={"Registered Members"} UniqueId="assetPrintingId" />
            </div>

            {/* <!-- Social Traffic2 --> */}
            <div className="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 w-full shadow-lg rounded">
              <DashboardTable data={memberReneval} loading={memberRenevalLoader} secondaryColor="secondary" columnsName={memberForRenevalColumn} title={"Members for Renewal"} UniqueId="assetPrintingId" />
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