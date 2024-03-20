import React, { useRef, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import DashboardRightHeader from '../../../../components/DashboardRightHeader/DashboardRightHeader';
import { DotLoader } from 'react-spinners'
import { useTranslation } from 'react-i18next';
import second from "../../../../Images/second.png"
import newRequest from '../../../../utils/userRequest'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import DigitalLinkTab from './DigitalLinkTab';
import CodificationTab from './CodificationTab';
import Miscellaneous from './Miscellaneous';

const AddForeignGtin = () => {
    const { t, i18n } = useTranslation();
    const [activeTab, setActiveTab] = useState('product-Infomation');
    const [userSearch, setUserSearch] = useState('');
    const [data, setData] = useState([]);
    const memberDataString = sessionStorage.getItem('memberData');
    const memberData = JSON.parse(memberDataString);
    // console.log(memberData);
    const [isLoading, setIsLoading] = useState(false);
    const [addProductsLoader, setAddProductsLoader] = useState(false);
    const navigate = useNavigate();

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
  


    const handleUserSearch = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const response = await newRequest.get(`/foreignGtin/getGtinProductDetailsFromLocalDb?barcode=${userSearch}`);
        console.log(response?.data);
        setData(response?.data);
        setIsLoading(false);
      }
      catch (error) {
        // console.log(error);
        if (error.response && error.response.status === 404) {
          try {
            const globalResponse = await newRequest.get(`/foreignGtin/getGtinProductDetailsFromGlobalDb?barcode=${userSearch}`);
            console.log(globalResponse?.data);
            setData(globalResponse?.data);
          }
          catch (globalError) {
            // console.log(globalError);
            toast.error(globalError?.response?.data?.error || globalError?.response?.data?.message || `${t('Something went wrong!')}`);
            setData([]);
          }
        } else {
          toast.error(error?.response?.data?.error || `${t('Something went wrong!')}`);
          setData([]);
        }
        setIsLoading(false);
      }
    };
    

    
    const products = [
      { name: `${t('GTIN')}`, value: data?.gtin || data?.globalGepirArr?.gtin },
      { name: `${t('Brand Name')}`, value: data?.brandName || data?.globalGepirArr?.brandName },
      { name: `${t('Product Description')}`, value: data?.productDescription || data?.globalGepirArr?.productDescription },
      { name: `${t('Product Image Url')}`, value: data?.productImageUrl ? <a style={{color: '#a8e0f4'}} href={data?.productImageUrl} target="_blank">{data?.productImageUrl}</a> : <a style={{color: '#a8e0f4'}} href={data?.globalGepirArr?.productImageUrl} target="_blank">{data?.globalGepirArr?.productImageUrl}</a> },
      { name: `${t('Gcp GLNID')}`, value: data?.gcpGLNID || data?.globalGepirArr?.gcpGLNID },
      { name: 'Net Content', value: data?.unitValue || `${data?.globalGepirArr?.unitValue} ${data?.globalGepirArr?.unitCode}` },
      { name: `${t('Country of sale')}`, value: data?.countryOfSaleName || data?.globalGepirArr?.countryOfSaleName },
    ]
  
  
    const companyInformation = [
      { name: `${t('Company Name')}`, value: data?.companyName || data?.globalGepirArr?.companyName },
      { name: "Website", value: <p style={{color: 'gray'}}>Unknown</p> }, 
      { name: "Licence Key", value: data?.licenceKey || data?.globalGepirArr?.licenceKey },
      { name: "Licence Type", value: data?.licenceType || data?.globalGepirArr?.licenceType },
      { name: 'Global Location Number (GLN)', value: data?.gcpGLNID || data?.globalGepirArr?.gcpGLNID },
      { name: 'Licensing GS1 Member Organisation', value: data?.moName || data?.globalGepirArr?.moName },
    ]
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      setAddProductsLoader(true);
      try {
        const response = await newRequest.post('/foreignGtin', {
          BrandName: data?.brandName || data?.globalGepirArr?.brandName,
          productnameenglish: data?.productName || data?.globalGepirArr?.productName,
          moName: data?.moName || data?.globalGepirArr?.moName,
          barcode: data?.gtin || data?.globalGepirArr?.gtin,
          // details_page: data?.details_page,
          unit: data?.unitValue || `${data?.globalGepirArr?.unitValue} ${data?.globalGepirArr?.unitCode}`,
          // front_image: data?.front_image,
          gpc: data?.gcpGLNID || data?.globalGepirArr?.gcpGLNID,
          gpc_code: data?.gpcCategoryCode || data?.globalGepirArr?.gpcCategoryCode,
          // size: data?.size,
          countrySale: data?.countryOfSaleName || data?.globalGepirArr?.countryOfSaleName,
          companyId: memberData?.companyID,
        });
        // console.log(response?.data);
        toast.success(response?.data?.message || `${t('Product Added Successfully')}`);
        setAddProductsLoader(false);
  
        setTimeout(() => {
          navigate(-1);
        }, 500);
  
      }
      catch (error) {
        // console.log(error);
        toast.error(error?.response?.data?.error || `${t('Something went wrong!')}`);
        setAddProductsLoader(false);
      }
    };


    return (
        <>
          <div className={`p-0 h-full bg-slate-100 ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
            <div>
                <DashboardRightHeader title={`${t('Add Foreign GTIN')}`} 
                    member={`Member: ${memberData?.company_name_eng}`} 
                    gcp={`GCP: ${memberData?.gcpGLNID}`}
                    />
            </div>

            <div className="flex flex-col justify-center items-center p-4">
              {" "}
                <div className="h-auto w-full p-5 bg-white">
                  <div className="">
                    <div className={`w-full font-body p-6 shadow-xl rounded-md text-black bg-[#C3E2DC] text-xl mb:2 md:mb-5 ${i18n.language === 'ar' ? 'text-end' : 'text-start'}`}>
                      <div className="flex justify-start flex-col gap-2 text-xs sm:text-sm">
                        <p className="font-semibold"> {t('Complete Data')}</p>
                        <p>
                          {t('This number is registered to company')}: :{" "}
                          <span className="font-semibold">{memberData?.company_name_eng}</span>
                            {/* <span className="font-semibold">Hasnain, Majid</span> */}
                        </p>
                      </div>
                    </div>
                  </div>

                
                <form onSubmit={handleUserSearch}>
                  <div className="flex sm:gap-8 gap-3 justify-center items-center py-3 px-1 mt-6">
                    <div className="w-full font-body sm:text-base text-sm mt-2">
                      <input
                          type="text"
                          id="fields1"
                          value={userSearch}
                          name="userSearch"
                          onChange={(e) => setUserSearch(e.target.value)}
                          className="border-1 w-full rounded-sm border-secondary p-2"
                          placeholder='Search'
                        />
                    </div>

                    <div className="w-[70%] font-body sm:text-base flex justify-start items-center text-sm mt-2">
                        <Button
                            variant="contained"
                            style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                            disabled={isLoading}
                            type="submit"
                            className="sm:w-[70%] w-full ml-2"
                            endIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : null}
                        >
                            SEARCH
                        </Button>
                    </div>
                 </div>

                 <div className='w-full h-[2px] bg-red-400 mt-6'></div>


            {/* Tabs Button */}
              <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-6">
                <button
                  className={`p-4 truncate rounded ${activeTab === 'product-Infomation' ? 'bg-primary text-white' : 'bg-white text-primary'
                    } shadow-md flex items-center justify-center`}
                  onClick={() => handleTabClick('product-Infomation')}
                  type='button'
                >
                  Product Infomation
                </button>

                <button
                  className={`p-4 rounded truncate ${activeTab === 'company-information' ? 'bg-primary text-white' : 'bg-white text-primary'
                    } shadow-md flex items-center justify-center`}
                  onClick={() => handleTabClick('company-information')}
                  type='button'
                >
                  Company Information
                </button>

                <button
                  className={`p-4 rounded ${activeTab === 'digital-link' ? 'bg-primary text-white' : 'bg-white text-primary'
                    } shadow-md flex items-center justify-center`}
                  onClick={() => handleTabClick('digital-link')}
                  type='button'
                >
                  Digital Link
                </button>

                {/* <button
                  className={`p-4 rounded ${activeTab === 'Codification' ? 'bg-primary text-white' : 'bg-white text-primary'
                    } shadow-md flex items-center justify-center`}
                  onClick={() => handleTabClick('Codification')}
                  type='button'
                >
                  Codification
                </button>

                <button
                  className={`p-4 rounded ${activeTab === 'Miscellaneous' ? 'bg-primary text-white' : 'bg-white text-primary'
                    } shadow-md flex items-center justify-center`}
                  onClick={() => handleTabClick('Miscellaneous')}
                  type='button'
                >
                  Miscellaneous
                </button> */}
              </div>


                {/* Tabs Content */}
                {activeTab === "product-Infomation" && (
                  <div className="flex flex-col md:flex-row mt-6 border-[0.7px] shadow-lg border-primary mb-6">
                    <div className="w-full md:w-1/3 flex justify-center items-center p-4 ">
                        <img
                          src={data?.productImageUrl || data?.globalGepirArr?.productImageUrl}
                          alt="Product"
                          className="w-1/2 object-contain"
                        />
                    </div>

                    <div className="w-full md:w-2/3">
                      <div className="container mx-auto mt-6 p-4">
                        <div className="overflow-x-auto">
                          <table className="table-auto min-w-max w-full">
                            <tbody>
                              {products.map((product, index) => (
                                <tr key={index}>
                                  <td className="border px-4 py-2 sm:text-sm md:text-base font-semibold text-xs">
                                    {product.name}
                                  </td>
                                  <td className="border font-body px-4 py-2 sm:text-sm font-bold text-black md:text-base text-xs">
                                    {product.value}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Second Tab */}
                {activeTab === "company-information" && (
                <div className="shadow-lg border-[0.7px] mt-6 border-primary mb-6">
                  <h2 className='text-2xl text-secondary font-body text-center mt-2'>Information about the company that licenced this GTIN</h2>
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full">
                      <div className="container mx-auto mt-6 p-4">
                        <div className="overflow-x-auto">
                          <table className="table-auto min-w-max w-full">
                            <tbody>
                              {companyInformation.map((product, index) => (
                                <tr key={index}>
                                  <td className="border px-4 py-2 sm:text-sm md:text-base font-semibold text-xs">
                                    {product.name}
                                  </td>
                                  <td className="border font-body px-4 py-2 sm:text-sm font-bold text-black md:text-base text-xs">
                                    {product.value}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}


                {/* third Tab */}
                {activeTab === 'digital-link' && (
                  <div className="shadow-lg border-[0.7px] mt-6 border-primary mb-6">
                    <DigitalLinkTab barcodeData={data?.gtin}/>
                  </div>
                )}


                {/* Fourth Tab */}
                {/* {activeTab === 'Codification' && (
                  <div className="shadow-lg border-[0.7px] mt-6 border-primary mb-6">
                    <div className='mt-2 border border-gray-300'>
                      <CodificationTab gs1ProductData={data?.gcpGLNID}/>
                    </div>
                  </div>
                )} */}


                {/* Fifth Tab */}
                {/* {activeTab === 'Miscellaneous' && (
                  <div className="shadow-lg border-[0.7px] mt-6 border-primary mb-6">
                    <div className='mt-2 border border-gray-300'>
                      <Miscellaneous />
                    </div>
                  </div>
                )} */}

                

                   <div className="flex justify-between flex-wrap mb-20">
                        <button type='button' onClick={() => navigate(-1)} className="bg-secondary text-white py-2 px-3 rounded-sm"> {t('Back')}</button>
                        {/* <button 
                          onClick={handleSubmit}
                        type='button' className="bg-green-500 text-white py-2 px-3 rounded-sm" id="gtin-form">Save Product</button> */}
                        <Button
                            variant="contained"
                            style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
                            disabled={addProductsLoader}
                            onClick={handleSubmit}
                            className="px-3 py-2 ml-2"
                            endIcon={addProductsLoader ? <CircularProgress size={24} color="inherit" /> : null}
                        >
                            Save Product
                        </Button>
                    </div>
                </form>

              </div>

              </div>
           </div>
        </>
    )
}
export default AddForeignGtin;