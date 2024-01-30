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
import UDI from "./Pages/MemberPages/UDI/UDI";
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

const queryClient = new QueryClient()

const App = () =>
{
  const MainLayout = ({ children }) =>
  {
    return (
      <div className="main-layout-container">
        <Sidebar />
        <span className="right-layout">{children}</span>
      </div>
    );
  };

  const AdminMainLayout = ({ children }) =>
  {
    return (
      <div className="main-layout-container">
        <AdminSideBar />
        <span className="right-layout">{children}</span>
      </div>
    );
  };

  const UserLayout = ({ children }) =>
  {
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

                            <Route path="registered-members" element={<RegisteredMembers />} />

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

                            <Route path="brands" element={<Brands />} />
                            <Route path="products" element={<Products />} />
                            <Route path="products/add-products" element={<AddProducts />} />
                            <Route path="products/edit-products/:Id" element={<UpdateProducts />} />


                            <Route path="expired-member" element={<ExpiredMember />} />
                            <Route path="member-products" element={<MemberProducts />} />
                            <Route path="verified-by-gs1" element={<VerifiedByGS1 />} />
                            <Route path="notfications" element={<Notifications />} />
                            <Route path="rejected" element={<Rejected />} />
                            <Route path="payment-slips" element={<AdminPaymentSlips />} />

                            <Route path="gcp-license" element={<GcpLicense />} />
                            <Route path="gs1-registries" element={<GS1Registries />} />

                            <Route path="migration" element={<Migration />} />
                            <Route path="help-desk" element={<HelpDesk />} />
                            <Route path="old-inactive-members" element={<OldInActiveMembers />} />
                            <Route path="staff-help-desk" element={<StaffHelpDesk />} />
                            <Route path="member-expiry-page" element={<MembersExpiryPage />} />
                            <Route path="products-category" element={<ProductsCategory />} />
                            <Route path="others-products-category" element={<OtherProductsCategory />} />
                            <Route path="addtional-gtin" element={<AdditionalGTIN />} />

                            <Route path="addtional-gln" element={<AdditionalGLN />} />

                            <Route path="gtin" element={<Gtin />} />
                            <Route path="admin-gtin" element={<AddGTINProducts />} />
                            <Route path="admin-update-gtin/:productId" element={<AdminUpdateGTIN />} />
                            <Route
                              path="admin-view-gtin/:productId"
                              element={<AdminGTINView />}
                            />

                            <Route path="gln" element={<Gln />} />
                            <Route path="admin-addgln" element={<AdminAddGLN />} />

                            <Route path="sscc" element={<Sscc />} />
                            <Route path="admin-addsscc" element={<AdminAddSSCC />} />
                            <Route path="admin-update-sscc/:sscc_id" element={<AdminUpdateSSCC />} />

                            <Route path="foreign-gtin" element={<ForeignGTIN />} />

                            <Route path="front-end" element={<Frontend />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="master-data" element={<MasterData />} />

                            <Route path="reports" element={<Reports />} />
                            <Route path="kpi-report" element={<KPIReport />} />
                            <Route path="member-activity-report" element={<MemberActivityReport />} />
                            <Route path="admin-activity-report" element={<AdminActivityReport />} />
                            
                            
                            <Route path="users-permissions" element={<Users />} />
                            <Route path="roles-permissions" element={<Roles />} />
                            <Route path="add-roles" element={<AddRoles />} />
                            
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
                            <Route path="documenttype" element={<Document_type />} />
                            {/* Megamenu */}
                            <Route path="megamenu" element={<Megamenu />} />
                            <Route path="categories" element={<Categories />} />
                            <Route path="footer_menu" element={<Footermenu />} />
                            <Route path="Sliders" element={<Sliders />} />
                            <Route path="Featured_services" element={<Featuredservices />} />
                            <Route path="events" element={<Events />} />
                            <Route path="articles" element={<Articles />} />
                            {/* Pages */}
                            <Route path="Pages" element={<Pages />} />
                            <Route path="Add_Pages" element={<Addpages />} />
                            <Route path="updata_Pages/:userId" element={<Updatapage />} />
                            {/* Gs1partners */}
                            <Route path="partners" element={<Gs1partners />} />
                            {/* Blogcategories */}
                            <Route path="Blog_categories" element={<Blogcategories />} />
                            {/* Faqcategories */}
                            <Route path="Faq_categories" element={<Faqcategories />} />
                            {/* Manageteam */}
                            <Route path="Manage_team" element={<Manageteam />} />
                            {/* Boardmembers */}
                            <Route path="Board_members" element={<Boardmembers />} />
                            {/* Userguide */}
                            <Route path="User_guide" element={<Userguide />} />

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