const cancelReservation=require('CancelReservation.js');
test('Cancel a reservation only when given a valid confirmation number',() => {
  const result=cancelReservation('MR123456789'); 
  expect(result).toBe(true);
 
});