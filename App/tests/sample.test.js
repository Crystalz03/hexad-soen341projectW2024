// This is a sample unit test similar to to what (almost) each features should have
// all unit test file should be name "feature_name.test.js" it's the ".test.js" that tells jest 
// that the file is a test file
const sum = (a, b) => a + b;

test('adds 1 and 2', () => {
  expect(sum(1, 2)).toBe(3);
});

// the comand to run all the tests :
// npm test

// to run a specific test :
// npx jest --testNamePattern="test name" 
// ex: npx jest --testNamePattern="adds 1 and 2"

// make sure node is installed first 
// to install node look at the README file