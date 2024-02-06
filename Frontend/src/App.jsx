import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./Pages/AdminPages/Dashboard/Dashboard";
import UpdateVendor from "./Pages/MemberPages/UpdateVendor/UpdateVendor";
import ListOfCustomer from "./Pages/AdminPages/ListOfCustomer/ListOfCustomer";
import { SnackbarProvider } from "./Contexts/SnackbarContext";
import DataTableProvider from "./Contexts/DataTableContext";
import DataTableProvider2 from "./Contexts/DataTableContext2";
import AuthProvider from "./Contexts/AuthContext.jsx";
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
import GLN from "./Pages/MemberPages/GLN/GLN";
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
import VerifiedByGS1 from "./Pages/AdminPages/AdminShare/VerifiedByGS1/VerifiedByGS1";
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
import MemberHelpDesk from "./Pages/MemberPages/MemberHelpDesk/MemberHelpDesk";
import SubscribedGTIN from "./Pages/MemberPages/SubscribedGTIN/SubscribedGTIN";
import Crnumber from './Pages/AdminPages/MasterData/crnumber/crnumber';
import MemberCrNumber from "./Pages/MemberPages/MemberCrNumber/MemberCrNumber";
import Document_type from './Pages/AdminPages/MasterData/documentype/documenttype';
import MemberData from "./Pages/MemberPages/MemberData/MemberData";
import MemberProfileData from "./Contexts/MemberProfileData";
import UpdateProducts from "./Pages/AdminPages/AdminIndentify/Products/UpdateProducts";
import AddProducts from "./Pages/AdminPages/AdminIndentify/Products/AddProducts";
import AddGLN from "./Pages/MemberPages/GLN/AddGLN";
import UpdateGLN from "./Pages/MemberPages/GLN/UpdateGLN";
import UDI from "./Pages/MemberPages/MemberIdentify/UDI/UDI.jsx";
import SSCC from "./Pages/MemberPages/SSCC/SSCC";
import AddSSCC from "./Pages/MemberPages/SSCC/AddSSCC";
import UpdateSSCC from "./Pages/MemberPages/SSCC/UpdateSSCC";
import ForeignGTIN from "./Pages/AdminPages/AdminIndentify/ForeignGTIN/ForeignGTIN";
import Gtin from "./Pages/AdminPages/AdminIndentify/GTIN/AdminGTIN";
import Sscc from "./Pages/AdminPages/AdminIndentify/SSCC/AdminSSCC";
import Gln from "./Pages/AdminPages/AdminIndentify/GLN/AdminGLN";
import DigitalUrlInfo from "./Pages/MemberPages/DigitalUrlInfo/DigitalUrlInfo";
import MembersExpiryPage from "./Pages/AdminPages/Others/MembersExpiryPage/MembersExpiryPage";
import AdminAddSSCC from "./Pages/AdminPages/AdminIndentify/SSCC/AdminAddSSCC";
import AdminAddGLN from "./Pages/AdminPages/AdminIndentify/GLN/AdminAddGLN";
import AddGTINProducts from "./Pages/AdminPages/AdminIndentify/GTIN/AddGTINProducts";
import AdminPaymentSlips from "./Pages/AdminPages/AdminCapture/PaymentSlips/AdminPaymentSlips";
import ProductsCategory from "./Pages/AdminPages/Others/ProductsCategory/ProductsCategory";
import OtherProductsCategory from "./Pages/AdminPages/Others/OtherProductsCategory/OtherProductsCategory";
import Megamenu from "./Pages/AdminPages/FrontEnd/CataLog/MegaMenu/Megamenu";
import Categories from "./Pages/AdminPages/FrontEnd/CataLog/Categories/Categories";
import Footermenu from "./Pages/AdminPages/FrontEnd/CataLog/Footermenu/Footermenu";
import Sliders from "./Pages/AdminPages/FrontEnd/CataLog/Sliders/Sliders";
import Featuredservices from "./Pages/AdminPages/FrontEnd/CataLog/FeaturedServices/Fraturedservices";
import Events from "./Pages/AdminPages/FrontEnd/CataLog/Events/Events";
import Articles from "./Pages/AdminPages/FrontEnd/CataLog/Articles/Articles";
import Gs1partners from "./Pages/AdminPages/FrontEnd/Gs1Partners/Gs1partners";
import Blogcategories from "./Pages/AdminPages/FrontEnd/Blogcategories/Blogcategories";
import Faqcategories from "./Pages/AdminPages/FrontEnd/Faqcategories/Faqcategories";
import Manageteam from "./Pages/AdminPages/FrontEnd/Manageteam/Manageteam";
import Boardmembers from "./Pages/AdminPages/FrontEnd/Boardmembers/Boardmembers";
import Userguide from "./Pages/AdminPages/FrontEnd/Userguide/Userguide";
import Pages from "./Pages/AdminPages/FrontEnd/Pages/Pages";
import Addpages from "./Pages/AdminPages/FrontEnd/Pages/Addpages";
import Updatapage from "./Pages/AdminPages/FrontEnd/Pages/Updatapage";
import BlogPages from "./Pages/UserPages/BlogPages/BlogPages";
import Rejected from "./Pages/AdminPages/AdminCapture/Rejected/Rejected";
import AdminUpdateGTIN from "./Pages/AdminPages/AdminIndentify/GTIN/AdminUpdateGTIN";
import AdminGTINView from "./Pages/AdminPages/AdminIndentify/GTIN/AdminGTINView";
import AdminUpdateSSCC from "./Pages/AdminPages/AdminIndentify/SSCC/AdminUpdateSSCC";
import KPIReport from "./Pages/AdminPages/AdminTab/Reports/KPIReport/KPIReport";
import MemberActivityReport from "./Pages/AdminPages/AdminTab/Reports/MemberActivityReport/MemberActivityReport";
import AdminActivityReport from "./Pages/AdminPages/AdminTab/Reports/AdminActivityReport/AdminActivityReport";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProductInformation from "./Pages/UserPages/ProductInformation/ProductInformation";
import MapProvider from "./Contexts/EventMapContext";
import AdditionalGTIN from "./Pages/AdminPages/Others/AdditionalGTIN/AdditionalGTIN";
import AdditionalGLN from "./Pages/AdminPages/Others/AdditionalGLN/AdditionalGLN";
import ExpiredMember from "./Pages/AdminPages/AdminCapture/ExpiredMember/ExpiredMember";
import Users from "./Pages/AdminPages/MasterData/Users/Users";
import Roles from "./Pages/AdminPages/MasterData/Roles/Roles";
import AddRoles from "./Pages/AdminPages/MasterData/Roles/AddRoles";
import AddUsers from "./Pages/AdminPages/MasterData/Users/AddUsers";
import UpdateUsers from "./Pages/AdminPages/MasterData/Users/UpdateUsers";
import UpdateRoles from "./Pages/AdminPages/MasterData/Roles/UpdateRoles";
import ProductCategories from "./Pages/AdminPages/Others/ProductCategories/ProductCategories";
import ProtectedRoute from "./ProtectedRoute.jsx";
import LicenceRegistry from "./Pages/AdminPages/AdminIndentify/LicenceRegistry/LicenceRegistry";
import ForeginGtin from "./Pages/MemberPages/MemberIdentify/ForeginGtin/ForeginGtin.jsx";
import AddForeignGtin from "./Pages/MemberPages/MemberIdentify/ForeginGtin/AddForeignGtin.jsx";
import DigitalLinkInfo from "./Pages/MemberPages/MemberIdentify/ForeginGtin/DigitalLinkInfo.jsx";

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

  const UserLayout = ({ children }) => {
    return (
      <div>
        <div className='sticky top-0 z-50 bg-white'>
          <Header />
        </div>
        <main className="mx-auto flex max-w-[1760px] flex-col justify-center">
          {children}
        </main>
        <Footer />
      </div>
    );
  };
  return (
    <>
      <AuthProvider>
        <DataTableProvider2>
          <DataTableProvider>
            <SnackbarProvider>

              <div>
                <BrowserRouter>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <UserLayout>
                          <Routes>
                            {/* <Route path="/" element={<HomePage />} /> */}
                            <Route index element={<HomePage />} />
                          </Routes>
                        </UserLayout>
                      }
                    />

                    <Route path="/get-barcode" element={<GetBarcode />} />
                    <Route path="/member-registration" element={<MemmberRegisteration />} />
                    <Route path="/email-address" element={<EmailAddress />} />
                    <Route path="/select-activity" element={<SelectActivity />} />
                    <Route path="/verify-code" element={<VerifyCode />} />
                    <Route path="/:id" element={<BlogPages />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route
                      path="productinformation"
                      element={
                        <MapProvider>
                          <ProductInformation />
                        </MapProvider>
                      }
                    />

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

                              <Route path="front-end" element={<Frontend />} />
                              <Route path="settings" element={<Settings />} />
                              <Route path="master-data" element={<MasterData />} />
                              <Route path="reports" element={<Reports />} />
                              <Route
                                path="view-gtin-product/:productId"
                                element={<GTINViewProduct />}
                              />
                              <Route path="digitalurl" element={<DigitalUrlInfo />} />

                              <Route path="gln" element={<GLN />} />
                              <Route path="add-gln" element={<AddGLN />} />
                              <Route path="update-gln/:Id" element={<UpdateGLN />} />

                              <Route path="sscc" element={<SSCC />} />
                              <Route path="addsscc" element={<AddSSCC />} />
                              <Route path="update-sscc/:sscc_id" element={<UpdateSSCC />} />

                              <Route path="member-foregin-gtin" element={<ForeginGtin />} />
                              <Route path="foreign-digital-link" element={<DigitalLinkInfo />} />
                              <Route path="member-add-foreign" element={<AddForeignGtin />} />

                              <Route path="gs1-members" element={<Gs1Members />} />
                              <Route path="member-profile" element={<MemberProfile />} />

                              {/* <Route
                            path="view-gs1-member/:Id"
                            element={<Gs1MembersView />}
                          /> */}

                              <Route path="payment-slips" element={<PaymentSlips />} />
                              <Route path="bank-slip" element={<BankSlip />} />
                              <Route path="transaction-history" element={<TransactionHistory />} />
                              <Route path="member-helpdesk" element={<MemberHelpDesk />} />
                              <Route path="subscribed-gtin" element={<SubscribedGTIN />} />

                              <Route path="udi" element={<UDI />} />
                              {/* <Route path="member-helpdesk" element={<MemberHelpDesk />} /> */}

                              {/* <Route path="member-data" element={<MemberData />} /> */}
                              <Route path="member-crnumber" element={<MemberCrNumber />} />
                              <Route path="member-data" element={<MemberData />} />
                              <Route path="member-crnumber" element={<MemberCrNumber />} />


                            </Routes>
                          </QueryClientProvider>
                        </MainLayout>
                      }
                    />
                  </Routes>



                  <Routes>
                    {/* <Route path="/admin-login" element={<AdminLogin />} /> */}

                    {/* Admin Routes */}
                    <Route
                      path="/admin/*"
                      element={
                        <AdminMainLayout>
                          <QueryClientProvider client={queryClient}>
                            <Routes>
                              <Route path="dashboard" element={<Dashboard />} />

                              <Route path="registered-members" element={
                                <ProtectedRoute requiredPermission="members">
                                  <RegisteredMembers />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="registered-members" element={<RegisteredMembers />} /> */}
                              {/* <Route
                              path="registered-members/view-registered-member/:Id"
                              element={<MemberProfileData><RegisteredMembersView /></MemberProfileData>}
                            /> */}
                              <Route
                                path="registered-members/view-registered-member/:Id"
                                element={<RegisteredMembersView />}
                              />

                              <Route
                                path="view-gs1-member/:Id"
                                element={<Gs1MembersView />}
                              />

                              {/* <Route path="brands" element={<Brands />} /> */}
                              <Route path="brands" element={
                                <ProtectedRoute requiredPermission="brands">
                                  <Brands />
                                </ProtectedRoute>
                              } />
                              <Route path="licence-registry" element={<LicenceRegistry />} />
                              <Route path="products" element={<Products />} />
                              <Route path="products/add-products" element={<AddProducts />} />
                              <Route path="products/edit-products/:Id" element={<UpdateProducts />} />


                              {/* <Route path="expired-member" element={<ExpiredMember />} /> */}
                              <Route path="expired-member" element={
                                <ProtectedRoute requiredPermission="expired_member_gln_location">
                                  <ExpiredMember />
                                </ProtectedRoute>
                              } />
                              <Route path="member-products" element={<MemberProducts />} />
                              {/* <Route path="verified-by-gs1" element={<VerifiedByGS1 />} /> */}
                              <Route path="verified-by-gs1" element={
                                <ProtectedRoute requiredPermission="verified_by_gs1">
                                  <VerifiedByGS1 />
                                </ProtectedRoute>
                              } />
                              <Route path="notfications" element={<Notifications />} />
                              {/* <Route path="rejected" element={<Rejected />} /> */}
                              <Route path="rejected" element={
                                <ProtectedRoute requiredPermission="rejected">
                                  <Rejected />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="payment-slips" element={<AdminPaymentSlips />} /> */}
                              <Route path="payment-slips" element={
                                <ProtectedRoute requiredPermission="payment_slips_foreign_gtin">
                                  <AdminPaymentSlips />
                                </ProtectedRoute>
                              } />

                              {/* <Route path="gcp-license" element={<GcpLicense />} /> */}
                              <Route path="gcp-license" element={
                                <ProtectedRoute requiredPermission="gcp_licenses">
                                  <GcpLicense />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="gs1-registries" element={<GS1Registries />} /> */}
                              <Route path="gs1-registries" element={
                                <ProtectedRoute requiredPermission="gs1_registries">
                                  <GS1Registries />
                                </ProtectedRoute>
                              } />

                              <Route path="migration" element={<Migration />} />
                              {/* <Route path="help-desk" element={<HelpDesk />} /> */}
                              <Route path="help-desk" element={
                                <ProtectedRoute requiredPermission="help_desk">
                                  <HelpDesk />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="old-inactive-members" element={<OldInActiveMembers />} /> */}
                              <Route path="old-inactive-members" element={
                                <ProtectedRoute requiredPermission="old_inactive_members">
                                  <OldInActiveMembers />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="staff-help-desk" element={<StaffHelpDesk />} /> */}
                              <Route path="staff-help-desk" element={
                                <ProtectedRoute requiredPermission="staff_help_desk">
                                  <StaffHelpDesk />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="member-expiry-page" element={<MembersExpiryPage />} /> */}
                              <Route path="member-expiry-page" element={
                                <ProtectedRoute requiredPermission="90_days_expiry_brands">
                                  <MembersExpiryPage />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="products-category" element={<ProductsCategory />} /> */}
                              <Route path="products-category" element={
                                <ProtectedRoute requiredPermission="gtin_barcode_pricing">
                                  <ProductsCategory />
                                </ProtectedRoute>
                              } />
                              <Route path="products-categories" element={<ProductCategories />} />
                              {/* <Route path="others-products-category" element={<OtherProductsCategory />} /> */}
                              <Route path="others-products-category" element={
                                <ProtectedRoute requiredPermission="other_services_pricing">
                                  <OtherProductsCategory />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="addtional-gtin" element={<AdditionalGTIN />} /> */}
                              <Route path="addtional-gtin" element={
                                <ProtectedRoute requiredPermission="additional_gtin_pricing">
                                  <AdditionalGTIN />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="addtional-gln" element={<AdditionalGLN />} /> */}

                              {/* <Route path="addtional-gln" element={<AdditionalGLN />} /> */}
                              <Route path="addtional-gln" element={
                                <ProtectedRoute requiredPermission="additional_gln">
                                  <AdditionalGLN />
                                </ProtectedRoute>
                              } />

                              <Route path="gtin" element={
                                <ProtectedRoute requiredPermission="gtin_barcode">
                                  <Gtin />
                                </ProtectedRoute>
                              } />
                              <Route path="admin-gtin" element={<AddGTINProducts />} />
                              <Route path="admin-update-gtin/:productId" element={<AdminUpdateGTIN />} />
                              <Route
                                path="admin-view-gtin/:productId"
                                element={<AdminGTINView />}
                              />

                              {/* <Route path="gln" element={<Gln />} /> */}
                              <Route path="gln" element={
                                <ProtectedRoute requiredPermission="gln_location">
                                  <Gln />
                                </ProtectedRoute>
                              } />
                              <Route path="admin-addgln" element={<AdminAddGLN />} />

                              {/* <Route path="sscc" element={<Sscc />} /> */}
                              <Route path="sscc" element={
                                <ProtectedRoute requiredPermission="sscc">
                                  <Sscc />
                                </ProtectedRoute>
                              } />
                              <Route path="admin-addsscc" element={<AdminAddSSCC />} />
                              <Route path="admin-update-sscc/:sscc_id" element={<AdminUpdateSSCC />} />

                              {/* <Route path="foreign-gtin" element={<ForeignGTIN />} /> */}
                              <Route path="foreign-gtin" element={
                                <ProtectedRoute requiredPermission="foreign_gtin">
                                  <ForeignGTIN />
                                </ProtectedRoute>
                              } />

                              <Route path="front-end" element={<Frontend />} />
                              <Route path="settings" element={<Settings />} />
                              <Route path="master-data" element={<MasterData />} />

                              <Route path="reports" element={<Reports />} />
                              {/* <Route path="kpi-report" element={<KPIReport />} /> */}
                              <Route path="kpi-report" element={
                                <ProtectedRoute requiredPermission="finance_kpi">
                                  <KPIReport />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="member-activity-report" element={<MemberActivityReport />} /> */}
                              <Route path="member-activity-report" element={
                                <ProtectedRoute requiredPermission="member_activity">
                                  <MemberActivityReport />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="admin-activity-report" element={<AdminActivityReport />} /> */}
                              <Route path="admin-activity-report" element={
                                <ProtectedRoute requiredPermission="admin_activity">
                                  <AdminActivityReport />
                                </ProtectedRoute>
                              } />


                              {/* <Route path="users-permissions" element={<Users />} /> */}
                              <Route path="users-permissions" element={
                                <ProtectedRoute requiredPermission="users">
                                  <Users />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="roles-permissions" element={<Roles />} /> */}
                              <Route path="roles-permissions" element={
                                <ProtectedRoute requiredPermission="roles">
                                  <Roles />
                                </ProtectedRoute>
                              } />
                              <Route path="add-users" element={<AddUsers />} />
                              <Route path="update-users/:id" element={<UpdateUsers />} />
                              <Route path="add-roles" element={<AddRoles />} />
                              <Route path="update-roles/:id" element={<UpdateRoles />} />

                              {/* <Route path="units" element={<Units />} /> */}
                              <Route path="units" element={
                                <ProtectedRoute requiredPermission="units">
                                  <Units />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="Documents" element={<Documents />} /> */}
                              <Route path="Documents" element={
                                <ProtectedRoute requiredPermission="documents">
                                  <Documents />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="ProductPackaging" element={<ProductPackaging />} /> */}
                              <Route path="ProductPackaging" element={
                                <ProtectedRoute requiredPermission="product_packaging">
                                  <ProductPackaging />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="Other_products" element={<Other_products />} /> */}
                              <Route path="Other_products" element={
                                <ProtectedRoute requiredPermission="other_products">
                                  <Other_products />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="Gcp_type" element={<Gcp_type />} /> */}
                              <Route path="Gcp_type" element={
                                <ProtectedRoute requiredPermission="gcp_type">
                                  <Gcp_type />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="CountryofSales" element={<CountryofSales />} /> */}
                              <Route path="CountryofSales" element={
                                <ProtectedRoute requiredPermission="country_of_sales">
                                  <CountryofSales />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="Hscode" element={<Hscode />} /> */}
                              <Route path="Hscode" element={
                                <ProtectedRoute requiredPermission="hs_code">
                                  <Hscode />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="UNSPCS" element={<UNSPCS />} /> */}
                              <Route path="UNSPCS" element={
                                <ProtectedRoute requiredPermission="unspcs">
                                  <UNSPCS />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="Cities" element={<Cities />} /> */}
                              <Route path="Cities" element={
                                <ProtectedRoute requiredPermission="cities">
                                  <Cities />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="State" element={<State />} /> */}
                              <Route path="State" element={
                                <ProtectedRoute requiredPermission="state">
                                  <State />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="Country" element={<Country />} /> */}
                              <Route path="Country" element={
                                <ProtectedRoute requiredPermission="country">
                                  <Country />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="crnumber" element={<Crnumber />} /> */}
                              <Route path="crnumber" element={
                                <ProtectedRoute requiredPermission="cr_number">
                                  <Crnumber />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="documenttype" element={<Document_type />} /> */}
                              <Route path="documenttype" element={
                                <ProtectedRoute requiredPermission="document_type">
                                  <Document_type />
                                </ProtectedRoute>
                              } />

                              {/* Megamenu */}
                              {/* <Route path="megamenu" element={<Megamenu />} /> */}
                              <Route path="megamenu" element={
                                <ProtectedRoute requiredPermission="mega_menu">
                                  <Megamenu />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="categories" element={<Categories />} /> */}
                              <Route path="categories" element={
                                <ProtectedRoute requiredPermission="categories">
                                  <Categories />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="footer_menu" element={<Footermenu />} /> */}
                              <Route path="footer_menu" element={
                                <ProtectedRoute requiredPermission="footer_menu">
                                  <Footermenu />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="Sliders" element={<Sliders />} /> */}
                              <Route path="Sliders" element={
                                <ProtectedRoute requiredPermission="sliders">
                                  <Sliders />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="Featured_services" element={<Featuredservices />} /> */}
                              <Route path="Featured_services" element={
                                <ProtectedRoute requiredPermission="service">
                                  <Featuredservices />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="events" element={<Events />} /> */}
                              <Route path="events" element={
                                <ProtectedRoute requiredPermission="event">
                                  <Events />
                                </ProtectedRoute>
                              } />
                              {/* <Route path="articles" element={<Articles />} /> */}
                              <Route path="articles" element={
                                <ProtectedRoute requiredPermission="articles">
                                  <Articles />
                                </ProtectedRoute>
                              } />

                              {/* <Route path="Pages" element={<Pages />} /> */}
                              <Route path="Pages" element={
                                <ProtectedRoute requiredPermission="pages">
                                  <Pages />
                                </ProtectedRoute>
                              } />
                              <Route path="Add_Pages" element={<Addpages />} />
                              <Route path="updata_Pages/:userId" element={<Updatapage />} />

                              {/* Gs1partners */}
                              {/* <Route path="partners" element={<Gs1partners />} /> */}
                              <Route path="partners" element={
                                <ProtectedRoute requiredPermission="gs1_partners">
                                  <Gs1partners />
                                </ProtectedRoute>
                              } />

                              {/* Blogcategories */}
                              {/* <Route path="Blog_categories" element={<Blogcategories />} /> */}
                              <Route path="Blog_categories" element={
                                <ProtectedRoute requiredPermission="blog_category">
                                  <Blogcategories />
                                </ProtectedRoute>
                              } />

                              {/* Faqcategories */}
                              {/* <Route path="Faq_categories" element={<Faqcategories />} /> */}
                              <Route path="Faq_categories" element={
                                <ProtectedRoute requiredPermission="faq_categories">
                                  <Faqcategories />
                                </ProtectedRoute>
                              } />

                              {/* Manageteam */}
                              {/* <Route path="Manage_team" element={<Manageteam />} /> */}
                              <Route path="Manage_team" element={
                                <ProtectedRoute requiredPermission="manage_sections">
                                  <Manageteam />
                                </ProtectedRoute>
                              } />

                              {/* Boardmembers */}
                              {/* <Route path="Board_members" element={<Boardmembers />} /> */}
                              <Route path="Board_members" element={
                                <ProtectedRoute requiredPermission="board_members">
                                  <Boardmembers />
                                </ProtectedRoute>
                              } />

                              {/* Userguide */}
                              {/* <Route path="User_guide" element={<Userguide />} /> */}
                              <Route path="User_guide" element={
                                <ProtectedRoute requiredPermission="user_guide">
                                  <Userguide />
                                </ProtectedRoute>
                              } />

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
      </AuthProvider>
    </>
  );
};

export default App;