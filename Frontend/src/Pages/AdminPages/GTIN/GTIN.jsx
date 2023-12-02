import React, { useContext, useEffect, useRef, useState } from "react";
import DataTable from "../../../components/Datatable/Datatable";
import { GtinColumn } from "../../../utils/datatablesource";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkIcon from '@mui/icons-material/Link';
import { SnackbarContext } from "../../../Contexts/SnackbarContext";
import CustomSnakebar from '../../../utils/CustomSnackbar';
import { saveAs } from "file-saver";
import { RiseLoader } from 'react-spinners';
import * as XLSX from "xlsx";
// import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import { QRCodeSVG } from "qrcode.react";
import logo from "../../../Images/gs1logowhite.png"
import { DataTableContext } from "../../../Contexts/DataTableContext";


const Gtin = () => {
  const [data, setData] = useState([

     {
        product_id: 'Initial Product ID',
        productnameenglish: 'Initial Product Name',
        BrandName: 'Initial Brand',
        qrcode: 'Initial QRCode',
        barcode: 'Initial Barcode',
        product_url: 'http://example.com/initial',
        product_link_url: 'http://example.com/link/initial',
        status: 'Initial Status',
      },
      {
        product_id: 'Initial Product ID',
        productnameenglish: 'Initial Product Name',
        BrandName: 'Initial Brand',
        qrcode: 'Initial QRCode',
        barcode: 'Initial Barcode',
        product_url: 'http://example.com/initial',
        product_link_url: 'http://example.com/link/initial',
        status: 'Initial Status',
      },
      {
        product_id: 'Initial Product ID',
        productnameenglish: 'Initial Product Name',
        BrandName: 'Initial Brand',
        qrcode: 'Initial QRCode',
        barcode: 'Initial Barcode',
        product_url: 'http://example.com/initial',
        product_link_url: 'http://example.com/link/initial',
        status: 'Initial Status',
      },
      {
        product_id: 'Initial Product ID',
        productnameenglish: 'Initial Product Name',
        BrandName: 'Initial Brand',
        qrcode: 'Initial QRCode',
        barcode: 'Initial Barcode',
        product_url: 'http://example.com/initial',
        product_link_url: 'http://example.com/link/initial',
        status: 'Initial Status',
      },

  ]);
  const { rowSelectionModel, setRowSelectionModel,
    tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);

  const { openSnackbar } = useContext(SnackbarContext);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]); // for the map markers
