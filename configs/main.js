const { copyFile } = require("fs");
const path = require("path");

require("esbuild")
  .build({
    entryPoints: [path.resolve(__dirname, "..", "src/index.tsx")],
    assetNames: "../assets/[name]-[hash]",
    outdir: path.resolve(__dirname, "..", "build/main"),
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
      path.resolve(__dirname, "..", "src/index.html"),
      path.resolve(__dirname, "..", "build/main/index.html"),
      (err) => console.error(err)
    );
    console.log("main html file copied into build folder");
  });
