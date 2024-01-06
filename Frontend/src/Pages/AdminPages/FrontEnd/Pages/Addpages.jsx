import React, {useState} from 'react'
import DashboardRightHeader from '../../../../components/DashboardRightHeader/DashboardRightHeader'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import { useNavigate } from "react-router-dom";
const Addpages = ({ isVisible, setVisibility, refreshBrandData }) => {

    const navigate = useNavigate();
    const [name, setname] = useState("");
    const [name_ar, setname_ar] = useState("");
    const [SeoDescription, setSeoDescription] = useState('')
    const [PageOrder, setPageOrder] = useState('')
    const [PageSlug, setPageSlug] = useState('')
    const [sections, setsections] = useState('')

    const handleCloseCreatePopup = () => {
        setVisibility(false);
    };

    const handleAddCompany = async () => {
        try {
            const response = await newRequest.post('/createpages', {
                name: name,
                name_ar: name_ar,
                seo_description: SeoDescription,
                slug: PageSlug,
                is_dropdown: '2',
                page_order: PageOrder,
                sections: sections,
                custom_section_data: 'custom_section_data',
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
            navigate('/admin/Pages')
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
            <div className="p-0 h-full sm:ml-72">
                <div>
                    <DashboardRightHeader
                        title={'Create Page'}
                    />
                </div>

                <div className="grid grid-cols-6 sm:grid-cols-12 gap-4 justify-center items-center">
                    <div className="col-span-6 sm:col-span-6 h-auto w-full p-4 bg-white shadow-xl rounded-md mt-8">
                       
                        <div className="w-full">
                            <div className="popup-container h-auto sm:w-[100%] w-full">
                                <div className="popup-form w-full ">
                                    <form className='w-full'>
                                        <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                                            <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                                <label htmlFor="AddSections" className="text-secondary">
                                                    Add Sections
                                                </label>
                                                <label htmlFor="AddSections" className="text-secondary">
                                                    Drag Here sections you want to add
                                                </label>
                                                <textarea
                                                    type="text"
                                                    id="AddSections"
                                                    value={sections}
                                                    onChange={(e) => setsections(e.target.value)}
                                                    className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 "
                                                    style={{ border:'dotted'}}
                                                />

                                            </div>

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
                                                onClick={handleAddCompany}
                                                className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                                            >
                                                Add Page
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 sm:col-span-6 h-auto w-full p-4 bg-white shadow-xl rounded-md mt-8">
                        {/* <Userguideveido /> */}
                        <div className="flex">
                        
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'>
                                <OpenWithIcon/> 
                                <p>Blog Section</p> 
                        </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'>
                                <OpenWithIcon />
                                <p>Service Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'>
                                <OpenWithIcon />
                                <p>Counter Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'>
                                <OpenWithIcon />
                                <p>Category Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'>
                                <OpenWithIcon />
                                <p>Testimonal Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'>
                                <OpenWithIcon />
                                <p>Team Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'>
                                <OpenWithIcon />
                                <p>Boardmenber Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'>
                                <OpenWithIcon />
                                <p>Subscribe Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'>
                                <OpenWithIcon />
                                <p>Brad Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'>
                                <OpenWithIcon />
                                <p>About Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'>
                                <OpenWithIcon />
                                <p>Faq Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'>
                                <OpenWithIcon />
                                <p>Contact Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'>
                                <OpenWithIcon />
                                <p>Gepir Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'>
                                <OpenWithIcon />
                                <p>Check_digit Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'>
                                <OpenWithIcon />
                                <p>Gpc Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'>
                                <OpenWithIcon />
                                <p>Userguide Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'>
                                <OpenWithIcon />
                                <p>Gtinreporter Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'>
                                <OpenWithIcon />
                                <p>Migration Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'>
                                <OpenWithIcon />
                                <p>Custom Section</p>
                            </div>
                           
                        </div>
                       
                    </div>
                    
                </div>


            </div>
        </div>
    )
}

export default Addpages