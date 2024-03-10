import React, { useState,useEffect } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';

const Updatacatelog = ({ isVisible, setVisibility, refreshBrandData }) => {
    const { t } = useTranslation();
    // get this session data
    const updateBrandData = JSON.parse(sessionStorage.getItem("updatecatlogmenu"));
    const [category_name_en, setcategory_name_en] = useState(updateBrandData?.category_name_en || '');
    const [category_name_ar, setcategory_name_ar] = useState(updateBrandData?.category_name_ar || '');
    const [status, setstatus] = useState(updateBrandData?.status || 0);
    const [loading, setLoading] = useState(false);
    const [Categorylevel, setCategorylevel] = useState(updateBrandData?.Categorylevel || '')
    const [MegaMenuCategories, setMegaMenuCategories] = useState('')
    const [Page, setPage] = useState(updateBrandData?.url || '')
    const [Description, setDescription] = useState(updateBrandData?.description || '')
    const [Title, setTitle] = useState(updateBrandData?.meta_title || '');
    const [MetaDescription, setMetaDescription] = useState(updateBrandData?.meta_description || '')

    const [Pagedropdown, setPagedropdown] = useState([])
    const [megamenudropdown, setmegamenudropdown] = useState([])

    const refreshcitiesData = async () => {
        try {
            const citiesData = updateBrandData?.megamenu_id || '';
            const statesResponse = await newRequest.get('/getAllmega_menu');
            const statesData = statesResponse?.data || [];
            const stateIdToNameMap = {};
            statesData.forEach(state => {
                stateIdToNameMap[state.id] = state.name_en;
            });
            // console.log('statesData', citiesData);
            setMegaMenuCategories(citiesData)
        } catch (err) {
            // console.log(err);
        }
    };
    useEffect(() => {
        refreshcitiesData() // Calling the function within useEffect, not inside itself
    }, []);

    useEffect(() => {
        const getDocuments = async () => {
            try {
                const response = await newRequest.get('/getAllmega_menu');
                const nameEnArray = response.data;
                setmegamenudropdown(nameEnArray);
            } catch (error) {
                // console.log(error);
            }
        };
        const getpagedata = async () => {
            try {
                const response = await newRequest.get('/getAllpagesname');
                const nameEnArray = response.data;
                setPagedropdown(nameEnArray);
            } catch (error) {
                // console.log(error);
            }
        };

        getpagedata();
        getDocuments();
    }, []);

    const handleCloseUpdatePopup = () => {
        setVisibility(false);
    };

    const handleUpdateBrand = async () => {
        setLoading(true);

        try {
            const response = await newRequest.put(`/updatemega_menu_categories/${updateBrandData?.id}`, {
                parent_id: Categorylevel,
                megamenu_id: MegaMenuCategories,
                category_name_en: category_name_en,
                category_name_ar: category_name_ar,
                description: Description,
                url: Page,
                meta_title: Title,
                meta_description: MetaDescription,
                meta_keywords: "khan",
                status: Number(status),
            });

            toast.success(response?.data?.message || `${t('Mega Menu')} ${('categorie')} ${('has been')} ${t('Updated Successfully')}.` , {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            // console.log(response.data);
            refreshBrandData();
            handleCloseUpdatePopup();

        } catch (error) {
            toast.error(error?.response?.data?.message || `${t('Something went wrong')}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        finally {
            setLoading(false);
        }




    };


    return (
        <div>
            {isVisible && (
                <div className="popup-overlay">
                    <div className="popup-container h-auto sm:w-[45%] w-full">
                        <div className="popup-form w-full max-h-screen overflow-y-auto">
                            <form className='w-full'>
                                <h2 className='text-secondary font-sans font-semibold text-2xl'>{t('Edit')} {t('Menu')} {t('Categories')}</h2>
                                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="field1" className="text-secondary">{t('Categories')} {t('Name[English]')}</label>
                                        <input
                                            type="text"
                                            id="category_name_en"
                                            value={category_name_en}
                                            onChange={(e) => setcategory_name_en(e.target.value)}
                                            placeholder={`${t('Enter')}${t('Categories')}${t('Name[English]')}`}
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="field1" className="text-secondary">{t('Categories')} {t('Name[Arabic]')}</label>
                                        <input
                                            type="text"
                                            id="category_name_ar"
                                            value={category_name_ar}
                                            onChange={(e) => setcategory_name_ar(e.target.value)}
                                            placeholder={`${t('Enter')}${t('Categories')}${t('Name[Arabic]')}`}
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="status" className="text-secondary">
                                            {t('Add')} {t('Menu')} {t('Categories')}
                                        </label>
                                        <select
                                            id="status"
                                            value={MegaMenuCategories}
                                            onChange={(e) => setMegaMenuCategories(e.target.value)}
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        >
                                            <option value="0">-- {t('Select')} --</option>
                                            {
                                                megamenudropdown && megamenudropdown.map((itme, index) => {
                                                    return (
                                                        <option key={index} value={itme.id}>{itme.name_en}</option>
                                                    )
                                                })
                                            }

                                        </select>
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="status" className="text-secondary">
                                            {t('Select Category Level')}
                                        </label>
                                        <select
                                            id="status"
                                            value={Categorylevel}
                                            onChange={(e) => setCategorylevel(e.target.value)}
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        >
                                            <option value="Category Level">Category Level</option>
                                            <option value="Main Category">Main Category</option>
                                        </select>
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="status" className="text-secondary">
                                            {t('Set Page')}
                                        </label>
                                        <select
                                            id="status"
                                            value={Page}
                                            onChange={(e) => setPage(e.target.value)}
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        >
                                            <option value="0">-- {t('Select')} --</option>
                                            {
                                                Pagedropdown && Pagedropdown.map((itme, index) => {
                                                    return (
                                                        <option key={index} value={itme.slug}>{itme.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="status" className="text-secondary">
                                            {t('Status')}
                                        </label>
                                        <select
                                            id="status"
                                            value={status}
                                            onChange={(e) => setstatus(e.target.value)}
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        >
                                            <option value="0">{t('Inactive')}</option>
                                            <option value="1">{t('Active')}</option>
                                        </select>
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="status" className="text-secondary">
                                            {t('Description')}
                                        </label>
                                        <textarea
                                            type="text"
                                            id="name_ar"
                                            value={Description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder={`${t('Enter')}${t('Description')}`}
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />

                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="field1" className="text-secondary">{t('Meta')}  {t('Title')}</label>
                                        <input
                                            type="text"
                                            id="Title"
                                            value={Title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder={`${t('Enter')}${t('Meta')}${t('Title')}`}
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />
                                    </div>


                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="status" className="text-secondary">
                                            {t('Meta')}  {t('Description')}
                                        </label>
                                        <textarea
                                            type="text"
                                            id="name_ar"
                                            value={MetaDescription}
                                            onChange={(e) => setMetaDescription(e.target.value)}
                                            placeholder={`${t('Enter')}${t('Meta')}${t('Description')}`}
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />

                                    </div>

                                </div>

                                <div className="w-full flex justify-center items-center gap-8 mt-5">
                                    <button
                                        type="button"
                                        className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                                        onClick={handleCloseUpdatePopup}
                                    >
                                        {t('Close')}
                                    </button>
                                    
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                                        onClick={handleUpdateBrand}
                                        disabled={loading}
                                        className="w-[70%] ml-2"
                                        endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                                    >
                                        {t('Update')} {t('Menu')} {t('Categories')}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Updatacatelog