import React, { useEffect, useState } from 'react'
import "./Dashboard.css"
// import userRequest from '../../utils/userRequest'
import DashboardTable from '../../../components/AdminDashboardTable/DashboardTable'
import { subscribedGtinColumn } from '../../../utils/datatablesource'
import DashboardRightHeader from '../../../components/DashboardRightHeader/DashboardRightHeader'
import categorybarcode from '../../../Images/categorybarcode.png'
import rangebarcode from '../../../Images/rangebarcode.png'
import barcodeIssued from '../../../Images/barcodeIssued.png'
import barcoderemain from '../../../Images/barcoderemain.png'

const Dashboard = () => {
  const [newExpectedReceipts, setNewExpectedReceipts] = useState([]);
  const [newExpectedShipments, setNewExpectedShipments] = useState([]);
  const [newItemsDispatch, setNewItemsDispatch] = useState([]);
  const [newTransferOrder, setNewTransferOrder] = useState([]);

  // useEffect(() => {

  //   const getAllAssetsList = async () => {
  //     try {

  //       const response = await userRequest.get("/getAllExpectedShipments")

  //       setNewExpectedReceipts(response.data)

  //     }
  //     catch (error) {
  //       console.log(error);

  //     }
  //   };

  //   const getAllExpectedShipments = async () => {
  //     try {

  //       userRequest.get("/getAllShipmentDataFromtShipmentReceivingCL")
  //         .then(response => {
  //           console.log(response.data)
  //           setNewExpectedShipments(response.data)
  //         })
  //         .catch(error => {


  //           console.error(error);
  //         });

  //     }
  //     catch (error) {
  //       console.log(error);

  //     }
  //   };

  //   const getNewItemsDispatch = async () => {
  //     try {

  //       userRequest.get("/getAllTblDispatchingData")
  //         .then(response => {
  //           // response.data == "no data available" ? setNewItemsDispatch([]) : setNewItemsDispatch(response.data);
  //           setNewItemsDispatch(response.data)
  //         })
  //         .catch(error => {

  //           // setError(error?.response?.data?.message ?? "Something went wrong");

  //           console.error(error);
  //         });

  //     }
  //     catch (error) {
  //       console.log(error);

  //     }
  //   };

  //   const getNewTransferOrder = async () => {
  //     try {

  //       userRequest.get("/getAllExpectedTransferOrder")
  //         .then(response => {
  //           // response.data == "no data available" ? setNewTransferOrder([]) : setNewTransferOrder(response.data);
  //           setNewTransferOrder(response.data)
  //         })
  //         .catch(error => {

  //           // setError(error?.response?.data?.message ?? "Something went wrong");

  //           console.error(error);
  //         });

  //     }
  //     catch (error) {
  //       console.log(error);

  //     }
  //   };

  //   getAllAssetsList();
  //   getAllExpectedShipments();
  //   getNewItemsDispatch();
  //   getNewTransferOrder();
  // }, [])
  return (
    <div>
      <div className="p-0 h-full sm:ml-72">
       <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black dark:text-white">

        <div className="h-full mb-10 bg-gradient-to-r from-[#C3E2DC]">
          <div className='bg-[#C3E2DC]'>
           <DashboardRightHeader title={"Dashboard"}/>
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
                      <p className='font-sans font-semibold text-3xl text-white -mt-4'>0</p>
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
                      <p className='font-sans font-semibold text-2xl text-white -mt-4'>102</p>
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
                      <p className='font-sans font-semibold text-3xl text-white -mt-4'>730</p>
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
                      <p className='font-sans font-semibold text-3xl text-white -mt-4'>226358</p>
                    </div>
                    <div className='w-full text-end -mt-1 px-2'>
                      <p className='font-sans font-normal text-md text-gray-200'>Peoducts</p>
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
              <DashboardTable data={newExpectedReceipts} secondaryColor="secondary" columnsName={subscribedGtinColumn} title={"Newly Registered Members"} UniqueId="assetPrintingId" />
            </div>

            {/* <!-- Social Traffic2 --> */}
            <div className="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50  w-full shadow-lg rounded">
              <DashboardTable data={newExpectedShipments} secondaryColor="secondary" columnsName={subscribedGtinColumn} title={"Pending Approvals"} UniqueId="assetPrintingId" />
            </div>

            {/* <!-- Social Traffic2 --> */}
            <div className="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 w-full shadow-lg rounded">
              <DashboardTable data={newItemsDispatch} secondaryColor="secondary" columnsName={subscribedGtinColumn} title={"Registered Members"} UniqueId="assetPrintingId" />
            </div>

            {/* <!-- Social Traffic2 --> */}
            <div className="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 w-full shadow-lg rounded">
              <DashboardTable data={newTransferOrder} secondaryColor="secondary" columnsName={subscribedGtinColumn} title={"Members for Renewal"} UniqueId="assetPrintingId" />
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