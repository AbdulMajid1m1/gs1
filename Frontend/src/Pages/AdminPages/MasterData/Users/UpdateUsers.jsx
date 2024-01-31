import React, { useState } from 'react'
import { I18nextProvider, useTranslation } from "react-i18next";
import AdminDashboardRightHeader from '../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader'
import newRequest from '../../../../utils/userRequest';
import { toast } from 'react-toastify';
import { DotLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const UpdateUsers = () => {
  const { t, i18n } = useTranslation();
    const getGs1UserData = sessionStorage.getItem('selectedUserData');
    const gs1UserData = JSON.parse(getGs1UserData);
    // console.log(gs1UserData);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState(gs1UserData?.email || '');
    const [name, setName] = useState(gs1UserData?.username || '');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState(gs1UserData?.mobile || '');
    const [isSuper, setIsSuper] = useState(gs1UserData?.is_super_admin === 0 ? 'true' : 'false');

    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const userData = {
          email: email,
          username: name,
          mobile: mobile,
          isSuperAdmin: isSuper,
        };

        if (password) {
          userData.password = password;
        }

        const response = await newRequest.put(`/admin/updateAdmin/${gs1UserData?.id}`, userData);
        console.log(response.data);
        setIsLoading(false);
        toast.success(response.data.message || 'User Updated Successfully');
        setEmail('');
        setName('');
        setPassword('');
        setMobile('');
        setIsSuper('');
        navigate(-1);
      } catch (err) {
        console.log(err);
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
          <AdminDashboardRightHeader title={`${t('Update User')}`} />
        </div>

        <div className='flex justify-center items-center'>
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-6 bg-white shadow-xl rounded-md">

            <form onSubmit={handleFormSubmit}>
            {/* <form> */}
              <div className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:mt-0 mt-4">
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-1">
                  <label htmlFor="fields1" className="text-secondary font-semibold">Email</label>
                  <input
                    type="email"
                    id="fields1"
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                    placeholder={'Email'}
                  />
                </div>
              </div>


              <div className="flex flex-col gap-8 sm:flex-row sm:justify-between mt-4">
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-1">
                  <label htmlFor="fields1" className="text-secondary font-semibold">User Name</label>
                  <input
                    type="text"
                    id="fields1"
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                    placeholder={'User Name'}
                  />
                </div>

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-1">
                  <label htmlFor="fields1" className="text-secondary font-semibold">Password</label>
                  <input
                    type="password"
                    id="fields1"
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // required
                    className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                    placeholder={'Password'}
                  />
                </div>
              </div>


              <div className="flex flex-col gap-8 sm:flex-row sm:justify-between mt-4">
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-1">
                  <label htmlFor="fields1" className="text-secondary font-semibold">Mobile</label>
                  <input
                    type="text"
                    id="fields1"
                    name='mobile'
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                    placeholder={'Mobile'}
                  />
                </div>

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-1">
                  <label htmlFor="fields1" className="text-secondary font-semibold">Is Super</label>
                  <select
                    id="fields1"
                    name='is_super_admin'
                    value={isSuper}
                    onChange={(e) => setIsSuper(e.target.value)}
                    required
                    className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                  >
                    <option value="">-select-</option>
                    <option value="true">Super Admin</option>
                    <option value="false">GS1 User</option>
                    </select>
                </div>
              </div>


              {/*Add Button  */}
              <div className={`flex mt-10 ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-end'}`}>
                <button
                  type="submit"
                  className="bg-secondary px-8 py-2 text-white font-semibold text-sm rounded-sm p-2 mt-2 hover:bg-primary transition duration-200"
                >
                  Save Changes
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

export default UpdateUsers