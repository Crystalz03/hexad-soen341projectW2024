import React, { useState } from "react";
import "../../../public/css/style.css";
import UpdateCustomer from "./UpdateCustomerInfoCheckIn";
import VehicleInspection from "./VehicleInspection";
import Deposit from "./DepositCheckIn";
import jsPDF from"jspdf";
import moment from 'moment';

function CheckInForm() {
    let reservationID = "";

    const [reservation, setReservation] = useState({}); 
    const [customer, setCustomer] = useState({}); 
    const [vehicle, setVehicle] = useState({}); 
    const [loading, setLoading] = useState(false); 
    const [loading2, setLoading2] = useState(false); 
    const [loading3, setLoading3] = useState(false); 
    const [formHeight, setFormHeight] = useState("200px");



    const [error, setError] = useState("");

    const getReservation = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:9000/reservations/${reservationID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await response.json();
            const mappedReservation = {
                id: data.reservation.ID,
                vehicleID: data.reservation.Vehicle_ID,
                customerID: data.reservation.Customer_ID,
                pickUpDate: data.reservation.Pick_Up_Date,
                returnDate: data.reservation.Return_Date,
                extraEquipment: data.reservation.Extra_Equipment,
                additionalServices: data.reservation.Additional_Services,
                total: data.reservation.Total,
                pickUpLocation: data.reservation.Pick_Up_Location,
                dropOffLocation: data.reservation.Drop_Off_Location,
                mileageLimit: data.reservation.Mileage_Limit
            };
            setReservation(mappedReservation);
            console.log(data);
            getCustomer(data.reservation.Customer_ID);
        } catch (error) {
            setError("Error getting the reservation's Information");
            console.error(error);
        } finally {
            setFormHeight('1000px')
            setLoading(false);
        }
    };

    const getCustomer = async (customerID) => {
        setLoading(true); // Set loading to true when fetching data
        try {
            const response = await fetch(`http://localhost:9000/customers/${customerID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await response.json();
            const mappedCustomer = {
                id: data.customer.ID,
                name: data.customer.Name,
                lastName: data.customer.Last_Name,
                location: data.customer.Location,
                email: data.customer.Email,
                address: data.customer.Address,
                contactNumber: data.customer.Contact_Number,
                licenseNumber: data.customer.License_Number,
                creditCard: data.customer.Credit_Card,
                password: data.customer.Password,
            };
            setCustomer(mappedCustomer);
            console.log(data);
        } catch (error) {
            setError("Error getting the customer's Information");
            console.error(error);
        } finally {
            setLoading(false); // Set loading back to false when fetching is complete
        }
    };

    const getVehicle = async (vehicleID) => {
        setLoading2(true); // Set loading to true when fetching data
        try {
            const response = await fetch(`http://localhost:9000/vehicles/${vehicleID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await response.json();
            const mappedVehicle = {
                id: data.vehicle.ID,
                make: data.vehicle.Make,
                category: data.vehicle.Category,
                model: data.vehicle.Model,
                price: data.vehicle.Price,
                availability: data.vehicle.Availability,
                year:data.vehicle.Year,
                plateNumber: data.vehicle.Plate_Number,
                color: data.vehicle.Color,
                damages: data.vehicle.Damages
            };
            setVehicle(mappedVehicle);
            console.log(data);
        } catch (error) {
            setError("Error getting the customer's Information");
            console.error(error);
        } finally {
            setLoading2(false); // Set loading back to false when fetching is complete
        }
    };


// Generate invoice
const generateAgreement = (customer, vehicle, reservation) => {
    // Create a new jsPDF instance
    let doc = new jsPDF("p", "pt");
  
    // Add invoice header
    doc.setFontSize(20);
    doc.setFont("Arial");

    doc.text("Car Rental Agreement", 72, 60);
    doc.setFontSize(11);
    doc.text(`Rental Agreement Number: ${reservation.id}`, 72, 90);
    doc.text(`This Rental Agreement ("Agreement") is entered into between Hexad, located at Montreal,QC.,  hereinafter referred to as the "Rental Company," and the individual or entity identified below, hereinafter referred to as the "Renter":
    `, 72, 110,{lineHeightFactor: 1.35 ,maxWidth: 451});

    doc.text("1. Renter's Information:", 72, 170)
    doc.text(`Name: ${customer.name}`, 72, 190);
    doc.text(`Contact Number: ${customer.contactNumber}`, 72, 210);
    doc.text(`Email Address: ${customer.email}`, 72, 230);
    doc.text(`Driver's License Number: ${customer.licenseNumber}`, 72, 250);

    doc.text("2. Vehicle Information:", 72, 290)
    doc.text(`Make: ${vehicle.make}`, 72, 310);
    doc.text(`Model: ${vehicle.model}`, 72, 330);
    doc.text(`Year: ${vehicle.year}`, 72, 350);
    doc.text(`License Plate Number: ${vehicle.plateNumber}`, 72, 370);
    doc.text(`Vehicle Identification Number (VIN): ${vehicle.id}`, 72, 390);
    doc.text(`Color: ${vehicle.color}`, 72, 410);

    let rental_period = Math.abs(new Date(reservation.returnDate) - new Date(reservation.pickUpDate)) / (1000 * 60 * 60 *24)

    let startDate = moment(reservation.pickUpDate).format('DD/MM/YYYY');
    let endDate = moment(reservation.returnDate).format('DD/MM/YYYY');

    doc.text("3. Rental Detail: ", 72, 450)
    doc.text(`Rental Start Date: ${startDate}`, 72, 470);
    doc.text(`Rental End Date: ${endDate}`, 72, 490);
    doc.text(`Pick-Up Location: ${reservation.pickUpLocation}`, 72, 510);
    doc.text(`Drop-Off Location: ${reservation.dropOffLocation}`, 72, 530);
    doc.text(`Rental Period: ${rental_period} Days`, 72, 550);
    doc.text(`Mileage Limit: ${reservation.mileageLimit}`, 72, 570);
    doc.text(`Rental Rate: ${vehicle.price}$/day`, 72, 590);
    doc.text(`Additional Services: ${reservation.additionalServices}`, 72, 610);
    doc.text(`Extra Equipment: ${reservation.extraEquipment}`, 72, 630);

    doc.addPage();
    doc.text("4. Rental Terms and Conditions: ", 72, 70);
    doc.text(`The Renter acknowledges receiving the vehicle described above in good condition and agrees to return it to the Rental Company in the same condition, subject to normal wear and tear.
The Renter agrees to use the vehicle solely for personal or business purposes and not for any illegal activities.
The Renter agrees to pay the Rental Company the agreed-upon rental rate for the specified rental period. Additional charges may apply for exceeding the mileage limit, late returns, fuel refueling, or other damages.
The Renter agrees to bear all costs associated with traffic violations, tolls, and parking fines incurred during the rental period.
The Renter acknowledges that they are responsible for any loss or damage to the vehicle, including theft, vandalism, accidents, or negligence, and agrees to reimburse the Rental Company for all repair or replacement costs.
The Renter agrees to return the vehicle to the designated drop-off location at the agreed-upon date and time. Failure to do so may result in additional charges.
The Rental Company reserves the right to terminate this agreement and repossess the vehicle without prior notice if the Renter breaches any terms or conditions of this agreement.
The Renter acknowledges receiving and reviewing a copy of the vehicle's insurance coverage and agrees to comply with all insurance requirements during the rental period.`
    , 72, 90,{lineHeightFactor: 1.35 ,maxWidth: 451});
    
    doc.text("5. Indemnification: ", 72, 370);
    doc.text(`The Renter agrees to indemnify and hold harmless the Rental Company, its employees, agents, and affiliates from any claims, liabilities, damages, or expenses arising out of or related to the Renter's use of the vehicle.`, 72, 390,{lineHeightFactor: 1.35 ,maxWidth: 451});

    doc.text("6. Governing Law:", 72, 440 );
    doc.text(`This Agreement shall be governed by and construed in accordance with the laws of Canada. Any disputes arising under or related to this Agreement shall be resolved exclusively by the courts of Canada.`, 72, 460,{lineHeightFactor: 1.35 ,maxWidth: 451});

    doc.text("7. Entire Agreement:", 72, 510);
    doc.text(`This Agreement constitutes the entire understanding between the parties concerning the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral.`, 72, 530,{lineHeightFactor: 1.35 ,maxWidth: 451});

    doc.text("8. Signatures:", 72, 570 );
    doc.text("The parties hereto have executed this Agreement as of the date first written above.", 72, 590);
   
    doc.text("Rental Company: ", 72, 620);
    doc.text("Signature: ", 72, 640 );
    doc.line(120, 640, 250, 640);
    doc.text("Print Name: ", 72, 660 );
    doc.line(127, 660, 250, 660);
    doc.text("Data: ", 72, 680 );
    doc.line(98, 680, 250, 680);

    doc.text("Renter: ", 72, 710);
    doc.text("Signature: ", 72, 730 );
    doc.line(120, 730, 250, 730);
    doc.text("Print Name: ", 72, 750 );
    doc.line(127, 750, 250, 750);
    doc.text("Data: ", 72, 770 );
    doc.line(98, 770, 250, 770);


    doc.save("RentalAgreement.pdf");
 
  };
  


    const handleReservationSubmit = (e) => {
        e.preventDefault();
        getReservation();

    };

    const handleReservationIDChange = (e) => {
        const { value } = e.target;
        reservationID = value;
    };

    const handleUpdatedCustomer = (updatedCustomer) => {
        setCustomer(updatedCustomer);
        setLoading(true);
        getVehicle(reservation.vehicleID);
        setFormHeight('300px')
    };

    const handleVehicleInspection = (damages) => {
        setVehicle((prevState) => ({
            ...prevState,
            [damages]: damages,
          }));
        console.log(vehicle);
        setLoading2(true);
        generateAgreement(customer, vehicle, reservation);
        setFormHeight('600px')

    };

    const handleDeposit = (msg) => {
        alert(msg);
        setLoading3(true);
        setReservation(null);
    }

    return (
        <div className="base-form" style={{alignItems: 'center', justifyContent: 'center', height: formHeight}}>
            <form onSubmit={handleReservationSubmit} action="Get Reservation" >
                    {error && <p className="error">{error}</p>}
                    <div className="split-input">
                        <label>Reservation</label>
                        <input
                            type="text"
                            name="reservationID"
                            required={true}
                            placeholder="Reservation ID"
                            onChange={handleReservationIDChange}
                        />
                    </div>
                    <br />
                    <button type="submit">Start Check-in</button>
            </form>

            {!loading && customer.id ?
            <div style={{ marginTop: '30px' }} >
            <UpdateCustomer customer={customer} onSubmit={handleUpdatedCustomer} />
            </div>
            : null}

            {!loading2 && vehicle.id ? 
            <div style={{ marginTop: '30px' }} >
            <VehicleInspection vehicle={vehicle} onSubmit={handleVehicleInspection} />
            </div>
            : null}

            {loading2 && !loading3 &&  customer.cvv ?
            <div style={{ marginTop: '30px' }} >
            <Deposit customer={customer} onSubmit={handleDeposit} />
            </div>
            : null}

            

        </div>
    );
}

export default CheckInForm;

