import React from "react";

import BranchFinder from "../components/FindBranch";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";

import "./../style/style.css";

function Branches() {
  return (
    <div>
      <Header/>
      <SideMenu/>
      <BranchFinder />
      <Footer/>
    </div>
  );
}
export default Branches;