import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { Autocomplete, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import newRequest from '../../../../utils/userRequest';
import imageLiveUrl from '../../../../utils/urlConverter/imageLiveUrl';

const ViewHelpdask = ({ isVisible, setVisibility, refreshBrandData }) => {
  // get this session data
  const updateBrandData = JSON.parse(sessionStorage.getItem("Viewassigento"));
  console.log(updateBrandData);
  const [loading, setLoading] = useState(false);
  const [docuements, setDocuments] = React.useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState({
    id: updateBrandData?.assignedTo || 0,
    username: updateBrandData?.assignedTo || "",
  });
  const [status, setstatus] = useState(updateBrandData?.status || 0); 
   const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const { t, i18n } = useTranslation();
  const [replyshoww, setreplyshoww] = useState(false);
  const replyshowform = () => {
    setreplyshoww(!replyshoww);
  };
  const handleCloseUpdatePopup = () => {
    setVisibility(false);
  };

  useEffect(() => {
    const getDocuments = async () => {
      try {
        const response = await newRequest.get("/getAllassignto");
        setDocuments(response.data);
      } catch (error) {
        console.log(error);
      }
    };

      const getbyid = async () => {
        try {
          const response = await newRequest.get(`/gethelpdeskById/${updateBrandData?.id}`);
          setTitle(response?.data?.title);
          setDescription(response?.data?.description);
          console.log("----------", response);
        } catch (error) {
          console.log(error);
        }
      };
      getbyid()
    getDocuments();
  }, []);

  const handleSelectedDocuments = (event, value) => {
    setSelectedDocuments(value);
  };
  const image = imageLiveUrl(updateBrandData?.document) || "";
  const [selecteddocument, setSelecteddocument] = useState(null);
  const [Comments, setComments] = useState("");


  return (
    <div>
      {isVisible && (
        <div className="popup-overlay">
          <div className="popup-container h-auto sm:w-[45%] w-full">
            <div className="popup-form w-full">
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
                          console.log("Input cleared");
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

                <div className=" mt-5">
                  <button
                    type="button"
                    className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseUpdatePopup}
                  >
                    {t("Close")}
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewHelpdask;