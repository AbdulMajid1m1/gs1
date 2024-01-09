import React from 'react';
import { useTranslation } from 'react-i18next';
import engflage from "./Images/Flage.png"

const LanguageSwitcher = () =>
{
    const { i18n } = useTranslation();

    // const changeLanguage = (language) =>
    // {
    //     i18n.changeLanguage(language);
    // };

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };
    return (
        <div>
            <select
                id="status"
                className="border-none w-full p-2 mb-3 bg-transparent"
                style={{ border: 'none' }}
                onChange={(e) => changeLanguage(e.target.value)}
            >

                <option value="en" >
                    <div className="flex items-center bg-red" >
                        English <img src={engflage} alt="English" className="mr-2" />
                    </div>
                </option>
                <option value="ar">العربية</option>
            </select>

            <img src={engflage} alt="English" className="mr-2" />
        </div>

    );
};

export default LanguageSwitcher;