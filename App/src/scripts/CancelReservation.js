const mysql=require('mysql'); //needs review 

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

async function findConfirmationNumber(confNumber){
try {
        await sql.connect('mysql://user:password@host/database');
        const result= await sql.query (` SELECT * FROM OurTableName WHERE confirmationNumbersColumn= '${confNumber}'`);
        console.log(result.recordset);
        if (result.recordset.length===0)
        {
            console.log('No Reservation found under the given number');
        }
        else
        {
            cancelReservation(confNumber,'reserved');
        }
    }
catch(error)
{
    console.error('error');
}
finally
{sql.close();}



}


async function cancelReservation(confNumber,STATUS)
{
   
    try {
        await sql.connect('mysql://user:password@host/database');
        const result= await sql.query (` SELECT * FROM OurTableName WHERE confirmationNumbersColumn= '${confNumber}' AND STATUS='${STATUS}'`);
        console.log(result.recordset);
        if (result.recordset.length===0)
        {
            console.log('Car not available');
        }
        else
        {
          await sql.query(`UPDATE OurTableName SET STATUS= 'available' WHERE confirmationNumbersColumn='${confNumber}'`);
          console.log(`Reservation with confirmation number ${confNumber} has been cancelled.`);
        }
    }
    catch(error)
    {
        console.error('error');
    }
    finally
    {sql.close();}


}   
    
    



  