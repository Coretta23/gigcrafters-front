import "./app.scss";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from "./utils/context";
import GuardedRoutes from "./components/navbar/guardedRoutes/GuardedRouts";
import Layout from "./components/navbar/layout/Layout";
import ErrorPage from "./pages/errorPage";
import Acc from "./pages/acc/Acc";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";

function App() {
  // let userRole;
  // const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // if (currentUser) {
  //   userRole = currentUser?.user?.role;
  // } else {
  //   userRole = "unknown"
  // }

  return (
    <Router>
      <AppProvider>
        <Routes>

          <Route path="/" element={<Layout />}>
            <Route index element={<Acc />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/gigs" element={<Gigs />} />
            {/* <GuardedRoutes
              path="/gigs"
              component={<Gigs />}
              allowedRoles={["client", "marchand", "admin"]}
              userRole={userRole}
            /> */}
            <Route path="/myGigs" element={<MyGigs />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/message/:id" element={<Message />} />
            <Route path="/add" element={<Add />} />
            <Route path="/gig/:id" element={<Gig />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AppProvider>
    </Router>
  )
};

export default App;
