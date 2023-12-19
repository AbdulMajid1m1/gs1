import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import DataTable from '../../../../components/Datatable/Datatable';
import { financeColumn } from '../../../../utils/datatablesource';
import newRequest from '../../../../utils/userRequest';

const FinancePopUp = ({ isVisible, setVisibility, refreshBrandData }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
   
    // get the sesstion data
    const registeredMemberRowData = JSON.parse(sessionStorage.getItem("registeredMemberRowData"));
    console.log(registeredMemberRowData)
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFinanceData = async () => {
        try {
            // const response = await newRequest.get(`/users/cart?user_id=${gs1MemberData?.id}`);
            const response = await newRequest.get(`/memberDocuments/finance?user_id=${registeredMemberRowData?.id}`);
            
            console.log(response.data);
            setData(response?.data || []);
            setIsLoading(false)

        } catch (err) {
            console.log(err);
            setIsLoading(false)
            }
        };

        fetchFinanceData();
    }, []); // Empty array dependency ensures this useEffect runs once on component mount


    
    const handleCloseFinacePopup = () => {
        setVisibility(false);
      };

    
    const handleRowClickInParent = (item) => {
        if (!item || item?.length === 0) {
          setTableSelectedRows(data)
          setFilteredData(data)
          return
        }
    
      }

    
   
  return (
    <div>
          {/* create the post api popup */}
          {isVisible && (
                    <div className="popup-overlay">
                      <div className="popup-container h-auto sm:w-[50%] w-full">
                        <div className="popup-form">         
                       
                            <div 
                            className='h-auto sm:w-[37%]'
                            >
                            <DataTable data={data} 
                                title="Finance"
                                columnsName={financeColumn}
                                    loading={isLoading}
                                    secondaryColor="secondary"
                                    handleRowClickInParent={handleRowClickInParent}
                                    buttonVisibility={false}
                                    actionColumnVisibility={false}

                                // dropDownOptions={[
                                //     {
                                //     label: "View",
                                //     icon: (
                                //         <VisibilityIcon
                                //         fontSize="small"
                                //         color="action"
                                //         style={{ color: "rgb(37 99 235)" }}
                                //         />
                                //     ),
                                //     action: handleView,
                                //     },
                                //     {
                                //       label: "Activation",
                                //       icon: <SwapHorizIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                                //       ,
                                //       action: handleMemberStatusChange,
                    
                                //     },

                                // ]}
                                uniqueId="gtinMainTableId"

                                />
                            </div>


                        <div className="sm:w-[30%] w-full flex justify-start items-center mt-5">
                               <button
                                 type="button"
                                 className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                                 onClick={handleCloseFinacePopup}
                               >
                                 Close
                               </button>
                             </div>
                         </div>
                       </div>
                     </div>
                   )}
                    
    </div>
  )
}

export default FinancePopUp