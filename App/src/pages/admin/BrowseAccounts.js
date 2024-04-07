import React from "react";
import Header from "./../../components/layout/Header";
import AdminSideMenu from "./../../components/layout/AdminSideMenu";
import BrowseAccountsComponent from "./../../components/adminActions/BrowseCustomerAccounts";
import BrowseAdminAccounts from "./../../components/adminActions/BrowseAdminAccounts";
import BrowseCSRAccounts from "./../../components/adminActions/BrowseCSRAccounts";
import "../../../public/css/style.css";

export default function BrowseAccounts() {
  return (
    <div>
      <Header />
      <AdminSideMenu />
      <Main />
    </div>
  );
}

function Main() {
  return (
    <div className="accounts">
      <div>
        <div>
          <div className="title-box">
            <div className="title-accounts">Accounts</div>
          </div>
          <div className="account-content" style={{ height: "600px" }}>
            <BrowseAccountsComponent />
            <BrowseAdminAccounts />
            <BrowseCSRAccounts />
          </div>
        </div>
      </div>
    </div>
  );
}
