import React from 'react';
import UpdateUserInfo from '../components/UpdateUserInfo';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import Footer from '../components/Footer';

export default function UpdateUserInfoPage() {
  return (
    <div>
        <Header />
        <SideMenu />
        <Footer />
        <Main />
    </div>
  );
}


function Main() {
    return (
      <div className="main">
        <div className="general-structure">
          <div className="main-content">
            <div className="title-box">
              <div className="reservation-title">My Account</div>
              <div className="car-image">
                <img src="" alt="Car Image" className="car-image" />
              </div>
            </div>
            <div className="extra-content" style={{height:"300px"}}>
            <UpdateUserInfo /><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
          </div>
        </div>
      </div>
    );
  }