


function UpdateUser(customerID) {
    // Here you can access props.reservation to display user information
    return (
        <div>
            <h2>User Information</h2>
            <p>Reservation ID: {props.reservation.id}</p>
            {/* Display more user information here */}
        </div>
    );
}

export default DisplayUserInfo;