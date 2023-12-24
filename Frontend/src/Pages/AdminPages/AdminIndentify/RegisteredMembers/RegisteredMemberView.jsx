import React, { useContext, useEffect, useState } from 'react'
import DataTable from '../../../../components/Datatable/Datatable'
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataTableContext } from '../../../../Contexts/DataTableContext'
import { MembersBrandsColumn, MembersDocumentColumn, bankSlipColumn, financeColumn, memberHistoryColumnData, registeredmemberColumn, submenusDataColumn } from '../../../../utils/datatablesource'
import newRequest from '../../../../utils/userRequest'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import DataTable2 from '../../../../components/Datatable/Datatable2'
import './RegisteredMember.css'
import AddBrands from './AddBrands'
import UpdateBrands from './UpdateBrands'
import AddMemberDocuments from './AddMemberDocuments'
import DataTable3 from '../../../../components/Datatable/Datatable3'
import DashboardRightHeader from '../../../../components/DashboardRightHeader/DashboardRightHeader'
import MemberInvoicePopUp from './MemberInvoicePopUp'
import MembersDetails from './MembersDetails';
import SubMenusAddPopUp from './SubMenusAddPopUp';

const RegisteredMembersView = () => {
  const gs1MemberData = JSON.parse(sessionStorage.getItem("gs1memberRecord"));
  console.log(gs1MemberData)

  const { rowSelectionModel, setRowSelectionModel,
    tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
  const [filteredData, setFilteredData] = useState([]);

  const [allUserData, setAllUserData] = useState([]);
  const [registeredProductsData, setRegisteredProductsData] = useState([]);
  const [membersDocuemtsData, setMembersDocumentsData] = useState([]);
  const [registeredProductsLoader, setRegisteredProductsLoader] = useState(true);
  const [memberDocumentsLoader, setMemberDocumentsLoader] = useState(true);
  const [filteredMemberDetails, setFilteredMemberDetails] = useState([]);
  const [brandsLoader, setBrandsLoader] = useState(true);
  const [memberInvoiceLoader, setMemberInvoiceLoader] = useState(true);
  const [memberBankSlipLoader, setMemberBankSlipLoader] = useState(true);
  const [subMembersLoader, setSubMembersLoader] = useState(true);
  const [memberHistoryLoader, setMemberHistoryLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [memberInovice, setMemberInovice] = useState([]);
  const [memberBankSlip, setMemberBankSlip] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  const [subMenusData, setSubMenusData] = useState([]);
  const [memberHistoryData, setMemberHistoryData] = useState([]);

  // popUp States
  const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);
  const [isUpdatePopupVisible, setUpdatePopupVisibility] = useState(false);
  const [isAddMemberPopupVisible, setIsAddMemberPopupVisibility] = useState(false);
  const [isMemberInvoicePopupVisible, setIsMemberInvoicePopupVisible] = useState(false);
  const [isSubMenusPopupVisible, setIsSubMenusPopupVisible] = useState(false);

  const fetchMemberHistoryData = async () => {
    setMemberHistoryLoader(true);
    try {
      const response = await newRequest.get(`/logs/memberLogs/?member_id=${gs1MemberData?.memberID}`);
      // console.log(response.data);
      setMemberHistoryData(response?.data || []);
      setMemberHistoryLoader(false);

    } catch (err) {
      console.log(err);
      setMemberHistoryLoader(false);
    }
  };



  const fetchAllUserData = async () => {
    try {
      const response = await newRequest.get(`/users?id=${gs1MemberData?.id}`);
      // console.log(response.data[0]);
      setAllUserData(response?.data[0] || []);
      setIsLoading(false)

    }
    catch (err) {
      console.log(err);
      setIsLoading(false)
    }
  };

  const fetchMemberDocumentsData = async () => {
    setMemberDocumentsLoader(true);
    try {
      const response = await newRequest.get(`/memberDocuments?user_id=${gs1MemberData?.id}`);
      // console.log(response.data);
      setMembersDocumentsData(response?.data || []);
      setMemberDocumentsLoader(false);

    }
    catch (err) {
      console.log(err);
      setMemberDocumentsLoader(false);
    }
  };


  const fetchData = async () => {
    setBrandsLoader(true);
    try {
      const response = await newRequest.get(`/brands?user_id=${gs1MemberData?.id}`);

      // console.log(response.data);
      setBrandsData(response?.data || []);
      setBrandsLoader(false)

    } catch (err) {
      console.log(err);
      setBrandsLoader(false)
    }
  };


  const fetchMemberInvoiceData = async () => {
    setMemberInvoiceLoader(true);
    try {
      // const response = await newRequest.get(`/memberDocuments/finance?user_id=${gs1MemberData?.id}`);
      const response = await newRequest.get(`/memberDocuments?user_id=${gs1MemberData?.id}&type=invoice`);

      // console.log(response.data);
      setMemberInovice(response?.data || []);
      setMemberInvoiceLoader(false);

    } catch (err) {
      console.log(err);
      setMemberInvoiceLoader(false);
    }
  };


  const fetchMemberbankSlipData = async () => {
    setMemberBankSlipLoader(true);
    try {
      // const response = await newRequest.get(`/memberDocuments/finance?user_id=${gs1MemberData?.id}`);
      const response = await newRequest.get(`/memberDocuments?user_id=${gs1MemberData?.id}&type=bank_slip`);

      // console.log(response.data);
      setMemberBankSlip(response?.data || []);
      setFilteredMemberDetails(response?.data || []);
      setMemberBankSlipLoader(false);

    } catch (err) {
      console.log(err);
      setMemberBankSlipLoader(false);
    }
  };


  const fetchFilteredMemberDetails = async (row) => {
    console.log(row);
    // set(true);
    try {
      // const response = await newRequest.get(`/memberDocuments?user_id=${gs1MemberData?.id}&type=bank_slip&transaction_id=2875842183`);
      const response = await newRequest.get(`/memberDocuments?user_id=${gs1MemberData?.id}&type=bank_slip&transaction_id=${row[0]?.transaction_id}`);

      // console.log(response.data);
      setFilteredMemberDetails(response?.data || []);
      setIsLoading(false)

    } catch (err) {
      console.log(err);
      setIsLoading(false)
    }

    // console.log(gs1MemberData?.id)
  }


  const fetchSubMembersData = async () => {
    setSubMembersLoader(true);
    try {
      const response = await newRequest.get(`/users?parent_memberID=${gs1MemberData?.memberID}`);

      // console.log(response.data);
      setSubMenusData(response?.data || []);
      setSubMembersLoader(false)

    }
    catch (err) {
      console.log(err);
      setSubMembersLoader(false)
    }
  };


  useEffect(() => {

    fetchAllUserData();
    fetchMemberDocumentsData();
    fetchMemberHistoryData();
    fetchMemberInvoiceData();
    fetchMemberbankSlipData();
    fetchSubMembersData();
    fetchData(); // Calling the function within useEffect, not inside itself
  }, []); // Empty array dependency ensures this useEffect runs once on component mount



  useEffect(() => {
    const cartData = allUserData.carts || [];
    const stringifiedCartData = [].concat(...cartData.map((item) => {
      try {
        // Try parsing the JSON, and return the parsed object or null if invalid
        return JSON.parse(item.cart_items) || null;
      } catch (error) {
        console.error(`Error parsing JSON in cart_items: ${error.message}`);
        return null;
      }
    }));

    // Filter out null values (parsing errors) and keep only valid JSON objects
    const filteredCartData = stringifiedCartData.filter((item) => item !== null);
    // console.log(filteredCartData || []);

    // Set the registeredProductsData
    setRegisteredProductsData(filteredCartData || []);
    setRegisteredProductsLoader(false);
  }, [allUserData]);





  const handleView = (row) => {
    console.log(row);
  }

  const handleRowClickInParent = (item) => {
    console.log(item);
    if (!item || item?.length === 0) {
      // setTableSelectedRows(data)
      // setFilteredData(data)
      setFilteredMemberDetails(memberBankSlip)
      return
    }
    fetchFilteredMemberDetails(item);

  }


  const handleShowCreatePopup = () => {
    setCreatePopupVisibility(true);
  };

  const handleShowUpdatePopup = (row) => {
    setUpdatePopupVisibility(true);
    // console.log(row)
    sessionStorage.setItem("updateBrandData", JSON.stringify(row));
  };

  const handleShowAddMemberPopup = () => {
    setIsAddMemberPopupVisibility(true);
  };

  const handleShowMemberInvoicePopup = (row) => {
    if (row.status === 'approved') {
      toast.info('No any pending invoice', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      // If status is not 'approved', proceed with showing the popup
      setIsMemberInvoicePopupVisible(true);
      sessionStorage.setItem("memberInvoiceData", JSON.stringify(row));
    }
    // sessionStorage.setItem("memberInvoiceData", JSON.stringify(row));
  };


  const handleShowSubMenusPopup = () => {
    // setIsSubMenusPopupVisible(true);
    // console.log(gs1MemberData)
    if (allUserData?.memberID === null) {
      toast.info('User is not active', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setIsSubMenusPopupVisible(true);
    }

  };





  //Brand apis HandleDelete
  const handleDelete = async (row) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this User Account!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      // changes the color of the confirm button to red
      confirmButtonColor: '#1E3B8B',
      cancelButtonColor: '#FF0032',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const isDeleted = await newRequest.delete("/brands/" + row?.id);
          if (isDeleted) {
            toast.success('User deleted successfully', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });


            // filter out the deleted user from the data
            const filteredData = brandsData.filter((item) => item?.id !== row?.id);
            setBrandsData(filteredData);

          } else {
            // Handle any additional logic if the user was not deleted successfully
            toast.error('Failed to delete user', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

          }
        } catch (error) {
          // Handle any error that occurred during the deletion
          console.error("Error deleting user:", error);
          toast.error('Something went wrong while deleting user', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  };


  // member docuemnts apis HandleDelete
  const handleMemberDelete = async (MemberRow) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this User Account!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      // changes the color of the confirm button to red
      confirmButtonColor: '#1E3B8B',
      cancelButtonColor: '#FF0032',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const isDeleted = await newRequest.delete("/memberDocuments/" + MemberRow?.id);
          if (isDeleted) {
            toast.success('User deleted successfully', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });


            // filter out the deleted user from the data
            const filteredData = membersDocuemtsData.filter((item) => item?.id !== MemberRow?.id);
            setMembersDocumentsData(filteredData);

          } else {
            // Handle any additional logic if the user was not deleted successfully
            toast.error('Failed to delete user', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

          }
        } catch (error) {
          // Handle any error that occurred during the deletion
          console.error("Error deleting user:", error);
          toast.error('Something went wrong while deleting user', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  };


  return (
    <div>
      <div className="p-0 h-full sm:ml-72">
        <div className='bg-[#DAF2EE]'>
          <DashboardRightHeader title={"GS1 Member Details"} />
        </div>

        <div className='flex justify-center items-center bg-[#DAF2EE]'>
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-6 bg-white shadow-xl rounded-md">

              {/* All TextFeild comming from Props */}
              <MembersDetails gs1MemberData={allUserData} refreshAllUserData={fetchAllUserData} />


              {/* Registered Products */}
              <div style={{ marginLeft: '-11px', marginRight: '-11px' }}
              >
                <DataTable data={registeredProductsData}
                  title="Registered Products"
                  columnsName={registeredmemberColumn}
                  loading={registeredProductsLoader}
                  secondaryColor="secondary"
                  actionColumnVisibility={false}
                  checkboxSelection={"disabled"}

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

                  ]}
                  uniqueId="registeredProductsTableId"

                />
              </div>


              <div className='flex justify-between w-full mt-10'>
                <div className='w-full flex justify-end px-6'>
                  {/* <p className='text-blue-500 font-sans font-semibold'>Member Documents</p> */}
                  <button
                    onClick={handleShowAddMemberPopup}
                    className='bg-blue-500  font-sans font-normal text-sm px-4 py-1 text-white rounded-full hover:bg-blue-600'
                  >
                    Add
                  </button>
                </div>

                <div className='w-full flex justify-end px-6'>
                  <button
                    onClick={handleShowCreatePopup}
                    className='bg-blue-500  font-sans font-normal text-sm px-4 py-1 text-white rounded-full hover:bg-blue-600'
                  >
                    Add
                  </button>
                </div>
              </div>


              <div className='flex gap-5 flex-wrap'>
                <div style={{ marginLeft: '-11px', marginRight: '-11px' }}
                  className='sm:w-[50%] w-full'
                >
                  <DataTable2 data={membersDocuemtsData}
                    title="Member'z Documents"
                    columnsName={MembersDocumentColumn}
                    loading={memberDocumentsLoader}
                    secondaryColor="secondary"
                    checkboxSelection={false}

                    dropDownOptions={[
                      // {
                      // label: "Edit",
                      // icon: (
                      //     <EditIcon
                      //     fontSize="small"
                      //     color="action"
                      //     style={{ color: "rgb(37 99 235)" }}
                      //     />
                      // ),
                      // action: handleMemberStatusChange,
                      // },
                      {
                        label: "Delete",
                        icon: (
                          <DeleteIcon
                            fontSize="small"
                            color="action"
                            style={{ color: "rgb(37 99 235)" }}
                          />
                        ),
                        action: handleMemberDelete,
                      },


                    ]}
                    uniqueId="memberDocumentsTableId"

                  />
                </div>

                <div style={{ marginLeft: '-11px', marginRight: '-11px' }}
                  className='sm:w-[50%] w-full'
                >
                  <DataTable data={brandsData}
                    title="Brands"
                    columnsName={MembersBrandsColumn}
                    loading={brandsLoader}
                    secondaryColor="secondary"

                    dropDownOptions={[
                      // {
                      // label: "Add",
                      // icon: (
                      //     <VisibilityIcon
                      //     fontSize="small"
                      //     color="action"
                      //     style={{ color: "rgb(37 99 235)" }}
                      //     />
                      // ),
                      // action: handleView,
                      // },
                      {
                        label: "Edit",
                        icon: (
                          <EditIcon
                            fontSize="small"
                            color="action"
                            style={{ color: "rgb(37 99 235)" }}
                          />
                        ),
                        action: handleShowUpdatePopup,
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
                    uniqueId="brandsTableId"

                  />
                </div>
              </div>


              {/* </div> */}
            </div>
          </div>
        </div>


        {/* Finance Datagrid */}
        <div className='flex justify-center items-center bg-[#DAF2EE]'>
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-6 bg-white shadow-xl rounded-md">


              <div className='w-full flex justify-end px-6'>
                {/* <p className='text-blue-500 font-sans font-semibold'>Member Documents</p> */}
                <button
                  onClick={handleShowAddMemberPopup}
                  className='bg-blue-500  font-sans font-normal text-sm px-4 py-1 text-white rounded-full hover:bg-blue-600'
                >
                  Add
                </button>
              </div>

              <div className='flex gap-5 flex-wrap'>
                <div style={{ marginLeft: '-11px', marginRight: '-11px' }}
                  className='sm:w-[50%] w-full'
                >
                  <DataTable data={memberInovice}
                    title="Member Invoice"
                    columnsName={financeColumn}
                    loading={memberInvoiceLoader}
                    secondaryColor="secondary"
                    handleRowClickInParent={handleRowClickInParent}
                    // checkboxSelection='disabled'
                    buttonVisibility={false}
                    dropDownOptions={[
                      {
                        label: "Activation",
                        icon: <SwapHorizIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                        ,
                        action: handleShowMemberInvoicePopup,

                      },

                    ]}
                    uniqueId="memberInvoiceId"

                  />
                </div>

                <div style={{ marginLeft: '-11px', marginRight: '-11px' }}
                  className='sm:w-[50%] w-full'
                >
                  <DataTable3 data={filteredMemberDetails}
                    title="Member Bank Slip"
                    columnsName={bankSlipColumn}
                    loading={memberBankSlipLoader}
                    secondaryColor="secondary"
                    buttonVisibility={false}
                    checkboxSelection={"disabled"}
                    actionColumnVisibility={false}

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
                      // {
                      //   label: "Activation",
                      //   icon: <SwapHorizIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                      //   ,
                      //   action: handleMemberStatusChange,

                      // },

                    ]}
                    uniqueId="memberBankSlipId"

                  />
                </div>
              </div>

            </div>
          </div>
        </div>



        {/* Sub-menus */}
        <div className='flex justify-center items-center bg-[#DAF2EE]'>
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-6 bg-white shadow-xl rounded-md">

              <div className='flex justify-between'>
                <p className='text-blue-500 font-sans font-semibold'>Sub-Members</p>
                <button
                  onClick={handleShowSubMenusPopup}
                  className='bg-blue-500  font-sans font-normal text-sm px-4 py-1 text-white rounded-full hover:bg-blue-600'>
                  <i className="fas fa-plus mr-1"></i>Add
                </button>
              </div>

              <div style={{ marginLeft: '-11px', marginRight: '-11px' }}
              >
                <DataTable2 data={subMenusData}
                  title="Sub-Members"
                  columnsName={submenusDataColumn}
                  loading={subMembersLoader}
                  secondaryColor="secondary"
                  checkboxSelection={"disabled"}

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

                  ]}
                  uniqueId="customerListId"

                />
              </div>

            </div>
          </div>
        </div>


        {/* Member History */}
        <div className='flex justify-center items-center bg-[#DAF2EE]'>
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-6 bg-white shadow-xl rounded-md mb-6">

              <div style={{ marginLeft: '-11px', marginRight: '-11px', marginTop: '-20px' }}
              >
                <DataTable data={memberHistoryData}
                  title="Member History"
                  columnsName={memberHistoryColumnData}
                  loading={memberHistoryLoader}
                  secondaryColor="secondary"
                  checkboxSelection={"disabled"}

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

                  ]}
                  uniqueId="memberHistoryTableId"

                />
              </div>

            </div>
          </div>
        </div>



        {/* AddBrands component with handleShowCreatePopup prop */}
        {isCreatePopupVisible && (
          <AddBrands isVisible={isCreatePopupVisible} setVisibility={setCreatePopupVisibility} refreshBrandData={fetchData} />
        )}

        {/* UpdateBrands component with handleShowUpdatePopup prop */}
        {isUpdatePopupVisible && (
          <UpdateBrands isVisible={isUpdatePopupVisible} setVisibility={setUpdatePopupVisibility} refreshBrandData={fetchData} />
        )}

        {/* AddMember component with Handle prop */}
        {isAddMemberPopupVisible && (
          <AddMemberDocuments isVisible={isAddMemberPopupVisible} setVisibility={setIsAddMemberPopupVisibility} refreshBrandData={fetchMemberDocumentsData}
            fetchMemberbankSlipData={fetchMemberbankSlipData} />

        )}

        {/* Member Invoice component with Handle prop */}
        {isMemberInvoicePopupVisible && (
          <MemberInvoicePopUp isVisible={isMemberInvoicePopupVisible} setVisibility={setIsMemberInvoicePopupVisible} refreshMemberInoviceData={fetchMemberInvoiceData} 
            fetchAllUserData={fetchAllUserData}
          />
        )}

        {/* Add Sub Menus component with Handle prop */}
        {isSubMenusPopupVisible && (
          <SubMenusAddPopUp isVisible={isSubMenusPopupVisible} setVisibility={setIsSubMenusPopupVisible} refreshSubMenus={fetchSubMembersData} />
        )}


      </div>
    </div>
  )
}

export default RegisteredMembersView