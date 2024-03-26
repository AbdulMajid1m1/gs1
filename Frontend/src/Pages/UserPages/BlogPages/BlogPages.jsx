import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import DropDownSelection from '../DropDownSelection/DropDownSelection';
import newRequest from '../../../utils/userRequest';
import { DotLoader } from 'react-spinners';
import { useTranslation } from 'react-i18next';

const BlogPages = () => {
  const { id } = useParams();
  // console.log(id);
  const [pageData, setPageData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { t, i18n } = useTranslation();
    

  useEffect(() => {
    const handleGetPageData = async () => {
      setIsLoading(true);
      try {
        const res = await newRequest.get(`/getpagesByslug/${id}`);  // Update the API endpoint
        // const res = await newRequest.get(`/getpagesByslug/healthcare`);  // Update the API endpoint
        // console.log(res.data);
        setPageData(res.data);
        setIsLoading(false);
        console.log(res.data);
      } 
      catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    handleGetPageData();
  }, [id]);

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

       {/* Nav */}
       {/* <div className='sticky top-0 z-50 bg-white'>
          <Header />
       </div> */}

       <div>
         <DropDownSelection />
       </div>

        <div className='mt-10 mb-10 px-4 md:px-10 lg:px-10 xl:px-36 2xl:px-[270px] 3xl:px-96'>
            {i18n.language === 'ar' && pageData.custom_section_data_ar && (
          <div className="text-right" style={{direction:'rtl'}}   dangerouslySetInnerHTML={{ __html: pageData.custom_section_data_ar }} />
          
        )}

        {i18n.language !== 'ar' && pageData.custom_section_data && (
          <div dangerouslySetInnerHTML={{ __html: pageData.custom_section_data }} />
        )}

      </div>

  
        {/* Footer */}
          {/* <Footer /> */}
    </div>
  )
}

export default BlogPages
