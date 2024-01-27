import React, { useContext, useEffect, useState } from 'react'
// import SideBar from '../../Components/SideBar/SideBar'
import { useNavigate } from 'react-router-dom';
import DigitalUrlWithoutSidebar from './DigitalUrlWithoutSidebar';
import EventsMap from './EventsMap';
import axios from 'axios';
import { SnackbarContext } from '../../../Contexts/SnackbarContext';
import "./ProductInformation.css"
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { toast } from 'react-toastify';
import DropDownSelection from '../DropDownSelection/DropDownSelection';


const ProductInformation = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [gtin, setGTIN] = useState("");
  const [data, setData] = useState(null);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]); // State to store API data  
  const [batchNo, setBatchNo] = useState([]);
  const [bySerial, setBySerial] = useState([]);
  const [searchedData, setSearchedData] = useState({}); // State to store API data
  const navigate = useNavigate();
  const { openSnackbar } = useContext(SnackbarContext);


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Store the GTIN value in sessionStorage
  sessionStorage.setItem("gtin", gtin);

  // Gtin api user can search gtin if found then call this api and show the record below the table 
  // User Enter Gtin number that we store in sessionStorage and get in other tabs
  const parseInput = (input) => {
    let extracted = {
      gtin: null,
      mapDate: null,
      batch: null,
      serial: null
    };

    const parts = input.split(' ');

    if (parts.length > 2) {
      const gtinMapDate = parts[0].split('-');
      extracted.gtin = gtinMapDate[0];
      extracted.mapDate = gtinMapDate[1] + ' ' + parts[1].split('-')[0];

      extracted.batch = parts[1].split('-')[1];

      const serialParts = parts[2].split('-');
      extracted.serial = serialParts[serialParts.length - 1];
    } else {
      // Handle other cases or errors here
      extracted.gtin = input;
    }

    return extracted;
  }

  const handleSearch = () => {
    // 6281000000113-25 2023-batch01-01 2023-BSW220200512603
    const result = parseInput(gtin);
    setSearchedData(result)
    sessionStorage.setItem("barcodeData", JSON.stringify(result));
    console.log(result)
    //  mapDate, batch and serial are in result if needed".
    if (!result.gtin) {
      // openSnackbar("Please enter GTIN", 'error');
      toast.error("Please enter GTIN");
      return;
    }

    const bodyData = {
      gtin: result.gtin,

    };

    // axios.get("https://gs1ksa.org/api/search/member/gtin", { params: bodyData })
    axios.post("https://gs1ksa.org/api/search/member/gtin", { gtin: result.gtin })
      .then((response) => {
        if (response.data?.gtinArr === undefined || Object.keys(response.data?.gtinArr).length === 0) {
          // Display error message when the array is empty
          // openSnackbar("No data found", 'error');
          toast.error("No data found");
          setData(null);
          return
        }
        console.log(response?.data);
        setData(response?.data);
        sessionStorage.setItem("gtinData", JSON.stringify(response?.data));
        // sessionStorage.setItem("EventgtinArr", JSON.stringify(response?.data?.gtinArr));
        setGTIN(result.gtin)
      })
      .catch((error) => {
        console.log(error);
        setData(null);
        // openSnackbar("Something went wrong", 'error');
        toast.error("Something went wrong");

      });
  };



  const products = [
    { name: "GTIN", value: data?.gtinArr?.gtin },
    { name: "Brand name", value: data?.gtinArr?.brandName },
    { name: "Product description", value: data?.gtinArr?.productDescription },
    { name: "Product image URL", value: data?.gtinArr?.productImageUrl },
    { name: "Global product category", value: data?.gtinArr?.gpcCategoryCode },
    // check if data has unitcode then show value
    { name: "Net content", value: data?.gtinArr?.unitCode && data?.gtinArr?.unitValue && `${data?.gtinArr?.unitCode} ${data?.gtinArr?.unitValue}` },
    { name: "Country of sale", value: data?.gtinArr?.countryOfSaleCode },
  ];

  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedSerial, setSelectedSerial] = useState(null);

  const MapsResponseData = sessionStorage.getItem('mapsResponse');
  const parsedMappedData = JSON.parse(MapsResponseData);
  console.log(parsedMappedData)

  const handleBatchChange = (e) => {
    if (e.target.value === "none") {
      setSelectedBatch(null);
    } else {
      setSelectedBatch(e.target.value);
    }
  };

  const handleSerialChange = (e) => {
    if (e.target.value === "none") {
      setSelectedSerial(null);
    } else {
      setSelectedSerial(e.target.value);
    }
  };

  return (
    <div>
      {/* <SideBar /> */}
        <div className='sticky top-0 z-50 bg-white'>
          <Header />  
        </div>
        <div>
          <DropDownSelection />
        </div>
      
      <div className="p-3 h-full ">
        

        {/* Head  */}
        <div className='h-auto w-full px-1 mb-4'>
          <div className='h-16 w-full bg-white shadow-xl flex justify-start items-center gap-3 px-5 border-l-2 border-[#e49515]'>
            <i onClick={() => navigate(-1)} className="fas fa-arrow-left text-2xl text-[#e49515] cursor-pointer"></i>
            <p className='sm:text-2xl text-sm font-body font-semibold'> GTIN INFORMATION</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <button
            className={`p-4 rounded ${activeTab === 'home' ? 'bg-primary text-white' : 'bg-white text-primary'
              } shadow-md flex items-center justify-center`}
            onClick={() => handleTabClick('home')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            GTIN INFORMATION
          </button>

          <button
            className={`p-4 rounded ${activeTab === 'profile' ? 'bg-primary text-white' : 'bg-white text-primary'
              } shadow-md flex items-center justify-center`}
            onClick={() => handleTabClick('profile')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            DIGITAL LINK
          </button>

          <button
            className={`p-4 rounded ${activeTab === 'profile2' ? 'bg-primary text-white' : 'bg-white text-primary'
              } shadow-md flex items-center justify-center`}
            onClick={() => handleTabClick('profile2')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 14H7A3 3 0 0 1 4 11v-1a3 3 0 0 1 3-3h2M15 14h2a3 3 0 0 0 3-3v-1a3 3 0 0 0-3-3h-2" />
              <path d="M12 19v1m0 0v-1m0 1a6 6 0 0 0 6-6v-4a6 6 0 0 0-12 0v4a6 6 0 0 0 6 6z" />
            </svg>
            EVENTS
          </button>

        </div>

        <div className="shadow-xl border border-gray-100 font-light px-2 py-8 rounded text-gray-500 bg-white mt-6">


          {/*First Tab Gtin Information only change this tab*/}
          {activeTab === 'home' && (
            <div className="block">
              <input
                type="text"
                className="w-full border h-10 rounded-md px-5 font-semibold text-black border-gray-200"
                placeholder="GTIN INFORMATION"
                value={gtin}
                onChange={(event) => setGTIN(event.target.value)}
                onBlur={handleSearch}
              />

              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 flex justify-center items-center p-4">
                  {/* Add your image element here */}
                  {data?.gtinArr?.productImageUrl && (
                    <img src={data.gtinArr.productImageUrl} alt="Product" className="w-1/2" />

                  )}
                </div>

                <div className="w-full md:w-2/3">
                  <div className="container mx-auto mt-6 p-4">
                    <div className="overflow-x-auto">
                      <table className="table-auto min-w-max w-full">
                        <tbody>
                          {products.map((product, index) => (
                            <tr key={index}>
                              <td className="border px-4 py-2 sm:text-sm md:text-base font-semibold text-xs">{product.name}</td>
                              <td className="border font-body px-4 py-2 sm:text-sm font-bold text-black md:text-base text-xs">{product.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>


              <div className=''>
                <div className="Gtin-Information-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Allergen Info</th>
                        <th>Nutrients Info</th>
                        <th>Batch</th>
                        <th>Expiry</th>
                        <th>Serial</th>
                        <th>Manufacturing Date</th>
                        <th>Best Before</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data && data.productContents.map(item => (
                        <tr key={item.ID}>
                          <td>{item.ProductAllergenInformation}</td>
                          <td>{item.ProductNutrientsInformation}</td>
                          <td>{item.Batch}</td>
                          <td>{item.Expiry}</td>
                          <td>{item.Serial}</td>
                          <td>{item.ManufacturingDate}</td>
                          <td>{item.bestBeforeDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          )}


          {/* Second Tab Digital Link */}
          {activeTab === 'profile' && (
            <div className="block">
              <div className='sm:-ml-72'>
                <DigitalUrlWithoutSidebar gtinData={data?.gtinArr} />
              </div>
            </div>
          )}


          {/* Third Tab Events Map */}
          {activeTab === 'profile2' && (
            <div className="block">
              <div className='h-auto'>
                <div className='h-auto 2xl:h-44 xl:h-44 lg:h-44 w-full border-2 border-gray-200 rounded-md'>
                  <div className='p-4 font-semibold flex flex-col gap-2'>
                    <label className='text-black text-2xl'>Filter By</label>
                    <hr />
                  </div>

                  <div className='grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 mb-4'>
                    <div className='px-4 flex flex-col gap-2'>
                      <label>Batches <span className='text-red-500'>*</span></label>
                      <select
                        type='text'
                        className='w-full border h-10 rounded-md px-5 font-semibold border-gray-200'
                        onChange={handleBatchChange}
                      >
                        <option value="none">-select-</option>
                        {searchedData?.batch && (
                          <option value={searchedData?.batch}>{searchedData?.batch}</option>
                        )}

                      </select>
                    </div>


                    <div className='px-4 flex flex-col gap-2'>
                      <label>Serials </label>
                      <select type='text'
                        className='w-full border h-10 rounded-md px-5 font-semibold border-gray-200'
                        onChange={handleSerialChange}
                      >
                        <option value="none">-select-</option>
                        {searchedData?.serial && (
                          <option value={searchedData?.serial}>{searchedData?.serial}</option>
                        )}
                      </select>
                    </div>

                    <div className='px-4 flex flex-col gap-2'>
                      <label>Expiry Date</label>
                      <input type='date' className='w-full border h-10 rounded-md px-5 font-semibold border-gray-200' placeholder='Batch' />
                    </div>

                  </div>
                </div>
                <div>
                  {/* <button className='bg-indigo-500 text-white rounded-sm px-4 py-2 mt-4'>View Grid</button> */}
                  <button
                    className='bg-primary text-white rounded-sm px-4 py-2 mt-4'
                    onClick={() => setIsTableVisible(!isTableVisible)}
                  >
                    View Grid
                  </button>
                </div>

                {/* Gtin View TableData */}
                {isTableVisible && (
                  <div className=''>
                    <div className="Events-Grid-Data">
                      <table>
                        <thead>
                          <tr>
                            <th>EventID</th>
                            <th>MemberID</th>
                            <th>Ref Description</th>
                            <th>Date Created</th>
                            <th>Date LastUpdate</th>
                            <th>GLNIDFrom</th>
                            <th>GLNIDTo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {parsedMappedData.gtinInformation.map(item => (
                            <tr key={item.tblTrxHeaderSessionID}>
                              <td>{item.TrxEventId}</td>
                              <td>{item.MemberID}</td>
                              <td>{item.TrxRefDescription}</td>
                              <td>{item.TrxDateCreated}</td>
                              <td>{item.TrxDateLastUpdate}</td>
                              <td>{item.TrxGLNIDFrom}</td>
                              <td>{item.TrxGLNIDTo}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Events Map */}
                <EventsMap selectedSerial={selectedSerial}
                  selectedBatch={selectedBatch}
                />

              </div>
            </div>
          )}
        </div>


        <div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default ProductInformation