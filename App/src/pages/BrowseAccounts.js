import React from "react";
import BrowseAccountsComponent from "../components/BrowseCustomerAccounts";
import BrowseAdminAccounts from "../components/BrowseAdminAccounts";
import BrowseCSRAccounts from "../components/BrowseCSRAccounts";
import "./../style/style.css";

function BrowseAccounts() {
    return (
      <div className="main-content">
          <div className="title-box">
            <div className="title-accounts" >Accounts</div>
          </div>
          <div className="account-content">
              <BrowseAccountsComponent /> <br/>
              <BrowseAdminAccounts /> <br/>
              <BrowseCSRAccounts />
          </div>
        </div>
    );
    
  }

  export default BrowseAccounts; 
