import { useState ,useEffect} from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../../utils/userRequest';

const Addcategories = ({ isVisible, setVisibility, refreshBrandData }) => {
    const [category_name_en, setcategory_name_en] = useState("");
    const [category_name_ar, setcategory_name_ar] = useState("");
    const [Categorylevel, setCategorylevel] = useState('')
    const [Page, setPage] = useState('')
    const [Pagedropdown, setPagedropdown] = useState([])
    const [MegaMenuCategories, setMegaMenuCategories] = useState('')
    const [megamenudropdown, setmegamenudropdown] = useState([])
    const [Description, setDescription] = useState('')
    const [Title, setTitle] = useState("");
    const [MetaDescription, setMetaDescription] = useState('')

    useEffect(() => {
        const getDocuments = async () => {
            try {
                const response = await newRequest.get('/getAllmega_menu');
                const nameEnArray = response.data;
                setmegamenudropdown(nameEnArray);
            } catch (error) {
                console.log(error);
            }
        };

        const getpagedata = async () => {
            try {
                const response = await newRequest.get('/getAllpagesname');
                const nameEnArray = response.data;
                setPagedropdown(nameEnArray);
                console.log('--------', nameEnArray);
            } catch (error) {
                console.log(error);
            }
        };

        getDocuments();
        getpagedata();
    }, []);
    const handleCloseCreatePopup = () => {
        setVisibility(false);
    };

    const handleAddCompany = async () => {
        //  integrate the post api in try catch blcck
        try {
            const response = await newRequest.post('/creatmega_menu_categories/', {
                parent_id: Categorylevel,
                megamenu_id: MegaMenuCategories,
                category_name_en: category_name_en,
                category_name_ar: category_name_ar,
                description: Description,
                url: Page,
                meta_title: Title,
                meta_description: MetaDescription,
                meta_keywords: "khan",
                status: 1,
            });

            toast.success(`Mega Menu categories ${category_name_en} has been added successfully.`, {
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
        }


    };


    return (
        <div>
            {/* create the post api popup */}
            {isVisible && (
                <div className="popup-overlay">
                    <div className="popup-container h-auto sm:w-[45%] w-full">
                        <div className="popup-form w-full max-h-screen overflow-y-auto">
                            <form className='w-full'>
                                <h2 className='text-secondary font-sans font-semibold text-2xl'>Add Mega Menu Categories </h2>
                                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="field1" className="text-secondary">Category Name[English]</label>
                                        <input
                                            type="text"
                                            id="category_name_en"
                                            value={category_name_en}
                                            onChange={(e) => setcategory_name_en(e.target.value)}
                                            placeholder="Enter Category Name[English]"
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="field1" className="text-secondary">Category Name[Arabic]</label>
                                        <input
                                            type="text"
                                            id="category_name_ar"
                                            value={category_name_ar}
                                            onChange={(e) => setcategory_name_ar(e.target.value)}
                                            placeholder="Enter Category Name[Arabic]"
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="status" className="text-secondary">
                                            Add Mega Menu Categories
                                        </label>
                                        <select
                                            id="status"
                                            value={MegaMenuCategories}
                                            onChange={(e) => setMegaMenuCategories(e.target.value)}
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        >
                                            <option value="0">-- Select --</option>
                                            {
                                                megamenudropdown && megamenudropdown.map((itme, index) => {
                                                    return (
                                                        <option key={index} value={itme.id}>{itme.name_en}</option>
                                                    )
                                                })
                                            }
                                          
                                        </select>
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="status" className="text-secondary">
                                            Select Category Level
                                        </label>
                                        <select
                                            id="status"
                                            value={Categorylevel}
                                            onChange={(e) => setCategorylevel(e.target.value)}
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        >
                                            <option value="0">Category Level</option>
                                            <option value="1">Main Category</option>
                                        </select>
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
                                            {
                                                Pagedropdown && Pagedropdown.map((itme, index) => {
                                                    return (
                                                        <option key={index} value={itme.name}>{itme.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="status" className="text-secondary">
                                             Description
                                        </label>
                                        <textarea
                                            type="text"
                                            id="name_ar"
                                            value={Description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Enter Description"
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />

                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="field1" className="text-secondary">Meta Title</label>
                                        <input
                                            type="text"
                                            id="Title"
                                            value={Title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Enter Meta Title"
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        />
                                    </div>


                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="status" className="text-secondary">
                                           Meta  Description
                                        </label>
                                        <textarea
                                            type="text"
                                            id="name_ar"
                                            value={MetaDescription}
                                            onChange={(e) => setMetaDescription(e.target.value)}
                                            placeholder="Enter Meta Description"
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
                                        Add Mega Menu categories
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

export default Addcategories