import { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../../utils/userRequest';
import imageicon from '../../../../../Images/imagges.jpg';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideoCameraBackSharpIcon from '@mui/icons-material/VideoCameraBackSharp';

const Addarticles = ({ isVisible, setVisibility, refreshBrandData }) => {
    const [Title, setTitle] = useState("");
    const [titlear, settitlear] = useState('')
    const [Date, setDate] = useState("");
    const [Page, setPage] = useState('')

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
        formData.append('title', Title);
        formData.append('title_ar', titlear);
        formData.append('date', Date);
        formData.append('link', Page);
        formData.append('image', imageshow);
        formData.append('status', 1);
        try {
            const response = await newRequest.post('/creatfeatured_articales', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

            toast.success(`Articles ${Title} has been added successfully.`, {
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
            console.log(error);
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
                                <h2 className='text-secondary font-sans font-semibold text-2xl'>Add Articles </h2>
                                <div className="flex flex-col sm:gap-3 gap-3 mt-5">

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="field1" className="text-secondary">Title [English]</label>
                                        <input
                                            type="text"
                                            id="Title"
                                            value={Title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Enter Title [English]"
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="title_ar" className="text-secondary">Title [Arabic]</label>
                                        <input
                                            type="text"
                                            id="title_ar"
                                            value={titlear}
                                            onChange={(e) => settitlear(e.target.value)}
                                            placeholder="Enter Title [Arabic]"
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />
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
                                        <label htmlFor="field1" className="text-secondary">Date</label>
                                        <input
                                            type="date"
                                            id="Date"
                                            value={Date}
                                            onChange={(e) => setDate(e.target.value)}
                                            placeholder="Enter Date"
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />
                                    </div>

                                    <div className="printerPic font-body sm:text-base text-sm flex flex-col gap-2">
                                        {/* <center> */}
                                        <label htmlFor="Image" className="text-secondary">
                                            Image
                                        </label>
                                        <div className="imgesection">
                                            <img src={selectedFile ? URL.createObjectURL(selectedFile) : imageshow != null ? imageshow : ''} className="printerpic" style={{
                                                width: selectedFile || imageshow ? '200px' : '200px',
                                                height: selectedFile || imageshow ? '200px' : '200px',
                                            }} />

                                            <div className="row " htmlFor="file-inputs" >
                                                <label htmlFor="file-inputs" className='choosefile bg-secondary hover:bg-primary'>
                                                    choose file
                                                <input
                                                    id="file-inputs"
                                                    type="file"
                                                    onChange={handleChangeback}
                                                    style={{ display: 'none' }}
                                                    alt='Select image'
                                                />
                                                </label>
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
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleAddCompany}
                                        className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                                    >
                                        Add Articles
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

export default Addarticles