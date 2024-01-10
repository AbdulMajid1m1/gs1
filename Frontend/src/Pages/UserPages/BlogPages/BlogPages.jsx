import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import DropDownSelection from '../DropDownSelection/DropDownSelection';

const BlogPages = () => {
  const { id } = useParams();
  console.log(id);

  // const [getAllPageData, setGetAllPageData] = useState([])

  // const handleGetAllPageData = async () => {
  //   try {
  //     const res = await newRequest.get("/pages")
  //     console.log(res.data);
  //     setGetAllPageData(res.data);
  //   }
  //   catch (error) {
  //     console.log(error);

  //   }
  // }


  return (
    <div>
       {/* Nav */}
       <div className='sticky top-0 z-50 bg-white'>
          <Header />
       </div>

       <div>
         <DropDownSelection />
       </div>

       <div className='mt-10 mb-10'>
          Blog Pages
       </div>


        {/* Footer */}
          <Footer />
    </div>
  )
}

export default BlogPages
