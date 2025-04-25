module.exports = {
  testEnvironment: "node",
  // fileMatch: ["**/*.test.js"], this is wrong my test/user.test.js, test/usermock.unitTest.js are not included

  testMatch: ["**/test/user.test.js"],
};
