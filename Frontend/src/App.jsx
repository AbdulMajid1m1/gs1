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
import GTIN from "./Pages/MemberPages/GTIN/GTIN";
import GTINAddProducts from "./Pages/MemberPages/GTINAddProducts/GTINAddProducts";
import GTINUpdateProducts from "./Pages/MemberPages/GTINAddProducts/GTINUpdateProducts";
import GTINViewProduct from "./Pages/MemberPages/GTINAddProducts/GTINViewProduct";
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
import GS1Registries from "./Pages/AdminPages/AdminShare/GS1Registries/GS1Registries";
import GcpLicense from "./Pages/AdminPages/AdminShare/GcpLicense/GcpLicense";
import Migration from "./Pages/AdminPages/Others/Migration/Migration";
import HelpDesk from "./Pages/AdminPages/Others/HelpDesk/HelpDesk";
import OldInActiveMembers from "./Pages/AdminPages/Others/OldInActiveMembers/OldInActiveMembers";
import StaffHelpDesk from "./Pages/AdminPages/Others/StaffHelpDesk/StaffHelpDesk";
import Frontend from "./Pages/AdminPages/AdminTab/FrontEnd/Frontend";
import Settings from "./Pages/AdminPages/AdminTab/Settings/Settings";
import MasterData from "./Pages/AdminPages/AdminTab/MasterData/MasterData";
import Reports from "./Pages/AdminPages/AdminTab/Reports/Reports";
import PaymentSlips from "./Pages/MemberPages/PaymentSlips/PaymentSlips";
import BankSlip from "./Pages/MemberPages/PaymentSlips/BankSlip";
import TransactionHistory from "./Pages/MemberPages/TransactionHistory/TransactionHistory";
import RegisteredMembersView from "./Pages/AdminPages/AdminIndentify/RegisteredMembers/RegisteredMemberView";
import MemberBrands from "./Pages/MemberPages/MemberBrands/MemberBrands";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Units from "./Pages/AdminPages/MasterData/Units/Units";
import Documents from './Pages/AdminPages/MasterData/document/document';
import ProductPackaging from './Pages/AdminPages/MasterData/productPackaging/productPackaging';
import Other_products from './Pages/AdminPages/MasterData/other_product/other_product';
import Gcp_type from './Pages/AdminPages/MasterData/gcp_type/gcp_type';
import CountryofSales from './Pages/AdminPages/MasterData/countryofsale/countryofsale';
import Hscode from './Pages/AdminPages/MasterData/hscode/hscode';
import UNSPCS from './Pages/AdminPages/MasterData/UNSPCS/UNSPCS';
import Cities from './Pages/AdminPages/MasterData/city/cities';
import State from './Pages/AdminPages/MasterData/state/state';
import Country from './Pages/AdminPages/MasterData/country/country';
import Crnumber from './Pages/AdminPages/MasterData/crnumber/crnumber';
const queryClient = new QueryClient()

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
                  {/* <Route path="main-popup" element={<MainPopUp />} /> */}


                  {/* Member Routes */}
                  <Route
                    path="/member/*"
                    element={
                      <MainLayout>
                        <QueryClientProvider client={queryClient}>
                        <Routes>
                          <Route path="dashboard" element={<MemberDashboard />} />
                          <Route path="update-vendor" element={<UpdateVendor />} />
                          <Route path="customer-list" element={<ListOfCustomer />} />
                          <Route path="member-brands" element={<MemberBrands />} />
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

                          {/* <Route
                            path="view-gs1-member/:Id"
                            element={<Gs1MembersView />}
                          /> */}

                          <Route path="payment-slips" element={<PaymentSlips />} />
                          <Route path="bank-slip" element={<BankSlip />} />

                          <Route path="transaction-history" element={<TransactionHistory />} />
                          {/* <Route path="member-helpdesk" element={<MemberHelpDesk />} /> */}


                        </Routes>
                        </QueryClientProvider>
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
                        <QueryClientProvider client={queryClient}>
                        <Routes>
                          <Route path="dashboard" element={<Dashboard />} />
                          
                            <Route path="registered-members" element={<RegisteredMembers />} />

                          <Route
                            path="registered-members/view-registered-member/:Id"
                            element={<RegisteredMembersView />}
                          />

                          <Route
                            path="view-gs1-member/:Id"
                            element={<Gs1MembersView />}
                          />
                          
                          <Route path="brands" element={<Brands />} />
                          <Route path="products" element={<Products />} />

                          <Route path="member-products" element={<MemberProducts />} />
                          <Route path="verified-by-gs1" element={<VerifiedByGS1 />} />
                          <Route path="notfications" element={<Notifications />} />

                          <Route path="gcp-license" element={<GcpLicense />} />
                          <Route path="gs1-registries" element={<GS1Registries />} />

                          <Route path="migration" element={<Migration />} />
                          <Route path="help-desk" element={<HelpDesk />} />
                          <Route path="old-inactive-members" element={<OldInActiveMembers />} />
                          <Route path="staff-help-desk" element={<StaffHelpDesk />} />

                          <Route path="front-end" element={<Frontend />} />
                          <Route path="settings" element={<Settings />} />
                          <Route path="master-data" element={<MasterData />} />
                          <Route path="reports" element={<Reports />} />

                          <Route path="units" element={<Units />} />
                          <Route path="Documents" element={<Documents />} />;
                          <Route path="ProductPackaging" element={<ProductPackaging />} />
                          <Route path="Other_products" element={<Other_products />} />
                          <Route path="Gcp_type" element={<Gcp_type />} />
                          <Route path="CountryofSales" element={<CountryofSales />} />
                          <Route path="Hscode" element={<Hscode />} />
                            <Route path="UNSPCS" element={<UNSPCS />} />    
                            <Route path="Cities" element={<Cities />} />   
                            <Route path="State" element={<State />} /> 
                            <Route path="Country" element={<Country />} /> 
                            <Route path="crnumber" element={<Crnumber />} />
                        </Routes>
                        </QueryClientProvider>
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