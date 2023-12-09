import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./Pages/AdminPages/Dashboard/Dashboard";
import UpdateVendor from "./Pages/MemberPages/UpdateVendor/UpdateVendor";
import ListOfCustomer from "./Pages/AdminPages/ListOfCustomer/ListOfCustomer";
import { SnackbarProvider } from "./Contexts/SnackbarContext";
import DataTableProvider from "./Contexts/DataTableContext";
import DataTableProvider2 from "./Contexts/DataTableContext2";
import HomePage from "./Pages/UserPages/HomePage/HomePage";
import MemmberRegisteration from "./Pages/MemberPages/MemberRegistration/MemberRegistration";
import GetBarcode from "./Pages/MemberPages/MemberRegistration/GetBarcode"
import GTIN from "./Pages/AdminPages/Gtin/Gtin";
import GTINAddProducts from "./Pages/AdminPages/GTINAddProducts/GTINAddProducts";
import GTINUpdateProducts from "./Pages/AdminPages/GTINAddProducts/GTINUpdateProducts";
import GTINViewProduct from "./Pages/AdminPages/GTINAddProducts/GTINViewProduct";
import EmailAddress from "./Pages/MemberPages/MemberLogin/EmailAddress/EmailAddress";
import SelectActivity from "./Pages/MemberPages/MemberLogin/SelectActivity/SelectActivity";
import VerifyCode from "./Pages/MemberPages/MemberLogin/VerifyCode/VerifyCode";
import GLN from "./Pages/AdminPages/GLN/GLN";
import Gs1Members from "./Pages/AdminPages/AllGs1Members/Gs1Members/Gs1Members";
import MemberProfile from "./Pages/MemberPages/MemberLogin/MemberProfile/MemberProfile";
import Gs1MembersView from "./Pages/AdminPages/AllGs1Members/Gs1Members/Gs1MembersView";
import MemberDashboard from "./Pages/MemberPages/MemberDashboard/MemberDashboard";
import AdminLogin from "./Pages/AdminPages/AdminLogin/AdminLogin";
import AdminSideBar from "./components/AdminSidebar/AdminSidebar";
import RegisteredMembers from "./Pages/AdminPages/AdminIndentify/RegisteredMembers/RegisteredMembers";
import Brands from "./Pages/AdminPages/AdminIndentify/Brands/Brands";
import Products from "./Pages/AdminPages/AdminIndentify/Products/Products";
import MemberProducts from "./Pages/AdminPages/AdminCapture/MemberProducts/MemberProducts";
import VerifiedByGS1 from "./Pages/AdminPages/AdminCapture/VerifiedByGS1/VerifiedByGS1";
import Notifications from "./Pages/AdminPages/AdminCapture/Notifications/Notifications";

const App = () => {
  const MainLayout = ({ children }) => {
    return (
      <div className="main-layout-container">
        <Sidebar />
        <span className="right-layout">{children}</span>
      </div>
    );
  };

  const AdminMainLayout = ({ children }) => {
    return (
      <div className="main-layout-container">
        <AdminSideBar />
        <span className="right-layout">{children}</span>
      </div>
    );
  };
  return (
    <>

      <DataTableProvider2>
        <DataTableProvider>
          <SnackbarProvider>

            <div>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/get-barcode" element={<GetBarcode />} />
                  <Route path="/member-registration" element={<MemmberRegisteration />} />
                  <Route path="/email-address" element={<EmailAddress />} />
                  <Route path="/select-activity" element={<SelectActivity />} />
                  <Route path="/verify-code" element={<VerifyCode />} />


                  {/* Member Routes */}
                  <Route
                    path="/member/*"
                    element={
                      <MainLayout>
                        <Routes>
                          <Route path="dashboard" element={<MemberDashboard />} />
                          <Route path="update-vendor" element={<UpdateVendor />} />
                          <Route path="customer-list" element={<ListOfCustomer />} />
                          <Route path="gtin" element={<GTIN />} />
                          <Route path="addproducts" element={<GTINAddProducts />} />
                          <Route
                            path="upate-gtin-product/:productId"
                            element={<GTINUpdateProducts />}
                          />
                          <Route
                            path="view-gtin-product/:productId"
                            element={<GTINViewProduct />}
                          />
                          <Route path="gln" element={<GLN />} />
                          <Route path="gs1-members" element={<Gs1Members />} />

                          <Route path="member-profile" element={<MemberProfile />} />

                          <Route
                            path="view-gs1-member/:Id"
                            element={<Gs1MembersView />}
                          />

                        </Routes>
                      </MainLayout>
                    }
                  />
                  </Routes>



                  <Routes>
                    <Route path="/admin-login" element={<AdminLogin />} />
                  
                  {/* Admin Routes */}
                  <Route
                    path="/admin/*"
                    element={
                      <AdminMainLayout>
                        <Routes>
                          <Route path="dashboard" element={<Dashboard />} />
                          <Route path="registered-members" element={<RegisteredMembers />} />
                          <Route path="brands" element={<Brands />} />
                          <Route path="products" element={<Products />} />

                          <Route path="member-products" element={<MemberProducts />} />
                          <Route path="verified-by-gs1" element={<VerifiedByGS1 />} />
                          <Route path="notfications" element={<Notifications />} />

                        
                        </Routes>
                      </AdminMainLayout>
                    }
                  />
                  </Routes>
              </BrowserRouter>
            </div>
          </SnackbarProvider>
        </DataTableProvider>
      </DataTableProvider2>
    </>
  );
};

export default App;