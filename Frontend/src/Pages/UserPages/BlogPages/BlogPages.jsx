import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import DropDownSelection from '../DropDownSelection/DropDownSelection';
import newRequest from '../../../utils/userRequest';
import { DotLoader } from 'react-spinners';

const BlogPages = () => {
  const { id } = useParams();
  // console.log(id);
  const [pageData, setPageData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
    

  useEffect(() => {
    const handleGetPageData = async () => {
      setIsLoading(true);
      try {
        const res = await newRequest.get(`/getpagesByslug/${id}`);  // Update the API endpoint
        // const res = await newRequest.get(`/getpagesByslug/healthcare`);  // Update the API endpoint
        // console.log(res.data);
        setPageData(res.data);
        setIsLoading(false);
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
       <div className='sticky top-0 z-50 bg-white'>
          <Header />
       </div>

       <div>
         <DropDownSelection />
       </div>

       {/* <div className='mt-10 mb-10'>
          Blog Pages
       </div> */}
        <div className='mt-10 mb-10 px-5'>
           {pageData.name && <h1 className='text-secondary font-semibold'>{pageData.name}</h1>}
              {pageData.custom_section_data && (
            <div dangerouslySetInnerHTML={{ __html: pageData.custom_section_data }} />
          )}
      </div>

  
        {/* Footer */}
          <Footer />
    </div>
  )
}

export default BlogPages