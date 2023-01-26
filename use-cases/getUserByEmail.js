module.exports = function excuteGetUserByEmail({ usersDb }) {
  return async function getUserDetail({ email } = {}) {
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email) {
      throw new Error("You must give a email id.");
    }

    if (!email.match(validRegex) || !email.includes(".")) {
      throw new Error("Please enter valid email id");
    }

    /*
    It will throw query data from database on given condition
    EXP: email = "someone123@gmail.com"
    [
      {
      id: "123456",
      name: "Ravi Kumar",
      email: "someone123@gmail.com"
     },
     {
      id: "9876554",
      name: "Ravi Kumar",
      email: "someone123@gmail.com"
     }
     ...
     ...
    ] 
    */
    return usersDb.findByEmail({ email });
  };
};
