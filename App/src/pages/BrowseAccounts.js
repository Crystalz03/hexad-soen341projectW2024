import React from "react";

import BrowseAccountsComponent from "../components/BrowseAccountsComponent";

import "./../style/style.css";
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function BrowseAccounts() {
    return (
        <div>
          <Header />
          <Main />
          <Footer />
          </div>
      );
}

function Main() {
    return (
      <div>
        <div >
          <div >
            <div className="title-box">
              <div className="reservation-title">Accounts</div>
            </div>
            <div className="account-content" style={{height:"400px"}}><BrowseAccountsComponent /></div>
          </div>
        </div>
      </div>
    );
  }
