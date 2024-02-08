import React, { useContext } from 'react'
import gtrackIcon from "../../../../Images/gtrackicons.png"
import { useState } from 'react';
import newRequest from '../../../../utils/userRequest';
import { SnackbarContext } from '../../../../Contexts/SnackbarContext';
import DataTable from '../../../../components/Datatable/Datatable';

const Miscellaneous = () => {
    const [selectedOption, setSelectedOption] = useState("customs-tariff");
    const [safetyInformation, setSafetyInformation] = useState([]);
    const [recipe, setRecipe] = useState([]);
    const [productContent, setProductContent] = useState([]);
    const [promotionalOffers, setPromotionalOffers] = useState([]);
    const [productLocationofOrigin, setProductLocationofOrigin] = useState([]);
    const [productRecall, setProductRecall] = useState([]);
    const [packagingComposition, setPackagingComposition] = useState([]);
    const [electronicLeaflets, setElectronicLeaflets] = useState([]);
    const { openSnackbar } = useContext(SnackbarContext);

    
    // get that sesstion storage data
    const getGtinData = sessionStorage.getItem("productData");
    const gtinData = JSON.parse(getGtinData);
    console.log(gtinData);

  //Digital Link Tab
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    
    switch (option) {
    //   case "Safety-Information":
    //     newRequest
    //       .get(`/getSafetyInformationByGtin/${gtinData}`)
    //       .then((response) => {
    //         console.log(response.data);
    //         setSafetyInformation(response.data);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         openSnackbar(
    //           err?.response?.data?.message ?? "something went wrong!",
    //           "error"
    //         );
    //         setSafetyInformation([]);
    //       });
    //     break;

    //   case "Promotional-Offers":
    //     newRequest
    //       .get(`/getPromotionalOffersByGtin/${gtinData}`)
    //       .then((response) => {
    //         console.log(response.data);
    //         setPromotionalOffers(response.data);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         openSnackbar(err?.response?.data?.message, "error");
    //         setPromotionalOffers([]);
    //       });
    //     break;

    //   case "Product-Contents":
    //     newRequest
    //       .get(`/getProductContentByGtin/${gtinData}`)
    //       .then((response) => {
    //         console.log(response.data);
    //         console.log("called");
    //         setProductContent(response.data);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         openSnackbar(err?.response?.data?.message, "error");
    //         setProductContent([]);
    //       });
    //     break;

     
      // Add more cases for other options
      default:
        break;
    }
  };


  const renderDataGrid = () => {
    switch (selectedOption) {
      case "customs-tariff":
        return (
         <div>
              <DataTable
                data={safetyInformation}
                title={"Customs Tariff"}
                secondaryColor="secondary"
                // columnsName={SafetyInformationColumn}
                checkboxSelection="disabled"
                // backButton={false}
                // dropDownOptions={[
                // {
                //     label: "Delete",
                //     icon: (
                //     <DeleteIcon fontSize="small" style={{ color: "#FF0032" }} />
                //     ),
                //     action: handleDelete,
                // },
                // ]}
            />
         </div>
        );

     
      case "Suggested-Retail-Price":
        return (
            <div>
            <DataTable
              data={safetyInformation}
              title={"Sugguest Retail Price"}
              secondaryColor="secondary"
              // columnsName={SafetyInformationColumn}
              checkboxSelection="disabled"
              // backButton={false}
              // dropDownOptions={[
              // {
              //     label: "Delete",
              //     icon: (
              //     <DeleteIcon fontSize="small" style={{ color: "#FF0032" }} />
              //     ),
              //     action: handleDelete,
              // },
              // ]}
          />
       </div>
        );

        case "Other-Importers":
        return (
            <div>
            <DataTable
              data={safetyInformation}
              title={"Other Importers"}
              secondaryColor="secondary"
              // columnsName={SafetyInformationColumn}
              checkboxSelection="disabled"
              // backButton={false}
              // dropDownOptions={[
              // {
              //     label: "Delete",
              //     icon: (
              //     <DeleteIcon fontSize="small" style={{ color: "#FF0032" }} />
              //     ),
              //     action: handleDelete,
              // },
              // ]}
          />
       </div>
        );
      // Add more cases for other options
      default:
        return null;
    }
  };


  return (
    <div className='flex justify-between gap-2 w-full'>
        <div className='w-[25%] flex flex-col gap-2 mt-3'>
            <span
                className={`bg-[#3b5998] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer 
                }`}
                onClick={() => handleOptionChange("customs-tariff")}
            >
            <img
                src={gtrackIcon}
                className="w-5 h-5 ml-1"
                alt=""
            />
                Customs Tariff
            </span>
            
            <span
                className={`bg-[#00acee] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "Suggested-Retail-Price" ? "bg-yellow-500" : ""
                }`}
                onClick={() => handleOptionChange("Suggested-Retail-Price")}
            >
            <img
                src={gtrackIcon}
                className="w-5 h-5 ml-1"
                alt=""
            />
                Suggested Retail Price
            </span>
            
            <span
                className={`bg-[#0072b1] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "Other-Importers" ? "bg-yellow-500" : ""
                }`}
                onClick={() => handleOptionChange("Other-Importers")}
            >
            <img src={gtrackIcon} className="w-5 h-5 ml-1" alt="" />
                Other Importers
            </span>

        </div>

        {/* All Datagird Display on the right side */}
        <div className="sm:w-[75%] w-full">{renderDataGrid()}</div>

    </div>
  )
}

export default Miscellaneous