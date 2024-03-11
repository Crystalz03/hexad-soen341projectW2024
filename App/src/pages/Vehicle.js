
// import React, { useState, useEffect } from 'react';
// import "./../style/style.css";
// import Header from "./../components/Header";
// import Footer from "./../components/Footer";
    
// function VehicleForm() {

  
//  /*fetch("http://localhost:9000/vehicles", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               id: 'V123456789',
//               type: 'Sedan',
//               category: 'Compact',
//               model: 'Civic',
//               price: 25000.00,
//             }),
//           }).then(res => res.json())
//           .then(data => {
//             console.log("API Response:", data); //!!FOR DEBUGGING ONLY remove the log when done 
//           })
//           .catch(error => console.error(error));*/                                                                                                                                                                                                            

    
//     const [vehicles, setVehicles] = useState([]);      

//     const getVehicles = () => {
//       fetch("http://localhost:9000/vehicles", {
//         method: 'GET', 
//       })
//         .then(data => data.json())
//         .then(data => {console.log(data.vehicle[0]); // always keep data.vehicle[0] this will return you an arrray with all the vehilce
//         setVehicles(data.vehicle[0]);})
//         .catch(error => console.error(error));
//     }
    
    


//     const [formData, setFormData] = useState({
//       id: '0000000000',
//       type: 'type',
//       category: 'category',
//       model: 'model',
//       price: 0,
//       availability: '1',
//     });

//     const [apiResponse, setApiResponse] = useState(''); 

//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormData({ ...formData, [name]: value });
    
//     };
  
//     const CallAPISet =  (e) => {
//       console.log('Submitted Data:', formData);

//           fetch("http://localhost:9000/vehicles", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(formData),
//           }).then(res => res.json()).then(data => {
//             console.log("API Response:", data); 
//             setApiResponse(data); // Update state with the JSON response
//           }).catch(error => console.error(error));

//       setFormData({
//         id: '0000000000',
//         type: 'type',
//         category: 'category',
//         model: 'model',
//         price: 0,
//         availability: '1',
//       });
      
//       getVehicles();
//     };

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       CallAPISet();
//     }

//     //Alternative way of using POST, still causing errors
//     /*const [error, setError] = useState("")
//     const callAPI = async () => {
//       try {


//         const response = await fetch("http://localhost:9000/vehicles", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         });
//         console.log(JSON.stringify(formData));
  
//         if (!response.ok) {
//           throw new Error(
//             "This email is already associated with an account. Please sign in."
//           );
//         }
  
//         navigate("/");
//       } catch (error) {
//         setError(error.message);
//         console.error(error);
//       }
//     };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     callAPI();
//   }; */

//     return (
//       <div>
        
//       <Header/>
//       <aside className="nav sticky">
//           <div className="company-name-nav all-caps">hexad</div>
//           <ul className="nav-list-1">
//             <li className="nav-list-components-1">Sign In/Sign Up</li>
//             <li className="nav-list-components-1">About Hexad</li>
//             <li className="nav-list-components-1">Reserve</li>
//             <li className="nav-list-components-1">View/Cancel/Modify
//             </li>
//           </ul>
//           <div className="nav-divider"></div>
//           <ul className="nav-list-2">
//             <li className="nav-list-components-2 current-page">
//               Browse Vehicles
//             </li>
//             <li className="nav-list-components-2">Locations</li>
//             <li className="nav-list-components-2">Contact Us</li>
//           </ul>
//           <div className="nav-divider"></div>
//         </aside>
//         <div className="main-content">
//            <form className="form-1" onSubmit={handleSubmit}>
//       <h2 className="form-header">Create New Vehicle</h2>
//         <label>
//           ID:
//           <input
//             type="text"
//             name="id"
//             value={formData.id}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
  
//         <label>
//           Type:
//           <input
//             type="text"
//             name="type"
//             value={formData.type}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
  
//         <label>
//           Category:
//           <input
//             type="text"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
  
//         <label>
//           Model:
//           <input
//             type="text"
//             name="model"
//             value={formData.model}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
  
//         <label>
//           Price:
//           <input
//             type="text"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Availibility:
//           <input
//             type="text"
//             name="availability"
//             value={formData.availability}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <button className="button-1" role="button" type="submit">Submit</button>
//       </form>

//         </div>
     
//         <div>
//       <Main vehicles={vehicles} />
//     </div>

//       <Footer></Footer>
//       </div>
//     );
//   };

// //For testing to see if vehicles are added correctly
// function BrowseVehicles() {
//   const [vehicles, setVehicles] = useState([]);
//   fetch("http://localhost:9000/vehicles", {
//         method: 'GET', 
//       })
//         .then(data => data.json())
//         .then(data => {console.log(data.vehicle[0]); // always keep data.vehicle[0] this will return you an arrray with all the vehilce
//         setVehicles(data.vehicle[0]);})
//         .catch(error => console.error(error));


//  /* useEffect(() => {
//     const callAPIGet = async () => {
//       const response = await fetch("http://localhost:9000/vehicles", {
//         method: 'GET', 
//       })
//         .then(data => data.json())
//         .then(data => {console.log(data.vehicle[0][0].ID); // always keep data.vehicle[0] this will return you an arrray with all the vehilce
//           setApiResponse(data                              // data.vehicle[0] => array of vehicles -- data.vehicle[0][0] => 1st vehicle in the list -- data.vehicle[0][0].ID == ID 
//           )})
//         .catch(error => console.error(error));

//         const data = await response.json();
//         setVehicles(data.vehicle);
//     };

//     const fetchVehicles = async () => {
//       try {
//         const response = await fetch("http://localhost:9000/vehicles");
//         if (!response.ok) {
//           throw new Error("Failed to fetch vehicles");
//         }
//         const data = await response.json();
//         setVehicles(data.vehicle);
//       } catch (error) {
//         console.error("Error fetching vehicles:", error);
//       }
//     };

//     fetchVehicles();
//   }, []);*/

//   return (
//     <div>
//       <Main vehicles={vehicles} />
//     </div>
//   );
// }

// function Main({ vehicles }) {

//   return (
//     <div className="main">
//       <div className="general-structure">
//       <div className="main-content">
//           <h2>Browse Vehicles</h2>
//           <ul>
//             {vehicles.map((vehicle) => (
//               <li key={vehicle.ID}>
//                 <div>ID: {vehicle.id}</div>
//                 <div>Type: {vehicle.type}</div>
//                 <div>Category: {vehicle.category}</div>
//                 <div>Model: {vehicle.model}</div>
//                 <div>Price: {vehicle.price}</div>
//                 <div>
//                   <button className="button-1">Edit</button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }



// export default VehicleForm;


import React from 'react';
import SideMenu from '../components/SideMenu';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VehicleForm from '../components/VehicleForm';

export default function Vehicle() {
  return (
    <div>
      <Header />
      <SideMenu />
      <Main />
      <Footer />
      </div>
  );
}

function Main() {
  return (
    <div className="main">
      <div className="general-structure">
        <div className="main-content">
          <div className="title-box">
            <div className="reservation-title">Create A New Vehicle</div>
          </div>
          <div className="extra-content" style={{height:"400px"}}><VehicleForm /></div>
        </div>
      </div>
    </div>
  );
}
