import React, { useContext, useState } from 'react'
import DashboardRightHeader from '../../../../components/DashboardRightHeader/DashboardRightHeader'
import DataTable from '../../../../components/Datatable/Datatable'
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GtinColumn } from '../../../../utils/datatablesource';
import { DataTableContext } from '../../../../Contexts/DataTableContext';
import { useNavigate } from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Brands = () => {
  const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([
        {
            product_id: 'Initial Product ID',
            productnameenglish: 'Initial Product Name',
            BrandName: 'Initial Brand',
            qrcode: 'Initial QRCode',
            barcode: 'Initial Barcode',
            product_url: 'http://example.com/initial',
            product_link_url: 'http://example.com/link/initial',
            status: 'InActive',
          },
          {
            product_id: 'Initial Product ID',
            productnameenglish: 'Initial Product Name',
            BrandName: 'Initial Brand',
            qrcode: 'Initial QRCode',
            barcode: 'Initial Barcode',
            product_url: 'http://example.com/initial',
            product_link_url: 'http://example.com/link/initial',
            status: 'Active',
          },
          {
            product_id: 'Initial Product ID',
            productnameenglish: 'Initial Product Name',
            BrandName: 'Initial Brand',
            qrcode: 'Initial QRCode',
            barcode: 'Initial Barcode',
            product_url: 'http://example.com/initial',
            product_link_url: 'http://example.com/link/initial',
            status: 'Active',
          },
          {
            product_id: 'Initial Product ID',
            productnameenglish: 'Initial Product Name',
            BrandName: 'Initial Brand',
            qrcode: 'Initial QRCode',
            barcode: 'Initial Barcode',
            product_url: 'http://example.com/initial',
            product_link_url: 'http://example.com/link/initial',
            status: 'Active',
          },
    
    ]);
    const navigate = useNavigate();
    
    const { rowSelectionModel, setRowSelectionModel,
      tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
    const [filteredData, setFilteredData] = useState([]);

    //   useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const response = await newRequest.get("/users",);
          
    //       console.log(response.data);
    //       setData(response?.data || []);
    //       setIsLoading(false)

    //     } catch (err) {
    //       console.log(err);
    //       setIsLoading(false)
    //     }
    //   };

    //   fetchData(); // Calling the function within useEffect, not inside itself
    // }, []); // Empty array dependency ensures this useEffect runs once on component mount

    const handleEdit = (row) => {
      console.log(row);
    }

    const handleDelete = (row) => {
      console.log(row);
    }

  const handleRowClickInParent = (item) => {
      if (!item || item?.length === 0) {
        setTableSelectedRows(data)
        setFilteredData(data)
        return
      }
  
    }

  return (
    <div>
        <div className="p-0 h-full sm:ml-72">
            <div>
              <DashboardRightHeader 
                title={'Brands'}
              />
            </div>

            <div className='flex justify-center items-center'>
              <div className="h-auto w-[97%] px-0 pt-4">
                <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

                    {/* Back Button */}
                    <div className='flex justify-start sm:justify-start items-center flex-wrap gap-2 py-7 px-3'>
                        <button
                          // onClick={() => navigate('/member/bank-slip')}
                            className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                              <i className="fas fa-plus mr-2"></i>Add
                        </button>
                    </div>

                    {/* DataGrid */}
                    <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>
                      <DataTable data={data} 
                        title="Brands"
                        columnsName={GtinColumn}
                        loading={isLoading}
                        secondaryColor="secondary"
                        handleRowClickInParent={handleRowClickInParent}

                        dropDownOptions={[
                            {
                            label: "Edit",
                            icon: (
                              <EditIcon
                                fontSize="small"
                                color="action"
                                style={{ color: "rgb(37 99 235)" }}
                              />
                            ),
                            action: handleEdit,
                          },
                          {
                            label: "Delete",
                            icon: (
                              <DeleteIcon
                                fontSize="small"
                                color="action"
                                style={{ color: "rgb(37 99 235)" }}
                              />
                            ),
                            action: handleDelete,
                          },
                        ]}
                        uniqueId="gtinMainTableId"
                      />
                      </div>


                  </div>
                </div>
              </div>
        </div>
    </div>
  )
}

export default Brands