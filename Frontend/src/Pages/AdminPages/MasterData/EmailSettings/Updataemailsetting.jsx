import { useState ,useEffect} from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import { useTranslation } from 'react-i18next';

const Updataemailsetting = ({ isVisible, setVisibility, refreshBrandData }) => {
    const updateBrandData = JSON.parse(sessionStorage.getItem("updateemailsetting"));

  const [EmailSentFrom, setEmailSentFrom] = useState(updateBrandData?.emailfrom || '');
  const [SMTPHOST, setSMTPHOST] = useState(updateBrandData?.smtp_host || "");
  const [SMTPEncryption, setSMTPEncryption] = useState(updateBrandData?.smtp_encryption || '');
  const [EmailMethod, setEmailMethod] = useState(updateBrandData?.emailmethod || '');
  const [megamenudropdown, setmegamenudropdown] = useState([]);
  const [SMTPpassword, setSMTPpassword] = useState(updateBrandData?.smtp_password || '');
  const [SMTPUsername, setSMTPUsername] = useState(updateBrandData?.smtp_username || '');
  const [SMTPPort, setSMTPPort] = useState(updateBrandData?.smtp_port || "");

  const { t,i18n } = useTranslation();
  useEffect(() => {
    const getDocuments = async () => {
      try {
        const response = await newRequest.get("/getAllmega_menu");
        const nameEnArray = response.data;
        setmegamenudropdown(nameEnArray);
      } catch (error) {
        // console.log(error);
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
      const response = await  newRequest.put(`/updateemailsetting/${updateBrandData?.id}`,  {
        smtp_encryption: SMTPEncryption || "TSL",
        emailmethod: EmailMethod || "SMTP",
        emailfrom: EmailSentFrom,
        smtp_host: SMTPHOST,
        smtp_password: SMTPpassword,
        smtp_username: SMTPUsername,
        smtp_port: SMTPPort,
        status: 1,
      });
      // console.log(response);

      toast.success(
        `${('Email Configure')} ${EmailSentFrom} ${('has been')} ${t('Updated Successfully')}..`,
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
                <h2 className={`text-secondary font-sans font-semibold text-2xl ${i18n.language === "ar" ? "text-end" : "text-start"}`}>
                  {t("Edit")} {t("Email Configure")}
                </h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start" }`}>
                      {t("Email Sent From")}
                    </label>
                    <input
                      type="text"
                      id="EmailSentFrom"
                      value={EmailSentFrom}
                      onChange={(e) => setEmailSentFrom(e.target.value)}
                      placeholder={`${t("Enter")} ${t("Email Sent From")}`}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start" }`}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="status" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start" }`}>
                      {t("Email Method")}
                    </label>
                    <select
                      id="status"
                      value={EmailMethod}
                      onChange={(e) => setEmailMethod(e.target.value)}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start" }`}
                    >
                      <option value="PHP">{t("PHP Mail")}</option>
                      <option value="SMTP">{t("SMTP Mail")}</option>
                    </select>
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start" }`}>
                      {t("SMTP HOST")}
                    </label>
                    <input
                      type="text"
                      id="SMTPHOST"
                      value={SMTPHOST}
                      onChange={(e) => setSMTPHOST(e.target.value)}
                      placeholder={`${t("Enter")} ${t("SMTP HOST")}`}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start" }`}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="SMTPUsername" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start" }`}>
                      {t("SMTP Username")}
                    </label>
                    <input
                      type="text"
                      id="SMTPUsername"
                      value={SMTPUsername}
                      onChange={(e) => setSMTPUsername(e.target.value)}
                      placeholder={`${t("Enter")} ${t("SMTP Username")}`}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start" }`}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start" }`}>
                      {t("SMTP Password")}
                    </label>
                    <input
                      type="text"
                      id="SMTPpassword"
                      value={SMTPpassword}
                      onChange={(e) => setSMTPpassword(e.target.value)}
                      placeholder={`${t("Enter")} ${t("SMTP Password")}`}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start" }`}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="SMTPPort" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start" }`}>
                      {t("SMTP Port")}
                    </label>
                    <input
                      type="number"
                      id="SMTPPort"
                      value={SMTPPort}
                      onChange={(e) => setSMTPPort(e.target.value)}
                      placeholder={`${t("Enter")} ${t("SMTP Port")}`}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start" }`}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="status" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start" }`}>
                      {t("SMTP Encryption")}
                    </label>
                    <select
                      id="status"
                      value={SMTPEncryption}
                      onChange={(e) => setSMTPEncryption(e.target.value)}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start" }`}
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
                    {t("Update")} {t("Email Configure")}
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

export default Updataemailsetting;