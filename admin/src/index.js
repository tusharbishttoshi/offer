import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import "./Sidebar.css"
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import { Provider } from 'react-redux'
// import pages 
import Dashboard from './page/Dashboard';
import RolePage from './page/RolePage.jsx';
import CategoryPage from './page/CategoryPage.jsx';
import ManageOfferPage from './page/ManageOfferPage.jsx';
import AdminUsers from './page/AdminUsers.jsx';
import AstroRequest from './page/AstroRequest.jsx';
import AstrologerPage from './page/AstrologerPage.jsx';

import BlogPage from './page/Bloagpage.jsx';

import { ClintRoutes } from './ClintRoutes.jsx';

import store from './store'
import UserReport from './page/UserReport.jsx';
import TransitionReport from './page/TransitionReport.jsx';
import ChatReport from './page/ChatReport.jsx';
import AstroPage from './page/AstroPage.jsx';
import LogActive from './page/LogActivity.jsx';
import axios from 'axios'
import CreateBlog from './page/BlogManagement/CreateBlog.jsx';
import UpdateBlog from './page/BlogManagement/UpdateBlog.jsx';
import RefundListManagement from './page/RefundListManagement.jsx';
import SessionsListManagement from './page/sessions/SessionsListManagement.jsx';
import WalletManagement from './page/Wallet/WalletManagement.jsx';
import TransactionManagement from './page/TransactionManagement/TransactionManagement.jsx';
import ReasonManagementList from './page/ReasonManagement/ReasonManagementList.jsx';
import CreateReason from './page/ReasonManagement/CreateReason.jsx';
import UpdateReason from './page/ReasonManagement/UpdateReason.jsx';
import UserManagement from './page/UserManagement/UserManagement.jsx';
import AstroDeatils from './page/AstroManagement/AstroDeatils.jsx';
import ChatManagementList from './page/ChatManagement/ChatManagementList.jsx';
import ChatViewReport from './page/ChatManagement/ChatViewReport.jsx';
import CreateSubadmin from './page/CreateSubadmin.jsx';
import UpdateSubadmin from './page/UpdateSubAdmin.jsx';
import InvoiceManagement from './page/InvoiceManagement.jsx';
import CreateNotification from './page/NotificationManagement/CreateNotification.js';


const root = ReactDOM.createRoot(document.getElementById('root'));

// const baseUrl = "http://localhost:8000/"
// const baseUrl = "http://193.203.162.221:8000/"
const baseUrl = "https://api.unzziptruth.com/"
// const baseUrl = "http://api.unzziptruth.com/"

axios.defaults.baseURL = baseUrl
const storedValue = localStorage.getItem("user_info");
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/*" element={<ClintRoutes >
            <Routes>
              <Route exact path='/' element={<Dashboard />} />
              <Route exact path='/role' element={<RolePage />} />
              <Route exact path='/Wallet-Management' element={<WalletManagement />} />
              <Route exact path='/category' element={<CategoryPage />} />
              <Route exact path='/manage-offer' element={<ManageOfferPage />} />
              <Route exact path='/admin-users' element={<AdminUsers />} />
              <Route exact path='/astro-add' element={<AstroRequest />} />
              <Route exact path='/astrologer' element={<AstrologerPage />} />
              <Route exact path='/Create-Subadmin' element={<CreateSubadmin />} />
              <Route exact path='/Create-Notification' element={<CreateNotification />} />
              <Route exact path='/Sub-admin' element={<UpdateSubadmin />} />



              <Route exact path='/blog-page' element={<BlogPage />} />
              <Route exact path='/Create-Blog' element={<CreateBlog />} />
              <Route exact path='/Update-Blog/:_id' element={<UpdateBlog />} />
              <Route exact path='/users-report' element={<UserReport />} />
              <Route exact path='/Transaction-history' element={<TransitionReport />} />
              <Route exact path='/chat-history-view' element={<ChatViewReport />} />
              <Route exact path='/chat-report' element={<ChatManagementList />} />
              <Route exact path='/invoice-report' element={<InvoiceManagement />} />

              {/* <Route exact path='/chat-report' element={<ChatReport />} /> */}
              <Route exact path='/refund-list' element={<RefundListManagement />} />
              <Route exact path='/Session-list' element={<SessionsListManagement />} />
              <Route exact path='/astro/:id' element={<AstroPage />} />
              <Route exact path='/astro/log/:id' element={<LogActive />} />
              <Route exact path='/Transaction-Management-list' element={<TransactionManagement />} />
              <Route exact path='/Reason-Management-list' element={<ReasonManagementList />} />
              <Route exact path='/Reason-Create' element={<CreateReason />} />
              <Route exact path='/Reason-Update' element={<UpdateReason />} />
              <Route exact path='/User-details/:_id' element={<UserManagement />} />
              <Route exact path='/Astro-details' element={<AstroDeatils />} />

            </Routes>
          </ClintRoutes>} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
