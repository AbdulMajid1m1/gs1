import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../../components/Header/Header";
import DropDownSelection from "../DropDownSelection/DropDownSelection";
import Footer from "../../../components/Footer/Footer";
import newRequest from "../../../utils/userRequest";
import imageLiveUrl from "../../../utils/urlConverter/imageLiveUrl";

const BoardMember = () => {
  const { t, i18n } = useTranslation();
  const [data, setdata] = useState([]);
  const refreshVideoData = async () => {
    try {
      const response = await newRequest.get("/getAllboard_members");
      setdata(response?.data || []);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    refreshVideoData();
  }, []);

  return (
    <div>
      {/* Nav */}
      <div className="sticky top-0 z-50 bg-white">
        <Header />
      </div>

      <div>
        <DropDownSelection />
      </div>

      <div className="mt-10 mb-10 px-4 md:px-10 lg:px-10 xl:px-36 2xl:px-[270px] 3xl:px-96">
        <div
          className={`${i18n.language === "ar" ? "text-end" : "text-start"}`}
        >
          <p className="font-bold text-blue-900 font-medium font-sans mt-5">
            {t("Board Members")}
          </p>
          <p className="text-base leading-loose font-bold text-gray-700 mt-5 mb-20">
            {t(
              "The team comprises of the leadership team, administrative, projects and customer representative."
            )}
          </p>
        </div>
        {data &&
          data.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                className={`flex mt-20 ${isEven ? "" : "flex-row-reverse"}`}
                key={index}
              >
                <div className="w-full md:w-1/2">
                  <img
                    src={imageLiveUrl(item?.image)}
                    width={"200px"}
                    alt="Image"
                  />
                </div>
                <div className={` my-auto ${isEven ? "ms-10" : "me-10"}`}>
                  <h6 className="text-orange-500 text-lg font-medium font-sans">
                    {item?.job_title}
                  </h6>
                  <p className="font-bold text-blue-900 font-medium font-sans mt-5">
                    {item?.name}
                  </p>
                  <p className="text-base leading-loose font-light text-gray-700 mt-10 mb-20">
                    {item?.description}
                  </p>
                </div>
              </div>
            );
          })}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BoardMember;
