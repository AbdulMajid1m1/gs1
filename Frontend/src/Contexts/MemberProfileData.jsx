import React, { createContext, useEffect, useState } from 'react';
import newRequest from '../utils/userRequest';

export const MemberProfileDataContext = createContext();

const MemberProfileData = ({ children }) => {
    const [memberProfileDetails, setMemberProfileDetails] = useState([]);
    const memberDataString = sessionStorage.getItem('memberData');
    const memberData = JSON.parse(memberDataString);
   
    const fetchAllUserData = async () => {
        try {
          const response = await newRequest.get(`/users?id=${memberData?.id}`);
        //   console.log(response.data[0]);
          setMemberProfileDetails(response?.data[0] || []);
            
        }
        catch (err)
        {
        //   console.log(err);
        }
    };

   
    useEffect(() => {
        fetchAllUserData();
    }, []);

    return (
        <MemberProfileDataContext.Provider value={{
            memberProfileDetails, setMemberProfileDetails,
            fetchAllUserData
        }}>
            {children}
        </MemberProfileDataContext.Provider>
    );
};

export default MemberProfileData;
