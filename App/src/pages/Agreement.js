import React from 'react';
import "./../style/style.css";
import MyPDF from "../components/RentalAgreement";
import { PDFViewer } from '@react-pdf/renderer';


const App = () => {
  return (
    <div>
      <PDFViewer style={{ width: '100%', height: '500px' }}>
        <MyPDF />
      </PDFViewer>
    </div>
  );
};

export default App;