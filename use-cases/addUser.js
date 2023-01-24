module.exports = function excuteAddUser({ usersDb }) {
  return async function addUserDetails({ oAuth2Client, axios, paramEmail }) {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${paramEmail}/messages`;
    const { token } = await oAuth2Client.getAccessToken();

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    response.data.messages.forEach(async (data) => {
      const dataId = data.id;
      const url = `https://gmail.googleapis.com//gmail/v1/users/${paramEmail}/messages/${dataId}`;
      const { token } = await oAuth2Client.getAccessToken();

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const storeData = await response.data;

      storeData.payload.headers.forEach((ele) => {
        if (ele.name === "From") {
          let convertIntoArr = ele.value.split("");
          let spliceEmail = convertIntoArr.splice(
            convertIntoArr.indexOf("<") + 1,
            convertIntoArr.length - 1
          );
          let email = spliceEmail.slice(0, spliceEmail.length - 1).join("");
          let name = convertIntoArr
            .slice(0, convertIntoArr.length - 2)
            .join("");

          usersDb.addUser({
            name: name,
            email: email,
          });
        }
      });
    });
  };
};
