import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import DataTable from '../../../../components/Datatable/Datatable';
import { financeColumn } from '../../../../utils/datatablesource';
import newRequest from '../../../../utils/userRequest';
import DataTable3 from '../../../../components/Datatable/Datatable3';

const FinancePopUp = ({ isVisible, setVisibility, refreshBrandData }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [memberInovice, setMemberInovice] = useState([]);
    const [memberBankSlip, setMemberBankSlip] = useState([]);
       
    // get the sesstion data
    const registeredMemberRowData = JSON.parse(sessionStorage.getItem("registeredMemberRowData"));
    console.log(registeredMemberRowData)
    // const [loading, setLoading] = useState(false);

    const [filteredMemberDetails, setFilteredMemberDetails] = useState([]);
    const fetchFilteredMemberDetails = async (row) => {
      console.log(row);
      setIsLoading(true);
      try {
        // const response = await newRequest.get(`/memberDocuments?user_id=${gs1MemberData?.id}&type=bank_slip&transaction_id=2875842183`);
        const response = await newRequest.get(`/memberDocuments?user_id=${registeredMemberRowData?.id}&type=bank_slip&transaction_id=${row?.transaction_id}`);
        
        console.log(response.data);
        setFilteredMemberDetails(response?.data || []);
        setIsLoading(false)

      } catch (err) {
        console.log(err);
        setIsLoading(false)
    }

    console.log(gs1MemberData?.id)
  }

    useEffect(() => {
      const fetchMemberInvoiceData = async () => {
        try {
          const response = await newRequest.get(`/memberDocuments?user_id=${registeredMemberRowData?.id}&type=invoice`);
        
          console.log(response.data);
          setMemberInovice(response?.data || []);
          setIsLoading(false)

        } 
        catch (err) {
          console.log(err);
          setIsLoading(false)
          }
      };


    const fetchMemberbankSlipData = async () => {
        try {
          // const response = await newRequest.get(`/memberDocuments/finance?user_id=${gs1MemberData?.id}`);
          const response = await newRequest.get(`/memberDocuments?user_id=${registeredMemberRowData?.id}&type=bank_slip`);
          
          console.log(response.data);
          setMemberBankSlip(response?.data || []);
          setFilteredMemberDetails(response?.data || []);
          setIsLoading(false)
  
        } catch (err) {
          console.log(err);
          setIsLoading(false)
            }
        };

      fetchMemberInvoiceData();
      fetchMemberbankSlipData();
    }, []); // Empty array dependency ensures this useEffect runs once on component mount


    
    const handleCloseFinacePopup = () => {
        setVisibility(false);
      };

    
      const handleRowClickInParent = (item) => {
        if (!item || item?.length === 0) {
          // setTableSelectedRows(data)
          // setFilteredData(data)
          setFilteredMemberDetails(memberBankSlip)
          return
        }
        fetchFilteredMemberDetails(item);
        
        }
  
    
   
  return (
    <div>
          {/* create the post api popup */}
          {isVisible && (
                    <div className="popup-overlay">
                      <div className="popup-container h-auto sm:w-[80%] w-full">
                        <div className="popup-form w-full">         
                        <form className='w-full'>

               
                        <div className='flex gap-5 justify-center items-center flex-wrap'>
                          <div style={{ marginLeft: '-11px', marginRight: '-11px' }}
                              className='w-full sm:w-1/2'
                           >
                          <DataTable data={memberInovice} 
                              title="Member Invoice"
                              columnsName={financeColumn}
                                  loading={isLoading}
                                  secondaryColor="secondary"
                                  handleRowClickInParent={handleRowClickInParent}
                                  buttonVisibility={false}

                              uniqueId="journalMovementClId"

                              />
                            </div>

                            <div style={{ marginLeft: '-11px', marginRight: '-11px' }}
                               className='w-full sm:w-1/2'
                            >
                            <DataTable3 data={filteredMemberDetails} 
                              title="Member Bank Slip"
                              columnsName={financeColumn}
                                  loading={isLoading}
                                  secondaryColor="secondary"
                                  buttonVisibility={false}

                              uniqueId="journalMovementClDetId"

                              />
                            </div>
                          </div>


                        <div className="w-full flex justify-start items-center mt-5 px-5">
                               <button
                                 type="button"
                                 className="px-7 py-2 rounded-sm bg-primary text-white font-body text-sm"
                                 onClick={handleCloseFinacePopup}
                               >
                                 Close
                               </button>
                             </div>
                            </form>
                         </div>
                       </div>
                     </div>
                   )}
                    
    </div>
  )
}

export default FinancePopUp