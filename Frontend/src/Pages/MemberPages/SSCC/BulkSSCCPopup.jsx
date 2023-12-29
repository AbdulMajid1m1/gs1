import React, { useContext, useState } from 'react';
import './BulkSSCCPopup.css';
// import phpRequest from '../../utils/phpRequest';
import { RiseLoader } from 'react-spinners';

const BulkSSCCPopup = ({ onClose, onGenerate }) => {
  const [extensionDigit, setExtensionDigit] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
  
 
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   console.log(extensionDigit, quantity)
  //   try {
  //     const requestBody = {
  //       preDigit: extensionDigit,
  //       quantity: quantity,
  //       user_id: currentUser?.user?.id // Replace with currentUser?.user?.id if needed
  //     };

  //     const response = await phpRequest.post('/member/bulk/SSCC', requestBody);
  //       console.log(response.data);

  //       //  display message
  //       const successMessage = response.data.message;
  //       openSnackbar(successMessage);
  //       setIsLoading(false);
  //       // reset form
  //       e.target.reset();

  //     } catch (error) {
  //         console.log(error);
  //         openSnackbar('Something Is Wrong ');
  //         setIsLoading(false);
  //     }
  // };

  return (
    <div className="popup-container">


        {isLoading &&

        <div className='loading-spinner-background'
        style={{
            zIndex: 9999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)',
            display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed'


        }}
        >
        <RiseLoader
            size={18}
            color={"#6439ff"}
            // height={4}
            loading={isLoading}
        />
        </div>
        }
        
      <div className="popup-content">
        <h2 className='font-body text-gray-500'>Generate Bulk SSCC Barcodes</h2>
        {/* <form onSubmit={handleSubmit}> */}
        <form>
          <div className="form-group">
            <label htmlFor="input1" className='font-body text-gray-800'>Extension Digit <span className='text-red-500'>*</span></label>
            <select 
              onChange={(e) => setExtensionDigit(e.target.value)}
              type="text" id="input1" 
            
            >
              <option>-select-</option>
              <option value='0'>0</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="input2" className='font-body text-gray-800'>Quantity <span className='text-red-500'>*</span></label>
            <input 
              onChange={(e) => setQuantity(e.target.value)}
              type="number" 
                id="input2" />
          </div>
          <div className="buttons-container">
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="generate-button">Generate</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BulkSSCCPopup;
