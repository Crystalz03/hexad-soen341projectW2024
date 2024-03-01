//import React from 'react';

const isValidConfirmationNumber(confNumber) {
  const regex=/^[A-Z]{2}\d{9}$/;
  const isValid=regex.test(confNumber);
  if(!isValid) {
      console.log("The format you have entered is invalid. Please try again.");
      return false;
  }

  return true;
}

test('Should return false when it is an empty string',() => {
const result=isValidConfirmationNumber(''); 
expect(result).toBe(invalid);});

