import { useState ,useEffect} from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import { useTranslation } from 'react-i18next';

const AddEmailConfigure = ({ isVisible, setVisibility, refreshBrandData }) => {
  const [EmailSentFrom, setEmailSentFrom] = useState("");
  const [SMTPHOST, setSMTPHOST] = useState("");
  const [SMTPEncryption, setSMTPEncryption] = useState("");
  const [EmailMethod, setEmailMethod] = useState("");
  const [megamenudropdown, setmegamenudropdown] = useState([]);
  const [SMTPpassword, setSMTPpassword] = useState("");
  const [SMTPUsername, setSMTPUsername] = useState('')
  const [SMTPPort, setSMTPPort] = useState("");

  const { t } = useTranslation();
  useEffect(() => {
    const getDocuments = async () => {
      try {
        const response = await newRequest.get("/getAllmega_menu");
        const nameEnArray = response.data;
        setmegamenudropdown(nameEnArray);
      } catch (error) {
        console.log(error);
      }
    };

    getDocuments();
  }, []);
  const handleCloseCreatePopup = () => {
    setVisibility(false);
  };

  const handleAddCompany = async () => {
    //  integrate the post api in try catch blcck
    try {
      const response = await newRequest.post("/createemailsetting/", {
        smtp_encryption: SMTPEncryption || "TSL",
        emailmethod: EmailMethod || "SMTP Mail",
        emailfrom: EmailSentFrom,
        smtp_host: SMTPHOST,
        smtp_password: SMTPpassword,
        smtp_username: SMTPUsername,
        smtp_port: SMTPPort,
        status: 1,
      });

      toast.success(
        ` ${t("Email Configure")} ${EmailSentFrom} ${t("has been added successfully")}.`,
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

      console.log(response.data);
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
    }
  };

  return (
    <div>
      {/* create the post api popup */}
      {isVisible && (
        <div className="popup-overlay">
          <div className="popup-container h-auto sm:w-[45%] w-full">
            <div className="popup-form w-full max-h-screen overflow-y-auto">
              <form className="w-full">
                <h2 className="text-secondary font-sans font-semibold text-2xl">
                  {t("Add")} {t("Email Configure")}
                </h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">
                      {t("Email Sent From")}
                    </label>
                    <input
                      type="text"
                      id="EmailSentFrom"
                      value={EmailSentFrom}
                      onChange={(e) => setEmailSentFrom(e.target.value)}
                      placeholder={`${t("Enter")} ${t("Email Sent From")}`}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="status" className="text-secondary">
                      {t("Email Method")}
                    </label>
                    <select
                      id="status"
                      value={EmailMethod}
                      onChange={(e) => setEmailMethod(e.target.value)}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    >
                      <option value="PHP Mail">{t("PHP Mail")}</option>
                      <option value="SMTP Mail">{t("SMTP Mail")}</option>

                    </select>
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">
                      {t("SMTP HOST")}
                    </label>
                    <input
                      type="text"
                      id="SMTPHOST"
                      value={SMTPHOST}
                      onChange={(e) => setSMTPHOST(e.target.value)}
                      placeholder={`${t("Enter")} ${t("SMTP HOST")}`}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="SMTPUsername" className="text-secondary">
                      {t("SMTP Username")}
                    </label>
                    <input
                      type="text"
                      id="SMTPUsername"
                      value={SMTPUsername}
                      onChange={(e) => setSMTPUsername(e.target.value)}
                      placeholder={`${t("Enter")} ${t("SMTP Username")}`}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">
                      {t("SMTP Password")}
                    </label>
                    <input
                      type="text"
                      id="SMTPpassword"
                      value={SMTPpassword}
                      onChange={(e) => setSMTPpassword(e.target.value)}
                      placeholder={`${t("Enter")} ${t("SMTP Password")}`}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="SMTPPort" className="text-secondary">
                      {t("SMTP Port")}
                    </label>
                    <input
                      type="number"
                      id="SMTPPort"
                      value={SMTPPort}
                      onChange={(e) => setSMTPPort(e.target.value)}
                      placeholder={`${t("Enter")} ${t("SMTP Port")}`}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="status" className="text-secondary">
                      {t("SMTP Encryption")}
                    </label>
                    <select
                      id="status"
                      value={SMTPEncryption}
                      onChange={(e) => setSMTPEncryption(e.target.value)}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    >
                      <option value="TSL">TSL</option>
                      <option value="SSL">SSL</option>
                    </select>
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
                  <button
                    type="button"
                    onClick={handleAddCompany}
                    className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                  >
                    {t("Add")} {t("Email Configure")}
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

export default AddEmailConfigure;