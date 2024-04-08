import React from "react";
import "./../style/style.css";
import HomeForm from "../components/HomeForm";
import BranchFinder from "../components/FindBranch";
import BrowseVehicles from "../components/BrowseVehicles";



function Home() {
  return (
        <div className="main-content">
          <div className="title-box">
            <div className="check-in-title">Start a Reservation</div>
          </div>
          <div>
          <label className="all-caps location-title" htmlFor="location" style={{marginBottom: '0'}}>
            Location*
          </label>
            <BranchFinder map={false}/>
            <HomeForm />
            <div>
            <BrowseVehicles card={"card"}/>
            </div>
          </div>
          
        </div>
  );
}

export default Home;

