import { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';

const AddPageOrder = ({ isVisible, setVisibility, refreshBrandData }) => {
    const [name, setname] = useState("");
    const [name_ar, setname_ar] = useState("");
    const [SeoDescription, setSeoDescription] = useState('')
    const [PageOrder, setPageOrder] = useState('')
    const [PageSlug, setPageSlug] = useState('')

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
        try {
            const response = await newRequest.post('/createpages', {
                name: name,
                name_ar: name_ar,
                SeoDescription: SeoDescription,
                slug: PageSlug,
                is_dropdown: is_dropdown,
                page_order: PageOrder,
                sections: sections,
                custom_section_data: custom_section_data,
                status: 1,
            });
            toast.success(`Manage Page ${name} has been added successfully.`, {
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
                                <h2 className='text-secondary font-sans font-semibold text-2xl'>Add Manage Page </h2>
                                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="field1" className="text-secondary">Page Name[English]</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setname(e.target.value)}
                                            placeholder="Enter Name"
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="field1" className="text-secondary">Page Name[Arabic]</label>
                                        <input
                                            type="text"
                                            id="name_ar"
                                            value={name_ar}
                                            onChange={(e) => setname_ar(e.target.value)}
                                            placeholder="Enter Page Name[Arabic]"
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="status" className="text-secondary">
                                            Page Order
                                        </label>
                                       
                                         <input
                                            type="text"
                                            id="PageOrder"
                                            value={PageOrder}
                                            onChange={(e) => setPageOrder(e.target.value)}
                                            placeholder="Enter Page Order"
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="status" className="text-secondary">
                                            Page Slug
                                        </label>

                                        <input
                                            type="text"
                                            id="PageOrder"
                                            value={PageSlug}
                                            onChange={(e) => setPageSlug(e.target.value)}
                                            placeholder="Enter  Page Slug "
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="status" className="text-secondary">
                                            Seo Description
                                        </label>
                                        <textarea
                                            type="text"
                                            id="name_ar"
                                            value={SeoDescription}
                                            onChange={(e) => setSeoDescription(e.target.value)}
                                            placeholder="Enter Description"
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />

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
                                        Add Board
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

export default AddPageOrder