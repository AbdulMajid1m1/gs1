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

const App = () => {
  const MainLayout = ({ children }) => {
    return (
      <div className="main-layout-container">
        <Sidebar />
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

                  
                  <Route
                    path="/*"
                    element={
                      <MainLayout>
                        <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/update-vendor" element={<UpdateVendor />} />
                            <Route path="/customer-list" element={<ListOfCustomer />} />
                            <Route path="/gtin" element={<GTIN />} />
                            <Route path="addproducts" element={<GTINAddProducts />} />
                            <Route
                              path="upate-gtin-product/:productId"
                              element={<GTINUpdateProducts />}
                            />
                            <Route
                              path="view-gtin-product/:productId"
                              element={<GTINViewProduct />}
                            />


                            
                        </Routes>
                      </MainLayout>
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