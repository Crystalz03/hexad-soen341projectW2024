import React from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideMenu from "../components/SideMenu";
import BrowseAccountsComponent from "../components/BrowseCustomerAccounts";
import BrowseAdminAccounts from "../components/BrowseAdminAccounts";
import BrowseCSRAccounts from "../components/BrowseCSRAccounts";

import "./../style/style.css";

export default function BrowseAccounts() {
    return (
        <div >
          <Header />
          <SideMenu/>
          <Main />
          <Footer />
          </div>
      );
}

function Main() {
    return (
      <div className="accounts">
        <div >
          <div >
            <div className="title-box">
              <div className="title-accounts" >Accounts</div>
            </div>
            <div className="account-content" style={{height:"600px"}}>
                <BrowseAccountsComponent />
                <BrowseAdminAccounts />
                <BrowseCSRAccounts />
            </div>
          </div>
        </div>
      </div>
    );
  }
