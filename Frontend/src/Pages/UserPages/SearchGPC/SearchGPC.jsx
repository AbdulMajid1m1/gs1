import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import Header from '../../../components/Header/Header';
import DropDownSelection from '../DropDownSelection/DropDownSelection';
import Footer from '../../../components/Footer/Footer';

const SearchGPC = () => {
  const { t, i18n } = useTranslation();

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
        <div className="">
          <div
            className={`flex flex-col gap-2 ${
              i18n.language === "ar" ? "items-end" : "items-start"
            }`}
          >
            <label
              htmlFor="checkdigit"
              className="text-secondary sm:text-2xl font-body text-lg"
            >
              {t("Search GPC (Global Product Category)")}
            </label>
            <div className="flex sm:w-[45%] w-full">
              <input
                id="checkdigit"
                type="text"
                name="checkdigit"
                className={`border h-10 rounded-md px-5 font-medium text-black border-gray-300 ${
                  i18n.language === "ar" ? " text-right" : "text-left"
                }`}
                placeholder={t("Search")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );

}

export default SearchGPC;
