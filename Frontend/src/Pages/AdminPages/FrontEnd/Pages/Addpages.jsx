import React, { useState, useEffect } from 'react'
import DashboardRightHeader from '../../../../components/DashboardRightHeader/DashboardRightHeader'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import { useNavigate } from "react-router-dom"; 
import CloseIcon from '@mui/icons-material/Close'; 
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import ImageResize from 'quill-image-resize-module-react';


const Addpages = () => {

    const navigate = useNavigate();
    const [name, setname] = useState("");
    const [name_ar, setname_ar] = useState("");
    const [SeoDescription, setSeoDescription] = useState('')
    const [PageOrder, setPageOrder] = useState('')
    const [PageSlug, setPageSlug] = useState('')
    const [sections, setsections] = useState([]) 
     const [draggedSections, setDraggedSections] = useState([]);
    const [customsectiondataeng, setcustomsectiondataeng] = useState('')
    const [customsectiondataarb, setcustomsectiondataarb] = useState('') 
    const [Customdatashow, setCustomdatashow] = useState(false)

    const handleChangeeng = (value) => {
        setcustomsectiondataeng(value);
    };

    const handleChangearb = (value) => {
        setcustomsectiondataarb(value);
    };

    const handleCloseCreatePopup = () => {
        
    };

    const handleAddCompany = async () => {
      
        try {
            const formattedSections = sections.map(section => `"${section}"`).join(',');
            const customSectionDataEng = Customdatashow ? customsectiondataeng : 'Null';
            const customSectionDataArb = Customdatashow ? customsectiondataarb : 'Null';
            const response = await newRequest.post('/createpages', {
                name: name,
                name_ar: name_ar,
                seo_description: SeoDescription,
                slug: PageSlug,
                is_dropdown: sections.length,
                page_order: PageOrder,
                sections: `[${formattedSections}]`,
                custom_section_data: customSectionDataEng,
                custom_section_data_ar: customSectionDataArb,
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

    const handleDragStart = (e, section) => {
        e.dataTransfer.setData('text/plain', section);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const section = e.dataTransfer.getData('text/plain');
        setsections([...sections, section]);
        setDraggedSections([...draggedSections, section]);
        if (section == 'Custom Section') {
            setCustomdatashow(true) 
        }
       

    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleRemoveSection = (index) => {
        const updatedSections = [...draggedSections];
        updatedSections.splice(index, 1);
        setDraggedSections(updatedSections);
        console.log(updatedSections);
        if (!updatedSections.includes('Custom Section')) {
            setCustomdatashow(false);
        }
    };

    useEffect(() => {
        // Register the ImageResize module when the component mounts
        Quill.register('modules/imageResize', ImageResize);
    }, []);

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' }
            ],
            ['link', 'image', 'video'],
            ['clean'], // <-- Comma was missing here
            [{ 'color': [] }],
            [{ 'background': [] }],
            [{ 'font': [] }],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false
        },
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize']
        }
    };

    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
        'color',
        'background',
        
    ];


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
                                                        <div key={index} className="p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md text-white gap-2 flex m-2" style={{ backgroundColor: '#17845ba8', color: 'white' }}>
                                                            {/* {section} */}
                                                            <span className="flex-grow">{section}</span>
                                                            <button
                                                                type="button"
                                                                className="ml-2"
                                                                onClick={() => handleRemoveSection(index)}
                                                            >
                                                                <CloseIcon/>
                                                            </button>
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

                                            {Customdatashow ?(
                                                <>
                                            <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                                <label htmlFor="status" className="text-secondary ">
                                                    Custom Data[English]
                                                </label>
                                                        <ReactQuill theme="snow" modules={modules} formats={formats} bounds={'#root'}
 className=' h-40'
                                                 value={customsectiondataeng}
                                                 onChange={handleChangeeng} />
                                            </div>

                                            <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2 mt-10">
                                                <label htmlFor="status" className="text-secondary mt-5">
                                                    Custom Data[Arabic]
                                                </label>
                                                        <ReactQuill theme="snow" modules={modules}
                                                            formats={formats} className=' h-40'
                                                    value={customsectiondataarb}
                                                    onChange={handleChangearb} />
                                            </div>
                                                </>
                                            ) : (
                                                null
                                            )}
                                           
                                        </div>

                                        <div className="w-full flex justify-center items-center gap-8 mt-20">
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
                        
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Blog Section')}
                                >
                                <OpenWithIcon/> 
                                <p>Blog Section</p> 
                        </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Service Section')}>
                                <OpenWithIcon />
                                <p>Service Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Counter Section')}>
                                <OpenWithIcon />
                                <p>Counter Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Category Section')}>
                                <OpenWithIcon />
                                <p>Category Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Testimonal Section')}>
                                <OpenWithIcon />
                                <p>Testimonal Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Team Section')}>
                                <OpenWithIcon />
                                <p>Team Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Subscribe Section')}>
                                <OpenWithIcon />
                                <p>Boardmenber Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Subscribe Section')}>
                                <OpenWithIcon />
                                <p>Subscribe Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                             draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Brad Section')}>
                                <OpenWithIcon />
                                <p>Brad Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                             draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'About Section')}>
                                <OpenWithIcon />
                                <p>About Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                             draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Faq Section')}>
                                <OpenWithIcon />
                                <p>Faq Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                             draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Contact Section')}>
                                <OpenWithIcon />
                                <p>Contact Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                             draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Gepir Section')}>
                                <OpenWithIcon />
                                <p>Gepir Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                             draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Check_digit Section')}>
                                <OpenWithIcon />
                                <p>Check_digit Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                             draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Gpc Section')}>
                                <OpenWithIcon />
                                <p>Gpc Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                             draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Userguide Section')}>
                                <OpenWithIcon />
                                <p>Userguide Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                             draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Gtinreporter Section')}>
                                <OpenWithIcon />
                                <p>Gtinreporter Section</p>
                            </div>
                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                             draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Migration Section')}>
                                <OpenWithIcon />
                                <p>Migration Section</p>
                            </div>
                        </div>
                        <div className="flex">

                            <div className='p-4 w-1/2 sm:w-full cursor-all-scroll rounded-md bg-secondary hover:bg-primary text-white gap-2 flex m-2'
                             draggable="true"
                                onDragStart={(e) => handleDragStart(e, 'Custom Section')}>
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