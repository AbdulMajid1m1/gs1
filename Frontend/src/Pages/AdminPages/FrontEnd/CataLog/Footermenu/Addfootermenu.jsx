import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../../utils/userRequest';

const Addfootermenu = ({ isVisible, setVisibility, refreshBrandData }) =>
{
    const [category_name_en, setcategory_name_en] = useState("");
    const [category_name_ar, setcategory_name_ar] = useState("");
    const [Categorylevel, setCategorylevel] = useState('')
    const [Categoryleveldropdown, setCategoryleveldropdown] = useState([])
    const [Page, setPage] = useState('')

    const [Pagedropdown, setPagedropdown] = useState([])
    const handleCloseCreatePopup = () =>
    {
        setVisibility(false);
    };

    useEffect(() =>
    {
        const getpagedata = async () =>
        {
            try {
                const response = await newRequest.get('/getAllpagesname');
                const nameEnArray = response.data;
                setPagedropdown(nameEnArray);
            } catch (error) {
                console.log(error);
            }
        };
        const getpagedatasdsd = async () =>
        {
            try {
                const response = await newRequest.get('/getAllmega_menu_categories');
                const nameEnArray = response.data;
                console.log('getAllmega_menu_categories', nameEnArray);
                setCategoryleveldropdown(nameEnArray);
            } catch (error) {
                console.log(error);
            }
        };
        getpagedatasdsd();
        getpagedata();
    }, []);

    const handleAddCompany = async () =>
    {
        //  integrate the post api in try catch blcck
        try {
            const response = await newRequest.post('/creatfooter_menus/', {
                parent_id: Categorylevel,
                category_name_en: category_name_en,
                category_name_ar: category_name_ar,
                url: Page,
                status: 1,
            });

            toast.success(`Footer Menu ${category_name_en} has been added successfully.`, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            console.log(response.data);
            refreshBrandData();
            handleCloseCreatePopup();

        } catch (error) {
            toast.error(error?.response?.data?.error || 'Error', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }


    };


    return (
        <div>
            {/* create the post api popup */}
            {isVisible && (
                <div className="popup-overlay">
                    <div className="popup-container h-auto sm:w-[45%] w-full">
                        <div className="popup-form w-full">
                            <form className='w-full'>
                                <h2 className='text-secondary font-sans font-semibold text-2xl'>Add Footer Category </h2>
                                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="field1" className="text-secondary">Category Name[English]</label>
                                        <input
                                            type="text"
                                            id="category_name_en"
                                            value={category_name_en}
                                            onChange={(e) => setcategory_name_en(e.target.value)}
                                            placeholder="Enter Category Name[English]"
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="field1" className="text-secondary">Category Name[Arabic]</label>
                                        <input
                                            type="text"
                                            id="category_name_ar"
                                            value={category_name_ar}
                                            onChange={(e) => setcategory_name_ar(e.target.value)}
                                            placeholder="Enter Category Name[Arabic]"
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="status" className="text-secondary">
                                            Parent Category
                                        </label>
                                        <select
                                            id="status"
                                            value={Categorylevel}
                                            onChange={(e) => setCategorylevel(e.target.value)}
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        >
                                            <option value="Category Level">Category Level</option>
                                            {
                                                Categoryleveldropdown && Categoryleveldropdown.map((itme, index) =>
                                                {
                                                    return (
                                                        <option key={index} value={itme.id}>{itme.category_name_en}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="status" className="text-secondary">
                                            Set Page
                                        </label>
                                        <select
                                            id="status"
                                            value={Page}
                                            onChange={(e) => setPage(e.target.value)}
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        >
                                            <option value="Select">-- Select --</option>
                                            {
                                                Pagedropdown && Pagedropdown.map((itme, index) =>
                                                {
                                                    return (
                                                        <option key={index} value={itme.name}>{itme.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                </div>

                                <div className="w-full flex justify-center items-center gap-8 mt-5">
                                    <button
                                        type="button"
                                        className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                                        onClick={handleCloseCreatePopup}
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleAddCompany}
                                        className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                                    >
                                        Add Footer Menu
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Addfootermenu