const { readdir, copyFile } = require("fs/promises");
const path = require("path");

module.exports = async function copyStaticFiles() {
  const files = await readdir(path.resolve(__dirname, "..", "public"), {
    withFileTypes: true,
  });

  if (files.length === 0) {
    return;
  }
  for (const file of files) {
    try {
      await copyFile(
        path.resolve(__dirname, "..", "public", file.name),
        path.resolve(__dirname, "..", "build/firefox", file.name)
      );
      console.log(`copy ${file.name} into build/firefox/${file.name}`);
    } catch (err) {
      console.error(err);
    }
  }
};
