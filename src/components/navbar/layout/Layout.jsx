import Navbar from "../Navbar";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";

function Layout() {

    return (
        <div className="app">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
};

export default Layout;
