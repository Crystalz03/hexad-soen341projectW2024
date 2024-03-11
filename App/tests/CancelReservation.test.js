

function isFormatValidConfirmationNumber(confNumber) {
  const regex=/^[A-Z]{1}\d{9}$/;
  const isValid=regex.test(confNumber);
  if(!isValid) {
      console.log("The format you have entered is invalid. Please try again.");
      return false;
  }

  return true;
}


test('Should return true if valid format string',() => {
const result=isFormatValidConfirmationNumber('A123456789'); 
expect(result).toBe(true);});

test('Should return false for invalid format strings',() => {
  const cases = [
'',
'A123456789103',      // More than 9 digits
'a123456789',         // Lowercase letter
'A123456',            // Less than 9 digits
'AB123456789',        // More than one capital letter
'A1B23456789',        // Letter in the middle
'1234567890',         // No capital letter
'AABCDEFGHI',         // No digits
'A123456789-',        // Special character at the end
'A123456789a',        // Lowercase letter at the end
'ABCD',              // Only letters, no digits
'!@#(*&^%$#@',       // Only special characters

]; 

cases.forEach(InvalidCase => {
  const result=isFormatValidConfirmationNumber(InvalidCase); 
  expect(result).toBe(false);});

});