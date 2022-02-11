const { readdir, copyFile } = require("fs");
const path = require("path");

module.exports = function copyStaticFiles() {
  readdir(
    path.resolve(__dirname, "..", "public"),
    { withFileTypes: true },
    (err, files) => {
      if (err) {
        console.error(err);
      }
      if (files.length === 0) {
        return;
      }
      for (let file of files) {
        copyFile(
          path.resolve(__dirname, "..", "public", file.name),
          path.resolve(__dirname, "..", "build", file.name),
          (err) => console.error(err)
        );
      }
      console.log("files copied from public folder into build folder");
    }
  );
};
