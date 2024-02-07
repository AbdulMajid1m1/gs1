import React, { useContext, useState } from "react";
import { SnackbarContext } from "../../../../Contexts/SnackbarContext";
import newRequest from "../../../../utils/userRequest";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import gtrackRequest from "../../../../utils/gtrackRequest";
import { gtrackUrl } from "../../../../utils/config";

const FormDataPopup = ({ data, showPopup, togglePopup, barcode }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { t, i18n } = useTranslation();
  const memberDataString = sessionStorage.getItem('memberData');
  const memberData = JSON.parse(memberDataString);
  // console.log(memberData);
  const resetSnakeBarMessages = () => {
    setError(null);
    setMessage(null);
  };
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value.trim());
    console.log(e.target.value);
  };
  const { openSnackbar } = useContext(SnackbarContext);

  const [recipeData, setRecipeData] = useState({
    logo: "",
    title: "",
    description: "",
    ingredients: "",
    LinkType: "",
    GTIN: barcode,
    companyId: memberData?.companyID,
  });

  //  body values for product contents insert api
  const [productRecallData, setProductRecalltData] = useState({
    ProductRecall: "",
    LinkType: "",
    Lang: "",
    TargetURL: "",
    GTIN: barcode,
    ExpiryDate: "",
    companyId: memberData?.companyID,
  });

  const [promotionalOffersData, setPromotionalOffersData] = useState({
    PromotionalOffers: "",
    LinkType: "",
    Lang: "",
    TargetURL: "",
    GTIN: barcode,
    ExpiryDate: "",
    price: "",
    banner: "",
    companyId: memberData?.companyID,
  });

  const [productLocationOriginData, setProductLocationOriginData] = useState({
    ProductLocationOrigin: "",
    LinkType: "",
    Lang: "",
    TargetURL: "",
    GTIN: barcode,
    ExpiryDate: "",
    companyId: memberData?.companyID,
  });

  const [productContentsData, setProductContentsData] = useState({
    ProductAllergenInformation: "",
    ProductNutrientsInformation: "",
    GTIN: barcode,
    LinkType: "",
    Batch: "",
    Expiry: "",
    Serial: "",
    ManufacturingDate: "",
    bestBeforeDate: "",
    GLNIDFrom: "",
    unitPrice: "",
    ingredients: "",
    allergen_info: "",
    calories: "",
    sugar: "",
    salt: "",
    fat: "",
    companyId: memberData?.companyID,
  });

  const [pkgCompositionData, setPkgCompositionData] = useState({
    logo: "",
    title: "",
    consumerProductVariant: "",
    packaging: "",
    material: "",
    recyclability: "",
    productOwner: "",
    LinkType: "",
    GTIN: barcode,
    brand_owner: "",
    companyId: memberData?.companyID,
  });

  const [productLeafletData, setProductLeafletData] = useState({
    ProductLeafletInformation: "",
    Lang: "",
    LinkType: "",
    TargetURL: "",
    GTIN: barcode,
    PdfDoc: "",
    companyId: memberData?.companyID,
  });

  const [safetyInformationData, setSafetyInformationData] = useState({
    SafetyDetailedInformation: "",
    LinkType: "",
    Lang: "",
    TargetURL: "",
    GTIN: barcode,
    logo: "",
    companyName: "",
    process: "",
    companyId: memberData?.companyID,
  });

  const resetState = () => {
    setRecipeData({
      logo: "",
      title: "",
      description: "",
      ingredients: "",
      LinkType: "",
      GTIN: barcode,
      companyId: memberData?.companyID,
    });

    setProductRecalltData({
      ProductRecall: "",
      LinkType: "",
      Lang: "",
      TargetURL: "",
      GTIN: barcode,
      ExpiryDate: "",
      companyId: memberData?.companyID,
    });

    setPromotionalOffersData({
      PromotionalOffers: "",
      LinkType: "",
      Lang: "",
      TargetURL: "",
      GTIN: barcode,
      ExpiryDate: "",
      price: "",
      banner: "",
      companyId: memberData?.companyID,
    });

    setProductLocationOriginData({
      ProductLocationOrigin: "",
      LinkType: "",
      Lang: "",
      TargetURL: "",
      GTIN: barcode,
      ExpiryDate: "",
    });

    setProductContentsData({
      ProductAllergenInformation: "",
      ProductNutrientsInformation: "",
      GTIN: barcode,
      LinkType: "",
      Batch: "",
      Expiry: "",
      Serial: "",
      ManufacturingDate: "",
      bestBeforeDate: "",
      GLNIDFrom: "",
      unitPrice: "",
      ingredients: "",
      allergen_info: "",
      calories: "",
      sugar: "",
      salt: "",
      fat: "",
      companyId: memberData?.companyID,
    });

    setPkgCompositionData({
      logo: "",
      title: "",
      consumerProductVariant: "",
      packaging: "",
      material: "",
      recyclability: "",
      productOwner: "",
      LinkType: "",
      GTIN: barcode,
      brand_owner: "",
      companyId: memberData?.companyID,
    });

    setProductLeafletData({
      ProductLeafletInformation: "",
      Lang: "",
      LinkType: "",
      TargetURL: "",
      GTIN: barcode,
      PdfDoc: "",
      companyId: memberData?.companyID,
    });

    setSafetyInformationData({
      SafetyDetailedInformation: "",
      LinkType: "",
      Lang: "",
      TargetURL: "",
      GTIN: barcode,
      logo: "",
      companyName: "",
      process: "",
      companyId: memberData?.companyID,
    });
  };

  const handleInputChange = (event, option) => {
    // to handle input change

    const target = event.target;
    const value = target.type === "file" ? target.files[0] : target.value;
    if (target.type === "file") {
      console.log(target.files[0]);
    }
    const name = target.name;
    switch (option) {
      case "Recipe":
        setRecipeData({
          ...recipeData,
          [name]: value,
        });
        break;
      case "Product Recall":
        setProductRecalltData({
          ...productRecallData,
          [name]: value,
        });
        break;
      case "Promotional offers":
        setPromotionalOffersData({
          ...promotionalOffersData,
          [name]: value,
        });
        break;

      case "Product Location of Origin":
        setProductLocationOriginData({
          ...productLocationOriginData,
          [name]: value,
        });
        break;

      case "Product Contents":
        setProductContentsData({
          ...productContentsData,
          [name]: value,
        });
        break;
      case "Packaging Composition":
        setPkgCompositionData({
          ...pkgCompositionData,
          [name]: value,
        });
        break;
      case "Electronic Leaflets":
        setProductLeafletData({
          ...productLeafletData,
          [name]: value,
        });
        break;
      case "Safety Information":
        setSafetyInformationData({
          ...safetyInformationData,
          [name]: value,
        });
        break;
      default:
        console.log("Invalid option");
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response;
    const datasets = {
      "Recipe": recipeData,
      "Product Recall": productRecallData,
      "Promotional offers": promotionalOffersData,
      "Product Location of Origin": productLocationOriginData,
      "Product Contents": productContentsData,
      "Packaging Composition": pkgCompositionData,
      "Electronic Leaflets": productLeafletData,
      "Safety Information": safetyInformationData,
    };

    const endpoints = {
      "Recipe": 'http://localhost:7000/api/insertRecipeData',
      "Product Recall": gtrackUrl + "/insertProductRecallData",
      "Promotional offers": gtrackUrl + "/insertPromotionalOffersData",
      "Product Location of Origin": gtrackUrl + "/insertProductLocationOriginData",
      "Product Contents": gtrackUrl + "/insertProductContentsData",
      "Packaging Composition": gtrackUrl + "/insertPkgCompositionData",
      "Electronic Leaflets": gtrackUrl + "/insertProductLeafletData",
      "Safety Information": gtrackUrl + "/insertProductSafetyInformationData",
    };

    let dataToSend;
    switch (selectedOption) {
      // If the endpoint requires FormData (e.g., it needs to send a file)
      case "Recipe":
      case "Safety Information":
      case "Packaging Composition":
      case "Electronic Leaflets":
        let formData = new FormData();
        for (let key in datasets[selectedOption]) {
          formData.append(key, datasets[selectedOption][key]);
        }
        dataToSend = formData;
        break;

      // If the endpoint can handle plain JSON data
      case "Product Location of Origin":
      case "Product Contents":
      case "Promotional offers":
      case "Product Recall":

      default:
        dataToSend = datasets[selectedOption];
    }

    try {
      response = await newRequest.post(endpoints[selectedOption], dataToSend);
      console.log(response.data);
      toast.success(response.data.message || "Data inserted successfully", "success");
      resetState();
      event.target.reset();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error inserting data", "error");
    }
  };

  return (
    showPopup && (
      <>
        <div className="digital-popup-overlay z-50" onClick={togglePopup}></div>
        <div className="digital-popup-large">
          <div className="digital-popup-header">
            <h1 className="digital-popup-title font-sans text-secondary font-semibold">{t('Digital Link')}</h1>
            <button className="digital-popup-close" onClick={togglePopup}>
              X
            </button>
          </div>

          <div className="digital-header-gtincenter">
            <p className="digital-header-gtin px-4 rounded-sm">GTIN # {barcode}</p>
          </div>

          <div className="digital-header-line"></div>




          <div className="digital-popup-form">
            <form onSubmit={handleSubmit} id="gtin-form" name="gtin-form">
              <div className="digital-form-selected">
                <label htmlFor="select">
                  {t('Digital Information types')}{" "}
                  <span className="text-red-600">*</span>
                </label>
                <select type="text" id="select" className="digital-form-input" onChange={handleSelectChange}>
                  <option value=""> {t('Select Types')}</option>
                  {data.map((item) => (
                    <option key={item.ID} value={item.TypeDescription}>
                      {item.TypeDescription}
                    </option>
                  ))}
                </select>
              </div>

              {selectedOption === "Recipe" ? (
                <div>
                  {/* Recipe inputs */}
                  <div className="digital-digital-form-row">
                    <label htmlFor="logo" className="digital-form-label">
                      {t('Logo')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      name="logo"
                      id="logo"
                      className="digital-form-input"
                      required
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="title" className="digital-form-label">
                      {t('Title')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="digital-form-input"
                      placeholder={`${t('Title')}`}
                      required
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="description" className="digital-form-label">
                      {t('Description')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="digital-form-input"
                      placeholder={`${t('Description')}`}
                      required
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="ingredients" className="digital-form-label">
                      {t('Ingredients')}<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="ingredients"
                      id="ingredients"
                      className="digital-form-input"
                      placeholder={`${t('Ingredients')}`}
                      required
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="LinkType" className="digital-form-label">
                      {t('LinkType')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="LinkType"
                      id="LinkType"
                      className="digital-form-input"
                      placeholder={`${t('LinkType')}`}
                      required
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>
                </div>
              ) : selectedOption === "Product Recall" ? (
                <div>
                  {/* Product Content inputs */}
                  <div className="digital-form-row">
                    <label htmlFor="ProductRecall" className="digital-form-label">
                      {t('Product Recall')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="ProductRecall"
                      id="ProductRecall"
                      className="digital-form-input"
                      placeholder={`${t('Product Recall')}`}
                      required
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="LinkType" className="digital-form-label">
                      {t('Link Type')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="LinkType"
                      id="LinkType"
                      className="digital-form-input"
                      placeholder={`${t('Link Type')}`}
                      required
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="Lang" className="digital-form-label">
                      {t('Lang')}<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="Lang"
                      id="Lang"
                      className="digital-form-input"
                      placeholder={`${t('Lang')}`}
                      required
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="TargetURL" className="digital-form-label">
                      {t('Target URL')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="TargetURL"
                      id="TargetURL"
                      className="digital-form-input"
                      placeholder={`${t('Target URL')}`}
                      required
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="ExpiryDate" className="digital-form-label">
                      {t('Expiry Date')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      name="ExpiryDate"
                      id="ExpiryDate"
                      className="digital-form-input"
                      placeholder={`${t('Expiry Date')}`}
                      required
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>
                </div>
              ) : selectedOption === "Promotional offers" ? (
                <div>
                  {/* Promotional offers inputs */}
                  <div className="digital-form-row">
                    <label htmlFor="PromotionalOffers" className="digital-form-label">
                      {t('Promotional Offers')}<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="PromotionalOffers"
                      name="PromotionalOffers"
                      className="digital-form-input"
                      placeholder={`${t('Promotional Offers')}`}
                      required
                      onChange={(e) =>
                        handleInputChange(e, "Promotional offers")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="LinkType" className="digital-form-label">
                      {t('Link Type')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="LinkType"
                      name="LinkType"
                      className="digital-form-input"
                      placeholder={`${t('Link Type')}`}
                      required
                      onChange={(e) =>
                        handleInputChange(e, "Promotional offers")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="Lang" className="digital-form-label">
                      {t('Lang')}<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="Lang"
                      name="Lang"
                      className="digital-form-input"
                      placeholder={`${t('Lang')}`}
                      required
                      onChange={(e) =>
                        handleInputChange(e, "Promotional offers")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="TargetURL" className="digital-form-label">
                      {t('Target URL')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="TargetURL"
                      name="TargetURL"
                      className="digital-form-input"
                      placeholder={`${t('Target URL')}`}
                      required
                      onChange={(e) =>
                        handleInputChange(e, "Promotional offers")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="ExpiryDate" className="digital-form-label">
                      {t('Expiry Date')}<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      id="ExpiryDate"
                      className="digital-form-input"
                      name="ExpiryDate"
                      required
                      onChange={(e) =>
                        handleInputChange(e, "Promotional offers")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="price" className="digital-form-label">
                      {t('Price')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      id="price"
                      name="price"
                      className="digital-form-input"
                      placeholder={`${t('Price')}`}
                      required
                      onChange={(e) =>
                        handleInputChange(e, "Promotional offers")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="banner" className="digital-form-label">
                      {t('Banner')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="banner"
                      name="banner"
                      className="digital-form-input"
                      placeholder={`${t('Banner')}`}
                      required
                      onChange={(e) =>
                        handleInputChange(e, "Promotional offers")
                      }
                    />
                  </div>
                </div>
              ) : selectedOption === "Product Location of Origin" ? (
                <div>
                  <div className="digital-form-row">
                    <label htmlFor="ProductLocationOrigin" className="digital-form-label">
                      {t('Product Location Origin')}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="ProductLocationOrigin"
                      name="ProductLocationOrigin"
                      className="digital-form-input"
                      placeholder={`${t('Product Location Origin')}`}
                      required
                      onChange={(e) =>
                        handleInputChange(e, "Product Location of Origin")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="Lang" className="digital-form-label">
                      {t('Lang')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="Lang"
                      name="Lang"
                      className="digital-form-input"
                      placeholder={`${t('Lang')}`}
                      required
                      onChange={(e) =>
                        handleInputChange(e, "Product Location of Origin")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="LinkType" className="digital-form-label">
                      {t('Link Type')}<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="LinkType"
                      name="LinkType"
                      className="digital-form-input"
                      placeholder={`${t('Link Type')}`}
                      required
                      onChange={(e) =>
                        handleInputChange(e, "Product Location of Origin")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="TargetURL" className="digital-form-label">
                      {t('Target URL')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="TargetURL"
                      name="TargetURL"
                      className="digital-form-input"
                      placeholder={`${t('Target URL')}`}
                      required
                      onChange={(e) =>
                        handleInputChange(e, "Product Location of Origin")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="ExpiryDate" className="digital-form-label">
                      {t('Expiry Date')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      id="ExpiryDate"
                      className="digital-form-input"
                      name="ExpiryDate"
                      required
                      onChange={(e) =>
                        handleInputChange(e, "Product Location of Origin")
                      }
                    />
                  </div>
                </div>
              ) : selectedOption === "Product Contents" ? (
                <div>
                  {/* Product Allergen Information */}
                  <div className="digital-form-row">
                    <label htmlFor="ProductAllergenInformation" className="digital-form-label">
                      {t('Product Allergen Information')}{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="ProductAllergenInformation"
                      name="ProductAllergenInformation"
                      className="digital-form-input"
                      placeholder={`${t('Product Allergen Information')}`}
                      required
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Product Nutrients Information */}
                  <div className="digital-form-row">
                    <label htmlFor="ProductNutrientsInformation" className="digital-form-label">
                      {t('Product Nutrients Information')}{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="digital-form-input"
                      id="ProductNutrientsInformation"
                      name="ProductNutrientsInformation"
                      required
                      placeholder={`${t('Product Nutrients Information')}`}
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="LinkType" className="digital-form-label">
                      {t('Link Type')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="LinkType"
                      className="digital-form-input"
                      name="LinkType"
                      placeholder={`${t('Link Type')}`}
                      required
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Batch */}
                  <div className="digital-form-row">
                    <label htmlFor="Batch" className="digital-form-label">
                      {t('Batch')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="Batch"
                      name="Batch"
                      className="digital-form-input"
                      placeholder={`${t('Batch')}`}
                      required
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Expiry */}
                  <div className="digital-form-row">
                    <label htmlFor="Expiry" className="digital-form-label">
                      {t('Expiry')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="Expiry"
                      className="digital-form-input"
                      name="Expiry"
                      placeholder={`${t('Expiry')}`}
                      required
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Serial */}
                  <div className="digital-form-row">
                    <label htmlFor="Serial" className="digital-form-label">
                      {t('Serial')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="Serial"
                      className="digital-form-input"
                      name="Serial"
                      placeholder={`${t('Serial')}`}
                      required
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* ManufacturingDate */}
                  <div className="digital-form-row">
                    <label htmlFor="ManufacturingDate" className="digital-form-label">
                      {t('Manufacturing Date')}  <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      id="ManufacturingDate"
                      className="digital-form-input"
                      name="ManufacturingDate"
                      required
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Best Before Date */}
                  <div className="digital-form-row">
                    <label htmlFor="bestBeforeDate" className="digital-form-label">
                      {t('best Before Date')}  <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      id="bestBeforeDate"
                      className="digital-form-input"
                      name="bestBeforeDate"
                      required
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>
                  {/* GLNIDFrom */}
                  <div className="digital-form-row">
                    <label htmlFor="GLNIDFrom" className="digital-form-label">
                      {t('GLN ID From')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="GLNIDFrom"
                      className="digital-form-input"
                      name="GLNIDFrom"
                      placeholder={`${t('GLN ID From')}`}
                      required
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Unit Price */}
                  <div className="digital-form-row">
                    <label htmlFor="unitPrice" className="digital-form-label">
                      {t('unit Price')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      id="unitPrice"
                      name="unitPrice"
                      className="digital-form-input"
                      placeholder={`${t('unit Price')}`}
                      required
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Ingredients */}
                  <div className="digital-form-row">
                    <label htmlFor="ingredients" className="digital-form-label">
                      {t('Ingredients')} <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="ingredients"
                      name="ingredients"
                      className="digital-form-input"
                      placeholder={`${t('Ingredients')}`}
                      required
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Allergen Info */}
                  <div className="digital-form-row">
                    <label htmlFor="allergen_info" className="digital-form-label">
                      {t('Allergen Info')} <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="allergen_info"
                      name="allergen_info"
                      className="digital-form-input"
                      placeholder={`${t('Allergen Info')}`}
                      required
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Calories */}
                  <div className="digital-form-row">
                    <label htmlFor="calories" className="digital-form-label">
                      {t('calories')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="calories"
                      name="calories"
                      className="digital-form-input"
                      placeholder={`${t('calories')}`}
                      required
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Sugar */}
                  <div className="digital-form-row">
                    <label htmlFor="sugar" className="digital-form-label">
                      {t('sugar')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="sugar"
                      name="sugar"
                      className="digital-form-input"
                      placeholder={`${t('sugar')}`}
                      required
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Salt */}
                  <div className="digital-form-row">
                    <label htmlFor="salt" className="digital-form-label">
                      {t('salt')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="salt"
                      className="digital-form-input"
                      name="salt"
                      placeholder={`${t('salt')}`}
                      required
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Fat */}
                  <div className="digital-form-row">
                    <label htmlFor="fat" className="digital-form-label">
                      {t('fat')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="fat"
                      className="digital-form-input"
                      name="fat"
                      placeholder={`${t('fat')}`}
                      required
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>
                </div>
              ) : selectedOption === "Packaging Composition" ? (
                <div>
                  {/* Logo */}
                  <div className="digital-form-row">
                    <label htmlFor="logo" className="digital-form-label">
                      {t('Logo')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      id="logo"
                      className="digital-form-input"
                      name="logo"
                      required
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  {/* Title */}
                  <div className="digital-form-row">
                    <label htmlFor="title" className="digital-form-label">
                      {t('Title')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="digital-form-input"
                      placeholder={`${t('Title')}`}
                      required
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  {/* Consumer Product Variant */}
                  <div className="digital-form-row">
                    <label htmlFor="consumerProductVariant" className="digital-form-label">
                      {" "}{t('Consumer Product Variant')}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="consumerProductVariant"
                      name="consumerProductVariant"
                      className="digital-form-input"
                      placeholder={`${t('Consumer Product Variant')}`}
                      required
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  {/* Packaging */}
                  <div className="digital-form-row">
                    <label htmlFor="packaging" className="digital-form-label">
                      {t('Packaging')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="packaging"
                      name="packaging"
                      className="digital-form-input"
                      placeholder={`${t('Packaging')}`}
                      required
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  {/* Material */}
                  <div className="digital-form-row">
                    <label htmlFor="material" className="digital-form-label">
                      {t('Material')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="material"
                      className="digital-form-input"
                      name="material"
                      placeholder={`${t('Material')}`}
                      required
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  {/* Recyclability */}
                  <div className="digital-form-row">
                    <label htmlFor="recyclability" className="digital-form-label">
                      {t('Recyclability')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="recyclability"
                      className="digital-form-input"
                      name="recyclability"
                      placeholder={`${t('Recyclability')}`}
                      required
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  {/* Product Owner */}
                  <div className="digital-form-row">
                    <label htmlFor="productOwner" className="digital-form-label">
                      {t('Product Owner')}  <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="productOwner"
                      name="productOwner"
                      className="digital-form-input"
                      placeholder={`${t('Product Owner')}`}
                      required
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  {/* Link Type */}
                  <div className="digital-form-row">
                    <label htmlFor="LinkType" className="digital-form-label">
                      {t('Link Type')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="LinkType"
                      name="LinkType"
                      className="digital-form-input"
                      placeholder={`${t('Link Type')}`}
                      required
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="brand_owner" className="digital-form-label">
                      {t('Brand Owner')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="brand_owner"
                      name="brand_owner"
                      className="digital-form-input"
                      placeholder={`${t('Brand Owner')}`}
                      required
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>
                </div>
              ) : selectedOption === "Electronic Leaflets" ? (
                <div>
                  {/* Electronic Leaflets inputs */}
                  <div className="digital-form-row">
                    <label htmlFor="productLeaflet" className="digital-form-label">
                      {t('Product Leaflet Information')}
                    </label>
                    <input
                      type="text"
                      id="productLeaflet"
                      className="digital-form-input"
                      name="ProductLeafletInformation"
                      placeholder={`${t('Product Leaflet Information')}`}
                      required
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="lang" className="digital-form-label">
                      {t('Language')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="lang"
                      name="Lang"
                      className="digital-form-input"
                      placeholder={`${t('Language')}`}
                      required
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="linkType" className="digital-form-label">
                      {t('Link Type')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="linkType"
                      name="LinkType"
                      className="digital-form-input"
                      placeholder={`${t('Link Type')}`}
                      required
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="targetURL" className="digital-form-label">
                      {t('Target URL')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="targetURL"
                      className="digital-form-input"
                      name="TargetURL"
                      placeholder={`${t('Target URL')}`}
                      required
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="pdfDoc" className="digital-form-label">
                      {t('PDF Document')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      id="pdfDoc"
                      className="digital-form-input"
                      name="attachment"
                      required
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>
                </div>
              ) : selectedOption === "Safety Information" ? (
                <div>
                  {/* Safety Detailed Information inputs */}
                  <div className="digital-form-row">
                    <label htmlFor="safetyInformation" className="digital-form-label">
                      {t('Safety Detailed Information')}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="safetyInformation"
                      className="digital-form-input"
                      name="SafetyDetailedInformation"
                      placeholder={`${t('Safety Detailed Information')}`}
                      required
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="linkType" className="digital-form-label">
                      {t('Link Type')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="linkType"
                      name="LinkType"
                      className="digital-form-input"
                      placeholder={`${t('Link Type')}`}
                      required
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="lang" className="digital-form-label">
                      {t('Language')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="lang"
                      className="digital-form-input"
                      name="Lang"
                      placeholder={`${t('Language')}`}
                      required
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="targetURL" className="digital-form-label">
                      {t('Target URL')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="targetURL"
                      name="TargetURL"
                      className="digital-form-input"
                      placeholder={`${t('Target URL')}`}
                      required
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="logo" className="digital-form-label">
                      {t('Logo')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      id="logo"
                      name="logo"
                      className="digital-form-input"
                      required
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="companyName" className="digital-form-label">
                      {t('Company Name')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      className="digital-form-input"
                      placeholder={`${t('Company Name')}`}
                      required
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="process" className="digital-form-label">
                      {t('Process')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="process"
                      name="process"
                      className="digital-form-input"
                      placeholder={`${t('Process')}`}
                      required
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>
                </div>
              ) : null}


              <div className="footer-line"></div>

              <div className="popup-footer">
                <button className="popup-close bg-secondary hover:bg-primary" onClick={togglePopup}>
                  {t('Close')}
                </button>
                <button type="submit" className="bg-secondary hover:bg-primary text-white rounded-md cursor-pointer py-2 px-6" >
                  {t('Save')}
                </button>
              </div>
            </form>
          </div>


        </div>
      </>
    )
  );
};

export default FormDataPopup;
