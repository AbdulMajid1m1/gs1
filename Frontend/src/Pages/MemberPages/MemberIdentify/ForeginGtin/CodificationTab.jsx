import React, { useContext, useEffect, useState } from 'react';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';
import gtrackIcon from "../../../../Images/gtrackicons.png"
import axios from 'axios';
import { DotLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CodificationTab = ({ gs1ProductData }) => {
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [thirdOpen, setThirdOpen] = useState(false);
  const [fourthOpen, setFourthOpen] = useState(false);
  const [fifthOpen, setFifthOpen] = useState(false);
  const [sixthOpen, setSixthOpen] = useState(false);
  const [hsCode, setHsCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // gs1ProductData get the product session data
  // const gs1ProductData = JSON.parse(sessionStorage.getItem("gs1ProductData"));
//   console.log(gs1ProductData);
//   console.log(gs1ProductData?.gpc)
  // const number = gs1ProductData.split("-")[0];
  // console.log(number);
  const toggleOpen = () => {
    setOpen(!open);
  };

  const toggleSubOpen = (e) => {
    e.stopPropagation(); // Prevent parent from closing when a sub-item is clicked
    setSubOpen(!subOpen);
  };

  const toggleThirdOpen = (e) => {
    e.stopPropagation(); // Prevent parent from closing when a sub-item is clicked
    setThirdOpen(!thirdOpen);
  };

  const toggleFourthOpen = (e) => {
    e.stopPropagation(); // Prevent parent from closing when a sub-item is clicked
    setFourthOpen(!fourthOpen);
  }

  const toggleFifthOpen = (e) => {
    e.stopPropagation(); // Prevent parent from closing when a sub-item is clicked
    setFifthOpen(!fifthOpen);
  }

  const toggleSixthOpen = (e) => {
    e.stopPropagation(); // Prevent parent from closing when a sub-item is clicked
    setSixthOpen(!sixthOpen);
  }

  // get the product session data
  // const gtinData = JSON.parse(sessionStorage.getItem("productData"));
  // console.log(gtinData);

  const [selectedOption, setSelectedOption] = useState("GS1-GPC");
  const [gpcData, setGpcData] = useState([]);
  // const [saveFirstApiData, setSaveFirstApiData] = useState([]); // save the first api data to use in the second api call
  const [gpcBricks, setGpcBricks] = useState([]);
  const [unspsc, setUnspsc] = useState([]);
  const [others, setOthers] = useState([]);

  // State to store the selected row
  const [selectedRow, setSelectedRow] = useState(null);

  // Function to handle row selection
  // const handleRowClick = (item) => {
  //   sessionStorage.setItem('selectedRow', JSON.stringify(item));
  //   console.log('Selected Row:', item);
  //   setSelectedRow(item);
  //   console.log(selectedRow?.ItemEnglishName);
  // };

  const handleRowClick = (item) => {
    // Update the state
    setSelectedRow(item);
  };
  useEffect(() => {
    if (selectedRow) {
      sessionStorage.setItem('selectedRow', JSON.stringify(selectedRow));
      console.log('Selected Row:', selectedRow);
      console.log(selectedRow?.ItemEnglishName);
    }
  }, [selectedRow]);


  const [selectedBrick, setSelectedBrick] = useState('');

  const handleBrickChange = (e) => {
    getHsCode(e.target.value); // call the second api when the user select a brick from the dropdown
    getUNSPC(e.target.value); // call the second api when the user select a brick from the dropdown
  };

  const getGpcData = () => {
    setIsLoading(true);
    // first api call
    axios
      .post('https://gs1ksa.org/api/GROUTE/gpc/search', {
        // "gpc": number
        "gpc": gs1ProductData
        // TODO: convert harcoded value to dynamic value
      })
      .then((response) => {
        console.log(response.data);
        setGpcData(response.data);
        // i save the classCode of the first api call to use it in the second api call
        const classCode = response.data.data.ClassCode;
        console.log(classCode);
        setIsLoading(false);


        // Second API call
        axios
          .post('https://gs1ksa.org/api/GROUTE/gpc/find/bricks', {
            // "class_code": "50181700"
            "class_code": classCode
          })
          .then((response) => {
            console.log(response.data?.data);
            setGpcBricks(response.data?.data);
            setIsLoading(false);
            // Handle the response data from the second API call as needed
          })
          .catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message ?? "something went wrong with the second API call!");
            setIsLoading(false);

          });
      })

      // Handle the response data from the first API call as needed
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message ?? "something went wrong!");
        setGpcData([]);
        setIsLoading(false);
      });
  }


  const getHsCode = (selectedBrickTitle) => {
    setIsLoading(true);
    axios.post('https://gs1ksa.org/api/GROUTE/gpc/find/hs/code', {
      "brick_title": selectedBrickTitle
      // "brick_title": "Baking" // this is a test
    })
      .then((response) => {
        console.log(response?.data)
        setHsCode(response?.data)
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message ?? "something went wrong!");
        setIsLoading(false);
      })
  }

  const getUNSPC = (selectedBrickTitle) => {
    setIsLoading(true);
    axios.post('https://gs1ksa.org/api/GROUTE/find/commodity/by/brick/title', {
      "brick_title": selectedBrickTitle
      // "brick_title": "Caramel/Toffee Apples" // this is a test
    })
      .then((response) => {
        console.log(response?.data)
        setUnspsc(response?.data)
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message ?? "something went wrong!");
        setIsLoading(false);
      })
  }
  useEffect(() => {
    getGpcData()
  }
    , []);
  //Second Tab
  const handleOptionChange = (option) => {
    setSelectedOption(option);

    switch (option) {
      case "GS1-GPC":
        // getGpcData()
        break;

      case "HS-CODES":
        // getHsCode()
        break;


      case "UNSPSC":

        break;

        case "OTHER":
          setIsLoading(true);
            axios.post('https://gs1ksa.org/api/GROUTE/find/brick/by/hs/name', {
                 "hs_name": selectedRow?.ItemEnglishName
              // "hs_name": "Pineapples" // this is a test
            })
              .then((response) => {
                console.log(response?.data)
                setOthers(response?.data)
                setIsLoading(false);
              })
              .catch((error) => {
                console.log(error);
                // openSnackbar(
                //   error?.response?.data?.message ?? "something went wrong!",
                //   "error"
                // );
                toast.error(error?.response?.data?.message ?? "something went wrong!");
                setIsLoading(false);
              })
          break;

      // Add more cases for other options
      default:
        break;
    }
  };

  // This function will return an array with unique records based on brick.BrickCode
  const uniqueGPCBricks = (gpcBricks) => {
    return gpcBricks.reduce((acc, current) => {
      const isDuplicate = acc.some((brick) => brick.BrickCode === current.BrickCode);
      if (!isDuplicate) {
        acc.push(current);
      }
      return acc;
    }, []);
  }

  const renderDataGrid = () => {
    switch (selectedOption) {
      case "GS1-GPC":
        return (
          <div>
            <div className='flex gap-2 w-full'>
              <span
                className={`bg-[#00acee] w-full py-2 flex justify-center px-1 rounded-md text-white items-center gap-2 cursor-pointer
                    `}
                onClick={() => handleOptionChange("GS1-GPC")}
              >
                <img
                  src={gtrackIcon}
                  className="w-5 h-5 ml-1"
                  alt=""
                />
                Global Product Classification (GPC)
              </span>
              <span
                className={`bg-[#00acee] w-full py-2 flex justify-center px-1 rounded-md items-center gap-2 cursor-pointer`}
              >
                <img
                  src={gtrackIcon}
                  className="w-5 h-5 ml-1"
                  alt=""
                />
                <select className='bg-[#00acee] w-full text-white' onChange={handleBrickChange}>
                  <option value="">GPC Bricks Title</option>
                  {uniqueGPCBricks(gpcBricks)?.map((brick, index) => (
                    <option key={index} value={brick.BrickTitle}>
                      {brick.BrickTitle}
                    </option>
                  ))}
                </select>
              </span>
            </div>
            <ul className='h-[80vh] w-full'>
              <li>
                <Link
                  // href="#"
                  onClick={toggleOpen}
                  className={`flex items-center px-4 hover:bg-secondary-100 focus:text-primary active:text-primary ${open ? 'text-primary' : ''}`}
                >
                  {open ? (
                    <FaAngleDown />
                  ) : (
                    <FaAngleRight />
                  )}
                  <h1 className='font-bold'>Segment: </h1> {gpcData?.data?.SegmentTitle}
                </Link>
                <ul className={`ml-6 ${open ? 'block' : 'hidden'}`}>
                  <li className="px-2 hover:bg-secondary-100">{gpcData?.data?.SegmentCode}</li>
                  {/* <li className="px-2 hover:bg-secondary-100">Second-two</li> */}
                  <li>
                    <Link
                      // href="#"
                      onClick={toggleSubOpen}
                      className={`flex items-center px-2 hover:bg-secondary-100 focus:text-primary active:text-primary ${subOpen ? 'text-primary' : ''}`}
                    >
                      {subOpen ? (
                        <FaAngleDown />
                      ) : (
                        <FaAngleRight />
                      )}
                      <h1 className='font-bold'>FamilyTitle: </h1>{gpcData?.data?.FamilyTitle}
                    </Link>
                    <ul className={`ml-6 ${subOpen ? 'block' : 'hidden'}`}>
                      <li className="px-2 hover:bg-secondary-100">{gpcData?.data?.FamilyCode}</li>
                      <li>
                        <Link
                          // href="#"
                          onClick={toggleThirdOpen}
                          className={`flex items-center px-4 hover:bg-secondary-100 focus:text-primary active:text-primary ${thirdOpen ? 'text-primary' : ''}`}
                        >
                          {thirdOpen ? (
                            <FaAngleDown />
                          ) : (
                            <FaAngleRight />
                          )}
                          <h1 className='font-bold'>Class: </h1>{gpcData?.data?.ClassTitle}
                        </Link>
                        <ul className={`ml-10 ${thirdOpen ? 'block' : 'hidden'}`}>
                          <li className="px-2 hover:bg-secondary-100">{gpcData?.data?.ClassCode}</li>
                        </ul>
                      </li>
                      <li>
                        <Link
                          // href="#"
                          onClick={toggleFourthOpen}
                          className={`flex items-center px-10 hover:bg-secondary-100 focus:text-primary active:text-primary ${thirdOpen ? 'text-primary' : ''}`}
                        >
                          {fourthOpen ? (
                            <FaAngleDown />
                          ) : (
                            <FaAngleRight />
                          )}
                          <h1 className='font-bold'>Brick: </h1> {gpcData?.data?.BrickTitle}
                        </Link>
                        <ul className={`ml-16 ${fourthOpen ? 'block' : 'hidden'}`}>
                          <li className="px-2 hover:bg-secondary-100">{gpcData?.data?.BrickCode}</li>
                        </ul>
                      </li>
                      {/* <li>
                          <a
                            href="#"
                            onClick={toggleFifthOpen}
                            className={`flex items-center px-14 hover:bg-secondary-100 focus:text-primary active:text-primary ${thirdOpen ? 'text-primary' : ''}`}
                          >
                            {fifthOpen ? (
                              <FaAngleDown />
                            ) : (
                              <FaAngleRight />
                            )}
                                Attribute 10007262 Flatware Types of Disposable Flatware
                          </a>
                          <ul className={`ml-20 ${fifthOpen ? 'block' : 'hidden'}`}>
                            <li className="px-2 hover:bg-secondary-100">Fourth-one</li>
                            <li className="px-2 hover:bg-secondary-100">Fourth-two</li>
                            <li className="px-2 hover:bg-secondary-100">Fourth-three</li>
                          </ul>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={toggleSixthOpen}
                            className={`flex items-center px-20 hover:bg-secondary-100 focus:text-primary active:text-primary ${thirdOpen ? 'text-primary' : ''}`}
                          >
                            {sixthOpen ? (
                              <FaAngleDown />
                            ) : (
                              <FaAngleRight />
                            )}
                                Attribute value 30011729 SPOON (DISPOSABLE)
                          </a>
                          <ul className={`ml-24 ${sixthOpen ? 'block' : 'hidden'}`}>
                            <li className="px-2 hover:bg-secondary-100">Fourth-one</li>
                            <li className="px-2 hover:bg-secondary-100">Fourth-two</li>
                            <li className="px-2 hover:bg-secondary-100">Fourth-three</li>
                          </ul>
                        </li> */}
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        );

      case "HS-CODES":
        return (
          <div className='h-[80vh] w-full mt-2 px-2 border-2 border-dashed overflow-x-auto'>
            {hsCode?.data?.map((item) => (
              <div
                key={item.HarmonizedCode} // Use a unique key for each item
                // className={`cursor-pointer flex flex-col gap-2 ${selectedRow === item ? 'selected-row' : ''}`}
                className={`cursor-pointer flex flex-col gap-2 p-3 rounded-md ${selectedRow === item ? 'bg-gray-200' : 'bg-white'}`}
                onClick={() => handleRowClick(item)} // Attach the onClick handler

              >
                <div className='h-auto w-full shadow-xl p-3 rounded-md'>
                  <h1 className='text-primary'>Harmonized Code: <span className='text-black'>{item.HarmonizedCode}</span></h1>
                  <h1 className='text-primary'>Arabic Name: <span className='text-black'>{item.ItemArabicName}</span></h1>
                  <h1 className='text-primary'>English Name: <span className='text-black'>{item.ItemEnglishName}</span></h1>
                  <h1 className='text-primary'>Duty Rate: <span className='text-black'>{item.DutyRate || 'N/A'}</span></h1>
                  <h1 className='text-primary'>Procedures: <span className='text-black'>{item.Procedures || 'N/A'}</span></h1>
                  <h1 className='text-primary'>Date: <span className='text-black'>{item.Date || 'N/A'}</span></h1>
                </div>
              </div>
            ))}
          </div>
        );


      // case "UNSPSC":
      // return (
      //   <div className='h-52 w-full mt-2 px-2 border-2 border-dashed overflow-x-auto'>
      //     {unspsc?.data?.map((item, index) => (
      //       <div
      //         key={index} 
      //       >
      //         <div className='h-auto w-full shadow-xl p-3 rounded-md'>
      //           <h1 className='text-primary'>Family Title: <span className='text-black'>{item.FamilyTitle}</span></h1>
      //           <h1 className='text-primary'>Class: <span className='text-black'>{item.Class}</span></h1>
      //           <h1 className='text-primary'>ClassTitle: <span className='text-black'>{item.ClassTitle}</span></h1>
      //           <h1 className='text-primary'>Commodity: <span className='text-black'>{item.Commodity}</span></h1>
      //           <h1 className='text-primary'>CommodityTitle: <span className='text-black'>{item.CommodityTitle}</span></h1>
      //         </div>
      //       </div>
      //     ))}
      //   </div>
      // );
      case "UNSPSC":
        return (
          <div className='h-[80vh] w-full mt-2 px-2 border-2 border-dashed overflow-x-auto'>
            {unspsc?.data?.map((group, groupIndex) => (
              <div key={groupIndex}>
                {group.map((item, index) => (
                  <div
                    key={index}
                    className='shadow-xl p-3 rounded-md mb-2'
                  >
                    <h1 className='text-primary'>Family Title: <span className='text-black'>{item.FamilyTitle}</span></h1>
                    <h1 className='text-primary'>Class: <span className='text-black'>{item.Class}</span></h1>
                    <h1 className='text-primary'>ClassTitle: <span className='text-black'>{item.ClassTitle}</span></h1>
                    <h1 className='text-primary'>Commodity: <span className='text-black'>{item.Commodity}</span></h1>
                    <h1 className='text-primary'>CommodityTitle: <span className='text-black'>{item.CommodityTitle}</span></h1>
                  </div>
                ))}
              </div>
            ))}
          </div>
        );


      case "OTHER":
        return (
          <div className='h-[80vh] w-full mt-2 px-2 border-2 border-dashed overflow-x-auto'>
            {others?.data?.map((item, index) => (
              <div key={index}>
                <div className='h-auto w-full shadow-xl p-3 rounded-md'>
                  <h1 className='text-primary'>Segment Code: <span className='text-black'>{item.SegmentCode}</span></h1>
                  <h1 className='text-primary'>Segment Title: <span className='text-black'>{item.SegmentTitle}</span></h1>
                  <h1 className='text-primary'>Family Code: <span className='text-black'>{item.FamilyCode}</span></h1>
                  <h1 className='text-primary'>Family Title: <span className='text-black'>{item.FamilyTitle}</span></h1>
                  <h1 className='text-primary'>Class Code: <span className='text-black'>{item.ClassCode}</span></h1>
                  <h1 className='text-primary'>Class Title: <span className='text-black'>{item.ClassTitle}</span></h1>
                  <h1 className='text-primary'>Brick Code: <span className='text-black'>{item.BrickCode}</span></h1>
                  <h1 className='text-primary'>Brick Title: <span className='text-black'>{item.BrickTitle}</span></h1>
                  <h1 className='text-primary'>Attribute Code: <span className='text-black'>{item.AttributeCode}</span></h1>
                  <h1 className='text-primary'>Attribute Title: <span className='text-black'>{item.AttributeTitle}</span></h1>
                  <h1 className='text-primary'>Attribute Value Code: <span className='text-black'>{item.AttributeValueCode}</span></h1>
                  <h1 className='text-primary'>Attribute Value Title: <span className='text-black'>{item.AttributeValueTitle}</span></h1>
                </div>
              </div>
            ))}
          </div>
        );

    }
  }

  return (
    <div className='flex justify-between gap-2 w-full'>
    
      {isLoading &&

        <div className='loading-spinner-background'
            style={{
                zIndex: 9999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)',
                display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed'


            }}
        >
            <DotLoader
                size={45}
                color={"#FF693A"}
                // height={4}
                loading={isLoading}
            />
        </div>
        }

      <div className='w-[20%] flex flex-col gap-2 mt-2'>
        <span
          className={`bg-[#3b5998] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer 
                            }`}
          onClick={() => handleOptionChange("GS1-GPC")}
        >
          <img
            src={gtrackIcon}
            className="w-5 h-5 ml-1"
            alt=""
          />
          GS1 GPC
        </span>
        <span
          className={`bg-[#00acee] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "HS-CODES" ? "bg-yellow-500" : ""
            }`}
          onClick={() => handleOptionChange("HS-CODES")}
        >
          <img
            src={gtrackIcon}
            className="w-5 h-5 ml-1"
            alt=""
          />
          HS CODES
        </span>
        <span
          className={`bg-[#0072b1] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "UNSPSC" ? "bg-yellow-500" : ""
            }`}
          onClick={() => handleOptionChange("UNSPSC")}
        >
          <img src={gtrackIcon} className="w-5 h-5 ml-1" alt="" />
          UNSPSC
        </span>
        <span
          className={`bg-[#E60023] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "OTHER"
            ? "bg-yellow-500"
            : ""
            }`}
          onClick={() => handleOptionChange("OTHER")}
        >
          <img
            src={gtrackIcon}
            className="w-5 h-5 ml-1"
            alt=""
          />
          OTHER
        </span>
      </div>

      <div className="sm:w-[80%] w-full">{renderDataGrid()}</div>
    </div>
  );
};

export default CodificationTab;
