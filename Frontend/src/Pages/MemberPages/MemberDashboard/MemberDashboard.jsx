import React, { useEffect, useState } from 'react'
import DashboardRightHeader from '../../../components/DashboardRightHeader/DashboardRightHeader'
import categorybarcode from '../../../Images/categorybarcode.png'
import rangebarcode from '../../../Images/rangebarcode.png'
import barcodeIssued from '../../../Images/barcodeIssued.png'
import barcoderemain from '../../../Images/barcoderemain.png'
import dashboardchart from '../../../Images/dashboardchart.png'
import newRequest from '../../../utils/userRequest'
import CountdownTimer from './CountdownTimer'
import Dashboardchart from './DashboardChart'
import { useTranslation } from 'react-i18next';

const MemberDashboard = () => {
  const memberData = JSON.parse(sessionStorage.getItem('memberData'));
  // console.log('memberData', memberData);
  const [expiryDate, setExpiryDate] = useState('');
  const { t, i18n } = useTranslation();

  const [gtinSubscriptions, setGtinSubscriptions] = useState([]);
  const [totalCategory, setTotalCategory] = useState('');
  const [totalRange, setTotalRange] = useState('');
  const [gtinBarcodeIssued, setGtinBarcodeIssued] = useState('');
  const [gtinBarcodeRemaining, setGtinBarcodeRemaining] = useState('');

  const [otherProductSubscriptions, setOtherProductSubscriptions] = useState([]);
  // const [totalCategoryOther, setTotalCategoryOther] = useState('');
  // const [totalRangeOther, setTotalRangeOther] = useState('');
  // const [gtinBarcodeIssuedOther, setGtinBarcodeIssuedOther] = useState('');
  // const [gtinBarcodeRemainingOther, setGtinBarcodeRemainingOther] = useState('');

  
  useEffect(() => {
   const fetchMemberProducts = async () => {
      try {
        const response = await newRequest.get(`/gtinProducts/subcriptionsProducts?status=active&user_id=${memberData?.id}&isDeleted=false`);
        console.log(response.data);
        setExpiryDate(response?.data?.gtinSubscriptions[0]?.expiry_date);

        setGtinSubscriptions(response?.data?.gtinSubscriptions);
        setTotalCategory(response?.data?.gtinSubscriptions[0]?.gtin_product?.member_category_description);
        setTotalRange(response?.data?.gtinSubscriptions[0]?.gtin_product?.total_no_of_barcodes);
        setGtinBarcodeIssued(response?.data?.gtinSubscriptions[0]?.gtin_subscription_counter);
        setGtinBarcodeRemaining(response?.data?.gtinSubscriptions[0]?.gtin_subscription_limit);
        

        setOtherProductSubscriptions(response?.data?.otherProductSubscriptions);


     
      } catch (err) {
        console.log(err);
      }
    }
    fetchMemberProducts();
  }, []) 

  return (
    <div>
      <div className={`p-0 h-full bg-slate-100 ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
          <div>
            <DashboardRightHeader 
            title={t('Dashboard')} 
            />
          </div>

        <div className={`flex flex-col justify-center items-center p-4 mt-3 ${i18n.language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="h-auto w-full px-5 py-4 bg-[#225BED] rounded-md">
              <div className='w-full flex justify-between items-center'>
                <div className={'w-full flex flex-col gap-1'}>
                    <p className='sm:text-3xl text-lg text-white font-sans font-semibold'>GCP: {memberData?.gcpGLNID}</p>
                    <p className='sm:text-3xl text-lg text-white font-sans font-semibold'>{t('Member ID')}: <span>{memberData?.memberID}</span></p>
                </div>

                <CountdownTimer expiryDate={expiryDate} />

                {/* <div className='w-full flex flex-col gap-1 justify-end items-end'>
                    <p className='sm:text-3xl text-lg text-white font-body font-normal'>365d 19h 49m 31s</p>
                    <p className='sm:text-xl text-lg text-gray-200 font-body font-normal'>Your Subscription Will Expire On</p>
                </div> */}
              </div>
            </div>
          </div>

            {/* Four Cards */}
            <div>
            {gtinSubscriptions?.map((item, index) => (
             <div key={index} className='grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 p-4 -mt-2'>
               <div className='h-auto w-full bg-[#345ECC] rounded-lg'>
                  <div>
                    <div className='flex justify-between items-center px-3 py-3'>
                      <img src={categorybarcode} alt="" className='h-16 w-16 object-contain'/>
                      <p className='font-sans font-semibold text-3xl text-white -mt-4'>{totalRange}</p>
                    </div>
                    <div className='w-full text-end -mt-1 px-2'>
                      <p className='font-sans font-normal text-sm text-gray-200'>{totalCategory}</p>
                    </div>
                  </div> 
              </div>          
              <div className='h-auto w-full bg-[#F73F3F] rounded-lg'>
                  <div>
                    <div className='flex justify-between items-center px-3 py-3'>
                      <img src={rangebarcode} alt="" className='h-16 w-16 object-contain'/>
                      <p className='font-sans font-semibold text-2xl text-white -mt-4'>1 to {totalRange -  1}</p>
                    </div>
                    <div className='w-full text-end -mt-1 px-2'>
                      <p className='font-sans font-normal text-md text-gray-200'>{t('Range of Barcodes')}</p>
                    </div>
                  </div>
              </div>
              <div className='h-auto w-full bg-[#1CC085] rounded-md'>
                  <div>
                    <div className='flex justify-between items-center px-3 py-3'>
                      <img src={barcoderemain} alt="" className='h-16 w-16 object-contain'/>
                      <p className='font-sans font-semibold text-3xl text-white -mt-4'>{gtinBarcodeIssued}</p>
                    </div>
                    <div className='w-full text-end -mt-1 px-2'>
                      <p className='font-sans font-normal text-md text-gray-200'> {t('Barcodes Issued')}</p>
                    </div>
                  </div>
              </div>
              <div className='h-auto w-full bg-[#01A6BC] rounded-md'>
                  <div>
                    <div className='flex justify-between items-center px-3 py-3'>
                      <img src={barcodeIssued} alt="" className='h-16 w-16 object-contain'/>
                      <p className='font-sans font-semibold text-3xl text-white -mt-4'>{gtinBarcodeRemaining}</p>
                    </div>
                    <div className='w-full text-end -mt-1 px-2'>
                      <p className='font-sans font-normal text-md text-gray-200'>{t('Barcodes remaining')}</p>
                    </div>
                  </div>
              </div>
              </div>
              ))}
            </div>

            {/* Other Products */}
            <div>
              {otherProductSubscriptions?.map((item, index) => (
                <div key={index} className='grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 p-4 -mt-2'>
                  <div className='h-auto w-full bg-[#345ECC] rounded-lg'>
                    <div>
                      <div className='flex justify-between items-center px-3 py-3'>
                        <img src={categorybarcode} alt="" className='h-16 w-16 object-contain'/>
                        <p className='font-sans font-semibold text-3xl text-white -mt-4'>{item.product.total_no_of_barcodes}</p>
                      </div>
                      <div className='w-full text-end -mt-1 px-2'>
                        <p className='font-sans font-normal text-sm text-gray-200'>{item.product.product_name}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className='h-auto w-full bg-[#F73F3F] rounded-lg'>
                    <div>
                      <div className='flex justify-between items-center px-3 py-3'>
                        <img src={rangebarcode} alt="" className='h-16 w-16 object-contain'/>
                        <p className='font-sans font-semibold text-2xl text-white -mt-4'>1 to {item.product.total_no_of_barcodes -  1}</p>
                      </div>
                      <div className='w-full text-end -mt-1 px-2'>
                        <p className='font-sans font-normal text-md text-gray-200'>{t('Range of Barcodes')}</p>
                      </div>
                    </div>
                  </div>

                  <div className='h-auto w-full bg-[#1CC085] rounded-md'>
                    <div>
                      <div className='flex justify-between items-center px-3 py-3'>
                        <img src={barcoderemain} alt="" className='h-16 w-16 object-contain'/>
                        <p className='font-sans font-semibold text-3xl text-white -mt-4'>{item.other_products_subscription_counter}</p>
                      </div>
                      <div className='w-full text-end -mt-1 px-2'>
                        <p className='font-sans font-normal text-md text-gray-200'> {t('Barcodes Issued')}</p>
                      </div>
                    </div>
                  </div>

                  <div className='h-auto w-full bg-[#01A6BC] rounded-md'>
                    <div>
                      <div className='flex justify-between items-center px-3 py-3'>
                        <img src={barcodeIssued} alt="" className='h-16 w-16 object-contain'/>
                        <p className='font-sans font-semibold text-3xl text-white -mt-4'>{item.other_products_subscription_limit}</p>
                      </div>
                      <div className='w-full text-end -mt-1 px-2'>
                        <p className='font-sans font-normal text-md text-gray-200'>{t('Barcodes remaining')}</p>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
            
                
            <div className='h-auto w-full px-5 py-4'>
                <p className={`text-secondary font-sans text-3xl font-semibold mt-5 ${i18n.language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>{t('Member Products')}</p>
                {/* <img src={dashboardchart} alt='' /> */}
                <Dashboardchart />
            </div>
       </div>
    </div>
  )
}

export default MemberDashboard