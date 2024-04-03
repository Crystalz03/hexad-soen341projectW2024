import React from "react";

import NavBar from "../components/NavBar";
import BranchFinder from "../components/FindBranch";
import Footer from "../components/Footer";

import "./../style/style.css";

function Branches() {
  return (
    <div>
      <NavBar/>
      <Main />
      <Footer/>
    </div>
  );
}

function Main() {
  return (
        <div className="main-content" >
            <BranchFinder />

        </div>
  );
}
export default Branches;