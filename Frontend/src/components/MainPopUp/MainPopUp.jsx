import React from 'react';
import { useTranslation } from 'react-i18next';

const MainPopUp = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className='h-auto sm:w-[40%] w-full bg-gray-100 rounded-md'>
        <div className="popup-form px-5 py-5">
          <form>
            <h2 className='text-secondary font-sans font-semibold text-2xl'> {t('Create Brands')}</h2>
            <div className="flex flex-col sm:gap-3 gap-3 mt-5">
              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                <label htmlFor="field1" className="text-secondary"> {t('Brand Name EN')}</label>
                <input
                  type="text"
                  id="field1"
                  placeholder="Enter Brand Name EN"
                  className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                />
              </div>

              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                <label htmlFor="field2" className="text-secondary"> {t('Brand Name AR')}</label>
                <input
                  type="text"
                  id="field2"
                  placeholder="Enter Brand Name AR"
                  className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                />
              </div>
            </div>

            {/* create two button close and create brand buttons  */}
            <div className="w-full flex justify-center items-center gap-8 mt-5">
              <button
                type="button"
                className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                // onClick={closeModal}
              >
                {t('Close')}
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                // onClick={createBrand}
              >
                {t('Create Brand')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainPopUp;
