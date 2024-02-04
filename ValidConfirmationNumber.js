const cancelReservation=require('CancelReservation.js');
test('Should return true when when given a valid confirmation number to cancel a reservation',() => {
  const result=cancelReservation('MR123456789'); 
  expect(result).toBe(true);});

test('Should return false when when given an invalid confirmation number to cancel a reservation',() => {
const result=cancelReservation('AB123456789'); 
expect(result).toBe(false);});