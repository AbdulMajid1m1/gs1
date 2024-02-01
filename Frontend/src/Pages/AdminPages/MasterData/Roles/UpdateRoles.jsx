import React, { useEffect, useState } from 'react'
import { I18nextProvider, useTranslation } from "react-i18next";
import AdminDashboardRightHeader from '../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader'
import { Autocomplete, TextField } from '@mui/material';
import newRequest from '../../../../utils/userRequest';
import { toast } from 'react-toastify';
import { DotLoader } from 'react-spinners';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateRoles = () => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [roleName, setRoleName] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [rolesTypes, setRolesTypes] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  let { id } = useParams();
//   console.log(id)

  const handleRolesTypesChange = (event, value) => {
    setSelectedRoles(value);
    console.log(value);
    setSelectAll(false); // Uncheck "Select All" when individual options are selected/deselected
    filterRoles(value, allRoles);
  };
  

  const fetchRoleById = async () => {
    setIsLoading(true);
    try 
    {
      const response = await newRequest.get(`/roles/${id}`);
      const responseAllPermissions = await newRequest.get('/permissions');
      console.log(response.data);
      const data = responseAllPermissions.data;
      
      const roles = response.data.permissions.map((role) => ({
          id: role.id,
          name: role.name,
        }));

        const rolesTypes = data.map((roles) => ({
          id: roles.id,
          name: roles.name,
        }));
        
        filterRoles(roles, rolesTypes);
        
        setAllRoles(rolesTypes);
        setSelectedRoles(roles);
        // setRolesTypes(rolesTypes);
        
      setRoleName(response.data.name);
      setIsLoading(false);
    } 
    catch (error) {
      console.error('Error fetching on Search GPC Api:', error);
      setIsLoading(false);
    }
  }

  const filterRoles = async (selectedAdminRoles, allRoles) => {
    // filter roles which are already selected
    const filteredRoles = allRoles.filter((role) => !selectedAdminRoles.some((selectedRole) => selectedRole.id === role.id));
    setRolesTypes(filteredRoles);
    
  };


  useEffect(() => {
    fetchRoleById();
  
  }, []);

  // Function to handle the change of the "Select All" checkbox
  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;

    // If "Select All" is checked, set all options as selected; otherwise, clear selections
    setSelectedRoles(isChecked ? rolesTypes : []);
    setSelectAll(isChecked);
  };


  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await newRequest.put(`/roles/${id}`, {
        name: roleName,
        permissions: selectedRoles.map((role) => role.id),
      });
      console.log(response?.data);
      setIsLoading(false);
      toast.success(response?.data?.message || 'Role Updated Successfully');
      navigate(-1);
    } 
    catch (error) {
      console.error('Error creating role:', error);
      setIsLoading(false);
      toast.error(error?.response?.data?.error || 'Role not created');
    }
  }



  return (
    <div>
      {isLoading &&

        <div className='loading-spinner-background'
            style={{
                zIndex: 9999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)',
                display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed'


            }}
        >
            <DotLoader
                size={45}
                color={"#FF693A"}
                // height={4}
                loading={isLoading}
            />
        </div>
        }
        
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        <div>
          <AdminDashboardRightHeader title={`${t('Update Role')}`} />
        </div>

        <div className='flex justify-center items-center'>
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-6 bg-white shadow-xl rounded-md mb-6">

            <form onSubmit={handleFormSubmit}>
            {/* <form> */}
              <div className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:mt-0 mt-4">
                <div className="sm:w-[40%] h-20 w-full font-body sm:text-base text-sm flex flex-col gap-1">
                  <label htmlFor="fields1" className="text-secondary font-semibold">  {t('Role Name')}</label>
                  <input
                    type="text"
                    id="fields1"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    required
                    className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                    placeholder={'Role Name'}
                  />
                </div>

                <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                  <label className='text-secondary font-semibold' htmlFor='SelectRoles'>   {t('Select Roles')}</label>
                  <Autocomplete

                    multiple
                    id='SelectRoles'
                    options={rolesTypes}
                    getOptionLabel={(option) => option.name}
                    value={selectedRoles}
                    onChange={handleRolesTypesChange}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField


                        autoComplete="off"
                        {...params}
                        label='Select Roles'
                        placeholder='Select Roles'
                        variant='outlined'
                      />
                    )}
                    required
                  />
                  <div className=''>
                    <label>
                      <input
                        type='checkbox'
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                      />
                      {t('Select All')}
                    </label>
                  </div>
                </div>

              </div>
              {/*Add Button  */}
              <div className={`flex mt-10 ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}>
                <button
                  type="submit"
                  className="bg-secondary px-8 py-2 text-white font-semibold text-sm rounded-sm p-2 mt-2 hover:bg-primary transition duration-200"
                >
                  {t('Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
        </div>
        {/* </div> */}
      </div>
    // </div>
  )
}

export default UpdateRoles