import React, { useContext, useEffect, useRef, useState } from "react";
import DataTable from "../../../components/Datatable/Datatable";
import { GtinColumn } from "../../../utils/datatablesource";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomSnakebar from '../../../utils/CustomSnackbar';
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { QRCodeSVG } from "qrcode.react";
import logo from "../../../Images/gs1logowhite.png"
import { DataTableContext } from "../../../Contexts/DataTableContext";
import newRequest from "../../../utils/userRequest";
import { toast } from "react-toastify";


const Gtin = () => {
  const [data, setData] = useState([]);
  const memberDataString = sessionStorage.getItem('memberData');
  const memberData = JSON.parse(memberDataString);
  console.log(memberData);

  const { rowSelectionModel, setRowSelectionModel,
    tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);

  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]); // for the map markers
  const navigate = useNavigate()

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const resetSnakeBarMessages = () => {
      setError(null);
      setMessage(null);

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newRequest.get(`/products?user_id=${memberData?.id}`);
        console.log(response.data);
        setData(response?.data || []);
        setIsLoading(false)

      } catch (err) {
        console.log(err);
        setIsLoading(false)
      }
    };

    fetchData(); // Calling the function within useEffect, not inside itself
  }, []); // Empty array dependency ensures this useEffect runs once on component mount


  const handleEdit = (row) => {
    console.log(row);
    navigate("/member/upate-gtin-product/" + row?.id);
    // navigate("/upate-gtin-product/" + row?.id);
  };

  const handleView = (row) => {
    console.log(row);
    navigate("/member/view-gtin-product/" + row?.id);
  };
  const handleUpdate = (row) => {
    console.log(row);
  }
  const handleDigitalUrlInfo = (row) => {
    sessionStorage.setItem("selectedGtinData", JSON.stringify(row));
    navigate("/digitalurl")
  }

  const handleDelete = async (row) => {
    try {
      const deleteResponse = await newRequest.delete(`/products/gtin/${row?.id}`);
      console.log(deleteResponse.data);
      toast.success('The product has been deleted successfully.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });

      // Update the datagrid Table after deletion
      setData(prevData => prevData.filter(item => item.id !== row?.id));


    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.error || 'Error', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    }
  };

  const handleExportProducts = () => {
    // Convert data to Excel format
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data); // Assuming `data.products` is the array containing the API response data
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
              onClick={() => navigate('/member/addproducts')}
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
              Export in Excel <i className="fas fa-caret-down ml-1"></i>
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

            {/* <button
              onClick={handleExportProducts}
              className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary active:bg-blue-700">
              <i className="fas fa-download mr-1"></i> Download
            </button> */}
          </div>



          <div className='flex justify-center sm:justify-start items-center flex-wrap gap-2 py-3 px-3'>
            <button
              className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary active:bg-blue-700">
              GCP {data[0]?.gcpGLNID}
            </button>

            <button
              className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary active:bg-blue-700">
              {/* {data?.CompanyDetails?.Membership} */}
              {data?.[0]?.Membership ? data[0]?.Membership : 'Category C'}
            </button>

            <button
              className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary active:bg-blue-700">
              Member ID {memberData?.memberID}
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
                  action: handleDelete,
                }

              ]}
              uniqueId="customerListId"

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