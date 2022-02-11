const { copyFile } = require("fs/promises");
const path = require("path");
const copyStaticFiles = require("./copyFiles");

const buildPaths = [
  {
    src: path.resolve(__dirname, "..", "main/index.html"),
    dest: path.resolve(__dirname, "..", "build/main/index.html"),
  },
  {
    src: path.resolve(__dirname, "..", "sidebar/index.html"),
    dest: path.resolve(__dirname, "..", "build/sidebar/index.html"),
  },
];

require("esbuild")
  .build({
    entryPoints: [
      path.resolve(__dirname, "..", "main/index.tsx"),
      path.resolve(__dirname, "..", "background-scripts/background.ts"),
      path.resolve(__dirname, "..", "content-scripts/content-script.ts"),
      path.resolve(__dirname, "..", "sidebar/index.tsx"),
    ],
    entryNames: "[dir]/[name]",
    assetNames: "./assets/[name]-[hash]",
    outdir: path.resolve(__dirname, "..", "build"),
    minify: true,
    target: "es2020",
    format: "esm",
    bundle: true,
    loader: {
      ".woff": "file",
      ".woff2": "file",
    },
  })
  .then(async () => {
    try {
      for await (const buildPath of buildPaths) {
        await copyFile(buildPath.src, buildPath.dest);
      }
      console.log("main and sidebar html files copied into the build folder");
      copyStaticFiles();
    } catch (err) {
      console.error(err);
    }
  });
