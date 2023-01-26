const Jimp = require("jimp");

Jimp.read("./profile.jpg")
  .then((profile) => {
    return profile
      .resize(256, 256) // resize
      .quality(60) // set JPEG quality
      .greyscale() // set greyscale
      .write("lena-small-bw.jpg"); // save
  })
  .catch((err) => {
    console.error(err);
  });
