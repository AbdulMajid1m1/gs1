import React, { useEffect, useState } from 'react'
import { I18nextProvider, useTranslation } from "react-i18next";
import AdminDashboardRightHeader from '../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader'
import newRequest from '../../../../utils/userRequest';
import { toast } from 'react-toastify';
import { DotLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, TextField } from '@mui/material';

const AddUsers = () => {
  const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [isSuper, setIsSuper] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [rolesTypes, setRolesTypes] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    const handleRolesTypesChange = (event, value) => {
      setSelectedRoles(value);
      // console.log(value);
  
    };
    
  
    useEffect(() => {
    
      const fetchAllRolesTypes = async () => {
          try {
              const response = await newRequest.get('/roles');
              // only get name and id from the response
              const data = response.data;
              const rolesTypes = data.map((roles) => ({
                  id: roles.id,
                  name: roles.name,
              }));
              setRolesTypes(rolesTypes);
          }
          catch (error) {
              console.error('Error fetching on Search GPC Api:', error);
          }
      };
      fetchAllRolesTypes();
  }, []);


  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setSelectedImage(imageUrl);
  };

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      const selectRolesData = selectedRoles.map((role) => role.id);
      // console.log(selectRolesData);
      try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('username', name);
        formData.append('mobile', mobile);
        formData.append('isSuperAdmin', isSuper);
        selectRolesData.forEach((item, index) => {
          // Append the item with a unique key, for example, "items[0]", "items[1]", etc.
          formData.append(`roleIds[${index}]`, item);
        });

        // Append front image file
         const imageInput = document.querySelector('#imageInput');
         if (imageInput.files && imageInput.files[0]) {
             formData.append('profilePicture', imageInput.files[0]);
         }
 


        const response = await newRequest.post('/admin/addAdmin', formData);
        // console.log(response.data);
        setIsLoading(false);
         toast.success(response.data.message || 'User Added Successfully');
            setEmail('');
            setName('');
            setPassword('');
            setMobile('');
            setIsSuper('');
            navigate(-1);
        } 
        catch (err) {
          // console.log(err);
          setIsLoading(false);
          toast.error(err.response?.data?.error || 'User not added');
        }
        };

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
          <AdminDashboardRightHeader title={`${t('Add Staff Member')}`} />
        </div>

        <div className='flex justify-center items-center'>
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-6 bg-white shadow-xl rounded-md mb-6">

            <form onSubmit={handleFormSubmit}>
            {/* <form> */} 
              <div className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:mt-0 mt-4">
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-1">
                  <label htmlFor="fields1" className="text-secondary font-semibold"> {t('Email')}</label>
                  <input
                    type="email"
                    id="fields1"
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                      placeholder={`${t('Email')}`}
                  />
                </div>

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-1">
                  <label htmlFor="fields1" className="text-secondary font-semibold"> {t('User Name')}</label>
                  <input
                    type="text"
                    id="fields1"
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                      placeholder={`${t('User Name')}`}
                  />
                </div>
              </div>


              <div className="flex flex-col gap-8 sm:flex-row sm:justify-between mt-4">
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-1">
                    <label htmlFor="fields1" className="text-secondary font-semibold"> {t('Password')}</label>
                  <input
                    type="password"
                    id="fields1"
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                      placeholder={`${t('Password')}`}
                  />
                </div>

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-1">
                    <label htmlFor="fields1" className="text-secondary font-semibold"> {t('Mobile')}</label>
                  <input
                    type="text"
                    id="fields1"
                    name='mobile'
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                      placeholder={`${t('Mobile')}`}
                  />
                </div>
              </div>


              <div className="flex flex-col gap-8 sm:flex-row sm:justify-between mt-4">
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-1">
                  <label htmlFor="fields1" className="text-secondary font-semibold"> {t('Is Super')}</label>
                  <select
                    id="fields1"
                    name='is_super_admin'
                    value={isSuper}
                    onChange={(e) => setIsSuper(e.target.value)}
                    required
                    className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                  >
                    <option value="">-{t('select')}-</option>
                    <option value="true">Super Admin</option>
                    <option value="false">GS1 User</option>
                    </select>
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
                        label={`${t('Select Roles')}`}
                        placeholder={`${t('Select Roles')}`}
                        variant='outlined'
                      />
                    )}
                    required
                  />
                </div>
              </div>
              

               {/* Image container */}
               <div className='flex justify-between items-center gap-7 flex-wrap mt-10'>
                  <div>
                    <span className='text-secondary font-body sm:text-base text-sm'> {t('Profile Image')}</span>
                      <div className="border-2 border-dashed h-56 w-56 relative flex justify-center">
                        <div className="absolute -bottom-4 flex justify-center items-center h-10 w-3/4 bg-secondary text-white font-body">
                          <label htmlFor="imageInput" className="cursor-pointer whitespace-nowrap">
                            {t('Select Image')}
                              <input
                                type="file"
                                id="imageInput"
                                // accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                              />
                          </label>
                          </div>
                            {selectedImage && (
                              <div className='h-56 flex justify-center items-center object-contain w-auto'>
                                <img src={selectedImage} className='h-56 w-56' alt="Selected Image" />
                              </div>
                            )}
                          </div>
                    </div>
                </div>


              {/*Add Button  */}
              <div className={`flex mt-10 ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-end'}`}>
                <button
                  type="submit"
                  className="bg-secondary px-8 py-2 text-white font-semibold text-sm rounded-sm p-2 mt-2 hover:bg-primary transition duration-200"
                >
                    {t('Add Admin')}
                </button>
              </div>
            </form>
          </div>
         </div>
        </div>
      </div>
    </div>
  )
}

export default AddUsers