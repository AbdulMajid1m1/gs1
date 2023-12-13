import React from 'react'
import DashboardRightHeader from '../../../components/DashboardRightHeader/DashboardRightHeader'
import categorybarcode from '../../../Images/categorybarcode.png'
import rangebarcode from '../../../Images/rangebarcode.png'
import barcodeIssued from '../../../Images/barcodeIssued.png'
import barcoderemain from '../../../Images/barcoderemain.png'
import dashboardchart from '../../../Images/dashboardchart.png'

const MemberDashboard = () => {
  return (
    <div>
       <div className="h-full sm:ml-72 bg-slate-100">
          <div>
            <DashboardRightHeader 
              title={'Dashboard'}
            />
          </div>

          <div className="flex flex-col justify-center items-center p-4 mt-3">
            <div className="h-auto w-full px-5 py-4 bg-[#225BED] rounded-md">
              <div className='w-full flex justify-between items-center'>
                <div className='w-full flex flex-col gap-1'>
                    <p className='sm:text-3xl text-lg text-white font-sans font-semibold'>GCP: 62810000032</p>
                    <p className='sm:text-3xl text-lg text-white font-sans font-semibold'>Member ID: 3998</p>
                </div>

                <div className='w-full flex flex-col gap-1 justify-end items-end'>
                    <p className='sm:text-3xl text-lg text-white font-body font-normal'>365d 19h 49m 31s</p>
                    <p className='sm:text-xl text-lg text-gray-200 font-body font-normal'>Your Subscription Will Expire On</p>
                </div>
              </div>
            </div>
          </div>

            {/* Four Cards */}
            <div className='grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 p-4 -mt-2'>
              <div className='h-auto w-full bg-[#345ECC] rounded-lg'>
                  <div>
                    <div className='flex justify-between items-center px-3 py-3'>
                      <img src={categorybarcode} alt="" className='h-16 w-16 object-contain'/>
                      <p className='font-sans font-semibold text-4xl text-white -mt-4'>10</p>
                    </div>
                    <div className='w-full text-end -mt-1 px-2'>
                      <p className='font-sans font-normal text-lg text-gray-200' style={{ whiteSpace: 'nowrap' }}>Category A (10 Barcodes)</p>
                    </div>
                  </div>
              </div>
              <div className='h-auto w-full bg-[#F73F3F] rounded-lg'>
                  <div>
                    <div className='flex justify-between items-center px-3 py-3'>
                      <img src={rangebarcode} alt="" className='h-16 w-16 object-contain'/>
                      <p className='font-sans font-semibold text-4xl text-white -mt-4'>1 to 9</p>
                    </div>
                    <div className='w-full text-end -mt-1 px-2'>
                      <p className='font-sans font-normal text-xl text-gray-200'>Range of Barcodes</p>
                    </div>
                  </div>
              </div>
              <div className='h-auto w-full bg-[#1CC085] rounded-md'>
                  <div>
                    <div className='flex justify-between items-center px-3 py-3'>
                      <img src={barcoderemain} alt="" className='h-16 w-16 object-contain'/>
                      <p className='font-sans font-semibold text-4xl text-white -mt-4'>0</p>
                    </div>
                    <div className='w-full text-end -mt-1 px-2'>
                      <p className='font-sans font-normal text-xl text-gray-200'>Barcodes Issued</p>
                    </div>
                  </div>
              </div>
              <div className='h-auto w-full bg-[#01A6BC] rounded-md'>
                  <div>
                    <div className='flex justify-between items-center px-3 py-3'>
                      <img src={barcodeIssued} alt="" className='h-16 w-16 object-contain'/>
                      <p className='font-sans font-semibold text-4xl text-white -mt-4'>9</p>
                    </div>
                    <div className='w-full text-end -mt-1 px-2'>
                      <p className='font-sans font-normal text-xl text-gray-200'>Barcodes remaining</p>
                    </div>
                  </div>
              </div>
            </div>
            
            <div className='h-auto w-full px-5 py-4'>
                <p className='text-secondary font-sans text-3xl font-semibold mt-5'>Member Products</p>
                <img src={dashboardchart} alt='' />
            </div>
       </div>
    </div>
  )
}

export default MemberDashboard