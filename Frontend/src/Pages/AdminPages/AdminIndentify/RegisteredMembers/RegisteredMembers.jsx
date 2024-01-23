import React, { useContext, useEffect, useState } from 'react'
import { Gs1AllMembers } from '../../../../utils/datatablesource'
import DataTable from '../../../../components/Datatable/Datatable'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import newRequest from '../../../../utils/userRequest';
import { DataTableContext } from '../../../../Contexts/DataTableContext';
import VisibilityIcon from "@mui/icons-material/Visibility";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import SwipeDownIcon from '@mui/icons-material/SwipeDown';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query'
import FinancePopUp from './FinancePopUp';
import RenewPopUp from './RenewPopUp';
import AdminDashboardRightHeader from '../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader';
import UpgradePopUp from './UpgradePopUp';
import DowngradePopUp from './DowngradePopUp';
import { useTranslation } from 'react-i18next';

const RegisteredMembers = () => {
  const { t, i18n } = useTranslation();
  const [IsLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  // const [gridData, setGridData] = useState([]);
  const navigate = useNavigate();

  const { rowSelectionModel, setRowSelectionModel,
    tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
  const [filteredData, setFilteredData] = useState([]);

  // const { isLoading, error, data, isFetching } = useQuery("fatchMembers", async () => {
  //   const response = await newRequest.get("/users",);
  //   return response?.data || [];

  // });

  // useEffect(() => {
  //   if (data) {
  //     setGridData(data)
  //     setFilteredData(data)
  //     setIsLoading(false)
  //   }
  // }, [data]);


  const fetchData = async () => {
    try {
      const response = await newRequest.get("/users?parent_memberID=0");

      console.log(response.data);
      setData(response?.data || []);
      setIsLoading(false)

    } catch (err) {
      console.log(err);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchData(); // Calling the function within useEffect, not inside itself
  }, []); // Empty array dependency ensures this useEffect runs once on component mount



  // const refreshData = async () => {
  //   setIsLoading(true);
  //   try {
  //       const response = await newRequest.get("/users",);

  //       console.log(response.data);
  //       setData(response?.data || []);
  //       setIsLoading(false)

  //   } catch (err) {
  //     console.log(err);
  //     Swal.fire(
  //       'Error!',
  //         err?.response?.data?.message || 'Something went wrong!.',
  //       'error'
  //     )

  //   }
  // };

  const handleEdit = (row) => {
    console.log(row);
    // navigate("/upate-gtin-product/" + row?.id);
  };

  const handleOpen = (row) => {
    console.log(row);
    // navigate("/view-gtin-product/" + row?.id);
  };

  // const handleDelete = async (row) => {
  //     console.log(row);
  // };

  const handleView = (row) => {
    console.log(row);
    // save this data in session storage
    sessionStorage.setItem("gs1memberRecord", JSON.stringify(row));
    navigate("view-registered-member/" + row?.id);
  };


  const handleDelete = async (row) => {
    Swal.fire({
      title: `${t('Are you sure to delete this record?')}!`,
      text: `${t('You will not be able to recover this')} ${t('User')}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `${t('Yes')} , ${t('Delete')}!`,
      cancelButtonText: `${t('No, keep it')}!`,
      // changes the color of the confirm button to red
      confirmButtonColor: '#1E3B8B',
      cancelButtonColor: '#FF0032',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const isDeleted = await newRequest.delete("/users/" + row?.id);
          if (isDeleted) {
            toast.success(`${t('User')} ${t('has been deleted')} ${t('successfully')}!`, {
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
            const filteredData = data.filter((item) => item?.id !== row?.id);
            setData(filteredData);
            // setGridData(filteredData);

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
          toast.error(`${t('User')} ${t('has been not deleted')} ${t('Delete')}!`, {
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


  const handleRowClickInParent = (item) => {
    if (!item || item?.length === 0) {
      setTableSelectedRows(data)
      setFilteredData(data)
      return
    }

  }


  const [isFinancePopupVisible, setFinancePopupVisibility] = useState(false);

  const handleShowFinancePopup = (row) => {
    setFinancePopupVisibility(true);
    console.log(row);
    // set this data in session storage
    sessionStorage.setItem("registeredMemberRowData", JSON.stringify(row));

  };

  const [isRenewPopupVisible, setIsRenewPopupVisible] = useState(false);

  const handleShowRenewPopup = (row) => {
    setIsRenewPopupVisible(true);
    console.log(row);
    // set this data in session storage
    sessionStorage.setItem("registeredMemberRowData", JSON.stringify(row));

  };


  const [isUpgradePopupVisible, setIsUpgradePopupVisible] = useState(false);

  const handleShowUpgradePopup = (row) => {
    setIsUpgradePopupVisible(true);
    console.log(row);
    // set this data in session storage
    sessionStorage.setItem("registeredMemberRowData", JSON.stringify(row));

  };


  const [isDowngradePopupVisible, setIsDowngradePopupVisible] = useState(false);

  const handleShowDowngradePopup = (row) => {
    setIsDowngradePopupVisible(true);
    console.log(row);
    // set this data in session storage
    sessionStorage.setItem("registeredMemberRowData", JSON.stringify(row));

  };

  const fetchMemberInvoiceData = async (row) => {
    try {

      const response = await newRequest.get(`/memberDocuments/pendingInvoices?user_id=${row?.id}`);

      // console.log(response.data);

      if (response.data.length > 0) {
        handleShowFinancePopup(row);
      } else {
        // Show an error message
        toast.error(`${t('No invoice data available')}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          // progress: undefined,
          theme: "light",
        });
      }
    }
    catch (err) {
      console.log(err);
      // show the toast message
      toast.error(err?.response?.data?.message || `${t('Something went wrong')}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  const filterDropdownOptions = (row, dropDownOptions) => {
    // console.log(row);
    if (row?.status === 'active') {
      // If user is active, show all options
      return dropDownOptions;
    }
    else if (row.product_identity !== 'active') {
      // If user is not active, disable the Renew option
      return dropDownOptions.filter(option => option.label !== 'Renew');
    }

    return []; // No options available
  };


  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        <div>
          <AdminDashboardRightHeader
            title={`${t('Registered Members')}`}
          />
        </div>

        <div style={{ marginLeft: '-0px', marginRight: '-0px' }}>

          <DataTable data={data}
            title={`${t('Registered Members')}`}
            columnsName={Gs1AllMembers(t)}
            loading={IsLoading}
            checkboxSelection="disabled"
            secondaryColor="secondary"
            globalSearch={true}
            handleRowClickInParent={handleRowClickInParent}
            getFilteredOptions={filterDropdownOptions}
            uniqueId="admin_registered_members"

            dropDownOptions={[
              {
                label: `${t('Profile')}`,
                icon: (
                  <VisibilityIcon
                    fontSize="small"
                    color="action"
                    style={{ color: "rgb(37 99 235)" }}
                  />
                ),
                action: handleView,
              },
              {
                label: `${t('Activation')}`,
                icon: <SwapHorizIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                ,
                action: fetchMemberInvoiceData,

              },
              {
                label: `${t('Renew')}`,
                icon: <PublishedWithChangesIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                ,
                action: handleShowRenewPopup,

              },
              // {
              //   label: "Upgrade",
              //   icon: <UpgradeIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
              //   ,
              //   action: handleShowUpgradePopup,

              //   },
              //   {
              //     label: "Downgrade",
              //     icon: <SwipeDownIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
              //     ,
              //     action: handleShowDowngradePopup,

              //   },
              {
                label: `${t('Delete')}`,
                icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />
                ,
                action: handleDelete,
              }

            ]}


          />
        </div>



        {/* AddBrands component with handleShowCreatePopup prop */}
        {isFinancePopupVisible && (
          <FinancePopUp isVisible={isFinancePopupVisible} setVisibility={setFinancePopupVisibility} />
        )}


        {/* Renew component with handleShowRenewPopup prop */}
        {isRenewPopupVisible && (
          <RenewPopUp isVisible={isRenewPopupVisible} setVisibility={setIsRenewPopupVisible} />
        )}


        {/* Upgrade component with handleShowUpgradePopup prop */}
        {isUpgradePopupVisible && (
          <UpgradePopUp isVisible={isUpgradePopupVisible} setVisibility={setIsUpgradePopupVisible} />
        )}


        {/* Downgrade component with handleShowDowngradePopup prop */}
        {isDowngradePopupVisible && (
          <DowngradePopUp isVisible={isDowngradePopupVisible} setVisibility={setIsDowngradePopupVisible} />
        )}


      </div>
    </div>
  )
}

export default RegisteredMembers


export const updateMemberDocumentStatus = async (req, res, next) => {

  // Validate the request body
  const { error, value } = updateMemberDocumentStatusSchema.validate(req.body);
  if (error) {
    return next(createError(400, error.details[0].message));
  }

  try {

    const documentId = req.params.id;
    if (!documentId) {
      throw createError(400, 'Document ID is required');
    }

    // Retrieve the current document from the database
    const currentDocument = await prisma.member_documents.findFirst({
      where: { id: documentId }
    });

    if (!currentDocument) {
      throw createError(404, 'Document not found');
    }


    // If the document status is approved, proceed with user status update

    // Check if the user exists
    let existingUser = await prisma.users.findUnique({ where: { id: currentDocument.user_id } });
    if (!existingUser) {
      throw createError(404, 'User not found');
    }

    let pdfBuffer;
    let userUpdateResult;
    let pdfFilename;
    let cart;

    const bankSlipDocuments = await prisma.member_documents.findMany({
      where: {
        user_id: currentDocument.user_id,
        transaction_id: currentDocument.transaction_id,
        type: 'bank_slip',
      }
    });
    if (bankSlipDocuments.length === 0) {
      return next(createError(400, `No bank slip documents found for the transaction ID: ${currentDocument.transaction_id}`));
    }


    if (value.status === 'approved') {
      await prisma.$transaction(async (prisma) => {
        // Fetch the user ID from the member_documents table
        const userId = currentDocument.user_id;


        // Perform the updateUserStatus logic
        cart = await prisma.carts.findFirst({ where: { user_id: userId } });

        if (cart && cart.cart_items) {
          const cartItems = JSON.parse(cart.cart_items);
          const firstCartItem = cartItems[0];
          const product = await prisma.gtin_products.findUnique({
            where: { id: firstCartItem.productID }
          });

          if (product) {
            // Generate gcpGLNID and GLN
            const gcpGLNID = `628${product.gcp_start_range}`;
            const gln = generateGTIN13(gcpGLNID);

            // Calculate expiry date (1 year from now)
            let expiryDate = new Date();
            expiryDate = new Date(expiryDate.getFullYear() + 1, expiryDate.getMonth(), expiryDate.getDate());
            console.log(expiryDate);
            // Update user with new information
            userUpdateResult = await prisma.users.update({
              where: { id: userId },
              data: {
                gcpGLNID: gcpGLNID,
                gln: gln,
                gcp_expiry: expiryDate,
                remarks: 'Registered',
                payment_status: 1,
                status: 'active'
              }
            });

            // Update GTIN subscriptions for the user
            await prisma.gtin_subcriptions.updateMany({
              // update based on the transaction ID
              where: { transaction_id: currentDocument.transaction_id },
              data: {
                status: 'active',
                expiry_date: expiryDate,
                gtin_subscription_limit: product.total_no_of_barcodes,
                gtin_subscription_total_price: product.gtin_yearly_subscription_fee,

              }
            });

            // Fetch the necessary data from other_products table
            const products = await prisma.other_products.findMany({
              select: {
                id: true,
                total_no_of_barcodes: true,
                product_subscription_fee: true,
                med_subscription_fee: true,
              }
            });

            // Update other_products_subcriptions table for each product
            for (const product of products) {
              console.log("product", product);
              let subscriptionFee = userUpdateResult.membership_category === 'non_med_category'
                ? product.product_subscription_fee
                : product.med_subscription_fee;

              await prisma.other_products_subcriptions.updateMany({
                where: {
                  product_id: product.id,
                  isDeleted: false,
                  transaction_id: currentDocument.transaction_id // if you want to update only those records that match the transaction_id
                },
                data: {
                  other_products_subscription_limit: product.total_no_of_barcodes,
                  other_products_subscription_total_price: subscriptionFee,
                  status: 'active',  // Update the status
                  expiry_date: expiryDate // Update the expiry date
                }
              });
            }


            // update isRegistered in crs to 1 by  cr_number and cr_activity
            await prisma.crs.updateMany({
              where: {
                cr: existingUser.cr_number,
                activity: existingUser.cr_activity
              },
              data: {
                isRegistered: 1
              }
            });

            await prisma.gtin_products.update({
              where: { id: product.id },
              data: { gcp_start_range: (parseInt(product.gcp_start_range) + 1).toString() }
            });

            // Fetch and update TblSysCtrNo
            const tblSysNo = await prisma.tblSysNo.findFirst();
            if (tblSysNo) {
              userUpdateResult = await prisma.users.update({
                where: { id: userId },
                data: {
                  companyID: tblSysNo.TblSysCtrNo,
                  memberID: tblSysNo.TblSysCtrNo,
                }
              });

              await prisma.tblSysNo.update({
                where: { SysNoID: tblSysNo.SysNoID },
                data: { TblSysCtrNo: (parseInt(tblSysNo.TblSysCtrNo) + 1).toString() }
              });
            }
          }
        }
        const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');
        let gcpGLNID = userUpdateResult?.gcpGLNID;
        const CertificateData = {
          BACKEND_URL: BACKEND_URL,
          qrCodeDataURL: qrCodeDataURL,

          user: {
            company_name_eng: userUpdateResult?.company_name_eng,
          },
          general: {
            gcp_certificate_detail1:
              ['Global Trade Item Number(GTIN)',
                'Serial Shipping Container Code (SSCC)',
                'Global Location Number (GLN)',
                'Global Document Type Identifier(GDTI)',
                'Global Service Relation Number(GSRN)'
              ], // Dummy data, replace with actual detail data from your API
            gcp_certificate_detail2: ['Global Individual Asset Identifier(GIAI)', 'Global Returnable Asset Identifier(GRAI)',
              'Global Identification Number for',
              'Consignment(GSNC)',
              'Global Shipment Identification Number (GSIN)'
            ], // Dummy data, replace with actual detail data from your API
            gcp_legal_detail: 'Legal Detail', // Dummy data, replace with actual legal detail from your API
          },

          userData: {
            // add user data here
            gcpGLNID: gcpGLNID,
            gln: userUpdateResult?.gln,
            memberID: userUpdateResult?.memberID,
            gcp_expiry: userUpdateResult?.gcp_expiry,
          },
          // userUpdateResult.gcp_expiry, update this to add only date adn remove time
          expiryDate: userUpdateResult?.gcp_expiry.toISOString().split('T')[0],
          explodeGPCCode: []
        };

        console.log("userUpdateResult")
        console.log(userUpdateResult)

        // Generate PDF from EJS template
        const pdfDirectory = path.join(__dirname, '..', 'public', 'uploads', 'documents', 'MemberCertificates');
        pdfFilename = `${userUpdateResult.company_name_eng}-Certificate.pdf`;
        const pdfFilePath = path.join(pdfDirectory, pdfFilename);
        if (!fsSync.existsSync(pdfDirectory)) {
          fsSync.mkdirSync(pdfDirectory, { recursive: true });
        }

        const Certificatepath = await convertEjsToPdf(path.join(__dirname, '..', 'views', 'pdf', 'certificate.ejs'), CertificateData, pdfFilePath, true);
        pdfBuffer = await fs1.readFile(Certificatepath);

        // Send an email based on the updated status
      }, { timeout: 40000 });
      // \\uploads\\documents\\MemberRegDocs\\document-1703059737286.pdf
      console.log("existingUser", currentDocument);
      let cartData = JSON.parse(cart.cart_items);
      cart.cart_items = cartData
      const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');
      const data1 = {
        topHeading: "RECEIPT",
        secondHeading: "RECEIPT FOR",
        memberData: {
          qrCodeDataURL: qrCodeDataURL,
          registeration: `New Registration`,
          // Assuming $addMember->id is already known
          company_name_eng: existingUser.company_name_eng,
          mobile: existingUser.mobile,
          address: {
            zip: existingUser.zip_code,
            countryName: existingUser.country,
            stateName: existingUser.state,
            cityName: existingUser.city,
          },
          companyID: userUpdateResult?.companyID,
          membership_otherCategory: existingUser.membership_category,
          gtin_subscription: {
            products: {
              member_category_description: cartData[0].productName,
            },
          },
        },


        cart: cart,

        currentDate: {
          day: new Date().getDate(),
          month: new Date().getMonth() + 1, // getMonth() returns 0-11
          year: new Date().getFullYear(),
        },



        company_details: {
          title: 'Federation of Saudi Chambers',
          account_no: '25350612000200',
          iban_no: 'SA90 1000 0025 3506 1200 0200',
          bank_name: 'Saudi National Bank - SNB',
          bank_swift_code: 'NCBKSAJE',
        },
        BACKEND_URL: BACKEND_URL,
      };


      const pdfDirectory = path.join(__dirname, '..', 'public', 'uploads', 'documents', 'MemberRegInvoice');
      const pdfFilename1 = `Receipt-${existingUser?.company_name_eng}-${currentDocument.transaction_id}-${new Date().toLocaleString().replace(/[/\\?%*:|"<>]/g, '-')}.pdf`;

      const pdfFilePath = path.join(pdfDirectory, pdfFilename1);

      if (!fsSync.existsSync(pdfDirectory)) {
        fsSync.mkdirSync(pdfDirectory, { recursive: true });
      }

      const Receiptpath = await convertEjsToPdf(path.join(__dirname, '..', 'views', 'pdf', 'customInvoice.ejs'), data1, pdfFilePath);


      // read the file into a buffer

      const pdfBuffer2 = await fs1.readFile(pdfFilePath);



      const newDocument = await prisma.member_documents.createMany({
        data: [
          {
            type: 'certificate',
            document: `/uploads/documents/MemberCertificates/${pdfFilename}`,
            transaction_id: currentDocument.transaction_id,
            user_id: currentDocument.user_id,
            doc_type: 'member_document',
            status: 'approved',
            // TODO: take email form current admin token
            // uploaded_by: req.admin.email, // Assuming the admin is logged in
            uploaded_by: 'admin@gs1sa.link',
          },
          {
            type: 'receipt',
            document: `/uploads/documents/MemberRegInvoice/${pdfFilename1}`,
            transaction_id: currentDocument.transaction_id,
            user_id: currentDocument.user_id,
            doc_type: 'member_document',
            status: 'approved',
            // TODO: take email form current admin token
            // uploaded_by: req.admin.email, // Assuming the admin is logged in
            uploaded_by: 'admin@gs1sa.link', // Assuming the admin is logged in
          }
        ]
      });





      // Update the document status in the database
      // document: `/uploads/documents/MemberCertificates/${pdfFilename}`,

      await sendStatusUpdateEmail(existingUser.email, value.status, value.status === 'approved' ? { pdfBuffer, pdfFilename } : null, { pdfBuffer2, pdfFilename1 },);
      await prisma.member_documents.update({
        where: { id: documentId },
        data: { status: value.status }
      });


      // Insert Member History log
      // const logData = {
      //     // TODO: check if it uploaded by admin or user. cehck if req.admin exist then use req.admin.email else use req.user.email
      //     subject: `${value.type} Document Uploaded by ${value.uploaded_by}`,
      //     // user user memberId
      //     // member_id: value.memberID,
      //     user_id: value.user_id,
      //     // TODO: add middleware for current admin token 
      // }



      // Insert Member History log
      const logData = {
        subject: 'Member Account Approved by Admin',
        // user user memberId
        // member_id: userUpdateResult.memberID,
        user_id: userUpdateResult.id,
        // TODO: take email form current admin token
        admin_id: 'admin@gs1sa.link',

      }


      TODO: // chec this
      // if (req?.admin.id) {
      //     logData.admin_id = admin_email;
      // logData.created_by_admin = 1;
      // }

      console.log("logData", logData);

      await createMemberLogs(logData);

      // create brand using Company Name and Company Name Arabic

      const newBrand = await prisma.brands.create({
        data: {
          name: existingUser.company_name_eng,
          name_ar: existingUser.company_name_arabic,
          status: 'active',
          user_id: existingUser.id,
          companyID: existingUser.companyID,
        }
      });


    }

    // if (value.status === 'rejected') {
    //     // Set the document status to pending
    //     await prisma.member_documents.update({
    //         where: { id: documentId },
    //         data: { status: 'pending' }
    //     });




    //     // Send email with optional reject reason
    //     await sendStatusUpdateEmail(existingUser.email, value.status, null, null, value.reject_reason);
    // }

    if (value.status === 'rejected') {
      // Set the document status to pending
      await prisma.member_documents.update({
        where: { id: documentId },
        data: { status: 'pending' }
      });

      // Fetch the user along with their related cart
      const userWithCart = await prisma.users.findUnique({
        where: { id: currentDocument.user_id },
        include: {
          carts: true, // This includes the carts related to the user
        }
      });

      // Check if user exists
      if (!userWithCart) {
        throw createError(404, 'User not found');
      }

      // Extract user and cart data
      const { carts, ...userData } = userWithCart;
      const cartData = carts.length > 0 ? carts[0] : null;
      // replace carts in userData with rejected_carts
      userData.rejected_carts = cartData.carts;
      delete userData.carts;
      userData.deleted_at = new Date();
      userData.status = 'rejected';
      userData.remarks = value.reject_reason;
      userData.payment_status = 0;
      // remove member_history_logs 
      delete userData.member_history_logs;


      // Begin a transaction
      await prisma.$transaction(async (prisma) => {
        // Create rejected user record
        const rejectedUser = await prisma.rejected_users.create({
          data: {
            ...userData,
            id: undefined, // Exclude 'id' if it's auto-generated
            reject_reason: value.reject_reason,
            // Exclude 'carts' field since it's not a column in 'rejected_users'
          }
        });

        // Move cart to rejected_carts if it exists
        if (cartData) {
          await prisma.rejected_carts.create({
            data: {
              ...cartData,
              id: undefined, // Exclude 'id' if it's auto-generated
              reject_reason: value.reject_reason,
              user_id: rejectedUser.id, // Use the id of the newly created rejected user
              // Exclude 'user' field since it's not a column in 'rejected_carts'
            }
          });

          // Delete the original cart
          await prisma.carts.delete({ where: { id: cartData.id } });
        }

        // Delete the original user
        await prisma.users.delete({ where: { id: userData.id } });
      });

      // Send email with optional reject reason
      await sendStatusUpdateEmail(userData.email, value.status, null, null, value.reject_reason);
    }





    // Delete all documents of type 'bank_slip'
    for (const document of bankSlipDocuments) {
      const deletingDocumentPath = path.join(__dirname, '..', 'public', 'uploads', 'documents', 'memberDocuments', document.document.replace(/\\/g, '/'));
      console.log("deletingDocumentPath");
      console.log(deletingDocumentPath);
      try {
        if (fsSync.existsSync(deletingDocumentPath)) {
          fsSync.unlinkSync(deletingDocumentPath);
        }
      } catch (err) {
        console.error(`Error deleting file: ${deletingDocumentPath}`, err);
      }
    }

    const deletedResult = await prisma.member_documents.deleteMany({
      where: {
        user_id: currentDocument.user_id,
        transaction_id: currentDocument.transaction_id,
        type: 'bank_slip',
      }
    });

    // return res.json({ message: 'Document status updated to pending and bank slip documents deleted' });
    if (value.status === 'approved') {
      return res.json({ message: 'Document status updated to approved' });
    }
    else {
      return res.json({ message: 'Document status updated to pending and bank slip documents deleted' });
    }

  } catch (err) {
    console.log(err);
    next(err);
  }
};
