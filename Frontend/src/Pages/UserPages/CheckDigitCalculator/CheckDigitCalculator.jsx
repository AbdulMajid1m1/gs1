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

const CheckDigitCalculator = () => {
  const { t, i18n } = useTranslation();
  const [userSearch, setUserSearch] = useState('');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

//   const handleUserSearch = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const response = await newRequest.get(`/foreignGtin/getGtinProductDetailsFromLocalDb?barcode=${userSearch}`);
//       console.log(response?.data);
//       setData(response?.data);
//       setIsLoading(false);
//     } 
//     catch (error) {
//       console.log(error);
//       if (error.response && error.response.status === 404) {
//         Swal.fire({
//           title: `${t('Product Not Found')}`,
//           text: `${t('Do you want to query in Global Database (GEPIR)?')}`,
//           icon: 'warning',
//           showCancelButton: true,
//           confirmButtonText: `${t('Yes Search')}`,
//           cancelButtonText: `${t('Close')}`,
//           // changes the color of the confirm button to red
//           confirmButtonColor: '#021F69',
//           cancelButtonColor: '#FF693A',
//         }).then(async (result) => {
//           if (result.isConfirmed) {
//             try {
//               const globalResponse = await newRequest.get(`/foreignGtin/getGtinProductDetailsFromGlobalDb?barcode=${userSearch}`);
//               console.log(globalResponse?.data);
//               setData(globalResponse?.data);
//             } 
//             catch (globalError) {
//               console.log(globalError);
//               toast.error(globalError?.response?.data?.error || globalError?.response?.data?.message || `${t('Something went wrong!')}`);
//               setData(null);
//             }
//           }
//         });
//       } else {
//         toast.error(error?.response?.data?.error || `${t('Something went wrong!')}`);
//         setData(null);
//       }
//       setIsLoading(false);

//     }
//   };
  


  return (
    <div>
       {/* Nav */}
       <div className='sticky top-0 z-50 bg-white'>
          <Header />
       </div>

       <div>
         <DropDownSelection />
       </div>

       <div className='mt-10 mb-20 px-4 md:px-10 lg:px-10 xl:px-36 2xl:px-[270px] 3xl:px-96'>
           <div className="">
           <div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='checkdigit' className='text-secondary sm:text-2xl text-lg'>Check Digit Calculator (12 Digits)</label>
                <div className='flex sm:w-[60%] w-full'>
                  <input
                    id="checkdigit"
                    type="text"
                    name='checkdigit'
                    className="sm:w-[50%] w-full border h-10 rounded-sm px-5 font-medium text-black border-gray-200"
                    placeholder='Search'
                    value={userSearch}
                    onChange={(event) => setUserSearch(event.target.value)}
                  />
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#cd3c0d', color: '#ffffff' }}
                    type='button'
                    // onClick={handleUserSearch}
                    disabled={isLoading}
                    className="ml-2"
                    endIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : null}
                  >
                    Calculate
                  </Button>
                </div>
                <p className='text-secondary text-base'>Your Check Digit Number is : <span className='font-semibold'>6</span></p>
                <p className='text-secondary text-base'>Your EAN 13 Barcode is :<span className='font-semibold'> 6281000060476</span></p>
              </div>
            </div>              

          </div>
      </div>

      {/* Footer */}
      <Footer />
  </div>
);

}

export default CheckDigitCalculator;
