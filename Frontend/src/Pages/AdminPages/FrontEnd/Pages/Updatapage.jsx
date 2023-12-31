import React, { useState, useEffect } from 'react'
import DashboardRightHeader from '../../../../components/DashboardRightHeader/DashboardRightHeader'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import { useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
const Updatapage = ({ isVisible, setVisibility, refreshBrandData }) => {

    const navigate = useNavigate();
    let { userId } = useParams();
    const [name, setname] = useState("");
    const [name_ar, setname_ar] = useState("");
    const [SeoDescription, setSeoDescription] = useState('')
    const [PageOrder, setPageOrder] = useState('')
    const [PageSlug, setPageSlug] = useState('')
    const [sections, setsections] = useState([])
    const [draggedSections, setDraggedSections] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCloseCreatePopup = () => {
        setVisibility(false);
    };

    const refreshcitiesData = async () => {
        try {
            const response = await newRequest.get(`/getpagesById/${userId}`);
            // console.log([response.data.sections]);
            const inputArray = [response.data.sections];
            const separatedArray = response.data.sections.split('\n');
            console.log(separatedArray);
            setname(response.data.name)
            setname_ar(response.data.name_ar)
            setSeoDescription(response.data.seo_description)
            setPageSlug(response.data.slug)
            setPageOrder(response.data.page_order)
            setsections(separatedArray.map((section, index) => ({ id: index, content: section })))
            setDraggedSections(separatedArray.map((section, index) => ({ id: index, content: section })));

        } catch (err) {
            console.log(err);
        }
    };
    
    useEffect(() => {
        refreshcitiesData()
    }, []);

    const handleAddCompanyapi = async () => {
        try {
            const formattedSections = sections.map(section => `"${section.content}"`).join(',');
            console.log(`[${formattedSections}]`);
            const response = await newRequest.put(`/updatepages/${userId}`, {
                name: name,
                name_ar: name_ar,
                seo_description: SeoDescription,
                slug: PageSlug,
                is_dropdown: sections.length,
                page_order: PageOrder,
                sections: `[${formattedSections}]`,
                custom_section_data: 'custom_section_data',
                status: 1,
            });
            console.log(response);
            toast.success(`Manage Page ${name} has been Updata successfully.`, {
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

    const handleDragStart = (e, section) => {
        e.dataTransfer.setData('text/plain', section);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const section = e.dataTransfer.getData('text/plain');
        const newSection = { id: draggedSections, content: section };
        setDraggedSections([...draggedSections, newSection]);
        setsections([...draggedSections, newSection])

    };

    const handleRemoveSection = (sectionIndex, itemIndex) => {
        const updatedDraggedSections = [...draggedSections];
        updatedDraggedSections[sectionIndex].content = updatedDraggedSections[sectionIndex].content
            .split(',')
            .filter((_, index) => index !== itemIndex)
            .join(',');

        const filteredArray = updatedDraggedSections.filter(value => value.content.trim() !== ''); // Adjusted the condition

        setDraggedSections(filteredArray);
        setsections(filteredArray.map(section => ({ id: section.id, content: section.content }))); // Update sections with id and content
        console.log(filteredArray);
    };


    return (
        <div>
            <div className="p-0 h-full sm:ml-72">
                <div>
                    <DashboardRightHeader
                        title={'Edit  Page'}
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
                                                    Edit Sections
                                                </label>
                                                <label htmlFor="AddSections" className="text-secondary">
                                                    Drag Here sections you want to add
                                                </label>
                                                <div
                                                    id="AddSections"
                                                    onDrop={handleDrop}
                                                    onDragOver={handleDragOver}
                                                    value={sections}
                                                    onChange={(e) => setsections(e.target.value)}
                                                    className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 "
                                                    style={{ border: 'dotted', minHeight: '90px', height: 'auto' }}
                                                >
                                                    {draggedSections.map((section, index) => (
                                                        <div key={index} className="mb-2">
                                                            {section.content.split(',').map((item, itemIndex) => (
                                                                <div
                                                                    key={itemIndex}
                                                                    className="p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md m-2 text-white gap-2 flex"
                                                                    style={{
                                                                        backgroundColor: section.content.length === 0 ? '#f2f2f2' : '#17845ba8',
                                                                        display: section.content.length === 0 ? 'none' : 'flex',
                                                                    }}
                                                                >
                                                                    <span className="flex-grow ">{item.trim()}</span>
                                                                    <button
                                                                        type="button"
                                                                        className="ml-2"
                                                                        onClick={() => handleRemoveSection(index, itemIndex)} // Pass indices for removal
                                                                    >
                                                                        <CloseIcon />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ))}

                                                </div>
                                                <textarea
                                                    type="text"
                                                    id="AddSections"
                                                    onDrop={handleDrop}
                                                    onDragOver={handleDragOver}
                                                    value={sections}
                                                    onChange={(e) => setsections(e.target.value)}
                                                    className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 "
                                                    style={{ border: 'dotted', display: 'none' }}
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
                                            <Button
                                                // variant="contained"
                                                style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                                                onClick={handleAddCompanyapi}
                                                disabled={loading}
                                                className="w-[70%] ml-2"
                                                endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                                            >
                                                Update Page
                                            </Button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 sm:col-span-6 h-auto w-full p-4 bg-white shadow-xl rounded-md mt-8">
                        {/* <Userguideveido /> */}
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Blog')}
                            >
                                <OpenWithIcon />
                                <p>Blog Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Service')}>
                                <OpenWithIcon />
                                <p>Service Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Counter')}>
                                <OpenWithIcon />
                                <p>Counter Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Category')}>
                                <OpenWithIcon />
                                <p>Category Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Testimonal')}>
                                <OpenWithIcon />
                                <p>Testimonal Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Team')}>
                                <OpenWithIcon />
                                <p>Team Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Subscribe')}>
                                <OpenWithIcon />
                                <p>Boardmenber Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Subscribe')}>
                                <OpenWithIcon />
                                <p>Subscribe Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Brad')}>
                                <OpenWithIcon />
                                <p>Brad Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'About')}>
                                <OpenWithIcon />
                                <p>About Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Faq')}>
                                <OpenWithIcon />
                                <p>Faq Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Contact')}>
                                <OpenWithIcon />
                                <p>Contact Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Gepir')}>
                                <OpenWithIcon />
                                <p>Gepir Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Check_digit')}>
                                <OpenWithIcon />
                                <p>Check_digit Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Gpc')}>
                                <OpenWithIcon />
                                <p>Gpc Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Userguide')}>
                                <OpenWithIcon />
                                <p>Userguide Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Gtinreporter')}>
                                <OpenWithIcon />
                                <p>Gtinreporter Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Migration')}>
                                <OpenWithIcon />
                                <p>Migration Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Custom')}>
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

export default Updatapage