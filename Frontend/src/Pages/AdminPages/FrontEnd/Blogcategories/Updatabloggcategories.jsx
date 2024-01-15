import React, { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';

const Updatabloggcategories = ({ isVisible, setVisibility, refreshBrandData }) => {
    // get this session data
    const updateBrandData = JSON.parse(sessionStorage.getItem("updatemengBlogCategories"));
    console.log(updateBrandData)
    const [name, setname] = useState(updateBrandData?.name || '');
    const [slug, setslug] = useState(updateBrandData?.slug || '');
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const handleCloseUpdatePopup = () => {
        setVisibility(false);
    };

    const handleUpdateBrand = async () => {
        setLoading(true);

        try {
            const response = await newRequest.put(`/updateblog_categories/${updateBrandData?.id}`, {
                name: name,
                slug: slug,
            });

            toast.success(response?.data?.message || `${t('Blog Categories')} ${t('has been')} ${t('Updated Successfully')}.`, {
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

            console.log(error);
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
                                <h2 className='text-secondary font-sans font-semibold text-2xl'>{t('Edit')} {t('Blog Categories')}</h2>
                                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="field1" className="text-secondary">{t('Category')}{t('Name')}</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setname(e.target.value)}
                                            placeholder={`${t('Enter')} ${t('Category')} ${t('Name')}`}
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />
                                    </div>
                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="field1" className="text-secondary">{t('Category')} {t('Slug')}</label>
                                        <input
                                            type="text"
                                            id="slug"
                                            value={slug}
                                            onChange={(e) => setslug(e.target.value)}
                                            placeholder={`${t('Enter')} ${t('Category')} ${t('Slug')}`}
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
                                        {t('Update')} {t('Blog Categories')}
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

export default Updatabloggcategories