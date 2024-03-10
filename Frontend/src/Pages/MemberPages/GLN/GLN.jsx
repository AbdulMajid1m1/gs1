import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../../components/Datatable/Datatable'
import { GlnColumn } from '../../../utils/datatablesource'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import logo from "../../../Images/logo.png";
import { QRCodeSVG } from 'qrcode.react'
import { DataTableContext } from '../../../Contexts/DataTableContext';
import DashboardRightHeader from '../../../components/DashboardRightHeader/DashboardRightHeader';
import newRequest from '../../../utils/userRequest';
import MapEvents from '../../../components/Maps/MapEvents';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import CustomSnakebar from '../../../utils/CustomSnackbar';

const GLN = () => {
  const [data, setData] = useState([]);
  const { rowSelectionModel, setRowSelectionModel,
    tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
  const memberDataString = sessionStorage.getItem('memberData');
  const memberData = JSON.parse(memberDataString);
  const { t, i18n } = useTranslation();
  // console.log(memberData);

  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]); // for the map markers
  
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const resetSnakeBarMessages = () => {
    setError(null);
    setMessage(null);

  };
 
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newRequest.get(`/gln?user_id=${memberData?.id}`);
        // console.log(response.data);

        setData(response?.data);
        setFilteredData(response?.data ?? [])
        setIsLoading(false)
      }
      catch (err) {
        // console.log(err);
        setIsLoading(false)
      }
    };

    fetchData(); // Calling the function within useEffect, not inside itself
  }, []); // Empty array dependency ensures this useEffect runs once on component mount



  const handleEdit = (row) => {
    // console.log(row);
    navigate("/member/update-gln/" + row?.id)
    // save the response in session 
    sessionStorage.setItem('glnData', JSON.stringify(row));
  }


  const handleDelete = async (row) => {
    try {
      const deleteResponse = await newRequest.delete(`/gln/${row.id}`);
      // console.log(deleteResponse.data);

      toast.success(deleteResponse?.data?.message || `${t('GLN')}  ${t('deleted successfully')}`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

   
      // Update the datagrid Table after deletion
      setData(prevData => prevData.filter(item => item.id !== row.id));

    } 
    catch (err) {
      // console.log(err);

      toast.error(err?.response?.data?.error || 'Error', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

   const handleRowClickInParent = (item) => {
    if (!item || item?.length === 0) {
      setFilteredData(data)
      return
    }
    setFilteredData(item)

    const barcodes = item.map((row) => row.GLNBarcodeNumber);
    // console.log(barcodes); // This will log an array of barcodes
    // setSelectedRow(barcodes);
    setTableSelectedRows(barcodes);
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

      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        {/* <div className='h-auto w-full'>
          <div className='h-16 w-full shadow-xl flex justify-start items-center px-5 border-l-2 border-t-2 border-r-2 border-[#e49515]'>
            <p className='sm:text-2xl text-sm font-body'>View GLN</p>
          </div>
        </div> */}
        <div>
          <DashboardRightHeader title={`${t('GLN')}`} />
        </div>

        <div className='flex justify-center items-center'>
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

              <div className={`flex  sm:justify-start items-center flex-wrap gap-2 py-7 px-3 ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}>
            <button onClick={() => navigate(-1)} className="rounded-full bg-secondary font-body px-8 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
              <i className="fas fa-arrow-left mr-1"></i>  {t('Back')}
            </button>

            <button onClick={() => navigate('/member/add-gln')} className="rounded-full bg-secondary font-body px-8 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
              <i className="fas fa-plus mr-1"></i> {t('Add GLN')}
            </button>

            <button onClick={handleGlnPage} className="rounded-full bg-secondary font-body px-8 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
              <i className="fas fa-print mr-1"></i>  {t('Print')} {t('GLN')}
            </button>
          </div>


        <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>
                <DataTable data={data} title={`${t('GLN LIST')}`} columnsName={GlnColumn(t, i18n)} backButton={false}
            loading={isLoading}
            secondaryColor="secondary"
            uniqueId={"gln_id"}
            handleRowClickInParent={handleRowClickInParent}
            dropDownOptions={[
              {
                label: `${t('Edit')}`,
                icon: <EditIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                ,
                action: handleEdit

              },
              {
                label: `${t('Delete')}`,
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

          <MapEvents locations={filteredData} />
        </div>
      </div>


          </div>
        </div>
      </div>
    </div>
  )
}

export default GLN