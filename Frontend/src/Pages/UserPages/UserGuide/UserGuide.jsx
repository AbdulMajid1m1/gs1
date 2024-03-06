import React, { useEffect, useState } from "react";
import Header from '../../../components/Header/Header'
import DropDownSelection from '../DropDownSelection/DropDownSelection'
import { useTranslation } from "react-i18next";
import Footer from "../../../components/Footer/Footer";
import newRequest from "../../../utils/userRequest";
import imageLiveUrl from "../../../utils/urlConverter/imageLiveUrl";

const UserGuide = () => {
  const [activeTab, setActiveTab] = useState('pdf');
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [veidodata, setveidodata] = useState([]);

     const refreshcitiesData = async () => {
       try {
         const response = await newRequest.get("/getAlluser_guide_pdfs");
         setData(response?.data || []);
        //  setIsLoading(false);
       } catch (err) {
         console.log(err);
        //  setIsLoading(false);
       }
     };
      const refreshVideoData = async () => {
        try {
          const response = await newRequest.get("/getAlluser_guide_videos");
          setveidodata(response?.data || []);
        } catch (err) {
          console.log(err);
        }
      };

     useEffect(() => {
       refreshcitiesData();
       refreshVideoData()
     }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const onClickDownload = (item) => {
  const docUrl = imageLiveUrl(item?.pdf);
  const fileName = item.title;
  saveAs(docUrl, `${fileName}.pdf`);
};

  const onClickveideoDownload = (item) => {
    const docUrl = imageLiveUrl(item?.video);
    const fileName = item.title;
    saveAs(docUrl, `${fileName}.mp4`);
  };

  return (
    <div>
      {/* Nav */}
      <div className="sticky top-0 z-50 bg-white">
        <Header />
      </div>

      <div>
        <DropDownSelection />
      </div>

      <div className="mt-10 mb-5 px-4 md:px-10 lg:px-10 xl:px-36 2xl:px-[270px] 3xl:px-96">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
          <button
            className={`p-4 rounded ${
              activeTab === "pdf"
                ? "bg-primary text-white"
                : "bg-secondary text-white"
            } shadow-md flex items-center justify-center`}
            onClick={() => handleTabClick("pdf")}
          >
             {t('PDF')}
          </button>

          <button
            className={`p-4 rounded ${
              activeTab === "profile2"
                ? "bg-primary text-white"
                : "bg-secondary text-white"
            } shadow-md flex items-center justify-center`}
            onClick={() => handleTabClick("profile2")}
          >
            {t("Videos")}
          </button>
        </div>

        <div className="shadow-xl border-[0.9px] border-gray-400 mt-2 border-b-4 border-t-4 border-t-primary border-b-primary px-2 py-8">
          {/* First Tab */}
          {activeTab === "pdf" && (
            <div className="block">
              <div className="h-auto w-full grid sm:grid-cols-4 gap-10 grid-cols-1">
                {/* Cards */}
                {data &&
                  data.map((item, index) => (
                    <div key={index} className="h-auto w-full shadow-xl py-5">
                      <img
                        src="https://gs1ksa.org/upload/user_guide/pdf.jpg"
                        className="h-40 w-full object-cover"
                        alt=""
                      />
                      <div className="flex flex-col justify-center items-center py-3 mt-4">
                        <p className="text-xl text-center text-secondary font-body">
                          {item.title}
                        </p>
                        <button
                          className="w-[95%] text-white rounded-sm bg-blue-500 py-1 mt-5"
                          onClick={() => onClickDownload(item)}
                        >
                          <i className="fas fa-download ml-1"></i>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Second Tab Digital Link */}
          {activeTab === "profile2" && (
            <div className="h-auto w-full grid sm:grid-cols-4 gap-10 grid-cols-1">
              {veidodata &&
                veidodata.map((item, index) => (
                  <div className="h-auto w-full shadow-xl" key={index}>
                    <img
                      src="https://gs1ksa.org/upload/user_guide/video.jpg"
                      className="h-40 w-full object-contain"
                      alt=""
                    />
                    <div className=" flex flex-col justify-center items-center py-3 mt-4">
                      <p className="text-xl text-center text-secondary font-body px-3">
                        {item.title}
                      </p>

                      <button
                        className="w-[95%] text-white rounded-sm bg-blue-500 py-1 mt-5"
                        onClick={() => onClickveideoDownload(item)}
                      >
                        <i className="fas fa-download ml-1"></i>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default UserGuide