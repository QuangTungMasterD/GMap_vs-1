import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./Layout/DefaultLayout/DefaultLayout";
import Home from "./Pages/Home/Home";
import Map from "./Component/Map";
import ReqUserManage from "./Pages/ReqUserManage";
import SideLayout from "./Layout/SideLayout/SideLayout";
import CurrentLocationManage from "./Pages/CurrentLocationManage";
import ToastProvider from "./contexts/ToastProvider/ToastProvider";
import HeaderOnly from "./Layout/HeaderOnly/HeaderOnly";
import Login from "./Pages/Login";
import { adminContext } from "./contexts/AdminProvider/AdminProvider";
import { useContext, useEffect } from "react";

function App() {
    const { admin, setAdmin } = useContext(adminContext);
    console.log(admin)
    return (
        <ToastProvider>
            <Router>
                <div className="app">
                    <Routes>
                        <Route
                            path={"/"}
                            element={
                                <DefaultLayout>
                                    <Home />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path={"/Map"}
                            element={
                                <HeaderOnly>
                                    <Map />
                                </HeaderOnly>
                            }
                        />
                        {!admin && (
                            <Route
                                path="/Login"
                                element={
                                    <HeaderOnly>
                                        <Login />
                                    </HeaderOnly>
                                }
                            />
                        )}
                        {admin ? (
                            <Route
                                path={"/manager/req"}
                                element={
                                    <SideLayout>
                                        <ReqUserManage />
                                    </SideLayout>
                                }
                            />
                        ) : (
                            ""
                        )}
                        {admin ? (
                            <Route
                                path={"/manager/cur"}
                                element={
                                    <SideLayout>
                                        <CurrentLocationManage />
                                    </SideLayout>
                                }
                            />
                        ) : (
                            ""
                        )}
                    </Routes>
                </div>
            </Router>
        </ToastProvider>
    );
}

export default App;
