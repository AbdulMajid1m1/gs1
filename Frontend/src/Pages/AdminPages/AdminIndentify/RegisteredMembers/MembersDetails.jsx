import { TextField } from '@mui/material'
import React from 'react'

const MembersDetails = ({ gs1MemberData }) => {
  return (
    <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <TextField
                    id="companyNameEnglish"
                    label="Company Name English"
                    variant="outlined"
                    value={gs1MemberData?.company_name_eng}
                    InputLabelProps={{
                      shrink: Boolean(gs1MemberData?.company_name_eng),
                      style: { fontSize: gs1MemberData?.company_name_eng ? '16px' : '16px', zIndex: '0' },
                    }}
                  />
                </div>

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <TextField
                    id="companyNameArabic"
                    label="Company Name Arabic"
                    variant="outlined"
                    value={gs1MemberData?.company_name_arabic}
                    InputLabelProps={{
                      shrink: Boolean(gs1MemberData?.company_name_arabic),
                      style: { fontSize: gs1MemberData?.company_name_arabic ? '16px' : '16px', zIndex: '0' },
                    }}
                  />
                </div>

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <TextField
                    id="Country"
                    label="Country"
                    variant="outlined"
                    value={gs1MemberData?.country}
                    InputLabelProps={{
                      shrink: Boolean(gs1MemberData?.country),
                      style: { fontSize: gs1MemberData?.country ? '16px' : '16px', zIndex: '0' },
                    }}
                  />
                </div>
              </div>


              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-4">
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <TextField
                    id="CountryShortName"
                    label="Country Short Name"
                    variant="outlined"
                    value={gs1MemberData?.country}
                    InputLabelProps={{
                      shrink: Boolean(gs1MemberData?.country),
                      style: { fontSize: gs1MemberData?.country ? '16px' : '16px', zIndex: '0' },
                    }}
                  />
                </div>

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <TextField
                    id="State"
                    label="State"
                    variant="outlined"
                    value={gs1MemberData?.state}
                    InputLabelProps={{
                      shrink: Boolean(gs1MemberData?.state),
                      style: { fontSize: gs1MemberData?.state ? '16px' : '16px', zIndex: '0' },
                    }}
                  />
                </div>

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <TextField
                    id="City"
                    label="City"
                    variant="outlined"
                    value={gs1MemberData?.city}
                    InputLabelProps={{
                      shrink: Boolean(gs1MemberData?.city),
                      style: { fontSize: gs1MemberData?.city ? '16px' : '16px', zIndex: '0' },
                    }}
                  />
                </div>
              </div>


              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-4">
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <TextField
                    id="ZipCode"
                    label="Zip Code"
                    variant="outlined"
                    value={gs1MemberData?.zip_code}
                    InputLabelProps={{
                      shrink: Boolean(gs1MemberData?.zip_code),
                      style: { fontSize: gs1MemberData?.zip_code ? '16px' : '16px', zIndex: '0' },
                    }}
                  />
                </div>

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <TextField
                    id="mobile"
                    label="Mobile No (omit zero)"
                    variant="outlined"
                    value={gs1MemberData?.mbl_extension}
                    InputLabelProps={{
                      shrink: Boolean(gs1MemberData?.mbl_extension),
                      style: { fontSize: gs1MemberData?.mbl_extension ? '16px' : '16px', zIndex: '0' },
                    }}
                  />
                </div>

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <TextField
                    id="Email"
                    label="Email"
                    variant="outlined"
                    value={gs1MemberData?.email}
                    InputLabelProps={{
                      shrink: Boolean(gs1MemberData?.email),
                      style: { fontSize: gs1MemberData?.email ? '16px' : '16px', zIndex: '0' },
                    }}
                  />
                </div>
              </div>


              <div className='h-auto w-full mt-8 px-1'>
                <div className='flex justify-between'>
                  <p className='text-blue-500 font-sans font-semibold'>GS1 Member Details</p>
                  {/* <button className='bg-blue-500  font-sans font-normal text-sm px-4 py-1 text-white rounded-full hover:bg-blue-600'>Change Membership</button> */}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-6">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <TextField
                      id="crNumber"
                      label="Cr Number"
                      variant="outlined"
                      value={gs1MemberData?.cr_number}
                      InputLabelProps={{
                        shrink: Boolean(gs1MemberData?.cr_number),
                        style: { fontSize: gs1MemberData?.cr_number ? '16px' : '16px', zIndex: '0' },
                      }}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <TextField
                      id="crActivity"
                      label="Cr Activity"
                      variant="outlined"
                      value={gs1MemberData?.cr_activity}
                      InputLabelProps={{
                        shrink: Boolean(gs1MemberData?.cr_activity),
                        style: { fontSize: gs1MemberData?.cr_activity ? '16px' : '16px', zIndex: '0' },
                      }}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <TextField
                      id="companyNameEnglish"
                      label="Company Name English"
                      variant="outlined"
                      value={gs1MemberData?.company_name_eng}
                      InputLabelProps={{
                        shrink: Boolean(gs1MemberData?.company_name_eng),
                        style: { fontSize: gs1MemberData?.company_name_eng ? '16px' : '16px', zIndex: '0' },
                      }}
                    />
                  </div>
                </div>


                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-6">

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <TextField
                      id="companyNameArabic"
                      label="Company Name Arabic"
                      variant="outlined"
                      value={gs1MemberData?.company_name_arabic}
                      InputLabelProps={{
                        shrink: Boolean(gs1MemberData?.company_name_arabic),
                        style: { fontSize: gs1MemberData?.company_name_arabic ? '16px' : '16px', zIndex: '0' },
                      }}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <TextField
                      id="companyGCP"
                      label="Company GCP"
                      variant="outlined"
                      value={gs1MemberData?.gcpGLNID}
                      InputLabelProps={{
                        shrink: true,
                        style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
                      }}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <TextField
                      id="contactPerson"
                      label="Contact Person"
                      variant="outlined"
                      value={gs1MemberData?.contactPerson}
                      InputLabelProps={{
                        shrink: true,
                        style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
                      }}
                    />
                  </div>

                </div>


                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-6">

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <TextField
                      id="companyId"
                      label="Company ID"
                      variant="outlined"
                      value={gs1MemberData?.companyID}
                      InputLabelProps={{
                        shrink: true,
                        style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
                      }}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <TextField
                      id="mobileNo"
                      label="Mobile No (omit zero)"
                      variant="outlined"
                      value={gs1MemberData?.mobile}
                      InputLabelProps={{
                        shrink: true,
                        style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
                      }}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <TextField
                      id="memberID"
                      label="Member ID"
                      variant="outlined"
                      value={gs1MemberData?.memberID}
                      InputLabelProps={{
                        shrink: true,
                        style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
                      }}
                    />
                  </div>

                </div>


                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-6">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <TextField
                      id="companyLandline"
                      label="Company Landline"
                      variant="outlined"
                      value={gs1MemberData?.companyLandLine}
                      InputLabelProps={{
                        shrink: true,
                        style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
                      }}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <TextField
                      id="membershipType"
                      label="Membership Type"
                      variant="outlined"
                      value={gs1MemberData?.membership_category}
                      InputLabelProps={{
                        shrink: true,
                        style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
                      }}
                    />
                  </div>
                </div>
            </div>
           </div>
    //      </div>
    //     </div>
    // </div>
  )
}

export default MembersDetails