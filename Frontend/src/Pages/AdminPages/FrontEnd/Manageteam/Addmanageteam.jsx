import { useState,useEffect } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import { useTranslation } from 'react-i18next';

const Addmanageteam = ({ isVisible, setVisibility, refreshBrandData }) => {
    const [Name, setName] = useState("");
    const [JobTitle, setJobTitle] = useState("");
    const [Description, setDescription] = useState('')
    const [Page, setPage] = useState('')
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

    const handleCloseCreatePopup = () => {
        setVisibility(false);
    };

    const [selectedFile, setSelectedFile] = useState(null);
    const [imageshow, setimageshow] = useState('')


    function handleChangeback(e) {
        setSelectedFile(e.target.files[0]);
        setimageshow(e.target.files[0])
    }


    const handleAddCompany = async () => {

        const formData = new FormData();
        formData.append('name', Name);
        formData.append('job_title', JobTitle);
        formData.append('description', Description);
        formData.append('image', imageshow);
        formData.append('addedBy', '1');
        formData.append('status', 1);
        try {
            const response = await newRequest.post('/creatour_teams', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

            toast.success(`${t('Team Member')} ${Name} ${t('has been added successfully')}.`, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            // console.log(response.data);
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
            // console.log(error);
        }


    };

    return (
        <div>
            {/* create the post api popup */}
            {isVisible && (
                <div className="popup-overlay">
                    <div className="popup-container h-auto sm:w-[45%] w-full">
                        <div className="popup-form w-full " style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                            <form className='w-full'>
                                <h2  className={`text-secondary font-sans font-semibold text-2xl ${i18n.language === "ar" ? "text-end" : "text-start"
                                    }`}>{t('Add')} {t('Team Member')} </h2>
                                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="field1" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                                            }`}>{t('Name')}</label>
                                        <input
                                            type="text"
                                            id="Name"
                                            value={Name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder={`${t('Enter')} ${t('Name')}`}
                                             className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start"
                                                }`}
                                        />
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="field1" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                                            }`}>{t('Job Title')}</label>
                                        <input
                                            type="text"
                                            id="JobTitle"
                                            value={JobTitle}
                                            onChange={(e) => setJobTitle(e.target.value)}
                                            placeholder={`${t('Enter')} ${t('Job Title')}`}
                                             className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start"
                                                }`}
                                        />
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="status" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                                            }`}>
                                            {t('Description')}
                                        </label>
                                        <textarea
                                            type="text"
                                            id="JobTitle"
                                            value={Description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder={`${t('Enter')} ${t('Description')}`}
                                             className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start"
                                                }`}
                                        />

                                    </div>

                                    <div className="printerPic font-body sm:text-base text-sm flex flex-col gap-2">
                                        {/* <center> */}
                                        <label htmlFor="Image" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                                            }`}>
                                            {t('Image')}
                                        </label>
                                        <div className="imgesection">
                                            <img src={selectedFile ? URL.createObjectURL(selectedFile) : imageshow != null ? imageshow : ''} className="printerpic" style={{
                                                width: selectedFile || imageshow ? '200px' : '200px',
                                                height: selectedFile || imageshow ? '200px' : '200px',
                                            }} />

                                            <div className="row " htmlFor="file-inputs">
                                                <label htmlFor="file-inputs" className='choosefile bg-secondary hover:bg-primary'>
                                                    {t("choose file")}
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
                                        onClick={handleCloseCreatePopup}
                                    >
                                        {t('Close')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleAddCompany}
                                        className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                                    >
                                        {t('Add')} {t('Team Member')}
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

export default Addmanageteam