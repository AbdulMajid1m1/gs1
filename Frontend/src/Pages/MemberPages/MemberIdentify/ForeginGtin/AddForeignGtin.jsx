import React, { useRef, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import DashboardRightHeader from '../../../../components/DashboardRightHeader/DashboardRightHeader';
import { DotLoader } from 'react-spinners'
import { useTranslation } from 'react-i18next';
import second from "../../../../Images/second.png"

const AddForeignGtin = () => {
    const { t, i18n } = useTranslation();
    const memberDataString = sessionStorage.getItem('memberData');
    const memberData = JSON.parse(memberDataString);
    // console.log(memberData);
    const [isLoading, setIsLoading] = useState(false);

    
    const products = [
        { name: "GTIN", value: "GTIN" },
        { name: i18n.language === "ar" ? `${t('Brand Name')}`: "Brand name", value: 'Brand name' },
        { name: i18n.language === "ar" ? `${t('Product Description')}` : "Product description", value: 'Product description' },
        { name: i18n.language === "ar" ? `${t('Product image URL')}` : "Product image URL", value: 'Product image URL' },
        { name: i18n.language === "ar" ? `${t('Global product category')}` : "Global product category", value: 'Global product category' },
        // check if data has unitcode then show value
        { name: i18n.language === "ar" ? `${t('Net content')}` : "Net content", value: 'Net content' },
        { name: i18n.language === "ar" ? `${t('Country of Sale')}` : "Country of sale", value: 'Country of sale' },
    
    ]

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

                
                <form>
                  <div className="flex sm:gap-8 gap-3 justify-center items-center py-3 px-1 mt-6">
                    <div className="w-full font-body sm:text-base text-sm mt-2">
                      <input
                          type="text"
                          id="fields1"
                        //   onChange={(e) => setProductNameEnglish(e.target.value)}
                        //   value={productNameEnglish}
                          className="border-1 w-full rounded-sm border-secondary p-2"
                          placeholder='Search'
                        />
                    </div>

                    <div className="w-[70%] font-body sm:text-base flex justify-start items-center text-sm mt-2">
                        <Button
                            variant="contained"
                            style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                            disabled={isLoading}
                            className="sm:w-[70%] w-full ml-2"
                            endIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : null}
                        >
                            SEARCH
                        </Button>
                    </div>
                 </div>

                 <div className='w-full h-[2px] bg-red-400 mt-6'></div>

                 {/* Table */}
                <div className="flex flex-col md:flex-row mt-6 border-[0.7px] shadow-lg border-primary mb-6">
                  <div className="w-full md:w-1/3 flex justify-center items-center p-4 ">
                    {/* Add your image element here */}
                    {/* {data?.gtinArr?.productImageUrl && ( */}
                        {/* // <img src={data.gtinArr.productImageUrl} alt="Product" className="w-1/2" /> */}

                    {/* // )} */}
                        <img src={second} className='' alt='' />
                    </div>

                    <div className="w-full md:w-2/3">
                    <div className="container mx-auto mt-6 p-4">
                        <div className="overflow-x-auto">
                        <table className="table-auto min-w-max w-full">
                          <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                <td className="border px-4 py-2 sm:text-sm md:text-base font-semibold text-xs">{product.name}</td>
                                <td className="border font-body px-4 py-2 sm:text-sm font-bold text-black md:text-base text-xs">{product.value}</td>
                                </tr>
                            ))}
                          </tbody>
                        </table>
                        </div>
                    </div>
                </div>
               </div>

                   <div className="flex justify-between flex-wrap mb-20">
                        <button type='button' onClick={() => navigate(-1)} className="bg-secondary text-white py-2 px-3 rounded-sm"> {t('Back')}</button>
                        <button type='submit' className="bg-green-500 hover:bg-primary text-white py-2 px-3 rounded-sm" id="gtin-form">Save Product</button>
                    </div>
                </form>

              </div>

              </div>
           </div>
        </>
    )
}
export default AddForeignGtin;
