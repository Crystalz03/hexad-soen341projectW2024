import React from "react";

import BrowseAccountsComponent from "../components/BrowseCustomerAccounts";

import "./../style/style.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideMenu from "../components/SideMenu";

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
      <div className="customer-accounts">
        <div >
          <div >
            <div className="title-box">
              <div className="title-accounts" >Accounts</div>
            </div>
            <div className="account-content" style={{height:"400px"}}><BrowseAccountsComponent /></div>
          </div>
        </div>
      </div>
    );
  }
