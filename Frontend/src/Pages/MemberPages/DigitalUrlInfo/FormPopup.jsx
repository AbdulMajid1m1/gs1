import React, { useContext, useState } from "react";
import { SnackbarContext } from "../../../Contexts/SnackbarContext";
import newRequest from "../../../utils/userRequest";
import { toast } from "react-toastify";

const FormPopup = ({ data, showPopup, togglePopup, barcode }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
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
  });

  //  body values for product contents insert api
  const [productRecallData, setProductRecalltData] = useState({
    ProductRecall: "",
    LinkType: "",
    Lang: "",
    TargetURL: "",
    GTIN: barcode,
    ExpiryDate: "",
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
  });

  const [productLocationOriginData, setProductLocationOriginData] = useState({
    ProductLocationOrigin: "",
    LinkType: "",
    Lang: "",
    TargetURL: "",
    GTIN: barcode,
    ExpiryDate: "",
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
  });

  const [productLeafletData, setProductLeafletData] = useState({
    ProductLeafletInformation: "",
    Lang: "",
    LinkType: "",
    TargetURL: "",
    GTIN: barcode,
    PdfDoc: "",
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
  });

  const resetState = () => {
    setRecipeData({
      logo: "",
      title: "",
      description: "",
      ingredients: "",
      LinkType: "",
      GTIN: barcode,
    });

    setProductRecalltData({
      ProductRecall: "",
      LinkType: "",
      Lang: "",
      TargetURL: "",
      GTIN: barcode,
      ExpiryDate: "",
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
    });

    setProductLeafletData({
      ProductLeafletInformation: "",
      Lang: "",
      LinkType: "",
      TargetURL: "",
      GTIN: barcode,
      PdfDoc: "",
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
      Recipe: recipeData,
      "Product Recall": productRecallData,
      "Promotional offers": promotionalOffersData,
      "Product Location of Origin": productLocationOriginData,
      "Product Contents": productContentsData,
      "Packaging Composition": pkgCompositionData,
      "Electronic Leaflets": productLeafletData,
      "Safety Information": safetyInformationData,
    };

    const endpoints = {
      Recipe: "http://gs1ksa.org:7000/api/insertRecipeData",
      "Product Recall": "http://gs1ksa.org:7000/api/insertProductRecallData",
      "Promotional offers": "http://gs1ksa.org:7000/api/insertPromotionalOffersData",
      "Product Location of Origin": "http://gs1ksa.org:7000/api/insertProductLocationOriginData",
      "Product Contents": "http://gs1ksa.org:7000/api/insertProductContentsData",
      "Packaging Composition": "http://gs1ksa.org:7000/api/insertPkgCompositionData",
      "Electronic Leaflets": "http://gs1ksa.org:7000/api/insertProductLeafletData",
      "Safety Information": "http://gs1ksa.org:7000/api/insertProductSafetyInformationData",
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
      // openSnackbar(response.data.message, "success");
      toast.success(response.data.message, "success");
      resetState();
      event.target.reset();
    } catch (error) {
      console.log(error);
      // openSnackbar(error?.response?.data?.message, "error");
      toast.error(error?.response?.data?.message, "error");
    }
  };

  return (
    showPopup && (
      <>
        <div className="digital-popup-overlay" onClick={togglePopup}></div>
        <div className="digital-popup-large">
          <div className="digital-popup-header">
            <h1 className="digital-popup-title font-sans text-secondary font-semibold">Digital Link</h1>
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
                  Digital Information types{" "}
                  <span className="text-red-600">*</span>
                </label>
                <select type="text" id="select"   className="digital-form-input" onChange={handleSelectChange}>
                  <option value="">Select Types</option>
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
                      logo <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      name="logo"
                      id="logo"
                      className="digital-form-input"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="title" className="digital-form-label">
                      title <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="digital-form-input"
                      placeholder="title"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="description" className="digital-form-label">
                      Description <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="digital-form-input"
                      placeholder="Description"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="ingredients" className="digital-form-label">
                      Ingredients <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="ingredients"
                      id="ingredients"
                      className="digital-form-input"
                      placeholder="Ingredients"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="LinkType" className="digital-form-label">
                      LinkType <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="LinkType"
                      id="LinkType"
                      className="digital-form-input"
                      placeholder="LinkType"
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
                      ProductRecall <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="ProductRecall"
                      id="ProductRecall"
                      className="digital-form-input"
                      placeholder="ProductRecall"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="LinkType" className="digital-form-label">
                      LinkType <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="LinkType"
                      id="LinkType"
                      className="digital-form-input"
                      placeholder="LinkType"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="Lang" className="digital-form-label">
                      Lang <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="Lang"
                      id="Lang"
                      className="digital-form-input"
                      placeholder="Lang"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="TargetURL" className="digital-form-label">
                      TargetURL <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="TargetURL"
                      id="TargetURL"
                      className="digital-form-input"
                      placeholder="TargetURL"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="ExpiryDate" className="digital-form-label">
                      ExpiryDate <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      name="ExpiryDate"
                      id="ExpiryDate"
                      className="digital-form-input"
                      placeholder="Date"
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
                      PromotionalOffers <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="PromotionalOffers"
                      name="PromotionalOffers"
                      className="digital-form-input"
                      placeholder="PromotionalOffers"
                      onChange={(e) =>
                        handleInputChange(e, "Promotional offers")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="LinkType" className="digital-form-label">
                      LinkType <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="LinkType"
                      name="LinkType"
                      className="digital-form-input"
                      placeholder="LinkType"
                      onChange={(e) =>
                        handleInputChange(e, "Promotional offers")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="Lang" className="digital-form-label">
                      Lang <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="Lang"
                      name="Lang"
                      className="digital-form-input"
                      placeholder="Lang"
                      onChange={(e) =>
                        handleInputChange(e, "Promotional offers")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="TargetURL" className="digital-form-label">
                      TargetURL <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="TargetURL"
                      name="TargetURL"
                      className="digital-form-input"
                      placeholder="TargetURL"
                      onChange={(e) =>
                        handleInputChange(e, "Promotional offers")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="ExpiryDate" className="digital-form-label">
                      ExpiryDate <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      id="ExpiryDate"
                      className="digital-form-input"
                      name="ExpiryDate"
                      onChange={(e) =>
                        handleInputChange(e, "Promotional offers")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="price" className="digital-form-label">
                      Price <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      id="price"
                      name="price"
                      className="digital-form-input"
                      placeholder="price"
                      onChange={(e) =>
                        handleInputChange(e, "Promotional offers")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="banner" className="digital-form-label">
                      Banner <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="banner"
                      name="banner"
                      className="digital-form-input"
                      placeholder="banner"
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
                      ProductLocationOrigin{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="ProductLocationOrigin"
                      name="ProductLocationOrigin"
                      className="digital-form-input"
                      placeholder="ProductLocationOrigin"
                      onChange={(e) =>
                        handleInputChange(e, "Product Location of Origin")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="Lang" className="digital-form-label">
                      Lang <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="Lang"
                      name="Lang"
                      className="digital-form-input"
                      placeholder="Lang"
                      onChange={(e) =>
                        handleInputChange(e, "Product Location of Origin")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="LinkType" className="digital-form-label">
                      LinkType <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="LinkType"
                      name="LinkType"
                      className="digital-form-input"
                      placeholder="LinkType"
                      onChange={(e) =>
                        handleInputChange(e, "Product Location of Origin")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="TargetURL" className="digital-form-label">
                      TargetURL <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="TargetURL"
                      name="TargetURL"
                      className="digital-form-input"
                      placeholder="TargetURL"
                      onChange={(e) =>
                        handleInputChange(e, "Product Location of Origin")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="ExpiryDate" className="digital-form-label">
                      ExpiryDate <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      id="ExpiryDate"
                      className="digital-form-input"
                      name="ExpiryDate"
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
                      Product Allergen Information{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="ProductAllergenInformation"
                      name="ProductAllergenInformation"
                      className="digital-form-input"
                      placeholder="Product Allergen Information"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Product Nutrients Information */}
                  <div className="digital-form-row">
                    <label htmlFor="ProductNutrientsInformation" className="digital-form-label">
                      Product Nutrients Information{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="digital-form-input"
                      id="ProductNutrientsInformation"
                      name="ProductNutrientsInformation"
                      placeholder="Product Nutrients Information"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="LinkType" className="digital-form-label">
                      LinkType <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="LinkType"
                      className="digital-form-input"
                      name="LinkType"
                      placeholder="LinkType"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Batch */}
                  <div className="digital-form-row">
                    <label htmlFor="Batch" className="digital-form-label">
                      Batch <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="Batch"
                      name="Batch"
                      className="digital-form-input"
                      placeholder="Batch"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Expiry */}
                  <div className="digital-form-row">
                    <label htmlFor="Expiry" className="digital-form-label">
                      Expiry <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="Expiry"
                      className="digital-form-input"
                      name="Expiry"
                      placeholder="Expiry"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Serial */}
                  <div className="digital-form-row">
                    <label htmlFor="Serial" className="digital-form-label">
                      Serial <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="Serial"
                      className="digital-form-input"
                      name="Serial"
                      placeholder="Serial"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* ManufacturingDate */}
                  <div className="digital-form-row">
                    <label htmlFor="ManufacturingDate" className="digital-form-label">
                      Manufacturing Date <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      id="ManufacturingDate"
                      className="digital-form-input"
                      name="ManufacturingDate"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Best Before Date */}
                  <div className="digital-form-row">
                    <label htmlFor="bestBeforeDate" className="digital-form-label">
                      Best Before Date <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      id="bestBeforeDate"
                      className="digital-form-input"
                      name="bestBeforeDate"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>
                  {/* GLNIDFrom */}
                  <div className="digital-form-row">
                    <label htmlFor="GLNIDFrom" className="digital-form-label">
                      GLN ID From <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="GLNIDFrom"
                      className="digital-form-input"
                      name="GLNIDFrom"
                      placeholder="GLN ID From"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Unit Price */}
                  <div className="digital-form-row">
                    <label htmlFor="unitPrice" className="digital-form-label">
                      Unit Price <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      id="unitPrice"
                      name="unitPrice"
                      className="digital-form-input"
                      placeholder="Unit Price"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Ingredients */}
                  <div className="digital-form-row">
                    <label htmlFor="ingredients" className="digital-form-label">
                      Ingredients <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="ingredients"
                      name="ingredients"
                      className="digital-form-input"
                      placeholder="Ingredients"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Allergen Info */}
                  <div className="digital-form-row">
                    <label htmlFor="allergen_info" className="digital-form-label">
                      Allergen Info <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="allergen_info"
                      name="allergen_info"
                      className="digital-form-input"
                      placeholder="Allergen Info"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Calories */}
                  <div className="digital-form-row">
                    <label htmlFor="calories" className="digital-form-label">
                      Calories <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="calories"
                      name="calories"
                      className="digital-form-input"
                      placeholder="Calories"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Sugar */}
                  <div className="digital-form-row">
                    <label htmlFor="sugar" className="digital-form-label">
                      Sugar <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="sugar"
                      name="sugar"
                      className="digital-form-input"
                      placeholder="Sugar"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Salt */}
                  <div className="digital-form-row">
                    <label htmlFor="salt" className="digital-form-label">
                      Salt <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="salt"
                      className="digital-form-input"
                      name="salt"
                      placeholder="Salt"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Fat */}
                  <div className="digital-form-row">
                    <label htmlFor="fat" className="digital-form-label">
                      Fat <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="fat"
                      className="digital-form-input"
                      name="fat"
                      placeholder="Fat"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>
                </div>
              ) : selectedOption === "Packaging Composition" ? (
                <div>
                  {/* Logo */}
                  <div className="digital-form-row">
                    <label htmlFor="logo" className="digital-form-label">
                      Logo <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      id="logo"
                      className="digital-form-input"
                      name="logo"
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  {/* Title */}
                  <div className="digital-form-row">
                    <label htmlFor="title" className="digital-form-label">
                      Title <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="digital-form-input"
                      placeholder="Title"
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  {/* Consumer Product Variant */}
                  <div className="digital-form-row">
                    <label htmlFor="consumerProductVariant" className="digital-form-label">
                      Consumer Product Variant{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="consumerProductVariant"
                      name="consumerProductVariant"
                      className="digital-form-input"
                      placeholder="Consumer Product Variant"
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  {/* Packaging */}
                  <div className="digital-form-row">
                    <label htmlFor="packaging" className="digital-form-label">
                      Packaging <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="packaging"
                      name="packaging"
                      className="digital-form-input"
                      placeholder="Packaging"
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  {/* Material */}
                  <div className="digital-form-row">
                    <label htmlFor="material" className="digital-form-label">
                      Material <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="material"
                      className="digital-form-input"
                      name="material"
                      placeholder="Material"
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  {/* Recyclability */}
                  <div className="digital-form-row">
                    <label htmlFor="recyclability" className="digital-form-label">
                      Recyclability <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="recyclability"
                      className="digital-form-input"
                      name="recyclability"
                      placeholder="Recyclability"
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  {/* Product Owner */}
                  <div className="digital-form-row">
                    <label htmlFor="productOwner" className="digital-form-label">
                      Product Owner <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="productOwner"
                      name="productOwner"
                      className="digital-form-input"
                      placeholder="Product Owner"
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  {/* Link Type */}
                  <div className="digital-form-row">
                    <label htmlFor="LinkType" className="digital-form-label">
                      Link Type <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="LinkType"
                      name="LinkType"
                      className="digital-form-input"
                      placeholder="Link Type"
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="brand_owner" className="digital-form-label">
                      Brand Owner <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="brand_owner"
                      name="brand_owner"
                      className="digital-form-input"
                      placeholder="Brand Owner"
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
                      Product Leaflet Information
                    </label>
                    <input
                      type="text"
                      id="productLeaflet"
                      className="digital-form-input"
                      name="ProductLeafletInformation"
                      placeholder="Product Leaflet Information"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="lang" className="digital-form-label">
                      Language <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="lang"
                      name="Lang"
                      className="digital-form-input"
                      placeholder="Language"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="linkType" className="digital-form-label">
                      Link Type <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="linkType"
                      name="LinkType"
                      className="digital-form-input"
                      placeholder="Link Type"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="targetURL" className="digital-form-label">
                      Target URL <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="targetURL"
                      className="digital-form-input"
                      name="TargetURL"
                      placeholder="Target URL"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="pdfDoc" className="digital-form-label">
                      PDF Document <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      id="pdfDoc"
                      className="digital-form-input"
                      name="attachment"
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
                      Safety Detailed Information{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="safetyInformation"
                      className="digital-form-input"
                      name="SafetyDetailedInformation"
                      placeholder="Safety Detailed Information"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="linkType" className="digital-form-label">
                      Link Type <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="linkType"
                      name="LinkType"
                      className="digital-form-input"
                      placeholder="Link Type"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="lang" className="digital-form-label">
                      Language <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="lang"
                      className="digital-form-input"
                      name="Lang"
                      placeholder="Language"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="targetURL" className="digital-form-label">
                      Target URL <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="targetURL"
                      name="TargetURL"
                      className="digital-form-input"
                      placeholder="Target URL"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="logo" className="digital-form-label">
                      Logo <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      id="logo"
                      name="logo"
                      className="digital-form-input"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="companyName" className="digital-form-label">
                      Company Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      className="digital-form-input"
                      placeholder="Company Name"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="process" className="digital-form-label">
                      Process <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="process"
                      name="process"
                      className="digital-form-input"
                      placeholder="Process"
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
                    Close
                  </button>
                  <button type="submit" className="bg-secondary hover:bg-primary text-white rounded-md cursor-pointer py-2 px-6" >
                    Save
                  </button>
                </div>
            </form>
          </div>

         
        </div>
      </>
    )
  );
};

export default FormPopup;
