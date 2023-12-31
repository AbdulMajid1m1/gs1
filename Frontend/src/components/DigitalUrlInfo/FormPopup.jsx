import React, { useContext, useState } from "react";
import { SnackbarContext } from "../../../Contexts/SnackbarContext";
import newRequest from "../../../utils/userRequest";

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
      Recipe: "/insertRecipeData",
      "Product Recall": "/insertProductRecallData",
      "Promotional offers": "/insertPromotionalOffersData",
      "Product Location of Origin": "/insertProductLocationOriginData",
      "Product Contents": "/insertProductContentsData",
      "Packaging Composition": "/insertPkgCompositionData",
      "Electronic Leaflets": "/insertProductLeafletData",
      "Safety Information": "/insertProductSafetyInformationData",
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
      openSnackbar(response.data.message, "success");
      resetState();
      event.target.reset();
    } catch (error) {
      console.log(error);
      openSnackbar(error?.response?.data?.message, "error");
    }
  };

  return (
    showPopup && (
      <>
        <div className="digital-popup-overlay" onClick={togglePopup}></div>
        <div className="digital-popup-large">
          <div className="digital-popup-header">
            <h1 className="digital-popup-title">Digital Link</h1>
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
                <select type="text" id="select" onChange={handleSelectChange}>
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
                    <label htmlFor="logo">
                      logo <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      name="logo"
                      id="logo"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="title">
                      title <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="title"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="description">
                      Description <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      placeholder="Description"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="ingredients">
                      Ingredients <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="ingredients"
                      id="ingredients"
                      placeholder="Ingredients"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="LinkType">
                      LinkType <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="LinkType"
                      id="LinkType"
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
                    <label htmlFor="ProductRecall">
                      ProductRecall <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="ProductRecall"
                      id="ProductRecall"
                      placeholder="ProductRecall"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="LinkType">
                      LinkType <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="LinkType"
                      id="LinkType"
                      placeholder="LinkType"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="Lang">
                      Lang <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="Lang"
                      id="Lang"
                      placeholder="Lang"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="TargetURL">
                      TargetURL <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="TargetURL"
                      id="TargetURL"
                      placeholder="TargetURL"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="ExpiryDate">
                      ExpiryDate <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      name="ExpiryDate"
                      id="ExpiryDate"
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
                    <label htmlFor="PromotionalOffers">
                      PromotionalOffers <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="PromotionalOffers"
                      name="PromotionalOffers"
                      placeholder="PromotionalOffers"
                      onChange={(e) =>
                        handleInputChange(e, "Promotional offers")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="LinkType">
                      LinkType <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="LinkType"
                      name="LinkType"
                      placeholder="LinkType"
                      onChange={(e) =>
                        handleInputChange(e, "Promotional offers")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="Lang">
                      Lang <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="Lang"
                      name="Lang"
                      placeholder="Lang"
                      onChange={(e) =>
                        handleInputChange(e, "Promotional offers")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="TargetURL">
                      TargetURL <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="TargetURL"
                      name="TargetURL"
                      placeholder="TargetURL"
                      onChange={(e) =>
                        handleInputChange(e, "Promotional offers")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="ExpiryDate">
                      ExpiryDate <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      id="ExpiryDate"
                      name="ExpiryDate"
                      onChange={(e) =>
                        handleInputChange(e, "Promotional offers")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="price">
                      Price <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      id="price"
                      name="price"
                      placeholder="price"
                      onChange={(e) =>
                        handleInputChange(e, "Promotional offers")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="banner">
                      Banner <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="banner"
                      name="banner"
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
                    <label htmlFor="ProductLocationOrigin">
                      ProductLocationOrigin{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="ProductLocationOrigin"
                      name="ProductLocationOrigin"
                      placeholder="ProductLocationOrigin"
                      onChange={(e) =>
                        handleInputChange(e, "Product Location of Origin")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="Lang">
                      Lang <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="Lang"
                      name="Lang"
                      placeholder="Lang"
                      onChange={(e) =>
                        handleInputChange(e, "Product Location of Origin")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="LinkType">
                      LinkType <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="LinkType"
                      name="LinkType"
                      placeholder="LinkType"
                      onChange={(e) =>
                        handleInputChange(e, "Product Location of Origin")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="TargetURL">
                      TargetURL <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="TargetURL"
                      name="TargetURL"
                      placeholder="TargetURL"
                      onChange={(e) =>
                        handleInputChange(e, "Product Location of Origin")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="ExpiryDate">
                      ExpiryDate <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      id="ExpiryDate"
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
                    <label htmlFor="ProductAllergenInformation">
                      Product Allergen Information{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="ProductAllergenInformation"
                      name="ProductAllergenInformation"
                      placeholder="Product Allergen Information"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Product Nutrients Information */}
                  <div className="digital-form-row">
                    <label htmlFor="ProductNutrientsInformation">
                      Product Nutrients Information{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="ProductNutrientsInformation"
                      name="ProductNutrientsInformation"
                      placeholder="Product Nutrients Information"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="LinkType">
                      LinkType <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="LinkType"
                      name="LinkType"
                      placeholder="LinkType"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Batch */}
                  <div className="digital-form-row">
                    <label htmlFor="Batch">
                      Batch <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="Batch"
                      name="Batch"
                      placeholder="Batch"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Expiry */}
                  <div className="digital-form-row">
                    <label htmlFor="Expiry">
                      Expiry <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="Expiry"
                      name="Expiry"
                      placeholder="Expiry"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Serial */}
                  <div className="digital-form-row">
                    <label htmlFor="Serial">
                      Serial <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="Serial"
                      name="Serial"
                      placeholder="Serial"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* ManufacturingDate */}
                  <div className="digital-form-row">
                    <label htmlFor="ManufacturingDate">
                      Manufacturing Date <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      id="ManufacturingDate"
                      name="ManufacturingDate"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Best Before Date */}
                  <div className="digital-form-row">
                    <label htmlFor="bestBeforeDate">
                      Best Before Date <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      id="bestBeforeDate"
                      name="bestBeforeDate"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>
                  {/* GLNIDFrom */}
                  <div className="digital-form-row">
                    <label htmlFor="GLNIDFrom">
                      GLN ID From <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="GLNIDFrom"
                      name="GLNIDFrom"
                      placeholder="GLN ID From"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Unit Price */}
                  <div className="digital-form-row">
                    <label htmlFor="unitPrice">
                      Unit Price <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      id="unitPrice"
                      name="unitPrice"
                      placeholder="Unit Price"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Ingredients */}
                  <div className="digital-form-row">
                    <label htmlFor="ingredients">
                      Ingredients <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="ingredients"
                      name="ingredients"
                      placeholder="Ingredients"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Allergen Info */}
                  <div className="digital-form-row">
                    <label htmlFor="allergen_info">
                      Allergen Info <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="allergen_info"
                      name="allergen_info"
                      placeholder="Allergen Info"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Calories */}
                  <div className="digital-form-row">
                    <label htmlFor="calories">
                      Calories <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="calories"
                      name="calories"
                      placeholder="Calories"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Sugar */}
                  <div className="digital-form-row">
                    <label htmlFor="sugar">
                      Sugar <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="sugar"
                      name="sugar"
                      placeholder="Sugar"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Salt */}
                  <div className="digital-form-row">
                    <label htmlFor="salt">
                      Salt <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="salt"
                      name="salt"
                      placeholder="Salt"
                      onChange={(e) => handleInputChange(e, "Product Contents")}
                    />
                  </div>

                  {/* Fat */}
                  <div className="digital-form-row">
                    <label htmlFor="fat">
                      Fat <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="fat"
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
                    <label htmlFor="logo">
                      Logo <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      id="logo"
                      name="logo"
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  {/* Title */}
                  <div className="digital-form-row">
                    <label htmlFor="title">
                      Title <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Title"
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  {/* Consumer Product Variant */}
                  <div className="digital-form-row">
                    <label htmlFor="consumerProductVariant">
                      Consumer Product Variant{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="consumerProductVariant"
                      name="consumerProductVariant"
                      placeholder="Consumer Product Variant"
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  {/* Packaging */}
                  <div className="digital-form-row">
                    <label htmlFor="packaging">
                      Packaging <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="packaging"
                      name="packaging"
                      placeholder="Packaging"
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  {/* Material */}
                  <div className="digital-form-row">
                    <label htmlFor="material">
                      Material <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="material"
                      name="material"
                      placeholder="Material"
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  {/* Recyclability */}
                  <div className="digital-form-row">
                    <label htmlFor="recyclability">
                      Recyclability <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="recyclability"
                      name="recyclability"
                      placeholder="Recyclability"
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  {/* Product Owner */}
                  <div className="digital-form-row">
                    <label htmlFor="productOwner">
                      Product Owner <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="productOwner"
                      name="productOwner"
                      placeholder="Product Owner"
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  {/* Link Type */}
                  <div className="digital-form-row">
                    <label htmlFor="LinkType">
                      Link Type <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="LinkType"
                      name="LinkType"
                      placeholder="Link Type"
                      onChange={(e) =>
                        handleInputChange(e, "Packaging Composition")
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="brand_owner">
                      Brand Owner <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="brand_owner"
                      name="brand_owner"
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
                    <label htmlFor="productLeaflet">
                      Product Leaflet Information
                    </label>
                    <input
                      type="text"
                      id="productLeaflet"
                      name="ProductLeafletInformation"
                      placeholder="Product Leaflet Information"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="lang">
                      Language <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="lang"
                      name="Lang"
                      placeholder="Language"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="linkType">
                      Link Type <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="linkType"
                      name="LinkType"
                      placeholder="Link Type"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="targetURL">
                      Target URL <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="targetURL"
                      name="TargetURL"
                      placeholder="Target URL"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="pdfDoc">
                      PDF Document <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      id="pdfDoc"
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
                    <label htmlFor="safetyInformation">
                      Safety Detailed Information{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="safetyInformation"
                      name="SafetyDetailedInformation"
                      placeholder="Safety Detailed Information"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="linkType">
                      Link Type <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="linkType"
                      name="LinkType"
                      placeholder="Link Type"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="lang">
                      Language <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="lang"
                      name="Lang"
                      placeholder="Language"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="targetURL">
                      Target URL <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="targetURL"
                      name="TargetURL"
                      placeholder="Target URL"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="logo">
                      Logo <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      id="logo"
                      name="logo"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="companyName">
                      Company Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      placeholder="Company Name"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>

                  <div className="digital-form-row">
                    <label htmlFor="process">
                      Process <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="process"
                      name="process"
                      placeholder="Process"
                      onChange={(event) =>
                        handleInputChange(event, selectedOption)
                      }
                    />
                  </div>
                </div>
              ) : null}
            </form>
          </div>

          <div className="footer-line"></div>

          <div className="popup-footer">
            <button className="popup-close" onClick={togglePopup}>
              Close
            </button>
            <button type="submit" className="popup-save" form="gtin-form">
              Save
            </button>
          </div>
        </div>
      </>
    )
  );
};

export default FormPopup;
