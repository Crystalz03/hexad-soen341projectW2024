import React from "react";
import BranchFinder from "../../components/branchLocator/FindBranch";

import "../../../public/assets/css/style.css";

function Branches() {
  return (
    <div className="main-content" >
      <div className="title-box">
            <div className="check-in-title">Find Nearest Branch</div>
          </div>

            <BranchFinder map={true}/>

    </div>
  );
}
export default Branches;