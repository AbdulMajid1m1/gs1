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
import newRequest from '../../../utils/userRequest';
import Swal from 'sweetalert2';
import { GtinDataMatrixGenerator } from '../../../utils/Barcodes/GtinReportsDataMatrix';

const GTINReports = () => {
  const { t, i18n } = useTranslation();
  const [userSearch, setUserSearch] = useState('');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [typeComment, setTypeComment] = useState('');
  const [gtinselection, setGtinselection] = useState('');
  const [addProductLoader, setAddProductLoader] = useState(false);

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
      console.log(error);
      if (error.response && error.response.status === 404) {
        Swal.fire({
          title: `${t('Product Not Found')}`,
          text: `${t('Do you want to query in Global Database (GEPIR)?')}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: `${t('Yes Search')}`,
          cancelButtonText: `${t('Close')}`,
          // changes the color of the confirm button to red
          confirmButtonColor: '#021F69',
          cancelButtonColor: '#FF693A',
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const globalResponse = await newRequest.get(`/foreignGtin/getGtinProductDetailsFromGlobalDb?barcode=${userSearch}`);
              console.log(globalResponse?.data);
              setData(globalResponse?.data);
            } 
            catch (globalError) {
              console.log(globalError);
              toast.error(globalError?.response?.data?.error || globalError?.response?.data?.message || `${t('Something went wrong!')}`);
              setData(null);
            }
          }
        });
      } else {
        toast.error(error?.response?.data?.error || `${t('Something went wrong!')}`);
        setData(null);
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

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setSelectedImage(imageUrl);
  };

  const handleRemoveImage = () => {
      setSelectedImage(null);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddProductLoader(true);
    console.log( email, typeComment, gtinselection, selectedImage)

    const formData = new FormData();
    formData.append('report_barcode', data?.gtin || data?.globalGepirArr?.gtin);
    formData.append('report_comment', typeComment);
    formData.append('report_action', gtinselection);
    formData.append('report_status', 0);
    formData.append('reporter_email', email);

    // Append front image file
    const imageInput = document.querySelector('#imageInput');
    if (imageInput && imageInput.files && imageInput.files[0]) {
        formData.append('report_images', imageInput.files[0]);
    }

    try {
        const response = await newRequest.post(
            '/gtinHelperReports',
            formData
        );

        console.log(response);
        setSelectedImage(null);
        setTypeComment('');
        setGtinselection('');
        setEmail('');
        setAddProductLoader(false);
        toast.success(response?.data?.message || `${t('Product created Successfully')}`); 

    }
    catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.error || "Error");
        setAddProductLoader(false);
    }
  };



  return (
    <div>
       {/* Nav */}
       {/* <div className='sticky top-0 z-50 bg-white'>
          <Header />
       </div> */}

       <div>
         <DropDownSelection />
       </div>

       <div className='mt-10 mb-20 px-4 md:px-10 lg:px-10 xl:px-36 2xl:px-[270px] 3xl:px-96'>
           <div className="">
           <div>
              <div  className={`flex flex-col gap-2 ${
                i18n.language === "ar" ? "items-end" : "items-start"
              }`}>
                <label htmlFor='barcode' className='text-secondary sm:text-2xl text-lg font-body'>{t("Enter a barcode number/GTIN")}</label>
                <div className='flex sm:w-[60%] w-full'>
                  <input
                    id="barcode"
                    type="text"
                    className={`sm:w-[50%] w-full border h-10 rounded-sm px-5 font-medium text-black border-gray-200 ${
                      i18n.language === "ar" ? " text-right" : "text-left"
                    }`}
                    placeholder={t("Search")}
                    value={userSearch}
                    onChange={(event) => setUserSearch(event.target.value)}
                  />
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#cd3c0d', color: '#ffffff' }}
                    // type='submit'
                    onClick={handleUserSearch}
                    disabled={isLoading}
                    className="ml-2"
                    endIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : null}
                  >
                     {t("Search")}
                  </Button>
                </div>
                <p className='text-secondary text-base'>{t("Example search")}: 628000000000</p>
              </div>
            </div>

              {data && (
                <div>
                  <div className='flex justify-end sm:px-40 px-10 py-10'>
                    <div style={{ height: "120px"}}>
                      <GtinDataMatrixGenerator
                        text={`${data?.gtin || data?.globalGepirArr?.gtin} - ${data?.brandName || data?.globalGepirArr?.brandName}`} 
                        />
                      <p className='text-sm text-secondary'>{data?.gtin || data?.globalGepirArr?.gtin}</p>
                      <p className='text-sm text-secondary'>{data?.brandName || data?.globalGepirArr?.brandName}</p>
                    </div>
                  </div>

                  <div className="">
                    <div className={`w-full font-body p-6 shadow-xl rounded-md text-black bg-[#C3E2DC] text-xl mb:2 md:mb-5 ${i18n.language === 'ar' ? 'text-end' : 'text-start'}`}>
                      <div className="flex justify-start flex-col gap-2 text-xs sm:text-sm">
                        <p className="font-semibold"> {t('Complete Data')}</p>
                          <p>
                            {t('This number is registered to company')}: :{" "}
                            <span className="font-semibold">{data?.companyName}</span>
                          </p>
                      </div>
                    </div>
                  </div>

                 <div className='text-center text-2xl font-medium text-secondary mb-2'>
                    <p>{data?.productDescription}</p>
                 </div>
                 
                  <div className="flex flex-col md:flex-row border-[0.9px] border-gray-300">
                    <div className="w-full md:w-1/3 flex justify-center items-center p-4">
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

              
              {/* Email Feild */}
              <form onSubmit={handleSubmit}>
              <div  className={`w-full font-body sm:text-base text-sm mt-4 ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}>
                <label htmlFor="email" className="text-secondary">{t("Email")} <span className='text-red-500'>*</span></label>
                  <input
                    type="email"
                    id="email"
                    placeholder={t('Email')}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    className={`border-1 h-auto w-full rounded-sm border-[#8E9CAB] p-2 ${
                      i18n.language === "ar" ? " text-right" : "text-left"
                    }`}
                  />
              </div>

              <div  className={`flex flex-col sm:gap-8 sm:flex-row sm:justify-between mt-4 ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}>
                  <div className="w-full sm:h-28 font-body sm:text-base text-sm">
                    <label htmlFor="fields1" className="text-secondary">{t("Write your comment here")} <span className='text-red-500'>*</span></label>
                      <textarea
                          type="text"
                          id="fields1"
                          onChange={(e) => setTypeComment(e.target.value)}
                          value={typeComment}
                          required
                          className={`border-1 h-auto w-full rounded-sm border-[#8E9CAB] p-2 ${
                            i18n.language === "ar" ? " text-right" : "text-left"
                          }`}
                          />
                  </div>

                  <div className="w-full h-16 font-body">
                    <label htmlFor="fields2" className="text-secondary">{t("Select you action")} <span className='text-red-500'>*</span></label>
                      <select
                          type="text"
                          id="fields2"
                          onChange={(e) => setGtinselection(e.target.value)}
                          value={gtinselection}
                          className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                          required
                          >
                          <option>-{t("select")}-</option>
                          <option value="Product Photo is not correct">Product Photo is not correct</option>
                          <option value="Product Description is not correct">Product Description is not correct</option>
                          <option value="GPC Code is not correct">GPC Code is not correct</option>
                          <option value="Net Contents is not correct">Net Contents is not correct</option>
                          <option value="Brand Name is not correct">Brand Name is not correct</option>
                          <option value="GTIN is not correct">GTIN is not correct</option>
                      </select>
                  </div>
              </div>

            
              <div className='flex flex-col justify-between'>
                  <div className="border-2 border-dashed h-56 w-56 relative flex justify-center">
                    <div className="absolute -bottom-4 flex justify-center items-center h-10 w-3/4 bg-secondary text-white font-body">
                      <label htmlFor="imageInput" className="cursor-pointer whitespace-nowrap">
                        {t("Take Photo of Item")}
                        <input
                          type="file"
                          id="imageInput"
                          // accept="image/*"
                          onChange={handleImageChange}
                          style={{ display: 'none' }}
                        />
                      </label>
                      </div>
                        {selectedImage && (
                          <div className='h-56 flex justify-center items-center object-contain w-auto'>
                            <div className="absolute top-2 right-2">
                              <button onClick={handleRemoveImage} className="text-red-500 text-2xl px-1 hover:bg-red-200 hover:rounded-md">
                                  &times;
                              </button>
                           </div>
                            <img src={selectedImage} className='h-56 w-56' alt="Selected Image" />
                          </div>
                        )}
                    </div>

                  <div className='flex justify-end'> 
                    <Button
                      variant="contained"
                      style={{ backgroundColor: '#cd3c0d', color: '#ffffff' }}
                      // onClick={handleSubmit}
                      type='submit'
                      disabled={addProductLoader}
                      className="ml-2"
                      endIcon={addProductLoader ? <CircularProgress size={24} color="inherit" /> : null}
                      >
                      {t("Add Gtin")}
                    </Button>
                  </div>
                </div>
              </form>        

            

            </div>
            )}
          </div>
      </div>

      {/* Footer */}
      {/* <Footer /> */}
  </div>
);

}

export default GTINReports;
