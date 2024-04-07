import React from "react";

import BranchFinder from "./../../components/branchLocator/FindBranch";
import Footer from "./../../components/layout/Footer";
import Header from "./../../components/layout/Header";
import SideMenu from "./../../components/layout/SideMenu";
import "../../../public/css/style.css";

function Branches() {
  return (
    <div>
      <Header />
      <SideMenu />
      <BranchFinder />
      <Footer />
    </div>
  );
}
export default Branches;
