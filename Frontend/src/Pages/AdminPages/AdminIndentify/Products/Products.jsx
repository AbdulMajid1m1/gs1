import React, { useContext, useEffect, useRef, useState } from "react";
import DataTable from "../../../../components/Datatable/Datatable";
import { GtinColumn } from "../../../../utils/datatablesource";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataTableContext } from "../../../../Contexts/DataTableContext";
import { Autocomplete, TextField } from "@mui/material";
import DashboardRightHeader from "../../../../components/DashboardRightHeader/DashboardRightHeader";


const Products = () => {
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

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [transactionId, setTransactionId] = useState([]);
  const [selectedTransactionId, setSelectedTransactionId] = useState("")
  const resetSnakeBarMessages = () => {
      setError(null);
      setMessage(null);

  };

  const handleSelectedTransactionId = (event, value) => {
    console.log(value?.transaction_id);
    setSelectedTransactionId(value);
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


  
  const handleRowClickInParent = (item) => {
    if (!item || item?.length === 0) {
      // setTableSelectedRows(data)
      // setFilteredData(data)
      return
    }
  }


  return (
    <div>
      <div className="p-0 h-full sm:ml-72">
        <div>
          <DashboardRightHeader title={"Products"}/>
        </div>

        <div className='flex justify-center items-center'>
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-6 bg-white shadow-xl rounded-md">

              {/* input */}
                {/* <label htmlFor="field2" className="text-secondary">Transaction Id </label> */}
                  <Autocomplete
                    id="field2"
                    options={transactionId}
                    value={selectedTransactionId}
                    getOptionLabel={(option) => option?.transaction_id || ""}
                    onChange={handleSelectedTransactionId}
                    onInputChange={(event, value) => {
                      if (!value) {
                        // perform operation when input is cleared
                        console.log("Input cleared");
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        autoComplete="off"
                        {...params}
                        InputProps={{
                        ...params.InputProps,
                        className: "text-white",
                        }}
                        InputLabelProps={{
                        ...params.InputLabelProps,
                          style: { color: "white" },
                        }}
                        className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                        placeholder="Select Member"
                        // required
                        />
                      )}
                      classes={{
                        endAdornment: "text-white",
                      }}
                      sx={{
                        "& .MuiAutocomplete-endAdornment": {
                          color: "white",
                        },
                      }}
                    />
          
              <div className='flex justify-center sm:justify-start items-center flex-wrap gap-2 py-6'>
                <button
                  className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm text-white transition duration-200 hover:bg-primary active:bg-blue-700">
                  GCP {data?.CompanyDetails?.GCP}
                </button>

                <button
                  className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm text-white transition duration-200 hover:bg-primary active:bg-blue-700">
                  {/* {data?.CompanyDetails?.Membership} */}
                  {data?.CompanyDetails?.Membership ? data.CompanyDetails.Membership : 'Category C'}
                </button>

                <button
                  className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm text-white transition duration-200 hover:bg-primary active:bg-blue-700">
                  {/* Member ID {currentUser?.user?.companyID} */}
                  Member ID
                </button>

              </div>


              <div style={{ marginLeft: '-25px', marginRight: '-25px' }}>

                <DataTable data={data} title="Member Products" columnsName={GtinColumn}
                  loading={isLoading}
                  secondaryColor="secondary"
                  // handleRowClickInParent={handleRowClickInParent}

                  dropDownOptions={[
                    {
                      label: "Edit",
                      icon: <EditIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                      ,
                      // action: handleEdit

                    },
                    {
                      label: "Delete",
                      icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />
                      ,
                    //   action: handleDelete,
                    }

                  ]}
                  uniqueId="adminProductId"

                />
              </div>

         
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products