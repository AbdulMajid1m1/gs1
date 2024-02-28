import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import newRequest from '../../../utils/userRequest';
import { toast } from 'react-toastify';
import { DotLoader } from 'react-spinners'
import DashboardRightHeader from '../../../components/DashboardRightHeader/DashboardRightHeader';
import { useTranslation } from 'react-i18next';


const UpdateSSCC = () => {
  const { t, i18n } = useTranslation();
  
  const navigate = useNavigate();
    let { sscc_id } = useParams();
    // console.log(sscc_id)   
    
    // const [palletForm, setShowPalletForm] = React.useState(false);
    // const [labelForm, setShowLabelForm] = React.useState(false);
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

    // selected state
    const [palletForm, setShowPalletForm] = React.useState(ssccType === 'pallet');
    const [labelForm, setShowLabelForm] = React.useState(ssccType === 'label');

    const handleSSCCTypeChange = (e) => {
      const selectedSSCCType = e.target.value;
      setSSCCType(selectedSSCCType);
      setShowPalletForm(selectedSSCCType === 'pallet');
      setShowLabelForm(selectedSSCCType === 'label');
    };

   
    useEffect(() => {
      setIsLoading(true)
      const fetchProductDetails = async () => {
          try {
              const response = await newRequest.get(`/sscc/?id=${sscc_id}`)

              const productData = response.data[0];
            //   console.log(productData)

              // Set the state variables with the fetched data
              setSSCCType(productData?.sscc_type);
              setVendorID(productData?.VendorID);
              setVendorName(productData?.VendorName);
              setProductID(productData?.productID);
              setProductDesc(productData?.description);
              setSerialNo(productData?.SerialNumber);
              setItemCode(productData?.ItemCode);
              setQty(productData?.Qty);
              setUseBy(productData?.UseBy);
              setBatchNo(productData?.BatchNo);
              setBoxOf(productData?.Boxof);
              setHSN(productData?.hsn_sku);
              setPO(productData?.po_no);
              setExpireDate(productData?.expiraton_date);
              setVendorLabelID(productData?.VendorID)
              setCartonQty(productData?.Qty);
              setShipTo(productData?.ship_to);
              setShipDate(productData?.ship_date);
              setVendorItem(productData?.vendor_item_no);
              setCarton(productData?.carton);
              setShortQtyCode(productData?.short_qty_code);
              setSelectedCountryOfOrigin(productData?.country_id);
              setDescription(productData?.description);
              // Update the form visibility based on ssccType
              setShowPalletForm(productData?.sscc_type === 'pallet');
              setShowLabelForm(productData?.sscc_type === 'label');


              setIsLoading(false)

          } catch (error) {
              console.log(error);
              setIsLoading(false)
          }
      }
      fetchProductDetails();
  }, [sscc_id]);



    
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
        //   user_id: memberData?.id,


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
          .put(`/sscc/${sscc_id}`, apiRequestBody)
          .then((response) => {
            const data = response.data;
            console.log('Pallet API Response:', data);
            setIsLoading(false);
            
            toast.success(response?.data?.message || `${t('SSCC updated successfully')}`, {
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
            },1500)
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
        //   user_id: memberData?.id,
          hsn_sku: hsn,
          po_no: po,
          expiraton_date: expireDate,
          VendorID: vendorLabelID,
          Qty: cartonQty,
          ship_to: shipTo,
          ship_date: shipDate,
          vendor_item_no: vendorItem,
          short_qty_code: shortQtyCode,
          description : description,
          // country_id: countryOfOrigin,
          country_id: selectedCountryOfOrigin,
          carton: carton,
        
        };
        
        console.log(labelApiRequestBody)

        newRequest
          .put(`/sscc/${sscc_id}`, labelApiRequestBody)
          .then((response) => {
            // Handle success response from Label API
            const data = response.data;
            console.log('Label API Response:', data);

            toast.success(response?.data?.message || `${t('SSCC updated successfully')}`, {
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
            },1500)
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
          {/* <div className='h-auto w-full p-1'> */}
            <div>
                {/* <div className='h-16 w-full shadow-xl flex justify-start items-center px-10 border-l-2 border-[#e49515]'>
                    <p className='sm:text-2xl text-sm font-body'>Update SSCC</p>
                </div> */}
                 <div>
                   <DashboardRightHeader title={`${t('Update SSCC')}`}/>
                </div>

            <div className='h-auto w-full px-0 pt-2 shadow-xl'>
                <div  className={` h-auto w-full p-6 shadow-xlflex ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}>
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


                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='extension'>{t('Extension Digit')}<span className='text-red-600'>*</span></label>
                            <select 
                              id='extension' 
                                type='text'
                                value={digitExtension}
                                 onChange={(e) => setDigitExtension(e.target.value)} 
                                  className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3'
                            >
                                <option value=''>- {t('Select')} -</option>
                                <option value='0'>0</option>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                            </select>                      
                        </div>


                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='sscctype'>{t('SSCC Type')}<span className='text-red-600'>*</span></label>
                            <select
                              value={ssccType}
                              // onChange={(e) => {
                              //   setSSCCType(e.target.value);
                              //   setShowPalletForm(e.target.value === 'pallet');
                              //   setShowLabelForm(e.target.value === 'label');
                              //   }}
                              onChange={handleSSCCTypeChange}
                                id='sscctype' 
                                  type='text' 
                                    className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' 
                            >
                                <option value=''>-{t('Select')}-</option>
                                <option value='pallet'>Pallet</option>
                                <option value='label'>Label</option>
                            </select>                      
                        </div>
                    </div>

                    {palletForm && (
                    <div>
                    <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                        <label htmlFor='vendorid'> {t('VendorID')}<span className='text-red-600'>*</span></label>
                            <input
                              value={vendorID}
                              onChange={(e) => setVendorID(e.target.value)} 
                              id='vendorid' 
                              required
                              type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>

                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='addressArabic'>{t('Vendor Name')}<span className='text-red-600'>*</span></label>
                            <input
                            value={vendorName}
                            onChange={(e) => setVendorName(e.target.value)} 
                            id='vendorname' 
                            required
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>
                    </div>


                    <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='productid'>{t('ProductID')}<span className='text-red-600'>*</span></label>
                            <input
                              value={productID}
                              onChange={(e) => setProductID(e.target.value)} 
                            id='productid'
                            required 
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>

                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='produvtdesc'>{t('Product Description')}<span className='text-red-600'>*</span></label>
                            <input
                            value={productDesc}
                            onChange={(e) => setProductDesc(e.target.value)} 
                            id='produvtdesc' 
                            required
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>
                    </div>


                    <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='serialno'>{t('Serial Number')}<span className='text-red-600'>*</span></label>
                            <input
                              value={serialNo}
                              onChange={(e) => setSerialNo(e.target.value)} 
                            id='serialno' 
                            required
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>

                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='itemcode'>{t('Item Code')}<span className='text-red-600'>*</span></label>
                            <input
                            value={itemCode}
                            onChange={(e) => setItemCode(e.target.value)} 
                            id='itemcode' 
                            required
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>
                    </div>


                    <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                        <label htmlFor='qty'>{t('Qty')}<span className='text-red-600'>*</span></label>
                            <input
                              value={qty}
                              onChange={(e) => setQty(e.target.value)} 
                            id='qty' 
                            required
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>

                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='useby'>{t('UseBy')} <span className='text-red-600'>*</span></label>
                            <input
                            value={useBy}
                            onChange={(e) => setUseBy(e.target.value)} 
                            id='useby' 
                            required
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>
                    </div>


                    <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='batch'>{t('BatchNo')}<span className='text-red-600'>*</span></label>
                            <input
                              value={batchNo}
                              onChange={(e) => setBatchNo(e.target.value)} 
                            id='batch' 
                            required
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>

                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='boxof'>{t('Boxof')}  <span className='text-red-600'>*</span></label>
                            <input
                            value={boxOf}
                            onChange={(e) => setBoxOf(e.target.value)} 
                            id='boxof'
                            required
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>
                    </div>
                    </div>
                    )}


                    {labelForm && (
                    <div>
                    <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='hsn'>{t('HSN SKU Number')}<span className='text-red-600'>*</span></label>
                            <input
                              value={hsn}
                              onChange={(e) => setHSN(e.target.value)} 
                            id='hsn' 
                            required
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>

                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='po'>{t('P.O No')}<span className='text-red-600'>*</span></label>
                            <input
                            value={po}
                            onChange={(e) => setPO(e.target.value)} 
                            id='po' 
                            required
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>
                    </div>

                    <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='expire'>{t('Expiration Date')}<span className='text-red-600'>*</span></label>
                            <input
                              value={expireDate}
                              onChange={(e) => setExpireDate(e.target.value)} 
                            id='expire' 
                            required
                            type='date' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>

                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='vendorlabelID'>{t('VendorID')}  <span className='text-red-600'>*</span></label>
                            <input
                            value={vendorLabelID}
                            onChange={(e) => setVendorLabelID(e.target.value)} 
                            id='vendorlabelID' 
                            required
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>
                    </div>

                    <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='carton'>{t('Carton Quantity')}<span className='text-red-600'>*</span></label>
                            <input
                              value={cartonQty}
                              onChange={(e) => setCartonQty(e.target.value)} 
                            id='carton' 
                            required
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>

                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='shipto'>{t('Ship TO')}<span className='text-red-600'>*</span></label>
                            <input
                            value={shipTo}
                            onChange={(e) => setShipTo(e.target.value)} 
                            id='shipto'
                            required
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>
                    </div>

                    <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='shipdate'>{t('Ship Date')}<span className='text-red-600'>*</span></label>
                            <input
                              value={shipDate}
                              onChange={(e) => setShipDate(e.target.value)} 
                            id='shipdate' 
                            required
                            type='date' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>

                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='vendorItem'>{t('Vendor Item No')}<span className='text-red-600'>*</span></label>
                            <input
                            value={vendorItem}
                            onChange={(e) => setVendorItem(e.target.value)} 
                            id='vendorItem'
                            required
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>
                    </div>

                    <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='description'>{t('Description')} <span className='text-red-600'>*</span></label>
                            <input
                              value={description}
                              onChange={(e) => setDescription(e.target.value)} 
                            id='description' 
                            required
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>

                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='showcode'>{t('Short Qty Code')} <span className='text-red-600'>*</span></label>
                            <input
                            value={shortQtyCode}
                            onChange={(e) => setShortQtyCode(e.target.value)} 
                            id='showcode' 
                            required
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>
                    </div>

                    <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='country'>{t('Country Of Origin')}<span className='text-red-600'>*</span></label>
                            <select
                             onChange={(e) => setSelectedCountryOfOrigin(e.target.value)}
                             value={selectedCountryOfOrigin} 
                            id='country' 
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' 
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

                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='carton'>{t('Carton')} <span className='text-red-600'>*</span></label>
                            <input
                            value={carton}
                            onChange={(e) => setCarton(e.target.value)} 
                            id='carton' 
                            required
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>
                    </div>
                    </div>
                    )}

                    <button type='submit' className="rounded-full bg-[#1E3B8B] font-body px-8 py-3 text-sm mb-0 mt-6 text-white transition duration-200 hover:bg-[#4b6fd2] active:bg-blue-700">
                        <i className="fas fa-check-circle mr-1"></i>  {t('Submit')}
                    </button>
                </form>
                
                </div>
            </div>

          </div>
        </div>
    </div>
  )
}

export default UpdateSSCC