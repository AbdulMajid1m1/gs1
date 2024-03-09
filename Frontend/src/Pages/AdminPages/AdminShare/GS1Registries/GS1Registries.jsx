import React from 'react'
import { useTranslation } from 'react-i18next';
import { IoCloudUpload, IoCloudDownloadSharp } from "react-icons/io5";
import AdminDashboardRightHeader from '../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader';

const GS1Registries = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
        <div  className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
          <div>
            <AdminDashboardRightHeader
              title={'GS1 Registries'}
            />
          </div>
            <div className='max-w-full flex justify-between flex-wrap mt-5 mb-5'>
               
                <div className='h-[448px] 3xl:w-[70%] xl:w-[70%] lg:w-[70%] md:w-[60%] w-full overflow-x-auto bg-[#ecf5e2]'>
                    <div className='h-14 w-full flex justify-center items-center gap-3 bg-[#ecf5e2]'>
                      <span className='text-secondary'><IoCloudUpload size={44} /></span>
                      <p className='text-secondary sm:text-2xl text-lg font-bold'>Data Upload</p>
                    </div>

                    <div className='w-full flex justify-between gap-1'>
                      {/* first Card */}
                      <div className='w-full flex flex-col gap-1'>
                        <div className='h-10 bg-[#79c143] text-xl text-center text-white font-body font-bold'>GTINs loaded</div>
                          <div className='w-full flex justify-between flex-wrap'>
                            <div className='h-32 w-[65%] flex flex-col justify-center items-center bg-[#ecf5e2]'>
                              <p className='text-secondary font-bold text-3xl text-center'>449M</p>
                            </div>
                             
                            <div className='h-32 w-[35%] bg-[#afd98d]'>
                              <p className='text-secondary font-bold text-xl text-center'>+</p>
                              <p className='text-secondary font-bold text-xl text-center'>50%</p>
                              <p className='text-secondary font-normal text-sm text-center'>vs. year ago (YA)</p>
                            </div>
                          </div>
                          </div>


                        {/* second Card */}
                        <div className='w-full flex flex-col gap-1'>
                          <div className='h-10 bg-[#c0d82c] text-xl text-center text-white font-body font-bold'>Registered GCPs</div>
                            <div className='w-full flex justify-between items-center flex-wrap'>
                              <div className='h-32 w-[65%] flex flex-col justify-center items-center bg-[#e6efac]'>
                                <p className='text-secondary font-bold text-3xl text-center'>362k</p>
                              </div>
                              
                              <div className='h-32 w-[35%] bg-[#dbe783]'>
                                <p className='text-secondary font-bold text-xl text-center'>+</p>
                                <p className='text-secondary font-bold text-xl text-center'>11%</p>
                                <p className='text-secondary font-normal text-sm text-center'>vs. YA</p>
                              </div>
                            </div>
                          </div>
                    </div>


                    <div className='w-full flex justify-between gap-1 mt-1'>
                      {/* third Card */}
                      <div className='w-full flex flex-col gap-1'>
                        <div className='h-10 bg-[#008dbb] sm:text-xl text-lg text-center text-white font-body font-bold'>Products by Region</div>
                          <div className='h-32 w-full flex flex-col justify-center items-center bg-[#9ad1e5]'>
                            <p className='text-white font-bold text-3xl text-center'>449M</p>
                          </div>
                        </div>


                        {/* fourth Card */}
                        <div className='w-full flex flex-col gap-1'>
                          <div className='h-10 bg-[#8db8c9] text-xl text-center text-red-500 font-body font-bold'>Unverified GTINs</div>
                            <div className='w-full flex justify-between items-center flex-wrap'>
                              <div className='h-32 w-[65%] flex flex-col justify-center items-center bg-[#d1e2e9]'>
                                <p className='text-secondary font-bold text-3xl text-center'>200k</p>
                              </div>
                              
                              <div className='h-32 w-[35%] flex flex-col justify-center items-center bg-[#d1e2e9]'>
                                <p className='text-secondary font-bold text-xl text-center'>45%</p>
                              </div>
                            </div>
                          </div>
                    </div>
                </div>

                {/* right side */}
                <div className='h-[448px] 3xl:w-[30%] xl:w-[30%] lg:w-[30%] md:w-[40%] w-full bg-[#fddfad]'>
                  <div className='h-14 w-full flex justify-center items-center gap-3'>
                      <span className='text-secondary'><IoCloudDownloadSharp size={44} /></span>
                      <p className='text-secondary sm:text-2xl text-lg font-bold'>Top Brands</p>
                  </div>

                  <div className='h-10 w-full bg-[#faae34]'>

                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GS1Registries