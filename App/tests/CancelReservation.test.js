



test('Should return true when when given a valid confirmation number to cancel a reservation',() => {
const result=cancelReservation('M123456789'); 
expect(result).toBe((valid));});

test('Should return false when given an confirmation number that does not exist in the database to cancel a reservation',() => {
const result=cancelReservation('A123456789'); 
expect(result).toBe(invalid);});

test('Should return false when it is an empty string',() => {
const result=cancelReservation(''); 
expect(result).toBe(invalid);});

test('Should return false if special characters are given',() => {
  const result = cancelReservation('!@#$');
  expect(result).toBe(invalid);
});
