import { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../../utils/userRequest';
import { useTranslation } from 'react-i18next';

const Addvideo = ({ isVisible, setVisibility, refreshBrandData }) => {
    const [Title, setTitle] = useState("");
    const { t, i18n } = useTranslation();

    const handleCloseCreatePopup = () => {
        setVisibility(false);
    };

    const [selectedFile, setSelectedFile] = useState(null);
    const [imageshow, setimageshow] = useState('')


    function handleChangeback(e) {
        setSelectedFile(e.target.files[0]);
        setimageshow(e.target.files[0])
    }

    const [selectedOption, setSelectedOption] = useState('image');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedVideo(file);
    };

    const handleAddCompany = async () => {

        const formData = new FormData();
        formData.append('title', Title);
        formData.append('video', selectedVideo);
        formData.append('addedBy', 1);
        formData.append('status', 1);
        try {
            const response = await newRequest.post('/creatuser_guide_videos', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

            toast.success(`${t('User Guide')} ${t('Video')} ${Title} ${t('has been added successfully')}.`, {
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
                                <h2 className={`text-secondary font-sans font-semibold text-2xl ${i18n.language === "ar" ? "text-end" : "text-start"
                                    }`}>{t('Add')} {t('Video File')}</h2>
                                <div className="flex flex-col sm:gap-3 gap-3 mt-5">

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="field1" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                                            }`}>{t('Title')}</label>
                                        <input
                                            type="text"
                                            id="Title"
                                            value={Title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder={`${t('Enter')} ${t('Title')} `}
                                            className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start"
                                                }`}
                                        />
                                    </div>

                                    <div className="printerPic font-body sm:text-base text-sm flex flex-col gap-2">
                                        {/* <center> */}
                                        <label htmlFor="Image" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                                            }`}>
                                            {t('Upload File Only video')}
                                        </label>
                                        <input
                                            id="file-Video"
                                            type="file"
                                            accept="video/*"
                                            onChange={handleFileChange}
                                            className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start"
                                                }`}

                                        />

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
                                        {t('Add')} {t('Video')}
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

export default Addvideo