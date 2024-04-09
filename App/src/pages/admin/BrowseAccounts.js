import React from "react";
import BrowseAccountsComponent from "../../components/adminActions/BrowseCustomerAccounts";
import BrowseAdminAccounts from "../../components/adminActions/BrowseAdminAccounts";
import BrowseCSRAccounts from "../../components/adminActions/BrowseCSRAccounts";
import "../../../public/assets/css/style.css";

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
