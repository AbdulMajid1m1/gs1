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
                  

                  <Route
                    path="/*"
                    element={
                      <MainLayout>
                        <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/update-vendor" element={<UpdateVendor />} />
                            <Route path="/customer-list" element={<ListOfCustomer />} />
                          
                            
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