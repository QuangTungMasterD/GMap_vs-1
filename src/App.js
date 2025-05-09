import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./Layout/DefaultLayout/DefaultLayout";
import Home from "./Pages/Home/Home";
import Map from "./Pages/Map/Map";
import ReqUserManage from "./Pages/ReqUserManage";
import SideLayout from "./Layout/SideLayout/SideLayout";
import CurrentLocationManage from "./Pages/CurrentLocationManage";
import ToastProvider from "./contexts/ToastProvider/ToastProvider";

function App() {
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

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
                                <DefaultLayout>
                                    <Map />
                                </DefaultLayout>
                            }
                        />
                        {isLocalhost ? (
                            (<Route
                                path={"/manager/req"}
                                element={
                                    <SideLayout>
                                        <ReqUserManage />
                                    </SideLayout>
                                }
                            />)
                        ) : ''}
                        {isLocalhost ? (
                            (
                            <Route
                                path={"/manager/cur"}
                                element={
                                    <SideLayout>
                                        <CurrentLocationManage />
                                    </SideLayout>
                                }
                            />
                            )
                        ) : ''}
                    </Routes>
                </div>
            </Router>
        </ToastProvider>
    );
}

export default App;
