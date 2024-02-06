const mysql=require('mssql'); //needs review 


function isValidConfirmationNumber(confNumber) {
    const regex=/^[A-Z]{2}\d{9}$/;
    const isValid=regex.test(confNumber);
    if(!isValid) {
        console.log("The format you have entered is invalid. Please try again.");
        return false;
    }

    cancelReservation(confNumber);
    return true;

}

function cancelReservation(confNumber)
{
    SELECT *
    FROM Reservations WHERE student_name + age + student_id + class LIKE '%confNumber%';
    connection.query(query,[confNumber], (error,results)=> 
    { 
        if (error)
        {
            console.error('could not proceed:', error);
            return;
        }

        if (results.length===0)
        {
            console.log('No Reservation found under the given number');
        }
        
        else 
        {
            //code to update the status of car to available.
            console.log(`Reservation with confirmation number ${confNumber} has been cancelled`);     
        }
    
    })

    

}


  