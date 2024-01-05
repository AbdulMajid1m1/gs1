import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import { Autocomplete, TextField } from '@mui/material';
const AddState = ({ isVisible, setVisibility, refreshBrandData }) =>
{
  const [name, setName] = useState("");
  const [docuements, setDocuments] = React.useState([])
  const [selectedDocuments, setSelectedDocuments] = useState("");
  const [SelectedCountryId, setSelectedCountryId] = useState("");
  const handleCloseCreatePopup = () =>
  {
    setVisibility(false);
  };

  useEffect(() =>
  {
    const getDocuments = async () =>
    {
      try {
        const response = await newRequest.get('/address/getAllCountriesName');
        console.log(response.data);
        setDocuments(response.data);
      } catch (error) {
        console.log(error);
      }
    };



    getDocuments();

  }, []);
  const handleSelectedDocuments = (event, value) =>
  {
    console.log(value?.id);
    setSelectedCountryId(value?.id)
    setSelectedDocuments(value);
  };
  const handleAddCompany = async () =>
  {
    //  integrate the post api in try catch blcck
    try {
      const response = await newRequest.post('/address/createStates/', {
        name: name,
        country_id: SelectedCountryId,
      });

      toast.success(`name ${name} has been added successfully.`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });


      console.log(response.data);
      refreshBrandData();
      handleCloseCreatePopup();


    } catch (error) {
      toast.error(error?.response?.data?.error || 'Error', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });


      console.log(error);
    }


  };


  return (
    <div>
      {/* create the post api popup */}
      {isVisible && (
        <div className="popup-overlay">
          <div className="popup-container h-auto sm:w-[45%] w-full">
            <div className="popup-form w-full">
              <form className='w-full'>
                <h2 className='text-secondary font-sans font-semibold text-2xl'>Add State</h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">Country name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Country Name "
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">Select Country</label>

                    <Autocomplete
                      id="field1"
                      options={docuements}
                      value={selectedDocuments}
                      getOptionLabel={(option) => option?.name_en || ""}
                      onChange={handleSelectedDocuments}
                      onInputChange={(event, value) =>
                      {
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
                          placeholder="Select Country"
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
                  </div>
                </div>

                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <button
                    type="button"
                    className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseCreatePopup}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleAddCompany}
                    className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                  >
                    Add State
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

export default AddState