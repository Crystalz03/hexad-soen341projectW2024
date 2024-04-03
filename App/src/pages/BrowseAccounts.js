import React from "react";
import BrowseAccountsComponent from "../components/BrowseCustomerAccounts";
import BrowseAdminAccounts from "../components/BrowseAdminAccounts";
import BrowseCSRAccounts from "../components/BrowseCSRAccounts";
import "./../style/style.css";

function BrowseAccounts() {
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

  export default BrowseAccounts; 
