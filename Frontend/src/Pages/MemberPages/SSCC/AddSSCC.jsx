import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import newRequest from '../../../utils/userRequest';
import { toast } from 'react-toastify';
import DashboardRightHeader from '../../../components/DashboardRightHeader/DashboardRightHeader';
import { DotLoader } from 'react-spinners'
import { useTranslation } from 'react-i18next';

const AddSSCC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const memberDataString = sessionStorage.getItem('memberData');
  const memberData = JSON.parse(memberDataString);
  console.log(memberData);


  const [palletForm, setShowPalletForm] = React.useState(false);
  const [labelForm, setShowLabelForm] = React.useState(false);
  const [digitExtension, setDigitExtension] = React.useState('');
  const [ssccType, setSSCCType] = React.useState('');
  const [vendorID, setVendorID] = React.useState('');
  const [vendorName, setVendorName] = React.useState('');
  const [productID, setProductID] = React.useState('');
  const [productDesc, setProductDesc] = React.useState('');
  const [serialNo, setSerialNo] = React.useState('');
  const [itemCode, setItemCode] = React.useState('');
  const [qty, setQty] = React.useState('');
  const [useBy, setUseBy] = React.useState('');
  const [batchNo, setBatchNo] = React.useState('');
  const [boxOf, setBoxOf] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(false);




  const [hsn, setHSN] = React.useState('');
  const [po, setPO] = React.useState('');
  const [expireDate, setExpireDate] = React.useState('');
  const [vendorLabelID, setVendorLabelID] = React.useState('');
  const [cartonQty, setCartonQty] = React.useState('');
  const [shipTo, setShipTo] = React.useState('');
  const [shipDate, setShipDate] = React.useState('');
  const [vendorItem, setVendorItem] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [shortQtyCode, setShortQtyCode] = React.useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState([]);
  const [selectedCountryOfOrigin, setSelectedCountryOfOrigin] = useState('');
  const [carton, setCarton] = React.useState('');


  const handleCountryOfOrigin = async () => {
    try {
        const response = await newRequest.get('/getAllcountryofsale');
        console.log(response.data);
        const data = response.data;
        setCountryOfOrigin(data);
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    handleCountryOfOrigin();
  },[])


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(digitExtension, ssccType, vendorID, vendorName, productID, productDesc, serialNo, itemCode, qty, useBy, batchNo, boxOf);
    console.log(hsn, po, expireDate, vendorLabelID, cartonQty, shipTo, shipDate, vendorItem, description, shortQtyCode, countryOfOrigin, carton);

    const apiRequestBody = {
      // preDigit: digitExtension,
      sscc_type: ssccType,
      product_id: productID,
      // gcpGLNID: 62810008,
      VendorID: vendorID,
      VendorName: vendorName,
      productID: productID,
      description: productDesc,
      SerialNumber: serialNo,
      ItemCode: itemCode,
      Qty: qty,
      UseBy: useBy,
      BatchNo: batchNo,
      Boxof: boxOf,
      // user_id: 3,
      user_id: memberData?.id,


      // preDigit: 0,
      // sscc_type: 'pallet',
      // product_id: '2',
      // gcpGLNID: 62810008,
      // PalletVendorID: '4',
      // VendorName: 'ventdow',
      // productID: '2',
      // PalletDescription: '4',
      // SerialNumber: '5',
      // ItemCode: '8',
      // PalletQty: '120',
      // UseBy: 'not',
      // BatchNo: 'good',
      // Boxof: 'box',
      // user_id: 3,

    };

    console.log(apiRequestBody)

    if (ssccType === 'pallet') {
      newRequest
        .post('/sscc', apiRequestBody)
        .then((response) => {
          const data = response.data;
          console.log('Pallet API Response:', data);
          setIsLoading(false);

          toast.success(response?.data?.message || `${t('SSCC created successfully')}`, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });

          setTimeout(() => {
            navigate(-1)
          }, 1500)
          e.target.reset();


        })
        .catch((error) => {
          console.error('Error calling Pallet API:', error);
          setIsLoading(false);

          toast.error(error?.response?.data?.error || 'Error', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })

        });
    } else if (ssccType === 'label') {

      const labelApiRequestBody = {
        // product_id: '4',
        // // gcpGLNID: 62810008,
        // PalletVendorID: '',
        // VendorName: '',
        // productID: '',
        // reference_id: '8',
        // PalletDescription: '',
        // SerialNumber: '',
        // ItemCode: '',
        // PalletQty: '',
        // UseBy: '',
        // BatchNo: '',
        // Boxof: '',
        // preDigit: digitExtension,
        sscc_type: ssccType,
        user_id: memberData?.id,
        hsn_sku: hsn,
        po_no: po,
        expiraton_date: expireDate,
        VendorID: vendorLabelID,
        Qty: cartonQty,
        ship_to: shipTo,
        ship_date: shipDate,
        vendor_item_no: vendorItem,
        short_qty_code: shortQtyCode,
        description: description,
        // country_id: countryOfOrigin,
        country_id: selectedCountryOfOrigin,
        carton: carton,

      };

      console.log(labelApiRequestBody)

      newRequest
        .post('/sscc', labelApiRequestBody)
        .then((response) => {
          // Handle success response from Label API
          const data = response.data;
          console.log('Label API Response:', data);

          toast.success(response?.data?.message || 'SSCC created successfully.', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });

          setIsLoading(false)
          setTimeout(() => {
            navigate(-1)
          }, 1500)
          e.target.reset();


        })
        .catch((error) => {
          // Handle error calling Label API
          console.error('Error calling Label API:', error);

          toast.error(error?.response?.data?.error || 'Error', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })

          setIsLoading(false)
        });


    }
  };




  return (
    <div>

      {isLoading &&

        <div className='loading-spinner-background'
          style={{
            zIndex: 9999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)',
            display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed'


          }}
        >
          <DotLoader
            size={45}
            color={"#FF693A"}
            // height={4}
            loading={isLoading}
          />
        </div>
      }

      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        <div>
          <DashboardRightHeader title={`${t('Add SSCC')}`} />
        </div>

        <div className="flex flex-col justify-center items-center p-4">
          {" "}
          <div className="h-auto w-full p-5 bg-white">
            <div className="">
              <div className="w-full font-body p-6 shadow-xl rounded-md text-black bg-[#C3E2DC] text-xl mb:2 md:mb-5">
                <div className={`flex justify-start flex-col gap-2 text-xs sm:text-sm ${i18n.language === 'ar' ? 'text-end' : 'text-start'}`}>
                  <p className="font-semibold"> {t('Complete Data')}</p>
                  <p>

                    {i18n.language === 'ar' ? (
                      <>
                        <span className="font-semibold">{memberData?.company_name_arabic}</span>
                        :: {t('This number is registered to company')}
                      </>
                    ) : (
                      <>
                        {t('This number is registered to company')}: :{" "}
                        <span className="font-semibold">{memberData?.company_name_eng}</span>
                      </>
                    )}
                    {/* <span className="font-semibold">Hasnain, Majid</span> */}
                  </p>
                </div>
              </div>
            </div>
            <div className={`flex ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}>
              <button onClick={() => navigate(-1)} className="rounded-full bg-[#1E3B8B] font-body px-8 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-[#4b6fd2] active:bg-blue-700">
                {i18n.language === 'ar' ? (
                  <>
                    {t('Back')} <i className="fas fa-arrow-right ml-1"></i>
                  </>
                ) : (
                  <>
                    <i className="fas fa-arrow-left mr-1"></i> {t('Back')}
                  </>
                )}
              </button>
            </div>


            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mt-4">
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                  <label htmlFor='extension'>  {t('Extension Digit')}<span className='text-red-600'>*</span></label>
                  <select
                    id='extension'
                    type='text'
                    onChange={(e) => setDigitExtension(e.target.value)}
                    className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                  >
                    <option value=''>-{t('Select')}-</option>
                    <option value='0'>0</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select>
                </div>


                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                  <label htmlFor='sscctype'>{t('SSCC Type')}<span className='text-red-600'>*</span></label>
                  <select
                    onChange={(e) => {
                      setSSCCType(e.target.value);
                      setShowPalletForm(e.target.value === 'pallet');
                      setShowLabelForm(e.target.value === 'label');
                    }}
                    id='sscctype'
                    type='text'
                    className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                  >
                    <option value=''>-{t('Select')}-</option>
                    <option value='pallet'>Pallet</option>
                    <option value='label'>Label</option>
                  </select>
                </div>
              </div>


              {palletForm && (
                <div>
                  <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mt-4">
                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                      <label htmlFor='vendorid'> {t('VendorID')}<span className='text-red-600'>*</span></label>
                      <input
                        onChange={(e) => setVendorID(e.target.value)}
                        id='vendorid'
                        required
                        type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />
                    </div>

                    <div className='w-full font-body sm:text-base text-sm flex flex-col gap-0'>
                      <label htmlFor='addressArabic'>{t('Vendor Name')}<span className='text-red-600'>*</span></label>
                      <input
                        onChange={(e) => setVendorName(e.target.value)}
                        id='vendorname'
                        required
                        type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />
                    </div>
                  </div>


                  <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mt-4">
                    <div className='w-full font-body sm:text-base text-sm flex flex-col gap-0'>
                      <label htmlFor='productid'>{t('ProductID')}<span className='text-red-600'>*</span></label>
                      <input
                        onChange={(e) => setProductID(e.target.value)}
                        id='productid'
                        required
                        type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />
                    </div>

                    <div className='w-full font-body sm:text-base text-sm flex flex-col gap-0'>
                      <label htmlFor='produvtdesc'>{t('Product Description')}<span className='text-red-600'>*</span></label>
                      <input
                        onChange={(e) => setProductDesc(e.target.value)}
                        id='produvtdesc'
                        required
                        type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />
                    </div>
                  </div>


                  <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mt-4">
                    <div className='w-full font-body sm:text-base text-sm flex flex-col gap-0'>
                      <label htmlFor='serialno'> {t('Serial Number')}<span className='text-red-600'>*</span></label>
                      <input
                        onChange={(e) => setSerialNo(e.target.value)}
                        id='serialno'
                        required
                        type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />
                    </div>

                    <div className='w-full font-body sm:text-base text-sm flex flex-col gap-0'>
                      <label htmlFor='itemcode'>{t('Item Code')}<span className='text-red-600'>*</span></label>
                      <input
                        onChange={(e) => setItemCode(e.target.value)}
                        id='itemcode'
                        required
                        type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />
                    </div>
                  </div>


                  <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mt-4">
                    <div className='w-full font-body sm:text-base text-sm flex flex-col gap-0'>
                      <label htmlFor='qty'>{t('Qty')}<span className='text-red-600'>*</span></label>
                      <input
                        onChange={(e) => setQty(e.target.value)}
                        id='qty'
                        required
                        type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />
                    </div>

                    <div className='w-full font-body sm:text-base text-sm flex flex-col gap-0'>
                      <label htmlFor='useby'>{t('UseBy')} <span className='text-red-600'>*</span></label>
                      <input
                        onChange={(e) => setUseBy(e.target.value)}
                        id='useby'
                        required
                        type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />
                    </div>
                  </div>


                  <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mt-4">
                    <div className='w-full font-body sm:text-base text-sm flex flex-col gap-0'>
                      <label htmlFor='batch'>{t('BatchNo')}<span className='text-red-600'>*</span></label>
                      <input
                        onChange={(e) => setBatchNo(e.target.value)}
                        id='batch'
                        required
                        type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />
                    </div>

                    <div className='w-full font-body sm:text-base text-sm flex flex-col gap-0'>
                      <label htmlFor='boxof'>{t('Boxof')} <span className='text-red-600'>*</span></label>
                      <input
                        onChange={(e) => setBoxOf(e.target.value)}
                        id='boxof'
                        required
                        type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />
                    </div>
                  </div>
                </div>
              )}


              {labelForm && (
                <div>
                  <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mt-4">
                    <div className='w-full font-body sm:text-base text-sm flex flex-col gap-0'>
                      <label htmlFor='hsn'>{t('HSN SKU Number')}<span className='text-red-600'>*</span></label>
                      <input
                        onChange={(e) => setHSN(e.target.value)}
                        id='hsn'
                        required
                        type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />
                    </div>

                    <div className='w-full font-body sm:text-base text-sm flex flex-col gap-0'>
                      <label htmlFor='po'>{t('P.O No')} <span className='text-red-600'>*</span></label>
                      <input
                        onChange={(e) => setPO(e.target.value)}
                        id='po'
                        required
                        type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mt-4">
                    <div className='w-full font-body sm:text-base text-sm flex flex-col gap-0'>
                      <label htmlFor='expire'>{t('Expiration Date')}<span className='text-red-600'>*</span></label>
                      <input
                        onChange={(e) => setExpireDate(e.target.value)}
                        id='expire'
                        required
                        type='date' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />
                    </div>

                    <div className='w-full font-body sm:text-base text-sm flex flex-col gap-0'>
                      <label htmlFor='vendorlabelID'> {t('VendorID')} <span className='text-red-600'>*</span></label>
                      <input
                        onChange={(e) => setVendorLabelID(e.target.value)}
                        id='vendorlabelID'
                        required
                        type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mt-4">
                    <div className='w-full font-body sm:text-base text-sm flex flex-col gap-0'>
                      <label htmlFor='carton'>{t('Carton Quantity')}<span className='text-red-600'>*</span></label>
                      <input
                        onChange={(e) => setCartonQty(e.target.value)}
                        id='carton'
                        required
                        type='text' cclassName="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />
                    </div>

                    <div className='w-full font-body sm:text-base text-sm flex flex-col gap-0'>
                      <label htmlFor='shipto'>{t('Ship TO')}  <span className='text-red-600'>*</span></label>
                      <input
                        onChange={(e) => setShipTo(e.target.value)}
                        id='shipto'
                        required
                        type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mt-4">
                    <div className='w-full font-body sm:text-base text-sm flex flex-col gap-0'>
                      <label htmlFor='shipdate'> {t('Ship Date')}  <span className='text-red-600'>*</span></label>
                      <input
                        onChange={(e) => setShipDate(e.target.value)}
                        id='shipdate'
                        required
                        type='date' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />
                    </div>

                    <div className='w-full font-body sm:text-base text-sm flex flex-col gap-0'>
                      <label htmlFor='vendorItem'>{t('Vendor Item No')} <span className='text-red-600'>*</span></label>
                      <input
                        onChange={(e) => setVendorItem(e.target.value)}
                        id='vendorItem'
                        required
                        type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mt-4">
                    <div className='w-full font-body sm:text-base text-sm flex flex-col gap-0'>
                      <label htmlFor='description'>{t('Description')} <span className='text-red-600'>*</span></label>
                      <input
                        onChange={(e) => setDescription(e.target.value)}
                        id='description'
                        required
                        type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />
                    </div>

                    <div className='w-full font-body sm:text-base text-sm flex flex-col gap-0'>
                      <label htmlFor='showcode'>{t('Short Qty Code')} <span className='text-red-600'>*</span></label>
                      <input
                        onChange={(e) => setShortQtyCode(e.target.value)}
                        id='showcode'
                        required
                        type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mt-4">
                    <div className='w-full font-body sm:text-base text-sm flex flex-col gap-0'>
                      <label htmlFor='country'>{t('Country Of Origin')} <span className='text-red-600'>*</span></label>
                      <select
                        onChange={(e) => setSelectedCountryOfOrigin(e.target.value)}
                        value={selectedCountryOfOrigin}  
                        id='country'
                        type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                      >
                        <option>-{t('select')}-</option>
                        {/* <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option> */}
                        {countryOfOrigin.map((countryId, index) => (
                          <option key={index} value={countryId.id}>{countryId.country_name}</option>
                        ))}
                      </select>
                    </div>

                    <div className='w-full font-body sm:text-base text-sm flex flex-col gap-0'>
                      <label htmlFor='carton'>{t('Carton')} <span className='text-red-600'>*</span></label>
                      <input
                        onChange={(e) => setCarton(e.target.value)}
                        id='carton'
                        required
                        type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />
                    </div>
                  </div>
                </div>
              )}

              <button type='submit' className="rounded-sm bg-secondary font-body px-8 py-3 text-sm mb-0 mt-6 text-white transition duration-200 hover:bg-primary">
                <i className="fas fa-check-circle mr-1"></i> {t('Submit')}
              </button>
            </form>

          </div>

        </div>
      </div>
    </div>
  )
}

export default AddSSCC