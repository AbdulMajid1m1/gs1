import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';
import { Autocomplete, TextField } from '@mui/material';

const Updatefootermenu = ({ isVisible, setVisibility, refreshBrandData }) => {
    // get this session data
    const updateBrandData = JSON.parse(sessionStorage.getItem("updatefootermenu"));
    const [category_name_en, setcategory_name_en] = useState(updateBrandData?.category_name_en || '');
    const [category_name_ar, setcategory_name_ar] = useState(updateBrandData?.category_name_ar || '');
    const [status, setstatus] = useState(updateBrandData?.status || 0);
    const [loading, setLoading] = useState(false);
    const [Categorylevel, setCategorylevel] = useState({
        category_name_en: updateBrandData?.parent_id || "",
    });
    const [categorydefualid, setcategorydefualid] = useState('')
    const [Page, setPage] = useState(updateBrandData?.url || '')
    const [Categoryleveldropdown, setCategoryleveldropdown] = useState([])
    const [Pagedropdown, setPagedropdown] = useState([])
    const { t, i18n } = useTranslation();
    const handleCloseUpdatePopup = () => {
        setVisibility(false);
    };
    useEffect(() => {
        const getpagedata = async () => {
            try {
                const response = await newRequest.get('/getAllpagesname');
                const nameEnArray = response.data;
                setPagedropdown(nameEnArray);
            } catch (error) {
                console.log(error);
            }
        };
        const getpagedatasdsd = async () => {
            try {
                const responsefotterget = await newRequest.get("/getAllfooter_menus");
                const citiesData = responsefotterget?.data || [];
                const filteredData = citiesData.filter(item => item.category_name_en == updateBrandData?.category_name_en);
                setcategorydefualid(filteredData[0].parent_id);
                const response = await newRequest.get('/getAllmega_menu_categories');
                const nameEnArray = response.data;
                setCategoryleveldropdown(nameEnArray);
            } catch (error) {
                console.log(error);
            }
        };
        getpagedatasdsd();
        getpagedata();
    }, []);
    const handleUpdateBrand = async () => {
        setLoading(true);

        try {
            const response = await newRequest.put(`/updatefooter_menus/${updateBrandData?.id}`, {
                parent_id: Categorylevel?.id || categorydefualid,
                category_name_en: category_name_en,
                category_name_ar: category_name_ar,
                url: Page,
                status: Number(status),
            });

            toast.success(response?.data?.message || `${t('Footer menu')} ${t('has been')} ${t('Updated Successfully')}.`, {
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
            toast.error(error?.response?.data?.error || `${t('Something went wrong')}`, {
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
    const handleSelectedDocuments = (event, value) => {
        setCategorylevel(value);
    };

    return (
        <div>
            {isVisible && (
                <div className="popup-overlay">
                    <div className="popup-container h-auto sm:w-[45%] w-full">
                        <div className="popup-form w-full">
                            <form className='w-full'>
                                <h2 className='text-secondary font-sans font-semibold text-2xl'>{t('Edit')} {t('Footer menu')} </h2>
                                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="field1" className="text-secondary">{t('Category')} {t('Name[English]')}</label>
                                        <input
                                            type="text"
                                            id="category_name_en"
                                            value={category_name_en}
                                            onChange={(e) => setcategory_name_en(e.target.value)}
                                            placeholder={`${t('Enter')}${t('Category')}${t('Name[English]')}`}
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="field1" className="text-secondary">{t('Category')} {t('Name[Arabic]')}</label>
                                        <input
                                            type="text"
                                            id="category_name_ar"
                                            value={category_name_ar}
                                            onChange={(e) => setcategory_name_ar(e.target.value)}
                                            placeholder={`${t('Enter')}${t('Category')}${t('Name[Arabic]')}`}
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="status" className="text-secondary">
                                            {t('Parent Category')}
                                        </label>
                                        {/* <select
                                            id="status"
                                            value={Categorylevel}
                                            onChange={(e) => setCategorylevel(e.target.value)}
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        >
                                            <option value={updateBrandData?.parent_id}>{t('Category Level')}</option>
                                            {
                                                Categoryleveldropdown && Categoryleveldropdown.map((itme, index) => {
                                                    return (
                                                        <option key={index} value={itme.id}>{i18n.language === 'ar' ? itme?.category_name_ar : itme?.category_name_en}</option>
                                                    )
                                                })
                                            }
                                        </select> */}
                                        <Autocomplete
                                            id="field1"
                                            options={Categoryleveldropdown}
                                            value={Categorylevel}
                                            getOptionLabel={(option) => option?.category_name_en || ""}
                                            onChange={handleSelectedDocuments}
                                            onInputChange={(event, value) => {
                                                if (!value) {
                                                    // perform operation when input is cleared
                                                    // console.log("Input cleared");
                                                }
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    autoComplete="off"
                                                    {...params}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        className: "text-white",
                                                    }}
                                                    InputLabelProps={{
                                                        ...params.InputLabelProps,
                                                        style: { color: "white" },
                                                    }}
                                                    className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                                                    placeholder={`${t("Category Level")}`}
                                                // required
                                                />
                                            )}
                                            classes={{
                                                endAdornment: "text-white",
                                            }}
                                            sx={{
                                                "& .MuiAutocomplete-endAdornment": {
                                                    color: "white",
                                                },
                                            }}
                                        />
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
                                            <option value="Select">-- {t('Select')} --</option>
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
                                        {t('Update')} {t('Footer menu')}
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

export default Updatefootermenu