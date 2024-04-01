import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <div className="position-absolute bottom-0 end-0">
      <footer className="py-3 bg-light">
        <div className="container">
          <span className="text-muted">Place footer content here.</span>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
