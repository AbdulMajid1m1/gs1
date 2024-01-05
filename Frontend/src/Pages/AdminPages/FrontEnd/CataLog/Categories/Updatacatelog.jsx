import React, { useState,useEffect } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';

const Updatacatelog = ({ isVisible, setVisibility, refreshBrandData }) => {
    // get this session data
    const updateBrandData = JSON.parse(sessionStorage.getItem("updatecatlogmenu"));
    const [category_name_en, setcategory_name_en] = useState(updateBrandData?.category_name_en || '');
    const [category_name_ar, setcategory_name_ar] = useState(updateBrandData?.category_name_ar || '');
    const [status, setstatus] = useState(updateBrandData?.status || 0);
    const [loading, setLoading] = useState(false);
    const [Categorylevel, setCategorylevel] = useState(updateBrandData?.Categorylevel || '')
    const [MegaMenuCategories, setMegaMenuCategories] = useState(updateBrandData?.megamenu_id || '')
    const [Page, setPage] = useState(updateBrandData?.megamenu_id || '')
    const [megamenudropdown, setmegamenudropdown] = useState([])
    useEffect(() => {
        const getDocuments = async () => {
            try {
                const response = await newRequest.get('/getAllmega_menu');
                const nameEnArray = response.data;
                setmegamenudropdown(nameEnArray);
            } catch (error) {
                console.log(error);
            }
        };
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
                description: "KHAN",
                url: "wwww.wadawd",
                meta_title: "khan",
                meta_description: "khan",
                meta_keywords: "khan",
                status: Number(status),
            });

            toast.success(response?.data?.message || 'Mega Menu categorie updated successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            console.log(response.data);
            refreshBrandData();
            handleCloseUpdatePopup();

        } catch (error) {
            toast.error(error?.response?.data?.message || 'Something went wrong!', {
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
                        <div className="popup-form w-full">
                            <form className='w-full'>
                                <h2 className='text-secondary font-sans font-semibold text-2xl'>Edit Mega Menu Categories</h2>
                                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="field1" className="text-secondary">Category Name[English]</label>
                                        <input
                                            type="text"
                                            id="category_name_en"
                                            value={category_name_en}
                                            onChange={(e) => setcategory_name_en(e.target.value)}
                                            //   readOnly
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
                                            //   readOnly
                                            placeholder="Enter Category Name[Arabic]"
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="status" className="text-secondary">
                                            Add Mega Menu Categories
                                        </label>
                                        <select
                                            id="status"
                                            value={MegaMenuCategories}
                                            onChange={(e) => setMegaMenuCategories(e.target.value)}
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        >
                                            <option value="0">-- Select --</option>
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
                                            Select Category Level
                                        </label>
                                        <select
                                            id="status"
                                            value={Categorylevel}
                                            onChange={(e) => setCategorylevel(e.target.value)}
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        >
                                            <option value="0">Category Level</option>
                                            <option value="1">Main Category</option>
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
                                            <option value="0">-- Select --</option>
                                            <option value="1">Set Page1</option>
                                            <option value="2">Set Page2</option>
                                        </select>
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="status" className="text-secondary">
                                            Status
                                        </label>
                                        <select
                                            id="status"
                                            value={status}
                                            onChange={(e) => setstatus(e.target.value)}
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        >
                                            <option value="0">inactive</option>
                                            <option value="1">active</option>
                                        </select>
                                    </div>

                                </div>

                                <div className="w-full flex justify-center items-center gap-8 mt-5">
                                    <button
                                        type="button"
                                        className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                                        onClick={handleCloseUpdatePopup}
                                    >
                                        Close
                                    </button>
                                    
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                                        onClick={handleUpdateBrand}
                                        disabled={loading}
                                        className="w-[70%] ml-2"
                                        endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                                    >
                                        Update Categories
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