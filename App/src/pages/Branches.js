import React from "react";
import BranchFinder from "../components/FindBranch";

import "./../style/style.css";

function Branches() {
  return (
    <div className="main-content" >
      <div className="title-box">
            <div className="check-in-title">Find Nearest Branch</div>
          </div>

            <BranchFinder />

    </div>
  );
}
export default Branches;