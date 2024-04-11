import React from "react";
import BranchFinder from "../../components/branchLocator/FindBranch";

import "../../../public/assets/css/style.css";

function Branches() {
  return (
    <div>
      <div className="title-box"  style={{marginLeft:"10%"}}>
        <div className="check-in-title">Find Nearest Branch</div>
      </div>
      <div className="main-content">
        <BranchFinder map={true} />
      </div>
    </div>
  );
}
export default Branches;
