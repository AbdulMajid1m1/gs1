import React from 'react'
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import HeaderSlider from '../HeaderSlider/HeaderSlider';
import ValueAddedCard from '../ValueAddedCard/ValueAddedCard';
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';
import FeatureArticle from '../FeatureArticle/FeatureArticle';
import OurSolutionPartner from '../OurSolutionPartner/OurSolutionPartner';
import DropDownSelection from '../DropDownSelection/DropDownSelection';

const HomePage = () =>
{



  return (
    <div>

      {/* Nav */}
      <div className='sticky top-0 z-50 bg-white'>
        <Header />
      </div>

      {/* DropDown */}
      <DropDownSelection />

      {/* Slider */}
      <HeaderSlider />

      {/* Value Added Services */}
      <ValueAddedCard />

      {/* upcoming Events */}
      <UpcomingEvents />

      {/* Featured Articles */}
      <FeatureArticle />

      {/* Our Solution Partner */}
      <OurSolutionPartner />

      {/* <div className='h-auto w-full bg-white border-b mt-10'>
          <div className='h-auto w-full bg-secondary grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 px-10 py-10'>
            <div className='text-white font-sans px-5 py-0 text-center'>
              Our valuable Member of GS1 Saudi Arabia, We send you our best regards and best wishes. We would like to inform you that access to the Saudi Barcode Center system (GS1 Saudi Arabia) has been suspended temporarily via the link: www.gs1.org.sa where that for development matters. You can access to GS1 Saudi Arabia system via the alternative link: www.gs1.sa For more inquiries, you can contact us through the communication channels available to the GS1 Saudi Arabia.
              Thank you for your understanding.
            </div>

            <div className='text-white font-sans px-10 py-0 text-right'>
            السادة الأعضاء بمركز الترقيم السعودي نهديكم أطيب التحايا والأمنيات.. ونود افادتكم بأنه تم إيقاف الوصول إلى نظام مركز الترقيم السعودي مؤقتا من خلال الرابط www.gs1.org.sa وذلك لإجراءات تطويرية. ويمكنكم الوصول إلى نظام المركز من خلال الرابط البديل www.gs1.sa ولمزيد من الاستفسارات يمكنكم التواصل معنا من خلال قنوات التواصل المتاحة لمركز الترقيم السعودي. نشكر لكم تفهمكم
            </div>
          </div>
        </div> */}

      {/* Footer */}
      <Footer />
      {/* Footer End */}

    </div>
  )
}

export default HomePage