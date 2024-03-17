import React, { useState } from 'react'
import { toast } from 'react-toastify';
// import newRequest from '../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import './TicketPopUp.css'
import { useTranslation } from 'react-i18next';
import newRequest from '../../../utils/userRequest';

const CreateTicketPopUp = ({ isVisible, setVisibility, refreshBrandData }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [selecteddocument, setSelecteddocument] = useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelecteddocument(file);
  };
  // get the sesstion data
  // const gs1MemberData = JSON.parse(sessionStorage.getItem("gs1memberRecord"));
  // console.log(gs1MemberData)
  const [loading, setLoading] = useState(false);

  const handleCloseCreatePopup = () => {
    setVisibility(false);
  };

  const emailget = sessionStorage.getItem("email");
  const useriddata = sessionStorage.getItem("MemberUserId");
  const handleAddCompany = async () => {
      setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", Description);
    // formData.append("document", selecteddocument);
    if (selecteddocument) {
      formData.append("document", selecteddocument);
    }
    formData.append("email", emailget);
    formData.append("user_id", useriddata);
    // formData.append("assignedTo", "");
    formData.append("status", 0);
    try {
      const response = await newRequest.post("/createhelpdesk", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        `${t("Help Desk")} ${title} ${t("has been added successfully")}.`,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
       refreshBrandData();
      handleCloseCreatePopup();
    } catch (error) {
      toast.error(error?.response?.data?.error || "Error", {
        position: "top-right",
        autoClose: 2000,
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
      {/* create the post api popup */}
      {isVisible && (
        <div className="popup-overlay z-50">
          <div className="popup-container h-auto sm:w-[45%] w-full">
            <div className="popup-form w-full">
              <form className="w-full">
                <h2 className="text-secondary font-sans font-semibold text-2xl">
                  {t("Create Ticket")}
                </h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-1">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">
                      {t("Title")}
                      <span className="text-red-600"> *</span>
                    </label>
                    <input
                      type="text"
                      id="field1"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={`${t("Enter")} ${t("Title")}`}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2 -mt-3">
                    <label htmlFor="field2" className="text-secondary">
                      {t("Description")}
                      <span className="text-red-600"> *</span>{" "}
                    </label>
                    <textarea
                      type="text"
                      id="field2"
                      value={Description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={`${t("Enter")}${t("Description")}`}
                      className="border-1 w-full h-28 rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:gap-3 gap-3">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field3" className="text-secondary">
                      {t("Documents/Screenshot")}
                      <span className="text-red-600"> *</span>
                    </label>
                    <input
                      type="file"
                      id="field3"
                      //  value={title}
                      //  onChange={(e) => setTitle(e.target.value)}
                      //  placeholder="Enter Title"
                      onChange={handleFileChange}
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
                    {t("Close")}
                  </button>
                  {/* <button
                                 type="button"
                                 onClick={handleAddCompany}
                                 className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                               >
                                 Add Brand
                               </button> */}
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#021F69", color: "#ffffff" }}
                    onClick={handleAddCompany}
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
                    {t("Save")}
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

export default CreateTicketPopUp