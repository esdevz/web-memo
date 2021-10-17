const { copyFile } = require("fs");
const path = require("path");

require("esbuild")
  .build({
    entryPoints: [path.resolve(__dirname, "..", "sidebar/index.tsx")],
    assetNames: "../assets/[name]-[hash]",
    outdir: path.resolve(__dirname, "..", "build/sidebar"),
    minify: true,
    target: "es2020",
    format: "esm",
    bundle: true,
    loader: {
      ".woff": "file",
      ".woff2": "file",
    },
  })
  .then(() => {
    copyFile(
      path.resolve(__dirname, "..", "sidebar/index.html"),
      path.resolve(__dirname, "..", "build/sidebar/index.html"),
      (err) => console.error(err)
    );
    console.log("sidebar html file copied into the build folder");
  });