//   const { currentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate()
//   console.log(currentUser)

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const resetSnakeBarMessages = () => {
      setError(null);
      setMessage(null);

  };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await phpRequest.post("/member/gtin/list", {
//           user_id: currentUser?.user?.id

//         });
//         console.log(response.data);
//         setData(response?.data?.products || []);
//         setIsLoading(false)

//       } catch (err) {
//         console.log(err);
//         setIsLoading(false)
//       }
//     };

//     fetchData(); // Calling the function within useEffect, not inside itself
//   }, []); // Empty array dependency ensures this useEffect runs once on component mount


  const handleEdit = (row) => {
    console.log(row);
    navigate("/upate-gtin-product/" + row?.product_id);
    // navigate("/upate-gtin-product/" + row?.id);
  };
  const handleView = (row) => {
    console.log(row);
    navigate("/view-gtin-product/" + row?.product_id);
  };
  const handleUpdate = (row) => {
    console.log(row);
  }
  const handleDigitalUrlInfo = (row) => {
    sessionStorage.setItem("selectedGtinData", JSON.stringify(row));
    navigate("/digitalurl")
  }
  // const handleDelete = (row) => {
  //   console.log(row);
  // }

//   const handleDelete = async (row) => {
//     try {
//       const deleteResponse = await phpRequest.delete('/delete/GTIN', {
//         data: {
//           user_id: currentUser?.user?.id, // TODO: change it to currentUser?.user?.id
//           // user_id: "3", // TODO: change it to currentUser?.user?.id
//           product_id: row?.product_id,
//         },
//       });
//       console.log(deleteResponse.data);
//       // Handle the success message or update the data accordingly
//       const successMessage = deleteResponse.data.message;
//       openSnackbar(successMessage);


//       // Update the datagrid Table after deletion
//       setData(prevData => prevData.filter(item => item.product_id !== row?.product_id));


//     } catch (err) {
//       console.log(err);
//       // Handle the error message or error case
//       openSnackbar('Something Is Wrong The Data not deleted.')
//     }
//   };

  const handleExportProducts = () => {
    // Convert data to Excel format
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data.products); // Assuming `data.products` is the array containing the API response data
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Save Excel file
    saveAs(dataBlob, 'products.xlsx');
  };


  // file Import
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

//   const handleFileInputChange = (event) => {
//     const selectedFile = event.target.files[0];
//     setIsLoading(true);


//     if (selectedFile) {
//       const formData = new FormData();
//       formData.append('user_id', currentUser?.user?.id);
//       formData.append('file', selectedFile);

//       phpRequest.post('/member/GTIN/Bulk/Import', formData)
//         .then((response) => {
//           // Handle the successful response
//           console.log(response.data);
//           openSnackbar("The data has been imported successfully");
//           setIsLoading(false)

//         })
//         .catch((error) => {
//           // Handle the error
//           console.error(error);
//           openSnackbar('Something is Wrong')
//           setIsLoading(false)

//         });
//     }
//   };


  // Gtin Page Print
  const handleGtinPage = () => {
     if (tableSelectedRows.length === 0) {
      setError('Please select a row to print.');
      return;
    }
    const printWindow = window.open('', 'Print Window', 'height=400,width=800');
    const html = '<html><head><title>GTIN Number</title>' +
      '<style>' +
      '@page { size: 3in 2in; margin: 0; }' +
      'body { font-size: 13px; line-height: 0.1;}' +
      '#header { display: flex; justify-content: center;}' +
      '#imglogo {height: 50px; width: 100px; visibility: hidden;}' +
      '#itemcode { font-size: 13px; font-weight: 600; display: flex; justify-content: center;}' +
      '#inside-BRCode { display: flex; justify-content: center; align-items: center; padding: 1px;}' +
      '#itemSerialNo { font-size: 13px; display: flex; justify-content: center; font-weight: 600; margin-top: 3px;}' +
      '#Qrcodeserails { height: 100%; width: 100%;}' +
      '</style>' +
      '</head><body>' +
      '<div id="printBarcode"></div>' +
      '</body></html>';

    printWindow.document.write(html);
    const barcodeContainer = printWindow.document.getElementById('printBarcode');
    const barcode = document.getElementById('barcode').cloneNode(true);
    barcodeContainer.appendChild(barcode);

    const logoImg = new Image();
    logoImg.src = logo;

    logoImg.onload = function () {
      // printWindow.document.getElementById('imglogo').src = logoImg.src;
      printWindow.print();
      printWindow.close();
        setTimeout(() => {
          setTableSelectedRows([]);
          setRowSelectionModel([]);
         }, 500);
        
    };
  }





  
  const handleRowClickInParent = (item) => {
    if (!item || item?.length === 0) {
      // setTableSelectedRows(data)
      setFilteredData(data)
      return
    }

    const barcodes = item.map((row) => row.barcode);
    console.log(barcodes); // This will log an array of barcodes
    setTableSelectedRows(barcodes);
  }


  return (
    <div>
      {/* <SideBar /> */}

      {message && <CustomSnakebar message={message} severity="success" onClose={resetSnakeBarMessages} />}
      {error && <CustomSnakebar message={error} severity="error" onClose={resetSnakeBarMessages} />}


      <div className="p-3 h-full sm:ml-72">
        {/* <div className='h-10 w-full mb-6 bg-[#1E3B8B] rounded'>
          <p className='sm:text-2xl sm:py-0 py-2 sm:px-10 px-10 text-white font-medium'>GS1 Traceability System</p>
        </div> */}

        <div className='h-auto w-full shadow-xl'>
          <div className='flex justify-center sm:justify-start items-center flex-wrap gap-2 py-3 px-3'>
            <button
              onClick={() => navigate('/addproducts')}
              className="rounded-full bg-primary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-secondary active:bg-blue-700">
              <i className="fas fa-plus mr-1"></i>Add Product
            </button>

            <button
              className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary active:bg-blue-700">
              Export Bulk Barcodes <i className="fas fa-caret-down ml-1"></i>
            </button>

            <button
              className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary active:bg-blue-700"
              onClick={handleExportProducts}
            >
              Export Products <i className="fas fa-caret-down ml-1"></i>
            </button>


            <div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                // onChange={handleFileInputChange}
              />
              <button
                className="rounded-full bg-primary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-secondary active:bg-blue-700"
                onClick={handleImportClick}
              >
                <i className="fas fa-file-import mr-1"></i> Import
              </button>
            </div>

            <button
              onClick={handleExportProducts}
              className="rounded-full bg-[#1E3B8B] font-body px-4 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary active:bg-blue-700">
              Download Template <i className="fas fa-caret-down ml-1"></i>
            </button>

            <button
              onClick={handleExportProducts}
              className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary active:bg-blue-700">
              <i className="fas fa-download mr-1"></i> Download
            </button>
          </div>



          <div className='flex justify-center sm:justify-start items-center flex-wrap gap-2 py-3 px-3'>
            <button
              className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary active:bg-blue-700">
              GCP {data?.CompanyDetails?.GCP}
            </button>

            <button
              className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary active:bg-blue-700">
              {/* {data?.CompanyDetails?.Membership} */}
              {data?.CompanyDetails?.Membership ? data.CompanyDetails.Membership : 'Category C'}
            </button>

            <button
              className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary active:bg-blue-700">
              {/* Member ID {currentUser?.user?.companyID} */}
              Member ID
            </button>

            <button
               onClick={handleGtinPage} 
              className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary active:bg-blue-700">
                  Print GTIN
            </button>
          </div>


          <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>

            <DataTable data={data} title="GTIN LIST" columnsName={GtinColumn}
              loading={isLoading}
              secondaryColor="secondary"
              handleRowClickInParent={handleRowClickInParent}

              dropDownOptions={[
                {
                  label: "View",
                  icon: (
                    <VisibilityIcon
                      fontSize="small"
                      color="action"
                      style={{ color: "rgb(37 99 235)" }}
                    />
                  ),
                  action: handleView,
                },
                {
                  label: "Edit",
                  icon: <EditIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                  ,
                  action: handleEdit

                },
                {
                  label: "Digital Links",
                  icon: (
                    <VisibilityIcon
                      fontSize="small"
                      color="action"
                      style={{ color: "rgb(37 99 235)" }}
                    />
                  ),
                  action: handleDigitalUrlInfo,
                }
                ,
                {
                  label: "Delete",
                  icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />
                  ,
                //   action: handleDelete,
                }

              ]}
              uniqueId="gtinMainTableId"

            />
          </div>


          
          <div id="barcode">
          {tableSelectedRows.map((barcode, index) => (
            <div id="Qrcodeserails" className="hidden" key={index}>
                <div id="header">
                    <div>
                      <img src={logo} id="imglogo" alt="" />
                    </div>
                </div>
                <div id="inside-BRCode">
                    <QRCodeSVG value={barcode} width="170" height="70" />
                </div>
                <div id="itemSerialNo">
                    <p>{barcode}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Gtin