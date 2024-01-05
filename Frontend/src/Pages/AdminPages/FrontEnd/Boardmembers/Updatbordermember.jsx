import React, { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import imageLiveUrl from '../../../../utils/urlConverter/imageLiveUrl';

const Updatbordermember = ({ isVisible, setVisibility, refreshBrandData }) => {
    // get this session data
    const updateBrandData = JSON.parse(sessionStorage.getItem("updateboardMember"));
    console.log(updateBrandData)
    const [Name, setName] = useState(updateBrandData?.name || '');
    const [job_title, setjob_title] = useState(updateBrandData?.job_title || '');
    const [status, setstatus] = useState(updateBrandData?.status || 0);
    const [Description, setDescription] = useState(updateBrandData?.description || '')
    const [Page, setPage] = useState(updateBrandData?.addedBy || '')
    const [loading, setLoading] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);
    const [imageshow, setimageshow] = useState(imageLiveUrl(updateBrandData?.image) || '')


    console.log(updateBrandData?.image);
    function handleChangeback(e) {
        setSelectedFile(e.target.files[0]);
        setimageshow(e.target.files[0])
    }
    const handleCloseUpdatePopup = () => {
        setVisibility(false);
    };

    const handleUpdateBrand = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', Name);
        formData.append('job_title', job_title);
        formData.append('description', Description);
        formData.append('image', imageshow);
        formData.append('addedBy', Page);
        formData.append('status', Number(status));
        try {
            const response = await newRequest.put(`/updateboard_members/${updateBrandData?.id}`, formData);

            toast.success(response?.data?.message || 'Board Member updated successfully', {
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
                        <div className="popup-form w-full" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                            <form className='w-full'>
                                <h2 className='text-secondary font-sans font-semibold text-2xl'>Edit Board Member</h2>
                                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="field1" className="text-secondary">Name</label>
                                        <input
                                            type="text"
                                            id="Name"
                                            value={Name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter Name"
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
                                        <label htmlFor="field1" className="text-secondary">Job Title</label>
                                        <input
                                            type="text"
                                            id="job_title"
                                            value={job_title}
                                            onChange={(e) => setjob_title(e.target.value)}
                                            //   readOnly
                                            placeholder="Enter Job title"
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />
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
                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="status" className="text-secondary">
                                            Description
                                        </label>
                                        <textarea
                                            type="text"
                                            id="job_title"
                                            value={Description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Enter Description"
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />

                                    </div>

                                    <div className="printerPic font-body sm:text-base text-sm flex flex-col gap-2">
                                        {/* <center> */}
                                        <label htmlFor="Image" className="text-secondary">
                                            Image
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
                                        Update Board
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

export default Updatbordermember