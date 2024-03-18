import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import imageLiveUrl from '../../../../../utils/urlConverter/imageLiveUrl';
import { useTranslation } from 'react-i18next';

const Updatafeaturedservice = ({ isVisible, setVisibility, refreshBrandData }) => {
    // get this session data
    const updateBrandData = JSON.parse(sessionStorage.getItem("updateService"));
    const [status, setstatus] = useState(updateBrandData?.status || 0);
    const [Page, setPage] = useState(updateBrandData?.link || '')

    const [Pagedropdown, setPagedropdown] = useState([])
    const { t, i18n } = useTranslation();
    useEffect(() => {
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
    }, []);
    const [loading, setLoading] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);
    const [imageshow, setimageshow] = useState(imageLiveUrl(updateBrandData?.image) || '')
    const [imageshowupload, setimageshowupload] = useState(updateBrandData?.image)

    function handleChangeback(e) {
        setSelectedFile(e.target.files[0]);
        setimageshow(e.target.files[0])
        setimageshowupload(e.target.files[0])
    }
    const handleCloseUpdatePopup = () => {
        setVisibility(false);
    };

    const handleUpdateBrand = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('image', imageshowupload);
        formData.append('link', Page);
        formData.append('status', Number(status));
        // console.log(formData);
        try {
            const response = await newRequest.put(`/updatefeatured_services/${updateBrandData?.id}`, formData);

            toast.success(response?.data?.message || `${('Featured Services')} ${('has been')} ${t('Updated Successfully')}.`, {
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
            // console.log(error);
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
                        <div className="popup-form w-full" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                            <form className='w-full'>
                                <h2 className={`text-secondary font-sans font-semibold text-2xl ${i18n.language === "ar" ? "text-end" : "text-start"
                                    }`}>{t('Edit')} {t('Featured Services')}</h2>
                                <div className="flex flex-col sm:gap-3 gap-3 mt-5">

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="status" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                                            }`}>
                                            {t('Set Page')}
                                        </label>
                                        <select
                                            id="status"
                                            value={Page}
                                            onChange={(e) => setPage(e.target.value)}
                                            className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start"
                                                }`}
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
                                        <label htmlFor="status" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                                            }`}>
                                            {t('Status')}
                                        </label>
                                        <select
                                            id="status"
                                            value={status}
                                            onChange={(e) => setstatus(e.target.value)}
                                            className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start"
                                                }`}
                                        >
                                            <option value="0">{t('Inactive')}</option>
                                            <option value="1">{t('Active')}</option>
                                        </select>
                                    </div>

                                    <div className="printerPic font-body sm:text-base text-sm flex flex-col gap-2">
                                        {/* <center> */}
                                        <label htmlFor="Image" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                                            }`}>
                                            {t('Image')}
                                        </label>
                                        <div className="imgesection">
                                            <img
                                                src={selectedFile ? URL.createObjectURL(selectedFile) : imageshow != null ? imageshow : ''}
                                                className="printerpic" style={{
                                                    width: selectedFile || imageshow ? '200px' : '200px',
                                                    height: selectedFile || imageshow ? '200px' : '200px',
                                                }} />

                                            <div className="row " htmlFor="file-inputs">
                                                <label htmlFor="file-inputs" className='choosefile bg-secondary hover:bg-primary'>
                                                    choose file
                                                </label>
                                                <input
                                                    id="file-inputs"
                                                    type="file"
                                                    onChange={handleChangeback}
                                                    style={{ display: 'none' }}
                                                />
                                            </div>
                                        </div>

                                        {/* </center> */}

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
                                    {/* <button
                                type="button"
                                onClick={handleUpdateBrand}
                                className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                              >
                                Update Brand
                              </button> */}
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                                        onClick={handleUpdateBrand}
                                        disabled={loading}
                                        className="w-[70%] ml-2"
                                        endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                                    >
                                        {t('Update')} {t('Featured Services')}
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

export default Updatafeaturedservice