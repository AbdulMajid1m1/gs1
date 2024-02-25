import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { DataMatrixGenerator } from '../../../utils/Barcodes/Barcodes';
import Header from '../../../components/Header/Header';
import DropDownSelection from '../DropDownSelection/DropDownSelection';
import Footer from '../../../components/Footer/Footer';
import { toast } from 'react-toastify';
import axios from 'axios';

const GTINReports = () => {
  const { t, i18n } = useTranslation();
  const [gtin, setGTIN] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleSearch = () => {
    // 6281000000113-25 2023-batch01-01 2023-BSW220200512603
    if (!gtin) {
      toast.error("Please enter GTIN");
      return;
    }
    setLoading(true);
  
    axios.post("https://gs1ksa.org/api/search/member/gtin", { gtin: gtin })
      .then((response) => {
        if (response.data?.gtinArr === undefined || Object.keys(response.data?.gtinArr).length === 0) {
          toast.error("No data found");
          setData(null);
          setLoading(false);
          return
        }
        console.log(response?.data);
        setData(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setData(null);
        toast.error("Something went wrong");
        setLoading(false);
      });
  };


  const products = [
    { name: "GTIN", value: data?.gtinArr?.gtin },
    { name: i18n.language === "ar" ? `${t('Brand Name')}`: "Brand name", value: data?.gtinArr?.brandName },
    { name: i18n.language === "ar" ? `${t('Product Description')}` : "Product description", value: data?.gtinArr?.productDescription },
    { name: i18n.language === "ar" ? `${t('Product image URL')}` : "Product image URL", value: data?.gtinArr?.productImageUrl },
    { name: i18n.language === "ar" ? `${t('Global product category')}` : "Global product category", value: data?.gtinArr?.gpcCategoryCode },
    // check if data has unitcode then show value
    { name: i18n.language === "ar" ? `${t('Net content')}` : "Net content", value: data?.gtinArr?.unitCode && data?.gtinArr?.unitValue && `${data?.gtinArr?.unitCode} ${data?.gtinArr?.unitValue}` },
    { name: i18n.language === "ar" ? `${t('Country of Sale')}` : "Country of sale", value: data?.gtinArr?.countryOfSaleCode },
  ];


  return (
    <div>
       {/* Nav */}
       <div className='sticky top-0 z-50 bg-white'>
          <Header />
       </div>

       <div>
         <DropDownSelection />
       </div>

       <div className='mt-10 mb-10 px-4 md:px-10 lg:px-10 xl:px-36 2xl:px-[270px] 3xl:px-96'>
          <div className="">
              <div className='flex flex-col gap-2'>
                <label className='text-secondary sm:text-2xl text-lg font-body'>Enter a barcode number/GTIN</label>
                <div className='flex sm:w-[60%] w-full'>
                  <input
                    type="text"
                    name='gtin'
                    className="sm:w-[50%] w-full border h-10 rounded-sm px-5 font-medium text-black border-gray-200"
                    placeholder='Search'
                    value={gtin}
                    onChange={(event) => setGTIN(event.target.value)}
                  />
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#cd3c0d', color: '#ffffff' }}
                    onClick={handleSearch}
                    disabled={loading}
                    className="ml-2"
                    endIcon={loading ? <CircularProgress size={24} color="inherit" /> : null}
                  >
                    Search
                  </Button>
                </div>
                <p className='text-secondary text-base'>Example search: 628000000000</p>
              </div>

              {data && data.gtinArr && (
                <div>
                  <div className='flex justify-end sm:px-40 px-10 py-10'>
                    <div style={{ height: "80px"}}>
                      <DataMatrixGenerator
                        text={`${data?.gtinArr?.gtin} - ${data?.gtinArr?.brandName}`} 
                      />
                      <p className='text-sm text-secondary'>{data?.gtinArr?.gtin}</p>
                      <p className='text-sm text-secondary'>{data?.gtinArr?.brandName}</p>
                    </div>
                  </div>

                  <div className="">
                    <div className={`w-full font-body p-6 shadow-xl rounded-md text-black bg-[#C3E2DC] text-xl mb:2 md:mb-5 ${i18n.language === 'ar' ? 'text-end' : 'text-start'}`}>
                      <div className="flex justify-start flex-col gap-2 text-xs sm:text-sm">
                        <p className="font-semibold"> {t('Complete Data')}</p>
                          <p>
                            {t('This number is registered to company')}: :{" "}
                            <span className="font-semibold">{data?.gtinArr?.companyName}</span>
                          </p>
                      </div>
                    </div>
                  </div>

                 <div className='text-center text-2xl font-medium text-secondary mb-2'>
                    <p>{data?.gtinArr?.productDescription}</p>
                 </div>
                 
                  <div className="flex flex-col md:flex-row border-[0.9px] border-gray-300">
                    <div className="w-full md:w-1/3 flex justify-center items-center p-4">
                      {data?.gtinArr?.productImageUrl && (
                        <img src={data.gtinArr.productImageUrl} alt="Product" className="w-1/2" />
                      )}
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

              
              <div className="flex flex-col sm:gap-8 sm:flex-row sm:justify-between mt-4">
                  <div className="w-full sm:h-28 font-body sm:text-base text-sm">
                    <label htmlFor="fields1" className="text-secondary">Write your comment here <span className='text-red-500'>*</span></label>
                      <textarea
                          type="text"
                          id="fields1"
                          className="border-1 h-auto w-full rounded-sm border-[#8E9CAB] p-2"
                          />
                  </div>

                  <div className="w-full h-16 font-body">
                    <label htmlFor="fields2" className="text-secondary">Select you action <span className='text-red-500'>*</span></label>
                      <select
                          type="text"
                          id="fields2"
                          className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                          >
                          <option>-select-</option>
                          <option>1</option>
                      </select>
                  </div>
              </div>

              <div>
                  <button className='bg-primary text-white px-3 py-2' type='button'>Take Photo of Item</button>
              </div>

            </div>
            )}
          </div>
      </div>

      {/* Footer */}
      <Footer />
  </div>
);

}

export default GTINReports;
