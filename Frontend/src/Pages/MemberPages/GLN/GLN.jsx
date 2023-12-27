import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../../components/Datatable/Datatable'
import { GlnColumn } from '../../../utils/datatablesource'
import CustomSnakebar from '../../../utils/CustomSnackbar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import { SnackbarContext } from '../../../Contexts/SnackbarContext';
import logo from "../../../Images/logo.png";

// import { RiseLoader } from 'react-spinners'
// import { CurrentUserContext } from '../../Contexts/CurrentUserContext'
// import MapEvents from '../../Components/Maps/MapEvents'
import { QRCodeSVG } from 'qrcode.react'
import { DataTableContext } from '../../../Contexts/DataTableContext';

const GLN = () => {
  const [data, setData] = useState([
    {
        "gln_id": "4",
        "gcpGLNID": "1234567890126",
        "locationNameEn": "LMN",
        "locationNameAr": "LMN Address",
        "GLNBarcodeNumber": "LMN Person",
        "status": "1234567890",
        // "GLNEmail": ""
    },
    {
        "gln_id": "4",
        "gcpGLNID": "1234567890126",
        "locationNameEn": "LMN",
        "locationNameAr": "LMN Address",
        "GLNBarcodeNumber": "LMN Person",
        "status": "1234567890",
        // "GLNEmail": ""
    },
    {
        "gln_id": "4",
        "gcpGLNID": "1234567890126",
        "locationNameEn": "LMN",
        "locationNameAr": "LMN Address",
        "GLNBarcodeNumber": "LMN Person",
        "status": "1234567890",
        // "GLNEmail": ""
    },
    {
        "gln_id": "4",
        "gcpGLNID": "1234567890126",
        "locationNameEn": "LMN",
        "locationNameAr": "LMN Address",
        "GLNBarcodeNumber": "LMN Person",
        "status": "1234567890",
        // "GLNEmail": ""
    },
       

  ]);
  const { rowSelectionModel, setRowSelectionModel,
    tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);

  const [isLoading, setIsLoading] = useState(false);
//   const { openSnackbar } = useContext(SnackbarContext);
//   const { currentUser } = useContext(CurrentUserContext);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [filteredData, setFilteredData] = useState([]); // for the map markers
  const resetSnakeBarMessages = () => {
    setError(null);
    setMessage(null);

};
  const navigate = useNavigate()
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // /member/gln/list
//         const response = await phpRequest.post("/member/gln/list", {
//           user_id: currentUser?.user?.id 
//         });
//         console.log(response.data);
//         setData(response?.data?.GlnProducts || []);
//         setFilteredData(response?.data?.GlnProducts ?? [])
//         setIsLoading(false)
//       }
//       catch (err) {
//         console.log(err);
//         setIsLoading(false)
//       }
//     };

//     fetchData(); // Calling the function within useEffect, not inside itself
//   }, []); // Empty array dependency ensures this useEffect runs once on component mount



  const handleEdit = (row) => {
    console.log(row);
    // navigate("/member/update-gln/" + row?.gln_id)
    navigate("/member/update-gln")
  }


//   const handleUpdate = (row) => {
//     console.log(row);
//   }

//   const handleDigitalUrlInfo = (row) => {
//     navigate("/digitalurl")
//     // sessionStorage.setItem("selectedGlnData", row);
//   }

  // const handleDelete = (row) => {
  //     console.log(row);
  // }

//   const handleDelete = async (row) => {
//     try {
//       const deleteResponse = await phpRequest.delete('/delete/GLN', {
//         data: {
//           user_id: currentUser?.user?.id, // TODO: change it to currentUser?.user?.id
//           product_id: row?.gln_id,
//         },
//       });
//       console.log(deleteResponse.data);
//       const successMessage = deleteResponse.data.message;
//       openSnackbar(successMessage);

//       // Update the datagrid Table after deletion
//       setData(prevData => prevData.filter(item => item.gln_id !== row.gln_id));

//       // Handle the success message or update the data accordingly
//     } catch (err) {
//       console.log(err);
//       openSnackbar('Something Is Wrong The Data not deleted.')
//       // Handle the error message or error case
//     }
//   };

  const handleRowClickInParent = (item) => {
    if (!item || item?.length === 0) {
      setFilteredData(data)
      return
    }
    setFilteredData(item)

    const barcodes = item.map((row) => row.GLNBarcodeNumber);
    console.log(barcodes); // This will log an array of barcodes
    // setSelectedRow(barcodes);
    setTableSelectedRows(barcodes);
  }

  const handleDelete = async (row) => {
    console.log(row);
  }


    // Gtin Page Print
    const handleGlnPage = () => {
      if (tableSelectedRows.length === 0) {
       setError('Please select a row to print.');
       return;
     }
     const printWindow = window.open('', 'Print Window', 'height=400,width=800');
     const html = '<html><head><title>GLN Barcode Number</title>' +
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
 
 

  return (
    <div>

      {message && <CustomSnakebar message={message} severity="success" onClose={resetSnakeBarMessages} />}
      {error && <CustomSnakebar message={error} severity="error" onClose={resetSnakeBarMessages} />}

      <div className="p-3 h-full sm:ml-72">
        <div className='h-auto w-full'>
          <div className='h-16 w-full shadow-xl flex justify-start items-center px-5 border-l-2 border-t-2 border-r-2 border-[#e49515]'>
            <p className='sm:text-2xl text-sm font-body'>View GLN</p>
          </div>
        </div>

        <div className='h-auto w-full shadow-xl'>
          <div className='flex justify-center sm:justify-start items-center flex-wrap gap-2 py-10 px-3'>
            <button onClick={() => navigate(-1)} className="rounded-full bg-secondary font-body px-8 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
              <i className="fas fa-arrow-left mr-1"></i> Back
            </button>

            <button onClick={() => navigate('/member/add-gln')} className="rounded-full bg-secondary font-body px-8 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
              <i className="fas fa-plus mr-1"></i> Add GLN
            </button>

            <button onClick={handleGlnPage} className="rounded-full bg-secondary font-body px-8 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
              <i className="fas fa-print mr-1"></i> Print GLN
            </button>
          </div>
        </div>




        <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>
          <DataTable data={data} title={"MEMBER GLN LIST"} columnsName={GlnColumn} backButton={false}
            loading={isLoading}
            secondaryColor="secondary"
            uniqueId={"gln_id"}
            handleRowClickInParent={handleRowClickInParent}
            dropDownOptions={[
              {
                label: "Edit",
                icon: <EditIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                ,
                action: handleEdit

              },
              {
                label: "Delete",
                icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />
                ,
                action: handleDelete,
              }

            ]}
          />

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

          {/* <MapEvents locations={filteredData} /> */}
        </div>
      </div>
    </div>
  )
}

export default GLN