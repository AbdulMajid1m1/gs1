import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { Autocomplete, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import newRequest from '../../../../utils/userRequest';
import imageLiveUrl from '../../../../utils/urlConverter/imageLiveUrl';

const HelpDeskAssigneto = ({ isVisible, setVisibility, refreshBrandData }) => {
    // get this session data
    const updateBrandData = JSON.parse(sessionStorage.getItem("updateassigento"));
    // console.log(updateBrandData?.email);
    const [loading, setLoading] = useState(false);
    const [docuements, setDocuments] = React.useState([]);
    const [selectedDocuments, setSelectedDocuments] = useState({
        id: updateBrandData?.assignedTo || 0,
        username: updateBrandData?.assignedTo || "",
    });
    const [emailpost, setemailpost] = useState(updateBrandData?.email);
    const [status, setstatus] = useState(updateBrandData?.status || 0);
    const { t, i18n } = useTranslation();
    const [replyshoww, setreplyshoww] = useState(false)
    const replyshowform = () => {
        setreplyshoww(!replyshoww);
    }
    const handleCloseUpdatePopup = () => {
        setVisibility(false);
    };

    useEffect(() => {
        const getDocuments = async () => {
            try {
                const response = await newRequest.get("/getAllassignto");
                setDocuments(response.data);
            } catch (error) {
                // console.log(error);
            }
        };

        getDocuments();
    }, []);

    const handleSelectedDocuments = (event, value) => {
        setSelectedDocuments(value);
        // console.log("-------", value.email);
        setemailpost(value.email);
    };
    const image = imageLiveUrl(updateBrandData?.document) || "";
    const handleUpdateBrand = async () => {
        // console.log(image);
        setLoading(true);
        const formData = new FormData();
        formData.append("title", updateBrandData?.title);
        formData.append("description", updateBrandData?.description);
        // formData.append("document", updateBrandData?.document);
        formData.append("assignedTo", selectedDocuments?.username);
        formData.append("status", Number(status));
        try {
            const response = await newRequest.put(`/updatehelp_desks/${updateBrandData?.id}`, formData);
            const emaiilpostrec = await newRequest.post(`/sendemailAssign_to_helpdesk/${emailpost}`);
            // console.log("emaiilpostrec", emaiilpostrec);
            toast.success(
                response?.data?.message ||
                `${t("Ticket")} ${t("has been")} ${t("Updated Successfully")}.`,
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }
            );

            refreshBrandData();
            handleCloseUpdatePopup();
        } catch (error) {
            // console.log(error.response.data);
            toast.error(
                error?.response?.data?.error || `${t("Something went wrong")}`,
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }
            );

            // console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const [selecteddocument, setSelecteddocument] = useState(null);
    const [Comments, setComments] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelecteddocument(file);
    };

    const Replydata = async () => {
        const formData = new FormData();
        formData.append("helpDeskID", updateBrandData?.id);
        formData.append("comment", Comments);
        // formData.append("document", selecteddocument);
         if (selecteddocument) {
           formData.append("document", selecteddocument);
         }
        formData.append("commentByAdmin", "commentByAdmin");
        formData.append("commentByUser", "commentByUser");
        try {
            const response = await newRequest.post(`/createhelpdesk_comment`, formData);
            setComments('')
            setSelecteddocument(null)
            setreplyshoww(false);

        } catch (error) {
            // console.log(error);
            toast.error(
                error?.response?.data?.error || `${t("Something went wrong")}`,
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }
            );
        }
    };


    return (
        <div>
            {isVisible && (
                <div className="popup-overlay">
                    <div className="popup-container h-auto sm:w-[45%] w-full">
                        <div className="popup-form w-full max-h-screen overflow-y-auto">
                            <form className="w-full">
                                <div className="flex justify-between">
                                    <h2 className="text-secondary font-sans font-semibold text-2xl">
                                        {t("Ticket Details")}
                                    </h2>
                                    <p className="text-secondary font-sans font-semibold ">
                                        {t("Ticket No")}: {updateBrandData?.ticket_no || ""}
                                    </p>
                                </div>

                                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="field1" className="text-secondary">
                                            {t("Assigned To")}
                                        </label>
                                        <Autocomplete
                                            id="field1"
                                            options={docuements}
                                            value={selectedDocuments}
                                            getOptionLabel={(option) => option?.username || ""}
                                            onChange={handleSelectedDocuments}
                                            onInputChange={(event, value) => {
                                                if (!value) {
                                                    // perform operation when input is cleared
                                                    // console.log("Input cleared");
                                                }
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    autoComplete="off"
                                                    {...params}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        className: "text-white",
                                                    }}
                                                    InputLabelProps={{
                                                        ...params.InputLabelProps,
                                                        style: { color: "white" },
                                                    }}
                                                    className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                                                    placeholder={`${t("Assigned To")}`}
                                                // required
                                                />
                                            )}
                                            classes={{
                                                endAdornment: "text-white",
                                            }}
                                            sx={{
                                                "& .MuiAutocomplete-endAdornment": {
                                                    color: "white",
                                                },
                                            }}
                                        />
                                    </div>

                                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                        <label htmlFor="status" className="text-secondary">
                                            {t("Status")}
                                        </label>
                                        <select
                                            id="status"
                                            value={status}
                                            onChange={(e) => setstatus(e.target.value)}
                                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                        >
                                            <option value="0">{t("InProgress")}</option>
                                            <option value="1">{t("Closed")}</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="px-5 py-2 my-4 rounded-sm bg-primary text-white font-body text-sm"
                                    onClick={replyshowform}
                                >
                                    {t("Reply")}
                                    {/* {replyshoww ?'Reply':'Not Reply'} */}
                                </button>
                                {
                                    replyshoww && (
                                        <form className='w-full'>
                                            <div className="flex flex-col sm:gap-3 gap-3 mt-1">
                                                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2 -mt-3">
                                                    <label htmlFor="field2" className="text-secondary">{t('Comments')}<span className='text-red-600'> *</span> </label>
                                                    <textarea
                                                        type="text"
                                                        id="field2"
                                                        value={Comments}
                                                        onChange={(e) => setComments(e.target.value)}
                                                        placeholder={`${t('Enter')} ${t('Comments')}`}
                                                        className="border-1 w-full h-28 rounded-sm border-[#8E9CAB] p-2 mb-3"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:gap-3 gap-3">
                                                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                                    <label htmlFor="field3" className="text-secondary">{t('Supporting Documents')}<span className='text-red-600'> *</span></label>
                                                    <input
                                                        type="file"
                                                        id="field3"
                                                        //  value={Title}
                                                        //  onChange={(e) => setTitle(e.target.value)}
                                                        //  placeholder="Enter Title"
                                                        onChange={handleFileChange}
                                                        className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                                    />
                                                </div>
                                            </div>

                                            <div className="w-full flex justify-center items-center gap-8 mt-5">

                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                                                    onClick={Replydata}
                                                    // disabled={loading}
                                                    className="w-[70%] ml-2"
                                                // endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                                                >
                                                    {t('Submit')}
                                                </Button>
                                            </div>
                                        </form>
                                    )
                                }
                                <div className="w-full flex justify-center items-center gap-8 mt-5">
                                    <button
                                        type="button"
                                        className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                                        onClick={handleCloseUpdatePopup}
                                    >
                                        {t("Close")}
                                    </button>

                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: "#021F69", color: "#ffffff" }}
                                        onClick={handleUpdateBrand}
                                        disabled={loading}
                                        className="w-[70%] ml-2"
                                        endIcon={
                                            loading ? (
                                                <CircularProgress size={24} color="inherit" />
                                            ) : (
                                                <SendIcon />
                                            )
                                        }
                                    >
                                        {t("Update")} {t("Ticket")}
                                    </Button>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HelpDeskAssigneto;