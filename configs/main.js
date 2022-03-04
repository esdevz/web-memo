const { copyFile } = require("fs/promises");
const path = require("path");
const copyStaticFiles = require("./copyFiles");

const isWatchMode = process.argv[2] && process.argv[2] === "-watch";

const buildPaths = [
  {
    src: path.resolve(__dirname, "..", "main/index.html"),
    dest: path.resolve(__dirname, "..", "build/firefox/main/index.html"),
  },
  {
    src: path.resolve(__dirname, "..", "sidebar/index.html"),
    dest: path.resolve(__dirname, "..", "build/firefox/sidebar/index.html"),
  },
];

require("esbuild")
  .build({
    entryPoints: [
      path.resolve(__dirname, "..", "main/index.tsx"),
      path.resolve(__dirname, "..", "background-scripts/background.ts"),
      path.resolve(__dirname, "..", "sidebar/index.tsx"),
    ],
    entryNames: "[dir]/[name]",
    assetNames: "./assets/[name]-[hash]",
    outdir: path.resolve(__dirname, "..", "build/firefox"),
    minify: true,
    target: "es2020",
    format: "esm",
    bundle: true,
    watch: isWatchMode,
    loader: {
      ".woff": "file",
      ".woff2": "file",
    },
  })
  .then(async () => {
    try {
      for (const buildPath of buildPaths) {
        await copyFile(buildPath.src, buildPath.dest);
      }
      console.log("main and sidebar html files copied into the build folder");
      await copyStaticFiles();
      if (isWatchMode) {
        console.log("watching...");
      }
    } catch (err) {
      console.error(err);
    }
  });
