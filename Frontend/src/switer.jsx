import React,{useState} from 'react';
import { useTranslation } from 'react-i18next';
import engflage from "./Images/Flage.png"
import arabicflage from "./Images/Arabflage.jpg"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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
    const [isActive, setIsActive] = useState(false);
    const [currentOption, setCurrentOption] = useState('en');

    const handleToggle = () => {
        setIsActive(!isActive);
    };

    const handleOptionClick = (option, image) => {
        setCurrentOption(option);
        setIsActive(false);
        // You can do something with the image if needed
        console.log(`Selected language: ${option}, Image: ${image}`);
        // Update i18n language if needed
        changeLanguage(option);
    };

    return (
        <div>
            <div className="wrapper">
                <div className="select_wrap relative">
                    <ul
                        className={`default_option bg-transparent border-1 rounded-md cursor-pointer`}
                        onClick={handleToggle}
                    >
                        <li className="p-2">
                            <div className="option pizza flex items-center">
                                <div className="icon w-8 h-8 bg-cover bg-center mr-4" />
                                {currentOption === 'en' && <img src={engflage} alt="" width='33px' />}
                                {currentOption === 'ar' && <img src={arabicflage} alt="" width='33px' />}
                                <ArrowDropDownIcon/>
                            </div>
                        </li>
                    </ul>
                    <ul
                        className={`select_ul absolute top-9 items-center justify-center w-50 ml-12 bg-gray-200 rounded-md ${isActive ? 'block' : 'hidden'
                            }`}
                    >
                        <li className="cursor-pointer" onClick={() => handleOptionClick('en', engflage)}>
                            <div className="option pizza flex items-center">

                                <div className="icon h-8 bg-center " />
                                <img src={engflage} alt="" width='33px' className='mr-2 ml-2 ' />
                            </div>
                        </li>
                        <li className="cursor-pointer" onClick={() => handleOptionClick('ar', arabicflage)}>
                            <div className="option burger flex items-center">
                                <div className="icon h-8 bg-center " />
                                <img src={arabicflage} alt="" width='33px' className='mr-2 ml-2' />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default LanguageSwitcher;